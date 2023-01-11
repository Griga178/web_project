from main.db.db_start import File_link
from main.db.db_start import get_session
from sqlalchemy.orm.exc import NoResultFound

def select_file_link(link_id, file_id):
    session = get_session()
    try:
        file_link_obj = session.query(File_link).filter_by(
                id_link = link_id,
                id_file = file_id
            ).one()
        return file_link_obj
    except NoResultFound:
        return False

def insert_file_link(link_id, file_id):
    session = get_session()
    file_link_obj = select_file_link(link_id, file_id)
    if not file_link_obj:
        file_link_obj = File_link(id_link = link_id, id_file = file_id)
        session.add(file_link_obj)
        session.commit()
    return file_link_obj
