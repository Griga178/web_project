from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()


def insert_new_association(kknpart_id, link_id):
    association_frob_db = Association_table(kkn_id = kknpart_id, link_id = link_id)
    session.add(association_frob_db)
    session.commit()
    return association_frob_db

def select_insert_association(kknpart_id, link_id):
    try:
        association_frob_db = session.query(Association_table).filter_by(kkn_id = kknpart_id, link_id = link_id).one()
    except NoResultFound:
        association_frob_db = insert_new_association(kknpart_id, link_id)
    return association_frob_db
