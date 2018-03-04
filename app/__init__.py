from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_restplus import Api

from app.config import BaseConfig

app = Flask(__name__)
app.config.from_object(BaseConfig)
app.config.from_envvar('APP_CONFIG')

db = SQLAlchemy(app)
api = Api(app)

# import here to have db and api defined already
from app.models import *  # noqa
from app.resources import *  # noqa


@app.template_filter('date')
def date_filter(s):
    return s.split('T')[0] if s is not None else s


@app.route('/')
def index():
    return app.send_static_file('index.html')
