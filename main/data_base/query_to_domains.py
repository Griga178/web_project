from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()

# ЗАПРОСЫ К ТАБЛИЦЕ DOMAINS
# 1 ВЫВОД ВСЕХ ДОМЕНОВ          return [[id, domain],[...]]
# 2 ДОБАВЛЕНИЕ НОВОГО ДОМЕНА    return id
# 3 УДАЛЕНИЕ ДОМЕНА

def select_all_domains():
    domain_list = []
    domain_frob_db = session.query(Domains).all()
    for domain in domain_frob_db:
        domain_id = domain.id
        domain = domain.name
        domain_list.append([domain_id, domain])
    return domain_list

def insert_new_domain(name_domain):

    # return domain_id
    pass

def delete_domain(domain_id):
    ''' проверка на наличие связей с сылками '''
    pass
