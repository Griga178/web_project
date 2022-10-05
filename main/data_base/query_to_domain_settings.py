from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()


def select_settings_by_domains_id(domain_id_l):
    domain_settings_from_db = session.query(Domain_settings).filter(Domain_settings.id_domain.in_((domain_id_l))).all()
    return domain_settings_from_db
