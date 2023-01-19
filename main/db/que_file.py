from sqlalchemy.orm import sessionmaker
from main.db.db_start import File
from main.db.db_start import engine

DBSession = sessionmaker(bind = engine)
session = DBSession()

def insert_file(file_name, upload_date):

    file_obj = File(name = file_name, upload_date = upload_date)
    session.add(file_obj)
    session.commit()
    return file_obj

def select_all_files(file_id = False):
    if not file_id:
        list_files_obj = session.query(File).all()

    else:
        list_files_obj = session.query(File).filter_by(id = file_id).all()
    return list_files_obj

def select_file_all():
    list_files_obj = session.query(File).all()
    return list_files_obj
