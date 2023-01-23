from main.file_manager.read_excel import excel_to_lists

def read_reestr(file_name):
    print("начали загрузкку...")

    kwargs = {
        'headers_names': ["ОКПД2",
                "Детализация",
                "Наименование ККН",
                "Источник ценовой информации",
                "ИНН поставщика",
                "Наименование поставщика",
                """160-Р
507 - ОК
79 - ОШИБКА""",
                "Ссылка",
                "Часть"],
        'headers' : False
    }
    lists_from_excel = excel_to_lists(file_name, **kwargs)

    reestr_data = {}

    for row_list in lists_from_excel:

        if row_list[0]:
            kkn_name = row_list[2]
            # print(row_list[0], "-", row_list[1], row_list[2])

            reestr_data[kkn_name] = {
                    "okpd_2": row_list[0],
                    "detalization": row_list[1],
                    "part": row_list[7],
                    "sources": []}

        if row_list[3]:
            reestr_data[kkn_name]["sources"].append({"source_name_number": row_list[3],
                        "source_name": row_list[5],
                        "source_inn": row_list[4],
                        "link": row_list[6]
                        })

    return reestr_data
