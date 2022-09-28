from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

import json

DBSession = sessionmaker(bind = engine)
session = DBSession()

def get_domain_links_from_db(domain_id):
    db_answer = []

    links_frob_db = session.query(Links).filter_by(id_domain = domain_id).all()

    for links in links_frob_db:
        id_link, link = str(links.id), links.link

        db_answer.append([id_link, link])

    return json.dumps(db_answer)

def get_domain_links_from_db_by_name(domain_name):

    db_answer = []

    domain = session.query(Domains).filter_by(name = domain_name).one()

    for links in domain.net_link:
        id_link, link = str(links.id), links.link

        db_answer.append([id_link, link])

    return db_answer
