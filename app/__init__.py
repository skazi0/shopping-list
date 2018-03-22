from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy as SQLAlchemyBase
from flask_restplus import Api

from app.config import BaseConfig

app = Flask(__name__)
app.config.from_object(BaseConfig)
app.config.from_envvar('APP_CONFIG')

# disable pooling to avoid MySQL warnings about unused connections being closed
# [Warning] Aborted connection (...) (Got an error reading communication packets # noqa

# skz: monkey patch SQLAlchemy class until
# https://github.com/mitsuhiko/flask-sqlalchemy/issues/266
# is fixed
from sqlalchemy.pool import NullPool  # noqa


class SQLAlchemy(SQLAlchemyBase):
    def apply_driver_hacks(self, app, info, options):
        super(SQLAlchemy, self).apply_driver_hacks(app, info, options)
        options['poolclass'] = NullPool
        options.pop('pool_size', None)


# end of monkey patch

db = SQLAlchemy(app)
api = Api(app, validate=True)

# import here to have db and api defined already
from app.models import *  # noqa
from app.resources import *  # noqa


@app.template_filter('date')
def date_filter(s):
    return s.split('T')[0] if s is not None else s


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.teardown_appcontext
def close_db_connections(exception=None):
    db.session.close()
    db.engine.dispose()
