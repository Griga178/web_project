from main.data_base.query_to_links import select_links_by_id
from main.data_base.query_to_domain_settings import select_settings_by_domains_id

def prepare_links_and_settigs(list_links_id):
    # получаем ссылки по id из БД
    links_objects = select_links_by_id(list_links_id)
    links_list = []
    domains_id_set = set()
    for link_object in links_objects:
        link_id = link_object.id
        link = link_object.link
        domain_id = link_object.id_domain
        links_list.append([link, domain_id, link_id])
        domains_id_set.add(link_object.id_domain)

    # получаем настройки для доменов из БД
    setting_objects = select_settings_by_domains_id(domains_id_set)
    domain_settings = {}
    for cur_object in setting_objects:
        if cur_object.id_domain not in domain_settings:
            domain_settings[cur_object.id_domain] = {cur_object.setting_name: cur_object.setting_content}
        else:
            domain_settings[cur_object.id_domain][cur_object.setting_name] = cur_object.setting_content

    # удаляем из списка ссылок те, для которых нет настроек
    missin_id_set = domains_id_set - set(domain_settings.keys())
    for link_elem in links_list:
        if link_elem[1] in missin_id_set:
            links_list.remove(link_elem)

    return links_list, domain_settings
