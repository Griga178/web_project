from main.data_base.query_to_parsing import insert_parsing_result

# ├── parsing_result {} # Не все ключи могут быть
# │   ├── 'link_id': int(*)
# │   ├── 'avaliable': str(*)
# │   ├── 'price': float(*)
# │   ├── 'name': str(*)
# │   ├── 'current_date': str("%d/%m/%Y")

# ├── dict_for_insert {}
# │   ├── 'link_id': int(*)
# │   ├── 'avaliable': str(*)
# │   ├── 'price': float(*)
# │   ├── 'name': str(*)
# │   ├── 'current_date': str("%d/%m/%Y")

def insert_to_db(parsing_results):
    dict_for_insert = {}
    for pars_type in parsing_results:
        if parsing_results.get(pars_type, False):
            dict_for_insert[pars_type] = parsing_results[pars_type]
        else:
            dict_for_insert[pars_type] = False

    return insert_parsing_result(dict_for_insert)
