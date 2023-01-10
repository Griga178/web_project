from main.db.que_okpd import insert_okpd_2, full_okpd_2_by_id


def save_okpd_2(okpd_2_str):
    splited_okpd = okpd_2_str.split('.')
    parent_con_id = 0
    for okpd_part_symbol in splited_okpd:
        okpd_2 = insert_okpd_2(parent_con_id, okpd_part_symbol)
        parent_con_id = okpd_2.id

    ''' возврат последней связи
    через родителей собирается вся цепочка кода окпд2 '''
    return okpd_2
