import re

def define_links(string_value: str) -> list[str]:
    # возращает список с возможными сылками
    if type(string_value) == str:
        re_sult = re.findall(r'[\w:/.\-?=&+%#\[\]]+', string_value)
        return re_sult
    else:
        return ['']
