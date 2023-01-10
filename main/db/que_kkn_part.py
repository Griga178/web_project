from sqlalchemy.orm import sessionmaker
from main.db.db_start import engine
from main.db.db_start import Kkn_part
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()

def select_kkn_part_by_name(kkn_part_name):
    try:
        kkn_part_obj = session.query(Kkn_part).filter_by(name = kkn_part_name).one()
        return kkn_part_obj
    except NoResultFound:
        return False

def insert_kkn_part(kkn_part_name):
    kkn_part_obj = select_kkn_part_by_name(kkn_part_name)
    if not kkn_part_obj:
        kkn_part_obj = Kkn_part(name = kkn_part_name)

        session.add(kkn_part_obj)
        session.commit()
    return kkn_part_obj
