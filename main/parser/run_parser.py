from main.data_base.query_to_links import select_links_by_id
from main.data_base.query_to_domain_settings import select_settings_by_domains_id

def run_parser(list_links_id):
    links_objects = select_links_by_id(list_links_id)
    domains_id_set = set()

    for link_object in links_objects:
        
        domains_id_set.add(link_object.id_domain)

    setting_dict = select_settings_by_domains_id(domains_id_set)

    print(setting_dict)
