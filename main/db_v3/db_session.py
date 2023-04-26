from sqlalchemy import MetaData, create_engine
from sqlalchemy.orm import sessionmaker

# from .tables import Base
# from .settings import DATA_BASE_PATH

from tables import Base, Work_table
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
SQL_FILE_NAME = 'db_web_test.db'
DATA_BASE_PATH = f'sqlite:///C:/Users/G.Tishchenko/Desktop/myfiles/{SQL_FILE_NAME}'

metadata = MetaData()
engine = create_engine(f'{DATA_BASE_PATH}?check_same_thread=False')
Base.metadata.create_all(engine)

DBSession = sessionmaker(bind = engine)
session = DBSession()

class Query_Base():
    db_session = session
    def get(self, **kwargs):
        # query = session.query(self.table_name)
        query = Query_Base.db_session.query(self.table_name)
        query = query.filter_by(id = kwargs['id']) if kwargs.get('id') else query
        query = query.filter_by(name = kwargs['name']) if kwargs.get('name') else query
        query = query.filter_by(inn = kwargs['inn']) if kwargs.get('inn') else query
        query = query.filter_by(number = kwargs['number']) if kwargs.get('number') else query

        query = query.filter_by(self.table_name.date >= kw['from_date']) if kwargs.get('from_date') else query
        query = query.filter_by(self.table_name.date <= kw['to_date'])if kwargs.get('to_date') else query

        try:
            return query.one()
        except MultipleResultsFound:
            return query.all()
        except NoResultFound:
            return False

    def update(self, example):
        Query_Base.db_session.add(example)
        Query_Base.db_session.commit()

    def delete(self, example):
        Query_Base.db_session.delete(example)
        Query_Base.db_session.commit()

class Query_work_table(Query_Base):
    def __init__(self):
        self.table_name = Work_table

    def create(self, **kw):
        object = self.table_name(
            name = kw['work_table_name']
        )
        Query_Base.db_session.add(object)
        Query_Base.db_session.commit()
        return object

qu = {
    "work_table_name": "Test-file.xlsx"
}
qu_q = Query_work_table()
qu_q.create(**qu)
w_t = qu_q.get(**qu)

print(w_t)
for el in w_t:
    print(el.id, el.name, el.date)
    # qu_q.delete(el)
