from main.data_base.query_to_parsing import select_result_by_id
from main.settings import PARSING_SCREEN_FOLDER
import base64
import json

# ├── resultData {}
# │   ├── 'id': int
# │   ├── 'parsing_date': str("%d/%m/%Y")
# │   ├── 'link': link
# │   ├── 'domain': domain_name
# │   ├── 'name': str(*) \ false
# │   ├── 'price': float(*)
# │   ├── 'avaliable': true \ false
# │   ├── 'src_name': float(*)
# │   ├── 'checked': true \ false

def get_result_with_jpg(result_id):
    result_info = {}
    db_responce = select_result_by_id(result_id)
    try:
        image_file = convert_image(db_responce.id)
    except:
        image_file = convert_image(0)

    result_info['id'] = db_responce.id
    result_info['parsing_date'] = db_responce.parsing_date
    result_info['link'] = db_responce.links.link
    result_info['domain'] = db_responce.links.domains.name
    result_info['name'] = db_responce.product_name
    result_info['price'] = db_responce.price
    result_info['avaliable'] = db_responce.product_avaliable
    result_info['checked'] = False
    result_info['src_name'] = image_file
    return json.dumps(result_info)

def convert_image(jpg_id):
    screen_name = PARSING_SCREEN_FOLDER + str(jpg_id) + '.jpg'
    with open(screen_name, "rb") as f:
        image_binary = f.read()
        response = base64.b64encode(image_binary).decode("utf-8")
        return response
