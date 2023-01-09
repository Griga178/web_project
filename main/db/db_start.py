from main.db.tables import *
# from main.settings import DATA_BASE_PATH
DATA_BASE_PATH = 'sqlite:///data_base_ver_3.db'
from sqlalchemy import MetaData

metadata = MetaData()

engine = create_engine(f'{DATA_BASE_PATH}?check_same_thread=False')

Base.metadata.create_all(engine)
