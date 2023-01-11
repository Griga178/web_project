from main.db.db_start import Kkn_link
from main.db.db_start import get_session
from sqlalchemy.orm.exc import NoResultFound

def select_kkn_link(link_id, kkn_id):
    session = get_session()
    try:
        kkn_link_obj = session.query(Kkn_link).filter_by(
                id_link = link_id,
                id_kkn = kkn_id
            ).one()
        return kkn_link_obj
    except NoResultFound:
        return False

def insert_kkn_link(**kwargs):
    session = get_session()
    kkn_link_obj = select_kkn_link(kwargs['link_id'], kwargs['kkn_id'])
    if not kkn_link_obj:
        kkn_link_obj = Kkn_link(
            id_link = kwargs['link_id'],
            id_kkn = kwargs['kkn_id'],
            id_source_type = kwargs['id_source_type'],
            source_date = kwargs['source_date'],
            source_number = kwargs['source_number'],
            )
        session.add(kkn_link_obj)
        session.commit()
    return kkn_link_obj
