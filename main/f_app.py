from flask import render_template, request
from . import app

from main.domain_setting.add_link_to_db import add_link_to_db
from main.domain_setting.get_domains_from_db import get_domains_from_db
from main.domain_setting.get_domain_set_from_db import get_domain_set_from_db
from main.domain_setting.save_setting_to_db import save_setting_to_db

@app.route('/')
def main():
    return render_template('main.html')


 #<- <- <- <- <- <- <- <- НАСТРОЙКИ ДОМЕНОВ -> -> -> -> -> -> -> ->

@app.route('/domain_settings')
def open_parser_setting():
    return render_template('domain_settings.html')

@app.route('/write_domain_list')
def write_domain_list():
    'выгружаем список доменов [[id, domain],]'
    return get_domains_from_db()

@app.route('/write_domain_settings/<domain_id>')
def write_domain_settings(domain_id):
    domain_settings = get_domain_set_from_db(domain_id)
    print(domain_settings)
    return domain_settings

@app.route('/save_domain_settings', methods = ['GET', 'POST'])
def save_domain_settings():
    dict_to_db = request.get_json()
    server_answer = save_setting_to_db(dict_to_db)
    print(server_answer)
    return '{"a":"b"}'

def delete_domain_settings(content):
    'удаляет настройки'
    pass

@app.route('/add_new_link', methods = ['POST'])
def add_new_link():
    new_link = request.form['link_input_form']
    link_from_bd = add_link_to_db(new_link)
    # parse_result = parse_link(link_from_bd[id])
    print(f'ДОБАВИЛИ НОВУЮ ССЫЛКУ: {link_from_bd}')
    return link_from_bd

#<- <- <- <- <- <- <- <- ЗАГРУЗКА ФАЙЛОВ -> -> -> -> -> -> -> ->

#<- <- <- <- <- <- <- <- ПРОСМОТР ТАБЛИЦ БД -> -> -> -> -> -> -> ->

#<- <- <- <- <- <- <- <- ПАНЕЛЬ ПАРСИНГА -> -> -> -> -> -> -> ->

def trial_parse(link_id):
    'возвращает результат парсинга 1 ссылки'
    pass
