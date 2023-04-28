'''
    принимаем файл от пользователя
    сохраняем в бд, что нашли (ккн, окпд2, часть, ссылка, компания)
    делаем отчет
    https://app.diagrams.net/#G1bUm06TC-kHucXlWqnI9An6gVaQUQlGz3

    ОСТАЛАСЬ Обработка ОКПД2
'''
from ..common_funcs import excel_to_list
from ..db_v3 import Query_Base
import re

def upload_file(file_object):
    # перевод excel в List[<row>, ...]
    open_set = {
        'sheet_name': 'Лист1',
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

    report_dict = {
        'new_kkn': 0,
        'new_kkn_family': 0,
        'new_kkn_part': 0,
        'new_kkn_parts': [],
        'new_company': 0,
        'new_website': 0,
        'new_link': 0,
        }

    #  - - - - Work_table - - - -
    sql_work_table = Query_Base('work_table').create(name = file_object)
    current_KKN = False

    for row in excel_rows:
        # получение из <row> информации
        str_okpd_2 = row[0]
        str_detalization = row[1]
        str_kkn = row[2]
        str_source = row[3]
        str_inn = row[4]
        str_name = row[5]
        str_links = row[6]
        str_kkn_part = row[7]

        # поиск/создание экземпляров в БД

        #  - - - - KKN_Family - - - -
        str_kkn_family = " ".join(str_kkn.split(" ")[0:-2]).replace("¹", "") if str_kkn else None
        sql_kkn_family = Query_Base('kkn_family').get(name = str_kkn_family) if str_kkn else False # False - нет в excel - пропускаем
        if sql_kkn_family == None: # None - нет в БД - создаем
            report_dict['new_kkn_family'] += 1
            sql_kkn_family = Query_Base('kkn_family').create(name = str_kkn_family)

        #  - - - - KKN_Part - - - -
        if str_kkn_part:
            split_kkn_part = str_kkn_part.split(" ")
            kkn_part_number = split_kkn_part[0][0:-1]
            kkn_part_name = " ".join(split_kkn_part[1:])
            sql_kkn_part = Query_Base('kkn_part').get(name = kkn_part_name)
        else:
            str_kkn_part = False # False - нет в excel
        if sql_kkn_part == None: # None - нет в БД
            report_dict['new_kkn_part'] += 1
            sql_kkn_part = Query_Base('kkn_part').create(name = kkn_part_name, number = kkn_part_number)
            report_dict['new_kkn_parts'].append(sql_kkn_part.name)

        #  - - - - OKPD_2 - - - -
        sql_okpd_2 = None

        #  - - - - KKN - - - -
        sql_kkn = Query_Base('kkn').get(name = str_kkn) if str_kkn else False # False - нет в excel
        if sql_kkn == None: # None - нет в БД
            report_dict['new_kkn'] += 1
            sql_kkn = Query_Base('kkn').create(
                name = str_kkn,
                detalization = str_detalization,
                kkn_family_id = sql_kkn_family.id if sql_kkn_family else None,
                kkn_part_id = sql_kkn_part.id if sql_kkn_part else None,
                okpd_2_id = sql_okpd_2.id if sql_okpd_2 else None
                )
        current_KKN = sql_kkn if sql_kkn else current_KKN

        #  - - - - Company - - - -
        comp_inn = str(str_inn).strip() if str_inn else None
        sql_company = Query_Base('company').get(inn = comp_inn) if comp_inn else False
        if sql_company == None: # None - нет в БД
            report_dict['new_company'] += 1
            comp_name = str_name.strip() if str_name else None
            sql_company = Query_Base('company').create(inn = comp_inn, name = comp_name)

        #  - - - - Link - - - -
        links = re.findall(r'[\w:/.\-?=&+%#\[\]]+', str_links) if str_links else False # False - нет в excel

        sql_links = set()
        if links:
            for str_link in links:
                #  - - - - Website - - - -
                str_website = str_link.split('/')[2]
                sql_website = Query_Base('website').get(name = str_website)
                if sql_website == None: # None - нет в БД
                    report_dict['new_website'] += 1
                    sql_website = Query_Base('website').create(
                        name = str_website,
                        id_company = sql_company.id if sql_company else None
                        )

                #  - - - - Link - - - -
                sql_link = Query_Base('link').get(name = str_link)
                if sql_link == None:
                    report_dict['new_link'] += 1
                    sql_link = Query_Base('link').create(
                        name = str_link,
                        website_id = sql_website.id if sql_website else None,
                        )

                sql_links.add(sql_link) if sql_link else None

        #  - - - - Source - - - -
        # ищем источник в котором есть ВСЕ текущие ссылки
        sql_sources = []
        all_sources = set()
        new_source = False
        for sq_li in sql_links:
            so_cons = sq_li.sources # связи источников в которых есть эта ссылка
            cur_li_source = set()
            for so_con in so_cons:
                cur_li_source.add(so_con.source)
                all_sources.add(so_con.source)
            sql_sources.append(cur_li_source)

        for source_set in sql_sources:
            all_sources = all_sources & source_set

        if len(all_sources) == 1:
            # найден 1 источник с такими же ссылками
            print("old Source")
            sql_source = list(all_sources)[0]
        elif len(all_sources) == 0:
            # создаем новый источник
            print("New Source")
            split_source = str_source.split(" ")
            if split_source[0].isdigit():
                so_name = "Контракт"
            else:
                so_name = "Продавец"
            new_source = True
            sql_source = Query_Base('source').create(
                type = so_name,
                kkn_id = current_KKN.id if current_KKN else None,
                )
        else:
            print("Такого не должно быть")
            sql_source = list(all_sources)[0]
            for el in all_sources:
                print(el, el.id)


        #  - - - - Source_Link - - - -
        if new_source:

            for slink in sql_links:
                Query_Base('source_link').create(
                    link_id = slink.id,
                    source_id = sql_source.id
                    )
        #  - - - - Work_table_Source - - - -
        Query_Base('work_table_source').create(
            source_id = sql_source.id,
            work_table_id = sql_work_table.id
            )
        print(str_kkn, len(sql_links))

    return report_dict
