from main.parser.prepare_data import prepare_links_and_settigs
from main.parser.selenium_funcs import create_selenium_driver, find_element
from main.parser.clean_elements import clean_elements
# from main.parser.selenium_funcs import make_screen_shoot

SCREEN_FOLDER = 'C:/Users/G.Tishchenko/Desktop/web_screens/'

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
        # СОЗДАНИЕ СКРИНШОТА
        # if 'avaliable' in web_elements:
        #     if not web_elements['avaliable']:
        #         screen_name = SCREEN_FOLDER + str(link_id) + '.jpg'
        #         make_screen_shoot(screen_name)
        # ОЧИСТКА ОТ НЕНУЖНЫХ СИМВОЛОВ
        clear_elements = clean_elements(web_elements)
        print(current_link[:20], clear_elements)
        # ЗАПИСЫВАЕМ В БД
    selenium_driver.quit()
