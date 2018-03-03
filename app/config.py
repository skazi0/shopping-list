class BaseConfig(object):
    SECRET_KEY = 'my_precious'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql://user:pass@localhost/dbname'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
