from openpyxl import load_workbook
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

def get_first_excel_list(file_obj):
    excel_data = load_workbook(file_obj, read_only = True, data_only = True)
    first_excel_list = excel_data.worksheets[0]
    return first_excel_list.iter_rows()

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
    return excel_data_list

def read_excel(file_obj):
    ex_list = get_first_excel_list(file_obj)
    excel_data_list = get_excel_data(ex_list)
    for el_row in excel_data_list:
        print(el_row[0][:15], el_row[1], el_row[2][:10])

    return "ok"
