from flask import render_template, request
from . import app

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



#<- <- <- <- <- <- <- <- ЗАГРУЗКА ФАЙЛОВ -> -> -> -> -> -> -> ->

#<- <- <- <- <- <- <- <- ПРОСМОТР ТАБЛИЦ БД -> -> -> -> -> -> -> ->

#<- <- <- <- <- <- <- <- ПАНЕЛЬ ПАРСИНГА -> -> -> -> -> -> -> ->

def trial_parse(link_id):
    'возвращает результат парсинга 1 ссылки'
    pass
