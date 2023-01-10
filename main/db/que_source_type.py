from main.db.db_start import Source_type
from sqlalchemy.orm.exc import NoResultFound

def get_session():
    from sqlalchemy.orm import sessionmaker
    from main.db.db_start import engine

    DBSession = sessionmaker(bind = engine)
    session = DBSession()
    return session

def check_source_table():
    session = get_session()
    for s_type in {"Экранная копия", "Ответ на запрос", "Контракт", "Прочее"}:

        try:
            s_type_obj = session.query(Source_type).filter_by(name = s_type).one()
        except NoResultFound:
            s_type_obj = Source_type(name = s_type)
            session.add(s_type_obj)
            session.commit()

def select_source_type(name):
    session = get_session()
    s_type_obj = session.query(Source_type).filter_by(name = name).one()
    return s_type_obj
