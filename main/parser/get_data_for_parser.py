from main.data_base.query_to_links import select_links_by_id

# ├── dict_for_parser: dict
# │   ├── id_domain: dict
# │   │   ├── "targets": dict
# │   │   │   ├── target_id: dict
# │   │   │   │   ├── "target_name": str
# │   │   │   │   ├── "target_setting": str
# │   │   ├── "links": list
# │   │   │   ├── : list
# │   │   │   │   ├── link_id : str?
# │   │   │   │   ├── link : str

def print_parser_data(dict_for_parser):
    for dom_id in dict_for_parser:
        print()
        for link_obj in dict_for_parser[dom_id]["links"]:
            setts_names = []
            for target_id in dict_for_parser[dom_id]["targets"]:
                targ_name = dict_for_parser[dom_id]["targets"][target_id]['target_name']
                setts_names.append(targ_name)
            print(f'D_ID: {dom_id} Ссылка: {link_obj[0]} - {link_obj[1][:25]}', "Ищем:", " ,".join(setts_names))

def get_data_for_parser(id_list):
    dict_for_parser = {}
    empty_settings_set = set()
    list_links_objects = select_links_by_id(id_list)

    for link_obj in list_links_objects:
        domain_id = link_obj.id_domain
        if domain_id in empty_settings_set: # пропускаем если у домена нет настроек
            continue
        if domain_id in dict_for_parser:
            dict_for_parser[domain_id]["links"].append([link_obj.id, link_obj.link])
        else:
            targets = {target.id:{"target_name": target.setting_name, "target_setting": target.setting_content} for target in link_obj.domains.net_link_sett}
            if len(targets) != 0:
                dict_for_parser[domain_id] = {}
                dict_for_parser[domain_id]["links"] = [[link_obj.id, link_obj.link]]
                dict_for_parser[domain_id]["targets"] = targets
            else:
                empty_settings_set.add(domain_id)

    print_parser_data(dict_for_parser)
    return dict_for_parser
