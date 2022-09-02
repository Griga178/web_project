from main.domain_setting.check_links import define_links, define_main_page

from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

import json
DBSession = sessionmaker(bind = engine)
session = DBSession()

def get_domains_from_string(links):
    'создает словарь {домен : [ссылки]}'
    domain_dict = {}

    link_list = define_links(links)

    for link in link_list:
        domain = define_main_page(link)
        if domain:
            if domain in domain_dict:
                domain_dict[domain].append(link)
            else:
                domain_dict[domain] = [link]
    return domain_dict


def add_link_to_db(links):

    domain_dict = get_domains_from_string(links)


    db_answer = {}

    if len(domain_dict) > 0:

        for domain, links in domain_dict.items():

            try:
                'ПРОВЕРЯЕМ/СОЗДАЕМ ДОМЕН В БД- получаем {domain:{"domain_id":id}'
                domain_frob_db = session.query(Domains).filter_by(name = domain).one()
                if domain not in db_answer:
                    db_answer[domain] = {'domain_id': domain_frob_db.id}
            except NoResultFound:
                domain_frob_db = Domains(name = domain)
                session.add(domain_frob_db)
                session.commit()
                db_answer[domain] = {'domain_id': domain_frob_db.id}

            for link in links:

                try:
                    'ПРОВЕРЯЕМ/СОЗДАЕМ ССЫЛКУ В БД- получаем {domain:{"domain_id":id, str(link_id): link}'
                    link_frob_db = session.query(Links).filter_by(link = link).one()
                    id_link, link = str(link_frob_db.id), link_frob_db.link
                except NoResultFound:
                    link_frob_db = Links(link = link, id_domain = domain_frob_db.id)
                    session.add(link_frob_db)
                    session.commit()
                    id_link, link = str(link_frob_db.id), link_frob_db.link

                if id_link not in db_answer[domain]:
                    db_answer[domain][id_link] = link

    else:
        print('ССЫЛКИ НЕ НАЙДЕНЫ')

    '''Пример:
        {'www.xcom-shop.ru':
            {'domain_id': 1,
            '2': 'https://www.xcom-shop...'
            }
        }
    '''

    return json.dumps(db_answer)
