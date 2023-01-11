from main.db.que_file import select_all_files
# from main.db.que_file_link import insert_file_link

def count_companies(obj_list):
    amount = set()
    for kkn_link_obj in obj_list:
        amount.add(kkn_link_obj.link.domain.company.id)

    return len(amount)

def count_kkns(obj_list): # список связей файл - ссылка
    amount = set()
    for file_link_obj in obj_list:
        link_obj = file_link_obj.link # ссылка в текущем файле
        list_kkn_obj = link_obj.kkns # список ккн у ссылки (ккны из всех файлов)
        for kkn_obj in list_kkn_obj:
            amount.add(kkn_obj.kkn.kkn_name)

    for el in amount:
        print(el)
    return len(amount)

def get_files_info():
    uploaded_files = select_all_files()

    message = {}
    for file in uploaded_files:
        # len(file.kkns) = links
        message['file_name'] = file.name
        message['file_id'] = file.id
        message['link_ammount'] = len(file.links)
        message['company_ammount'] = count_companies(file.links)
        message['kkn_ammount'] = count_kkns(file.links)

        print("FILE:", message)
