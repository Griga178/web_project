from main.file_manager.upload_reestr.read_reestr import read_reestr
from main.file_manager.upload_reestr.save_okpd import save_okpd_2#, full_okpd_2_by_id
from main.file_manager.upload_reestr.save_source_type import get_source_info

from main.db.que_upload_history import insert_upload
from main.db.que_kkn import insert_kkn
from main.db.que_kkn_part import insert_kkn_part
from main.db.que_kkn_link import insert_kkn_link

from main.common_funcs import define_links
from main.common_funcs import define_domain

from datetime import datetime

def insert_reestr(file_name):

    reestr_dict = read_reestr(file_name)
    message_dict = {'okpd': set(),
                'kkn_part': set(),
                'kkn': set(),
                'link': set(),
                'domain': set(),
                'company': set(),
                'error': []
                }
    for kkn_name, kkn_dict in reestr_dict.items():
        okpd_2_obj = save_okpd_2(kkn_dict['okpd_2'])

        kkn_part_obj = insert_kkn_part(kkn_dict['part'])

        kkn_obj = insert_kkn(kkn_name = kkn_name,
                            detalization = kkn_dict['detalization'],
                            id_okpd_2 = okpd_2_obj.id,
                            id_kkn_part = kkn_part_obj.id)

        print(kkn_obj.kkn_name)
        for source_dict in kkn_dict['sources']:
            source_info = get_source_info(source_dict['source_name_number'])
            # print(link_list)
            # company_name = source_dict['source_name']
            # company_inn = source_dict['source_inn']
            print(source_info)
            link_list = define_links(source_dict['link'])
            # for link in link_list:
                # добавить домен
                # добавить связь с ккн



        message_dict['okpd'].add(okpd_2_obj.id)
        message_dict['kkn_part'].add(kkn_part_obj.id)
        message_dict['kkn'].add(kkn_obj.id)

        # link_obj
        # domain
        # company

    upload_file_obj = insert_upload(file_name.filename, datetime.now())
    # print(message_dict)
