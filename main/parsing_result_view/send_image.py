import base64
from main.settings import PARSING_SCREEN_FOLDER

def image_sender(jpg_id):
    screen_name = PARSING_SCREEN_FOLDER + str(jpg_id) + '.jpg'
    with open(screen_name, "rb") as f:
        image_binary = f.read()

        response = base64.b64encode(image_binary).decode("utf-8")

        return response
