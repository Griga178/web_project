from main.db.que_link import select_link_by_id
from main.db.que_domain_setting import select_domain_settings_by_domain_id

from main.parser.selenium_funcs import create_selenium_driver_ver2, find_element_ver2

from selenium.common.exceptions import SessionNotCreatedException

def parse_link(link_id):
    # НАЙТИ ССЫЛКУ В БД => link_object
    link_object = select_link_by_id(link_id)
    # НАЙТИ НАСТРОЙКИ В БД => [domain_setting_object, ...]
    domain_settings = select_domain_settings_by_domain_id(link_object.id_domain)
    # print(domain_settings)
    # запуск селениум драйвера
    parsing_result = False
    # try:
    sel_driver = create_selenium_driver_ver2()
    parsing_result = {}

    sel_driver.get(link_object.link) # открываем ссылку
    for setting in domain_settings:
        # print(setting)
        parsing_result[setting.setting_name] = find_element_ver2(sel_driver, setting.setting_content)


    # except SessionNotCreatedException as ex:
    #     print("Какая то ошибка обновляем драйвер селениума")
    #     # https://chromedriver.storage.googleapis.com/LATEST_RELEASE # => 109.0.5414.74
    #     print("https://stackoverflow.com/questions/62017043/automatic-download-of-appropriate-chromedriver-for-selenium-in-python")
    #     parsing_result = False
    sel_driver.quit()
    return parsing_result
