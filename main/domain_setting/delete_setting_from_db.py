from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()

def delete_setting_from_db(setting_id):
    setting_sql_obj = session.query(Domain_settings).filter_by(id = setting_id).one()
    session.delete(setting_sql_obj)
    session.commit()
