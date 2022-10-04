from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()

def select_links_by_name(name):
    try:
        link_frob_db = session.query(Links).filter_by(link = name).one()
        return link_frob_db.id
    except NoResultFound:
        return link_frob_db.id

def select_links_by_id(list_id):
    links_frob_db = session.query(Links).filter(Links.id.in_((list_id))).all()
    return links_frob_db

# def select_links_by_domain_id(list_id):
