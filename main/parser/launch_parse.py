from main.parser.get_data_for_parser import get_data_for_parser
from main.parser.selenium_funcs import create_selenium_driver_ver2, find_element_ver2
from main.data_base.query_to_parsing import insert_parsing_result
from main.parser.screen_shot_maker import make_screen_shot
from main.settings import PARSING_SCREEN_FOLDER

def launch_parse(list_links_id):
    dict_for_parser = get_data_for_parser(list_links_id[:5])

    # запуск селениум драйвера
    sel_driver = create_selenium_driver_ver2()

    for data_for_parse in dict_for_parser.values(): # перебор данных по доменам

        for link_obj in data_for_parse["links"]: # перебор ссылок
            id_link = link_obj[0]
            link = link_obj[1]
            sel_driver.get(link) # открываем ссылку
            parsing_result = {}
            for target_obj in data_for_parse["targets"].values():
                target_name = target_obj["target_name"]
                target_setting = target_obj["target_setting"]
                parsing_result[target_name] = find_element_ver2(sel_driver, target_setting)

            # parsing_result = clean_parsing_result(parsing_result)
            # clean_elements(web_elements) туда же
            print(parsing_result)
            # parsing_id = insert_parsing_result_ver2(parsing_result, id_link)

            # if 'avaliable' in parsing_result:
            #     if not parsing_result['avaliable']:
            #         screen_name = PARSING_SCREEN_FOLDER + str(parsing_id) + '.jpg'
            #         make_screen_shot(screen_name)

    sel_driver.quit()
