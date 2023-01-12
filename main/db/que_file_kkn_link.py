from main.db.db_start import File_kkn_link
from main.db.db_start import get_session
from sqlalchemy.orm.exc import NoResultFound

def select_kkn_link(link_id, kkn_id, file_id):
    session = get_session()
    try:
        file_kkn_link_obj = session.query(File_kkn_link).filter_by(
                id_file = file_id,
                id_link = link_id,
                id_kkn = kkn_id
            ).one()
        return file_kkn_link_obj
    except NoResultFound:
        return False

def insert_file_kkn_link(**kwargs):
    session = get_session()
    file_kkn_link_obj = select_kkn_link(kwargs['link_id'], kwargs['kkn_id'], kwargs['file_id'])
    if not file_kkn_link_obj:
        file_kkn_link_obj = File_kkn_link(
            id_file = kwargs['file_id'],
            id_link = kwargs['link_id'],
            id_kkn = kwargs['kkn_id'],
            id_source_type = kwargs['id_source_type'],
            source_date = kwargs['source_date'],
            source_number = kwargs['source_number'],
            )
        session.add(file_kkn_link_obj)
        session.commit()
    return file_kkn_link_obj
