
from main.data_base.query_to_parsing import select_filtered_results
import json

# ├── filteredQuery: {}
# │   ├──  domain_list: []
# │   │   │   ├──  domain_id: str
# │   ├──  start_date: str
# │   ├──  end_date: str
# │   ├──  only_last: bool
# │   ├──  get_checked: bool
# │   ├──  get_unchecked: bool
# пока не отправляется
# │   ├──  get_with_out_price: bool

def get_results_list(filteredQuery):
    results_list = []
    # print('Создаем запрос')
    start_date = filteredQuery['start_date'].split("-")
    filteredQuery['start_date'] = "/".join([start_date[2], start_date[1], start_date[0]])
    end_date = filteredQuery['end_date'].split("-")
    filteredQuery['end_date'] = "/".join([end_date[2], end_date[1], end_date[0]])

    if len(filteredQuery['domain_list']) == 0:
        del filteredQuery['domain_list']
        # print(filteredQuery)

    res_list = select_filtered_results(filteredQuery)
    # print(res_list)
    for el in res_list:
        # print(el.id)
        results_list.append(el.id)

    return json.dumps(results_list)
