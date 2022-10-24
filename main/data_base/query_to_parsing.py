from main.data_base.db_start import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

DBSession = sessionmaker(bind = engine)
session = DBSession()

# ├── parsing_results {}
# │   ├── 'link_id': int(*) \ False
# │   ├── 'avaliable': str(*) \ False
# │   ├── 'price': float(*) \ False
# │   ├── 'name': str(*) \ False
# │   ├── 'current_date': str("%d/%m/%Y")

# ├── parsing_results {}
# │   ├── 'link_id': int(*) \ False
# │   ├── 'name': str(*) \ False
# │   ├── 'price': float(*) \ False
# │   ├── 'current_date': str("%d/%m/%Y")
# │   ├── 'avaliable': str(*) \ False
# │   ├── 'changed': str(*) \ False

def insert_parsing_result(parsing_results):
    commit_obj = Parsing(
        id_link = parsing_results['link_id'],
        price = parsing_results['price'],
        parsing_date = parsing_results['current_date'],
        product_name = parsing_results['name'],
        product_avaliable = parsing_results['avaliable']
        )
    session.add(commit_obj)
    session.commit()
    return commit_obj.id

def select_all_results():
    s_query = session.query(Parsing).all()
    return s_query

def select_filtered_results(filtered_query):

    if "domain_list" not in filtered_query:
        results_frob_db = session.query(Parsing).filter(and_(Parsing.parsing_date >= filtered_query["start_date"], Parsing.parsing_date <= filtered_query["end_date"])).all()
    else:
        # print('domain filter', filtered_query["domain_list"])
        # print('dates', filtered_query["start_date"], filtered_query["end_date"])
        results_frob_db = session.query(Parsing).filter(and_(Parsing.parsing_date >= filtered_query["start_date"], Parsing.parsing_date <= filtered_query["end_date"])).join(Parsing.links).filter(Links.id_domain.in_(filtered_query["domain_list"])).all()
    return results_frob_db

def select_result_by_id(result_id):
    s_query = session.query(Parsing).filter_by(id = result_id).one()
    return s_query
