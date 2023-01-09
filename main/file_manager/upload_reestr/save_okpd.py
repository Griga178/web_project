from main.db.que_okpd import insert_okpd_2_part
from main.db.que_okpd import insert_okpd_2

def save_okpd_2(okpd_2_str):
    splited_okpd = okpd_2_str.split('.')
    okpd_part_obj = False
    for okpd_part in splited_okpd:
        if not okpd_part_obj:
            okpd_part_obj = insert_okpd_2_part(okpd_part)
        else:
            parent_okpd_obj = okpd_part_obj
            child_okpd_obj = insert_okpd_2_part(okpd_part)
            parent_okpd_obj = insert_okpd_2(parent_okpd_obj.id, child_okpd_obj.id)

    return splited_okpd
