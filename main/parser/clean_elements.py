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

# ├── web_elements {}
# │   ├── 'avaliable': str(*) | False - при наличии в настроках
# │   ├── 'price': str(*) | False - при наличии в настроках
# │   ├── 'name': str(*) | False - при наличии в настроках

# ├── clear_elements {}
# │   ├── 'link_id': int(*)
# │   ├── 'avaliable': str(*) | False
# │   ├── 'price': float(*) | False
# │   ├── 'name': str(*) | False
# │   ├── 'current_date': str("%d/%m/%Y")

def clean_elements(web_elements):

    if web_elements.get('price', False):
        web_elements['price'] = clean_number(web_elements['price'])
    else:
        web_elements['price'] = False

    if web_elements.get('avaliable', False):
        web_elements['avaliable'] = True
    else:
        web_elements['avaliable'] = False

    if not web_elements.get('name', False):
        web_elements['name'] = False

    web_elements['current_date'] = set_current_date()

    return web_elements
