from sqlalchemy.orm import sessionmaker
from main.db.db_start import engine
from main.db.db_start import Kkn
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()

def select_kkn_by_name(kkn_name):
    try:
        kkn_obj = session.query(Kkn).filter_by(kkn_name = kkn_name).one()
        return kkn_obj
    except NoResultFound:
        return False

def insert_kkn(**kwargs):
    kkn_obj = select_kkn_by_name(kwargs['kkn_name'])
    if not kkn_obj:
        kkn_obj = Kkn(kkn_name = kwargs['kkn_name'],
                    id_okpd_2 = kwargs['id_okpd_2'],
                    detalization = kwargs['detalization'],
                    id_kkn_part = kwargs['id_kkn_part'])

        session.add(kkn_obj)
        session.commit()
    return kkn_obj
