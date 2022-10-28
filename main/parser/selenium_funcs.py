from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

def create_selenium_driver():
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging']) # не выводит сообщзения в консоль
    # options.add_argument('--headless')
    options.add_argument("--start-maximized");
    caps = DesiredCapabilities().CHROME
    caps["pageLoadStrategy"] = "eager"
    binary_yandex_driver_file = 'yandexdriver.exe'
    driver = webdriver.Chrome(binary_yandex_driver_file, desired_capabilities = caps, options = options)
    driver.implicitly_wait(1)
    # driver.delete_all_cookies()
    return driver

def find_element(driver, settings):
    wait = WebDriverWait(driver, 2)
    answer_dict = {}
    for set_type in settings:
        split_setting = settings[set_type].split(';')
        tag = split_setting[0]
        atribute = split_setting[1]
        atr_val = split_setting[2]
        try:
            some_xpath = f"//{tag}[@{atribute}='{atr_val}']"
            wait.until(EC.presence_of_element_located((By.XPATH, some_xpath))) # ждем пока появится элемент
            found_info = driver.find_element_by_xpath(f"//{tag}[@{atribute}='{atr_val}']")
            answer_dict[set_type] = found_info.text
        except:
            answer_dict[set_type] = False
            # print(f'не удалось найти элемент {set_type}')
    return answer_dict

def create_selenium_driver_ver2():
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging']) # не выводит сообщения в консоль
    options.add_argument("--start-maximized");
    caps = DesiredCapabilities().CHROME
    caps["pageLoadStrategy"] = "eager"
    binary_yandex_driver_file = 'yandexdriver.exe'
    driver = webdriver.Chrome(binary_yandex_driver_file, desired_capabilities = caps, options = options)
    driver.implicitly_wait(1)
    return driver

def find_element_ver2(driver, settings):
    split_setting = settings.split(';')
    tag = split_setting[0]
    atribute = split_setting[1]
    atr_val = split_setting[2]
    try:
        some_xpath = f"//{tag}[@{atribute}='{atr_val}']"
        found_info = driver.find_element_by_xpath(f"//{tag}[@{atribute}='{atr_val}']")
        element_value = found_info.text
    except:
        element_value = False
    return element_value
