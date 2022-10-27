from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()

# ├── select_links_by_name  ДЛЯ ВСТАВКИ НОВОЙ ССЫЛКИ
# ├── select_links_by_id    ДЛЯ ПАРСЕРА
# ├── insert_links          ВСТАВКА НОВЫХ ССЫЛОК


def select_links_by_name(name):
    try:
        link_frob_db = session.query(Links).filter_by(link = name).one()
        return link_frob_db.id
    except NoResultFound:
        return False

def select_links_by_id(list_id):
    links_frob_db = session.query(Links).filter(Links.id.in_((list_id))).all()
    return links_frob_db

def insert_links(links_list):
    for list_elem in links_list:
        link, domain_id = list_elem[0], list_elem[1]
        Links(link = link, id_domain = domain_id)
        session.add(link_frob_db)
    session.commit()

def insert_link(link_value, domain_id):
    link_frob_db = Links(link = link_value, id_domain = domain_id)
    session.add(link_frob_db)
    session.commit()
    return link_frob_db

def select_or_insert_link(link_value, domain_id):
    try:
        link_frob_db = session.query(Links).filter_by(link = link_value).one()
    except NoResultFound:
        link_frob_db = insert_link(link_value, domain_id)
    return link_frob_db
