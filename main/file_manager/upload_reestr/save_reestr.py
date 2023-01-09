from main.file_manager.upload_reestr.read_reestr import read_reestr
from main.file_manager.upload_reestr.save_okpd import save_okpd_2

from main.db.que_upload_history import insert_upload
from main.db.que_kkn import insert_kkn

# from main.db.que_kkn_part import insert_kkn_part

from datetime import datetime

def insert_reestr(file_name):

    reestr_dict = read_reestr(file_name)

    for kkn_name, kkn_dict in reestr_dict.items():
        okpd_2_obj = save_okpd_2(kkn_dict['okpd_2'])
        print(kkn_name, okpd_2_obj)

        # kkn_part_obj = insert_kkn_part(kkn_dict['part'])

        # kkn_obj = insert_kkn(kkn_name = kkn_name,
        #                     detalization = kkn_dict['detalization'],
        #                     id_okpd_2 = okpd_2_obj.id,
        #                     id_kkn_part = kkn_part_obj.id)

    #     print(kkn_name, len(kkn_dict['sources']))
    #     print(kkn_dict['okpd_2'], kkn_dict['detalization'])
    #     print(kkn_dict['part'])



    # upload_file_obj = insert_upload(file_name.filename, datetime.now())
