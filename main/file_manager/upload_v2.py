'''
    принимаем файл от пользователя
    сохраняем в бд, что нашли (ккн, окпд2, часть, ссылка, компания)
    делаем отчет
    https://app.diagrams.net/#G1bUm06TC-kHucXlWqnI9An6gVaQUQlGz3
'''
from .common_funcs import excel_to_list

def upload_file(file_object):
    # перевод excel в List[<row>, ...]
    open_set = {
        # 'sheet_name': 'Лист1',
        'headers': False,
        'headers_names': [
            "ОКПД2",
            "Детализация",
            "Наименование ККН",
            'Источник ценовой информации',
            'ИНН поставщика',
            'Наименование поставщика',
            'Ссылка',
            "Часть"]
        }
    excel_rows = excel_to_list(file_object, **open_set)
    # получение из <row> информаци
    for row in excel_rows:
        str_okpd_2 = row[0]
        str_detalization = row[1]
        str_kkn = row[2]
        str_source = row[3]
        str_inn = row[4]
        str_name = row[5]
        str_links = row[6]
        str_kkn_pa = row[7]
    # поиск сущществующего

    # сохранение

    # отчет
