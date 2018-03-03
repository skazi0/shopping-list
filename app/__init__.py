from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

from app.config import BaseConfig

app = Flask(__name__)
app.config.from_object(BaseConfig)
app.config.from_envvar('APP_CONFIG')

db = SQLAlchemy(app)

from app.models import *
from app.resources import *

api = Api(app)


@app.template_filter('date')
def date_filter(s):
    return s.split('T')[0] if s is not None else s


api.add_resource(CategoriesList, '/api/categories')
api.add_resource(Categories, '/api/categories/<id>')
api.add_resource(ItemsList, '/api/items')
api.add_resource(Items, '/api/items/<id>')


@app.route('/')
def index():
    return app.send_static_file('index.html')
