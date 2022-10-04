from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()

def select_settings_by_domains_id(domain_id_l):

    domain_settings = {}
    domain_settings_from_db = session.query(Domain_settings).filter(Domain_settings.id_domain.in_((domain_id_l))).all()

    for settings_object in domain_settings_from_db:
        if settings_object.id_domain not in domain_settings:
            domain_settings[settings_object.id_domain] = {settings_object.setting_name: settings_object.setting_content}
        else:
            domain_settings[settings_object.id_domain][settings_object.setting_name] = settings_object.setting_content
            
    return domain_settings
