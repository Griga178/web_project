from flask import render_template, request
from . import app

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

# Главная страница
@app.route('/')
def main():
    return render_template('main.html')

 #<- <- <- <- <- <- <- <- НАСТРОЙКИ ДОМЕНОВ -> -> -> -> -> -> -> ->
@app.route('/domain_settings')
def open_parser_setting():
    return render_template('domain_settings.html')

@app.route('/write_domain_list')
def write_domain_list():
    '''выгружаем список доменов
    [[id, domain],...]'''
    return get_domains_from_db()

@app.route('/write_domain_settings/<domain_id>')
def write_domain_settings(domain_id):
    '''Выгружаем настройки домена
    {id:[set_name,content],...}
    '''
    domain_settings = get_domain_set_from_db(domain_id)
    return domain_settings

@app.route('/save_domain_settings', methods = ['POST'])
def save_domain_settings():
    dict_to_db = request.get_json()
    server_answer = save_setting_to_db(dict_to_db)
    if server_answer:
        return '{"save":true}'

@app.route('/delete_domain_setting', methods = ['POST'])
def delete_domain_settings():
    setting_id = request.get_json()
    answer = delete_setting_from_db(setting_id)
    return {'answer':1}

#<- <- <- <- <- <- <- <- ЗАГРУЗКА ФАЙЛОВ, ДАННЫХ -> -> -> -> -> -> -> ->
@app.route('/add_new_link', methods = ['POST'])
def add_new_link():
    new_link = request.form['link_input_form']
    link_from_db = add_link_to_db(new_link)
    return link_from_db

#<- <- <- <- <- <- <- <- ПРОСМОТР ТАБЛИЦ БД -> -> -> -> -> -> -> ->
@app.route('/links_base')
def open_links_base():
    return render_template('links_base.html')

@app.route('/get_domain_links/<domain_id>')
def write_domain_links(domain_id):
    '''вывод всех ссылок домена
    [[id,link],]'''
    domain_links = get_domain_links_from_db(domain_id)
    return domain_links

@app.route('/get_all_links_by_domains')
def show_all_links_domain_links():
    '''вывод всех ссылок всех доменов
    {domain:[[id,link],],}'''

    domains_and_links = get_all_links_sort_by_domains()
    return domains_and_links

@app.route('/get_links_by_tag')
def show_links_by_tag(tag_id):
    pass

def delete_links_from_db(link_id):
    pass

#<- <- <- <- <- <- <- <- ПАНЕЛЬ ПАРСИНГА -> -> -> -> -> -> -> ->

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

@app.route('/launch_parser')
def get_parser_page():
    return render_template('parser_page.html')
