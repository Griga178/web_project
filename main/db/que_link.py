from main.db.db_start import Link
# from main.db.db_start import get_session
from sqlalchemy.orm.exc import NoResultFound

from sqlalchemy.orm import sessionmaker
from main.db.db_start import engine

DBSession = sessionmaker(bind = engine)
session = DBSession()

def select_link(link):
    # session = get_session()
    try:
        link_obj = session.query(Link).filter_by(link = link).one()
        return link_obj
    except NoResultFound:
        return False

def insert_link(link, id_domain):
    # session = get_session()
    link_obj = select_link(link)
    if not link_obj:
        link_obj = Link(
            link = link,
            id_domain = id_domain,
            )
        session.add(link_obj)
        session.commit()
    return link_obj

def select_links_by_domain_id(domain_id):
    db_answer = []

    links_frob_db = session.query(Link).filter_by(id_domain = domain_id).all()

    for links in links_frob_db:

        db_answer.append(links.to_dict)

    return db_answer

def select_link_by_id(link_id):
    try:
        link_obj = session.query(Link).filter_by(id = link_id).one()
        return link_obj
    except NoResultFound:
        return False
