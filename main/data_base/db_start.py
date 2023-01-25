from main.data_base.tables import *
from main.settings import DATA_BASE_PATH_old

from sqlalchemy import MetaData

metadata = MetaData()

engine = create_engine(f'{DATA_BASE_PATH_old}?check_same_thread=False')

Base.metadata.create_all(engine)
