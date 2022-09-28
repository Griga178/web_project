from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

import json

DBSession = sessionmaker(bind = engine)
session = DBSession()

def get_all_links_sort_by_domains():
    db_answer = {}

    domains_frob_db = session.query(Domains).all()

    for domain in domains_frob_db:
        db_answer[domain.name] = [[link.id, link.link] for link in domain.net_link]

    return json.dumps(db_answer)
