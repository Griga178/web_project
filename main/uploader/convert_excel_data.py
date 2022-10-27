import re


def define_links(string_value):
    # возращает список с возможными сылками
    if type(string_value) == str:
        re_sult = re.findall(r'[\w:/.\-?=&+%#\[\]]+', string_value)
        return re_sult
    else:
        return ['']
def define_main_page(link):
    '''    Определение главной страницы из строки    '''
    if type(link) == str:
        split_list = link.split("/")
        h_protocol = split_list[0]
        try:
            main_page = split_list[2]
        except:
            main_page = ''
        if 'http' or 'ftp' in h_protocol:
            return main_page
        else:
            print('ERROR: не похоже на ссылку')
            return False
    else:
        print('ERROR: ссылка не в формате строки')
        return False

def get_excel_data(excel_list):
    excel_data_list = []
    link_column_index = 18
    part_column_index = 19
    previous_part_value = 'Не известная часть'
    for row in excel_list:
        link_value = row[link_column_index].value
        part_value = row[part_column_index].value
        if link_value == None:
            link_value = False
        else:
            links_list = define_links(link_value)
            domain_name = define_main_page(links_list[0])
        if part_value == None:
            part_value = previous_part_value
        else:
            previous_part_value = part_value
        for link in links_list:
            excel_data_list.append([link, domain_name, part_value])
    del excel_data_list[0]
    return excel_data_list
