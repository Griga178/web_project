from main.db.db_start import Company
# from main.db.db_start import get_session
from sqlalchemy.orm.exc import NoResultFound

from sqlalchemy.orm import sessionmaker
from main.db.db_start import engine

DBSession = sessionmaker(bind = engine)
session = DBSession()

def select_company_by_inn(comp_inn):
    # session = get_session()
    try:
        comp_obj = session.query(Company).filter_by(inn = comp_inn).one()
        return comp_obj
    except NoResultFound:
        return False

def insert_company(comp_inn, comp_name):
    # session = get_session()
    comp_obj = select_company_by_inn(comp_inn)
    if not comp_obj:
        comp_obj = Company(
            inn = comp_inn,
            name = comp_name,
            )
        session.add(comp_obj)
        session.commit()
    return comp_obj
