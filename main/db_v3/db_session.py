from sqlalchemy import MetaData, create_engine
from sqlalchemy.orm import sessionmaker
from ..settings import DATA_BASE_PATH_test as DATA_BASE_PATH
from .tables import Base


metadata = MetaData()
engine = create_engine(f'{DATA_BASE_PATH}?check_same_thread=False')
Base.metadata.create_all(engine)

DBSession = sessionmaker(bind = engine)
session = DBSession()


from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from .tables import (
    Work_table,
    Company,
    Website,
    Setting,
    Link,
    Link_content,
    Work_table_Source,
    Source_Link,
    Source,
    KKN,
    KKN_Family,
    KKN_Part,
    KTRU,
    OKPD_2
    )

# print(Base.metadata.__dict__)
# print(Base.metadata.tables['work_table'].__dict__)
# print(Work_table.__dict__)
# for tables, val in Base.metadata.tables.items():
    # print(val)

# a = Base.metadata.tables['work_table']
# print(a)
class Query_Base():
    ''' Тут собраны одинаковые запросу ко всем таблицам '''
    db_session = session
    # tables = Base.metadata.tables
    tables = {
        'work_table': Work_table,
        'company': Company,
        'website': Website,
        'setting': Setting,
        'link': Link,
        'link_content': Link_content,
        'source_link': Source_Link,
        'source': Source,
        'work_table_source': Work_table_Source,
        'kkn': KKN,
        'kkn_family': KKN_Family,
        'kkn_part': KKN_Part,
        'ktru': KTRU,
        'okpd_2': OKPD_2,
        }
    def __init__(self, str_table_name = False):
        self.table_name = Query_Base.tables[str_table_name] if str_table_name else None

    def get(self, **kwargs):

        query = Query_Base.db_session.query(self.table_name)
        # query = query.filter_by(id = kwargs['id']) if kwargs.get('id') else query
        # query = query.filter_by(name = kwargs['name']) if kwargs.get('name') else query
        # query = query.filter_by(inn = kwargs['inn']) if kwargs.get('inn') else query
        # query = query.filter_by(number = kwargs['number']) if kwargs.get('number') else query
        query = query.filter_by(**kwargs)

        # query = query.filter_by(self.table_name.date >= kw['from_date']) if kwargs.get('from_date') else query
        # query = query.filter_by(self.table_name.date <= kw['to_date'])if kwargs.get('to_date') else query

        try:
            return query.one()
        except MultipleResultsFound:
            return query.all()
        except NoResultFound:
            return None

    def create(self, **kwargs):
        example = self.table_name(**kwargs)
        Query_Base.db_session.add(example)
        Query_Base.db_session.commit()
        return example

    def update(self, example):
        Query_Base.db_session.add(example)
        Query_Base.db_session.commit()

    def delete(self, example):
        Query_Base.db_session.delete(example)
        Query_Base.db_session.commit()
