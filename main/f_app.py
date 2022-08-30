from flask import render_template, request
from . import app

from main.domain_setting.add_link_to_db import add_link_to_db

@app.route('/')
def main():
    return render_template('main.html')


 #<- <- <- <- <- <- <- <- НАСТРОЙКИ ДОМЕНОВ -> -> -> -> -> -> -> ->

@app.route('/domain_settings')
def open_parser_setting():
    return render_template('domain_settings.html')

def write_domain_list():
    pass

def write_domain_settings(domain_id):
    pass

def save_domain_settings(content):
    pass

def delete_domain_settings(content):
    'удаляет настройки'
    pass

@app.route('/add_new_link', methods = ['POST'])
def add_new_link():
    new_link = request.form['link_input_form']
    link_from_bd = add_link_to_db(new_link)
    # parse_result = parse_link(link_from_bd[id])
    print(f'ДОБАВЛЯЕМ НОВУЮ ССЫЛКУ: {link_from_bd}')
    return link_from_bd

#<- <- <- <- <- <- <- <- ЗАГРУЗКА ФАЙЛОВ -> -> -> -> -> -> -> ->

#<- <- <- <- <- <- <- <- ПРОСМОТР ТАБЛИЦ БД -> -> -> -> -> -> -> ->

#<- <- <- <- <- <- <- <- ПАНЕЛЬ ПАРСИНГА -> -> -> -> -> -> -> ->

def trial_parse(link_id):
    'возвращает результат парсинга 1 ссылки'
    pass