from flask import render_template, request, make_response, jsonify
from . import app
import json

# для настройки доменов
from main.db.que_domain import select_domain_all
from main.db.que_file import select_file_all
from main.db.que_kkn_part import select_kkn_part_all
from main.db.que_domain_setting import select_domain_setting
from main.db.que_domain_setting import insert_update_setting_to_db
from main.db.que_domain_setting import delete_setting
from main.db.que_link import select_links_by_domain_id
# старое
from main.domain_setting.add_link_to_db import add_link_to_db
from main.domain_setting.get_domains_from_db import get_domains_from_db
from main.domain_setting.get_domain_set_from_db import get_domain_set_from_db
from main.domain_setting.save_setting_to_db import save_setting_to_db
from main.domain_setting.delete_setting_from_db import delete_setting_from_db
from main.domain_setting.get_domain_links_from_db import get_domain_links_from_db
# для базы данных
from main.data_base.get_all_links_sort_by_domain import get_all_links_sort_by_domains

# для парсинга
from main.domain_setting.get_domain_links_from_db import get_domain_links_from_db_by_name
from main.parser.screen_shot_maker import start_make_screens_by_list
from main.data_base.get_links_to_parser import get_links_to_parser
from main.parser.run_parser import run_parser
from main.parser.launch_parse import launch_parse

# просмотр результатова парсинга
from main.parsing_result_view.get_data_for_filter import create_json_object_for_filter
from main.parsing_result_view.get_data_for_result import get_results_list
from main.parsing_result_view.get_result import get_result_with_jpg
from main.parsing_result_view.send_image import image_sender

# Загрузка файла на сервер
from main.file_manager import insert_reestr
from main.file_manager import get_files_info


# Главная страница
@app.route('/')
def main():
    return render_template('main.html', main_style = "current")


 #<- <- <- <- <- <- <- <- НАСТРОЙКИ ДОМЕНОВ -> -> -> -> -> -> -> ->
@app.route('/domain_settings')
def open_parser_setting():
    dom_obj_list = select_domain_all()
    file_obj_list = select_file_all()
    kkn_part_obj_list = select_kkn_part_all()

    domain_dict = [dom_obj.to_dict for dom_obj in dom_obj_list]
    file_dict_list = [file_obj.to_dict for file_obj in file_obj_list]
    part_dict_list = [part_obj.to_dict for part_obj in kkn_part_obj_list]

    json_domain_list = json.dumps(domain_dict)
    json_file_ist = json.dumps(file_dict_list)
    json_part_list = json.dumps(part_dict_list)
    return render_template('domain_settings.html',
        domain_style = "current",
        jsonDomainList = json_domain_list,
        jsonFileList = json_file_ist,
        jsonPartList = json_part_list)

# @app.route('/write_domain_list')
# def write_domain_list():
#     '''выгружаем список доменов
#     [[id, domain],...]'''
#     import json
#     response = get_domains_from_db()
#
#     return json.dumps(response)

@app.route('/write_domain_settings/<domain_id>')
def write_domain_settings(domain_id):
    '''Выгружаем настройки домена
    {id:[set_name,content],...}
    '''
    # domain_settings = get_domain_set_from_db(domain_id)
    domain_settings = select_domain_setting(domain_id)
    return json.dumps(domain_settings)

@app.route('/save_domain_settings', methods = ['POST'])
def save_domain_settings():
    dict_to_db = request.get_json()
    # server_answer = save_setting_to_db(dict_to_db)
    server_answer = insert_update_setting_to_db(dict_to_db)

    if server_answer:
        return '{"save":true}'

@app.route('/delete_domain_setting', methods = ['POST'])
def delete_domain_settings():
    setting_id = request.get_json()
    # answer = delete_setting_from_db(setting_id)
    answer = delete_setting(setting_id)
    return {'answer':1}

#<- <- <- <- <- <- <- <- ЗАГРУЗКА ДАННЫХ -> -> -> -> -> -> -> ->
@app.route('/add_new_link', methods = ['POST']) # remove
def add_new_link():
    new_link = request.form['link_input_form']
    link_from_db = add_link_to_db(new_link)
    return link_from_db

#<- <- <- <- <- <- <- <- ЗАГРУЗКА ФАЙЛОВ -> -> -> -> -> -> -> ->
@app.route('/uploader')
def open_uploader():
    files_info = get_files_info()
    return render_template('uploader.html', uploader_style = "current", files_info = files_info)

@app.route('/upload_file', methods = ['GET', 'POST'])
def upload_file():
    file = request.files.get('file')
    file_obj = insert_reestr(file)
    return file_obj

#<- <- <- <- <- <- <- <- ПРОСМОТР ТАБЛИЦ БД -> -> -> -> -> -> -> ->
# from main.data_base.db_start import Links, engine
# from sqlalchemy.orm import sessionmaker
# DBSession = sessionmaker(bind = engine)
# session = DBSession()
# @app.route('/links_base')
# def open_links_base():
#     links = session.query(Links).all()
#     # links = Links.query
#     return render_template('links_base_ver_2.html', db_style = "current", title = 'Bootstrap Table', links = links)

@app.route('/get_domain_links/<domain_id>')
def write_domain_links(domain_id):
    ''' вывод всех ссылок домена '''
    # domain_links = get_domain_links_from_db(domain_id)
    domain_links = select_links_by_domain_id(domain_id)
    return json.dumps(domain_links)

@app.route('/get_all_links_by_domains')
def show_all_links_domain_links():
    '''вывод всех ссылок всех доменов
    {domain:[[id,link],],}'''
    # domains_and_links = get_all_links_sort_by_domains()
    domains_and_links = get_all_links_sort_by_domains()
    return domains_and_links

#<- <- <- <- <- <- <- <- ПАНЕЛЬ ПАРСИНГА -> -> -> -> -> -> -> ->
@app.route('/launch_parser')
def get_parser_page():
    return render_template('parser.html', parser_style = "current")

@app.route('/parse_link/<link_id>')
def trial_parse(link_id):
    'возвращает результат парсинга 1 ссылки'
    print(f'start parsing link id: {link_id}')
    return 'пустой ответ'

@app.route('/get_links_by_domain_to_screen/<domain_name>')
def get_links_by_domain_to_screen(domain_name):
    domain_links = get_domain_links_from_db_by_name(domain_name)
    start_make_screens_by_list(domain_links)
    return "True"

@app.route('/get_domain_for_setting')
def get_domain_for_setting():
    '''СПИСОК ДОМЕНОВ ДЛЯ ФИЛЬТРА ПАРСЕРА'''
    import json
    filter_setting = {}
    response = get_domains_from_db()
    filter_setting['domain_checkbox'] = response
    return json.dumps(filter_setting)

@app.route('/get_links_id_by_domain', methods = ['GET', 'POST'])
def get_links_id_by_domain():
    '''СПИСОК ВЫБРАННЫХ ДОМЕНОВ - ссылок + КОЛ-ВО ССЫЛОК'''
    dict_to_db = request.get_json()
    request_from_server_v_2 = get_links_to_parser(dict_to_db)
    # request_from_server_v_2 = {'xcom.ru': ['1', '2', '3'], 'citi.ru': ['4', '5', '6']}
    import json
    return json.dumps(request_from_server_v_2)

@app.route('/start_parse', methods = ['GET', 'POST'])
def start_parse():
    '''отправляет на парсинг ссылки'''
    list_to_db = request.get_json()
    # run_parser(list_to_db)
    launch_parse(list_to_db)
    return "True"

#<- <- <- <- <- <- <- <- РЕЗУЛЬТАТЫ ПАРСИНГА -> -> -> -> -> -> -> ->
@app.route('/result')
def parsing_result_view():
    json_dict = create_json_object_for_filter()
    return render_template('result.html', result_style = "current", json_dict = json_dict)

@app.route('/get_image/<result_id>')
def send_image(result_id):
    try:
        base64_img = image_sender(result_id)
    except:
        base64_img = image_sender(0)
    return jsonify({'status': True, 'image': base64_img})
#
@app.route('/filtered_results', methods = ['GET', 'POST'])
def get_filtered_result_list():
    filtered_query = request.get_json()
    results_list = get_results_list(filtered_query)
    return results_list

@app.route('/get_result_by_id/<res_id>')
def get_result_by_id(res_id):
    return get_result_with_jpg(res_id)
