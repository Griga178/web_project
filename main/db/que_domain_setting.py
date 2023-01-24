from main.db.db_start import Domain_settings
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound
from main.db.db_start import engine
# import json

DBSession = sessionmaker(bind = engine)
session = DBSession()

def select_domain_setting(domain_id):
    domain_settings = {}
    domain_frob_db = session.query(Domain_settings).filter_by(id_domain = domain_id).all()
    for set_obj in domain_frob_db:
         domain_settings[str(set_obj.id)] = [set_obj.setting_name, set_obj.setting_content]

    return domain_settings

def insert_update_setting_to_db(income_dict):
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
    return domain_setting

def delete_setting(setting_id):
    setting_sql_obj = session.query(Domain_settings).filter_by(id = setting_id).one()
    session.delete(setting_sql_obj)
    session.commit()
