from main.parser.prepare_data import prepare_links_and_settigs
from main.parser.selenium_funcs import create_selenium_driver, find_element
from main.parser.clean_elements import clean_elements
from main.parser.screen_shot_maker import make_screen_shot
from main.parser.save_parse_result import insert_to_db

SCREEN_FOLDER = 'C:/Users/G.Tishchenko/Desktop/web_screens/'

# ├── list_links_id []
# │   ├── str('1')

# ├── links_list []
# │   ├── []
# │   │   ├── link - str
# │   │   ├── domain_id - int
# │   │   ├── link_id  - int

# ├── domain_settings {}
# │   ├── 'avaliable': str(tag;tag_attributre;attributre_value)
# │   ├── 'price': str(tag;tag_attributre;attributre_value)
# │   ├── 'name': str(tag;tag_attributre;attributre_value)

# ├── web_elements {}
# │   ├── 'avaliable': str(*) | False
# │   ├── 'price': str(*) | False
# │   ├── 'name': str(*) | False

# ├── clear_elements {}
# │   ├── 'link_id': int(*)
# │   ├── 'avaliable': str(*) | False
# │   ├── 'price': float(*) | False
# │   ├── 'name': str(*) | False
# │   ├── 'current_date': str("%d/%m/%Y")

def run_parser(list_links_id):

    links_list, domain_settings = prepare_links_and_settigs(list_links_id)
    # запуск selenium driver
    selenium_driver = create_selenium_driver()

    for link_elem in links_list:
        current_link = link_elem[0]
        current_domain_id = link_elem[1]
        link_id = link_elem[2]
        # print(f'Открываем в браузере:\n{link_elem}')
        # print('Текущие настройки: ', domain_settings[current_domain_id])
        # ОТКРЫТИЕ ССЫЛКИ
        selenium_driver.get(current_link)
        # ищем элементы
        web_elements = find_element(selenium_driver, domain_settings[current_domain_id])
        # ОЧИСТКА ОТ НЕНУЖНЫХ СИМВОЛОВ
        clear_elements = clean_elements(web_elements)
        clear_elements['link_id'] = link_id
        print(current_link[:20], clear_elements)
        # ЗАПИСЫВАЕМ В БД
        parsing_id = insert_to_db(clear_elements)
        # СОЗДАНИЕ СКРИНШОТА
        if 'avaliable' in web_elements:
            if not web_elements['avaliable']:
                # screen_name = SCREEN_FOLDER + str(link_id) + '.jpg'
                screen_name = SCREEN_FOLDER + str(parsing_id) + '.jpg'
                make_screen_shot(screen_name)


    selenium_driver.quit()
