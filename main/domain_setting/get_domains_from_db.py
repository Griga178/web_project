from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

import json

DBSession = sessionmaker(bind = engine)
session = DBSession()

def get_domains_from_db():
    domain_list = []
    domain_frob_db = session.query(Domains).all()

    for sql_obj in domain_frob_db:
        domain_id = sql_obj.id
        domain = sql_obj.name
        domain_list.append([domain_id, domain])
        
    return json.dumps(domain_list)
