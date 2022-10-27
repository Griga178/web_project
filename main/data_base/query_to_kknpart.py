from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()


def insert_new_part(part_name):
    part_frob_db = KKNPart(name = part_name)
    session.add(part_frob_db)
    session.commit()
    return part_frob_db

def select_or_insert_kkn_part(part_name):
    try:
        part_frob_db = session.query(KKNPart).filter_by(name = part_name).one()
    except NoResultFound:
        part_frob_db = insert_new_part(part_name)
    return part_frob_db
