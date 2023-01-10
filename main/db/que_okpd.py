from sqlalchemy.orm import sessionmaker
from main.db.db_start import engine
# from main.db.db_start import Okpd_2_part
from main.db.db_start import Okpd_2
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()


def select_okpd_2(parent_con_id, okpd_part_symbol):
    try:
        okpd_obj = session.query(Okpd_2).filter_by(id_parent_connection = parent_con_id, symbol = okpd_part_symbol).one()
        return okpd_obj
    except NoResultFound:
        return False

def select_okpd_2_by_id(con_id):
    try:
        okpd_obj = session.query(Okpd_2).filter_by(id = con_id).one()
        return okpd_obj
    except NoResultFound:
        return False

def insert_okpd_2(parent_con_id, okpd_part_symbol):
    okpd_2_obj = select_okpd_2(parent_con_id, okpd_part_symbol)
    if not okpd_2_obj:
        okpd_2_obj = Okpd_2(id_parent_connection = parent_con_id, symbol = okpd_part_symbol)

        session.add(okpd_2_obj)
        session.commit()
    return okpd_2_obj

def full_okpd_2_by_id(con_id, okpd_2_str = ''):
    okpd_obj = select_okpd_2_by_id(con_id)
    if okpd_obj:
        okpd_2_str = okpd_obj.symbol + '.' + okpd_2_str
        if okpd_obj.id_parent_connection:
            okpd_2_str = full_okpd_2_by_id(okpd_obj.id_parent_connection, okpd_2_str)
        else:
            okpd_2_str = okpd_2_str[:-1]
    return okpd_2_str

def okpd_obj_by_str(okpd_2_str):
    splited_okpd = okpd_2_str.split('.')
    path_id = 0

    for okpd_path in splited_okpd:
        okpd_path_obj = select_okpd_2(path_id, okpd_path)
        if okpd_path_obj:
            path_id = okpd_path_obj.id
        else:
            return False
    return okpd_path_obj
