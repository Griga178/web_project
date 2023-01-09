from sqlalchemy.orm import sessionmaker
from main.db.db_start import Upload_history
from main.db.db_start import engine


def insert_upload(file_name, upload_date):
    DBSession = sessionmaker(bind = engine)
    session = DBSession()

    upload_file_obj = Upload_history(name = file_name, upload_date = upload_date)
    session.add(upload_file_obj)
    # session.commit()
    return upload_file_obj
