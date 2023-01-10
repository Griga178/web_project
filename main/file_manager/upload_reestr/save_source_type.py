from main.db.que_source_type import check_source_table
from main.db.que_source_type import select_source_type

from datetime import datetime

def get_source_info(source_info):
    check_source_table()
    ret_info = {
    'source_type_id': 0,
    'source_date': 0,
    'source_number': '',
    }
    split_string = source_info.split(" ")
    if split_string[0] == "Экранная":
        source_type_obj = select_source_type("Экранная копия")
        ret_info['source_date'] = split_string[3]
        ret_info['source_number'] = split_string[5]

    elif split_string[0] == "Ответ":
        source_type_obj = select_source_type("Ответ на запрос")
        ret_info['source_date'] = split_string[4]
        ret_info['source_number'] = split_string[6]

    elif split_string[0].isdigit():
        source_type_obj = select_source_type("Контракт")
        ret_info['source_date'] = split_string[2]
        ret_info['source_number'] = split_string[0]
    else:
        source_type_obj = select_source_type("Прочее")

    ret_info['source_type_id'] = source_type_obj.id

    return ret_info
