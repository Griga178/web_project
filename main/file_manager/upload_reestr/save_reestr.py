from main.file_manager.upload_reestr.read_reestr import read_reestr
from main.file_manager.upload_reestr.save_okpd import save_okpd_2
from main.file_manager.upload_reestr.save_source_type import get_source_info

from main.db.que_kkn import insert_kkn
from main.db.que_kkn_part import insert_kkn_part
from main.db.que_company import insert_company
from main.db.que_domain import insert_domain
from main.db.que_link import insert_link
from main.db.que_kkn_link import insert_kkn_link
from main.db.que_file import insert_file
from main.db.que_file_link import insert_file_link

from main.common_funcs import define_links
from main.common_funcs import define_domain

from datetime import datetime

def insert_reestr(file_name):

    reestr_dict = read_reestr(file_name)
    file_obj = insert_file(file_name.filename, datetime.now()) # запись названия файла

    for kkn_name, kkn_dict in reestr_dict.items():
        okpd_2_obj = save_okpd_2(kkn_dict['okpd_2']) # запись ОКПД2
        kkn_part_obj = insert_kkn_part(kkn_dict['part']) # запись Части
        kkn_obj = insert_kkn(kkn_name = kkn_name,
                            detalization = kkn_dict['detalization'],
                            id_okpd_2 = okpd_2_obj.id,
                            id_kkn_part = kkn_part_obj.id) # запись ККН

        for source_dict in kkn_dict['sources']:
            source_info = get_source_info(source_dict['source_name_number'])
            link_list = define_links(source_dict['link'])
            domain = define_domain(link_list)
             # запись компании и домена
            company_obj = insert_company(source_dict['source_inn'], source_dict['source_name'])
            domain_obj = insert_domain(domain, company_obj.id)

            for link in link_list:
                # запись Ссылки
                link_obj = insert_link(link, domain_obj.id)
                # запись связи ссылка - ккн
                kkn_link_obj = insert_kkn_link(
                    link_id = link_obj.id,
                    kkn_id = kkn_obj.id,
                    id_source_type = source_info['source_type_id'],
                    source_date = datetime.strptime(source_info['source_date'], '%d.%m.%Y') if source_info['source_date'] else datetime(2000, 1, 1),
                    source_number = source_info['source_number']
                    )
                # запись связи ссылка - файл
                file_link_obj = insert_file_link(link_obj.id, file_obj.id)

    return file_obj
