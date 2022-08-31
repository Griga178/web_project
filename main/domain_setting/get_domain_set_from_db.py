from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

import json

DBSession = sessionmaker(bind = engine)
session = DBSession()

def get_domain_set_from_db(domain_id):
    domain_settings = {}
    domain_frob_db = session.query(Domain_settings).filter_by(id_domain = domain_id).all()
    for set_obj in domain_frob_db:
         domain_settings[str(set_obj.id)] = [set_obj.setting_name, set_obj.setting_content]

    return json.dumps(domain_settings)
