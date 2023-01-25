from main.db.tables import *
from main.settings import DATA_BASE_PATH

from sqlalchemy import MetaData

metadata = MetaData()

engine = create_engine(f'{DATA_BASE_PATH}?check_same_thread=False')

Base.metadata.create_all(engine)

def get_session():
    from sqlalchemy.orm import sessionmaker

    DBSession = sessionmaker(bind = engine)
    session = DBSession()
    return session
