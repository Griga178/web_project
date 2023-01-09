from sqlalchemy.orm import sessionmaker
from main.db.db_start import engine
from main.db.db_start import Okpd_2_part
from main.db.db_start import Okpd_2
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()

def select_okpd_2_part_by_name(okpd_name):
    try:
        okpd_obj = session.query(Okpd_2_part).filter_by(symbol = okpd_name).one()
        return okpd_obj
    except NoResultFound:
        return False

def insert_okpd_2_part(okpd_name):
    okpd_part_obj = select_okpd_2_part_by_name(okpd_name)
    if not okpd_part_obj:
        okpd_part_obj = Okpd_2_part(symbol = okpd_name)

        session.add(okpd_part_obj)
        session.commit()
    return okpd_part_obj

def select_okpd_2(parent_id, child_id):
    try:
        okpd_obj = session.query(Okpd_2_part).filter_by(id_okpd_2_parent = parent_id, id_okpd_2_child = child_id).one()
        return okpd_obj
    except NoResultFound:
        return False

def insert_okpd_2(parent_id, child_id):
    okpd_2_obj = select_okpd_2(parent_id, child_id)
    if not okpd_2_obj:
        okpd_2_obj = Okpd_2(id_okpd_2_parent = parent_id, id_okpd_2_child = child_id)

        session.add(okpd_2_obj)
        session.commit()
    return okpd_2_obj
