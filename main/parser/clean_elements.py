import re
from datetime import date

def clean_number(str_text):
    ''' Выводит только числа из строк с помощью регулярок
        находит числа, в которых "." или "," используется
        только для копеек'''
    result = re.findall(r'\d+\.?\,?', str_text)

    clear_number = ''.join(result)

    if ',' in clear_number:
        clear_number = clear_number.replace(',', '.')
    try:
        clear_number = float(clear_number)
        return clear_number
    except:
        clear_number = f"!Не преобразовать в число:{str_text}"
        return clear_number

def set_current_date():
    today = date.today()
    current_date = today.strftime("%d/%m/%Y")

    return current_date

def clean_elements(web_elements):
    if 'price' in web_elements:
        if web_elements['price']:
            web_elements['price'] = clean_number(web_elements['price'])

    web_elements['current_date'] = set_current_date()
    
    return web_elements
