from main.data_base.query_to_parsing import select_all_results
from main.settings import PARSING_SCREEN_FOLDER
from datetime import datetime
import json

# ├── dict_to_js {}
# │   ├── link_id {}
# │   │   ├── 'link': str(link)
# │   │   ├── 'result_id': str(id)
# │   │   ├── 'price': str(price)
# │   │   ├── 'parsing_date': str(d/m/Y)
# │   │   ├── 'product_name': str(*)
# │   │   ├── 'product_not_avaliable': bool(*)
# │   │   ├── 'screen_path': str(*)
# │   │   ├── 'user_changed': bool(*)

def prepare_data_to_js():
    income_result_list = select_all_results()
    dict_to_js = {}
    for p_result in income_result_list:
        result_id = str(p_result.id)
        screen_name = (PARSING_SCREEN_FOLDER + result_id + '.jpg') if not p_result.product_avaliable else False
        dict_to_js[result_id] = {'link': p_result.links.link}
        dict_to_js[result_id]['domain_name'] = p_result.links.domains.name
        dict_to_js[result_id]['price'] = p_result.price
        dict_to_js[result_id]['result_id'] = result_id
        dict_to_js[result_id]['parsing_date'] = p_result.parsing_date
        dict_to_js[result_id]['product_name'] = p_result.product_name
        dict_to_js[result_id]['product_not_avaliable'] = p_result.product_avaliable
        dict_to_js[result_id]['screen_path'] = screen_name
        dict_to_js[result_id]['user_changed'] = p_result.user_changed

    return json.dumps(dict_to_js)

# ├── filterDataObj: {}
# │   ├──  'domain_dict': {}
# │   │   ├──  domain_name: {}
# │   │   │   ├──  'id': str
# │   │   │   ├──  'domain_name': str
# │   │   │   ├──  'result_amount': int
# │   ├──  'date_start': "2022-09-05"
# │   ├──  'date_end': "2022-09-05"

def create_json_object_for_filter():
    filterDataObj = {}
    filterDataObj['domain_dict'] = {}
    filterDataObj['date_start'] = False
    parser_table_response = select_all_results()
    for result_example in parser_table_response:
        domain_name = result_example.links.domains.name
        domain_id = result_example.links.domains.id
        current_result_date = datetime.strptime(result_example.parsing_date, '%d/%m/%Y')
        if not result_example.product_avaliable: # проверяем на наличие скрина
            if domain_name in filterDataObj['domain_dict']: # заполняем словарь доменов
                filterDataObj['domain_dict'][domain_name]['result_amount'] += 1
            else:
                filterDataObj['domain_dict'][domain_name] = {'id': domain_id, 'result_amount': 1}
            if filterDataObj['date_start']: # заполняем крайние даты
                if current_result_date < filterDataObj['date_start']:
                    filterDataObj['date_start'] = current_result_date
                if current_result_date > filterDataObj['date_end']:
                    filterDataObj['date_end'] = current_result_date
            else:
                filterDataObj['date_start'], filterDataObj['date_end'] = current_result_date, current_result_date
    # преобразуем формат крайних дат в строку
    filterDataObj['date_start'] = filterDataObj['date_start'].strftime('%Y-%m-%d')
    filterDataObj['date_end'] = filterDataObj['date_end'].strftime('%Y-%m-%d')
    return json.dumps(filterDataObj)
