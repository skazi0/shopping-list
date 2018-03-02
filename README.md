## Shopping List App
# usage
- git clone https://github.com/skazi0/flask-skeleton.git
- virtualenv venv
- . venv/bin/activate
- pip install -r requirements.txt
- cp shopping.cfg.example shopping.cfg
- export APP_CONFIG=$(readlink -f shopping.cfg)
# generate migrations structures
- python manage.py db init
# run dev server
- python manage.py runserver
