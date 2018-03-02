from flask import Flask, render_template
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_restful import Api

from app.config import BaseConfig

app = Flask(__name__)
app.config.from_object(BaseConfig)
app.config.from_envvar('APP_CONFIG')

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

from app.models import *
from app.resources import *

api = Api(app)

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.template_filter('date')
def date_filter(s):
    return s.split('T')[0] if s is not None else s


api.add_resource(Users, '/api/users')
api.add_resource(Sessions, '/api/sessions')


@app.route('/')
def index():
    return app.send_static_file('index.html')
