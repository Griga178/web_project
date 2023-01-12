from main.db.que_file import select_all_files
# from main.db.que_file_link import insert_file_link

def count_companies(obj_list):
    amount = set()
    for kkn_link_obj in obj_list:
        amount.add(kkn_link_obj.link.domain.company.id)
    return len(amount)

def count_kkns(obj_list): # список связей файл - ссылка
    amount = set()
    parts = set()
    for file_kkn_link_obj in obj_list:
        amount.add(file_kkn_link_obj.id_kkn)
        parts.add(file_kkn_link_obj.kkn.kkn_part.name)
    return len(amount), parts

def count_links(obj_list):
    unioun_amount = set()
    kontr_amount = set()
    for file_kkn_link_obj in obj_list:
        unioun_amount.add(file_kkn_link_obj.id_link)
        if file_kkn_link_obj.source_type.name == 'Контракт':
            kontr_amount.add(file_kkn_link_obj.id_link)
    return (len(unioun_amount), len(kontr_amount))

def get_files_info():
    uploaded_files = select_all_files()

    message = {}
    answer = {}
    for file in uploaded_files:
        # len(file.kkns) = links
        message['file_name'] = file.name
        message['file_id'] = file.id
        message['link_ammount_unic'], message['link_ammount_kontr'] = count_links(file.file_kkn_links)
        message['company_ammount'] = count_companies(file.file_kkn_links)
        message['kkn_ammount'], message['parts'] = count_kkns(file.file_kkn_links)
        message['file_obj'] = file
        # message['readme'] = 'связь: ссылка на контракт-ккн не учитывается'
        # message['readme'] = 'кол-во уникальных ссылок (в т.ч. в 1 ячейке несколько)'


        answer[file.id] = message.copy()
    print("FILE:", answer)
    return answer
