from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

import json

DBSession = sessionmaker(bind = engine)
session = DBSession()

def save_setting_to_db(income_dict):
    if not income_dict['id_setting']:
        domain_setting = Domain_settings(
        id_domain = income_dict['id_domain'],
        setting_name = income_dict['name'],
        setting_content = income_dict['content']
        )
        session.add(domain_setting)

    else:
        domain_setting = session.query(Domain_settings).filter_by(id = income_dict['id_setting']).update({
        'setting_content': income_dict['content']
        })

    session.commit()
    # print(domain_setting)
    # return_dict = {str(domain_setting.id): [domain_setting.setting_name, domain_setting.setting_content]}

    return True
