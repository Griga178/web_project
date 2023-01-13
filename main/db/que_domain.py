from main.db.db_start import Domain
# from main.db.db_start import get_session
from sqlalchemy.orm.exc import NoResultFound

from sqlalchemy.orm import sessionmaker
from main.db.db_start import engine

DBSession = sessionmaker(bind = engine)
session = DBSession()

def select_domain_by_name(dom_name):
    # session = get_session()
    try:
        dom_obj = session.query(Domain).filter_by(name = dom_name).one()
        return dom_obj
    except NoResultFound:
        return False

def insert_domain(dom_name, company_id):
    # session = get_session()
    dom_obj = select_domain_by_name(dom_name)
    if not dom_obj:
        dom_obj = Domain(
            id_company = company_id,
            name = dom_name,
            )
        session.add(dom_obj)
        session.commit()
    return dom_obj

def select_domain_all():
    dom_obj_list = session.query(Domain).all()
    return dom_obj_list
