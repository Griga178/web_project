from flask import Flask

app = Flask(__name__, template_folder = "templates")
app.debug =  True

from main import f_app
