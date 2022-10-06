from main.data_base.query_to_parsing import select_all_results
import json

SCREEN_FOLDER = 'C:/Users/G.Tishchenko/Desktop/web_screens/'

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
        screen_name = (SCREEN_FOLDER + result_id + '.jpg') if not p_result.product_avaliable else False
        dict_to_js[result_id] = {'link': p_result.links.link}
        dict_to_js[result_id]['domain_name'] = p_result.links.domains.name
        dict_to_js[result_id]['result_id'] = result_id
        dict_to_js[result_id]['price'] = p_result.price
        dict_to_js[result_id]['parsing_date'] = p_result.parsing_date
        dict_to_js[result_id]['product_name'] = p_result.product_name
        dict_to_js[result_id]['product_not_avaliable'] = p_result.product_avaliable
        dict_to_js[result_id]['screen_path'] = screen_name
        dict_to_js[result_id]['user_changed'] = p_result.user_changed

    return json.dumps(dict_to_js)
