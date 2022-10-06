from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()

# ├── parsing_results {}
# │   ├── 'link_id': int(*)
# │   ├── 'avaliable': str(*)
# │   ├── 'price': float(*)
# │   ├── 'name': str(*)
# │   ├── 'current_date': str("%d/%m/%Y")

def insert_parsing_result(parsing_results):
    commit_obj = Parsing(
        id_link = parsing_results['link_id'],
        price = parsing_results['price'],
        parsing_date = parsing_results['current_date'],
        product_name = parsing_results['name'],
        screen_name = parsing_results['avaliable']
        )
    session.add(commit_obj)

    session.commit()
    return commit_obj.id
