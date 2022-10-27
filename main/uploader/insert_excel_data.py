from main.uploader.get_excel_data import get_first_excel_list
from main.uploader.convert_excel_data import get_excel_data

from main.data_base.query_to_domains import select_or_insert_domain
from main.data_base.query_to_kknpart import select_or_insert_kkn_part
from main.data_base.query_to_links import select_or_insert_link
from main.data_base.query_to_association_table import select_insert_association

# ├── excel_data_list []
# │   ├── row: list []
# │   │   ├── domain
# │   │   ├── link
# │   │   ├── part



def save_elements(excel_data_list):
    domain_set = set()
    part_set = set()
    dict_parts_domains = {}
    dict_parts_domains['domain'] = {}
    dict_parts_domains['part'] = {}
    for el_row in excel_data_list:
        domain_set.add(el_row[1])
        part_set.add(el_row[2])
    # дабавляем домены в бд
    for domain_name in domain_set:
        domain_obj = select_or_insert_domain(domain_name)
        dict_parts_domains['domain'][domain_name] = domain_obj.id
    # добавляем номер части в бд
    for part_name in part_set:
        kknpart_obj = select_or_insert_kkn_part(part_name)
        dict_parts_domains['part'][part_name] = kknpart_obj.id
    # добавляем номер ссылки в бд
    for data_row in excel_data_list:
        domain_id = dict_parts_domains['domain'][data_row[1]]
        kkn_part_id = dict_parts_domains['part'][data_row[2]]
        link_value = data_row[0]
        link_obj = select_or_insert_link(link_value, domain_id)
        data_row[0] = link_obj.id
        data_row[2] = kkn_part_id
        assotiations = select_insert_association(kkn_part_id, link_obj.id)
        print(data_row, assotiations.kkn_id, assotiations.link_id)
    # добавляем связи ссылка - номер части

def read_excel(file_obj):
    ex_list = get_first_excel_list(file_obj)
    excel_data_list = get_excel_data(ex_list)
    save_elements(excel_data_list)

    return "ok"
