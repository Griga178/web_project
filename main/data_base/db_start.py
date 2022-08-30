from main.data_base.tables import *

from sqlalchemy import MetaData

metadata = MetaData()

my_base = 'sqlite:///data_base_ver_1.db'

engine = create_engine(f'{my_base}?check_same_thread=False')

Base.metadata.create_all(engine)
