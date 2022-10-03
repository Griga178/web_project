from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

# import json

DBSession = sessionmaker(bind = engine)
session = DBSession()

def get_links_to_parser(dict_to_db):
    db_answer = {}
    links_id_list = dict_to_db['domain_checkbox']
    if links_id_list:
        links_frob_db = session.query(Links).filter(Links.id_domain.in_((links_id_list))).all()
    else:
        links_frob_db = session.query(Links).all()

    for link in links_frob_db:
        # print(link.domains.name)
        if link.domains.name in db_answer:
            db_answer[link.domains.name].append(link.id)
        else:
            db_answer[link.domains.name] = [link.id]
        # print(db_answer)

    # return json.dumps(db_answer)
    return db_answer
