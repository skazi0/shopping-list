from flask import request, send_file
from flask_restplus import Resource, fields, marshal_with, marshal
from werkzeug.exceptions import BadRequest, NotFound
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import NoResultFound
from io import BytesIO
import json

from app import db, api
from app.models import *


category_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'priority': fields.Integer,
}


@api.route('/api/categories')
class CategoriesList(Resource):
    @marshal_with(category_fields)
    def get(self):
        return Category.query.all()


@api.route('/api/categories/<int:id>')
class Categories(Resource):
    @marshal_with(category_fields)
    def get(self, id):
        return Category.query.get(id)


item_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'category_id': fields.Integer,
}


@api.route('/api/items')
class ItemsList(Resource):
    @marshal_with(item_fields)
    def get(self):
        return Item.query.all()


@api.route('/api/items/<int:id>')
class Items(Resource):
    @marshal_with(item_fields)
    def get(self, id):
        return Item.query.get(id)


tobuy_fields = {
    'id': fields.Integer,
    'item_id': fields.Integer,
    'added_date': fields.DateTime(dt_format='iso8601'),
    'bought_date': fields.DateTime(dt_format='iso8601'),
    'comment': fields.String,
}


@api.route('/api/tobuy')
class ToBuyList(Resource):
    @marshal_with(tobuy_fields)
    def get(self):
        return LogEntry.query.filter_by(bought_date=None).all()


@api.route('/api/tobuy/<int:id>')
class ToBuy(Resource):
    @marshal_with(tobuy_fields)
    def get(self, id):
        return LogEntry.query.get_or_404(id)


@api.route('/api/tobuy/<int:id>/actions/<action>')
class ToBuyActions(Resource):
    @marshal_with(tobuy_fields)
    def get(self, id, action):
        if action != 'buy':
            raise BadRequest()
        # buy action
        log_entry = LogEntry.query.get_or_404(id)
        # already bought? do nothing
        if log_entry.bought_date is None:
            log_entry.bought_date = func.now()
            db.session.commit()

        return log_entry
