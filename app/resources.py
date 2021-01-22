from flask import request, send_file
from flask_restplus import Resource, fields, marshal
from werkzeug.exceptions import BadRequest, NotFound, Conflict
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import NoResultFound
from io import BytesIO
import json

from app import db, api, utils
from app.models import *

category_fields = api.model('Category', {
    'id': fields.Integer,
    'name': fields.String,
    'priority': fields.Integer,
})


@api.route('/api/categories')
class CategoriesList(Resource):
    @api.marshal_list_with(category_fields)
    def get(self):
        return Category.query.all()


@api.route('/api/categories/<int:id>')
class Categories(Resource):
    @api.marshal_with(category_fields)
    def get(self, id):
        return Category.query.get(id)


item_fields = api.model('Item', {
    'id': fields.Integer,
    'name': fields.String,
    'category_id': fields.Integer,
    'count': fields.Integer,
})


item_add_fields = api.model('ItemAdd', {
    'name': fields.String(required=True),
    'category_id': fields.Integer,
})


@api.route('/api/items')
class ItemsList(Resource):
    @api.marshal_list_with(item_fields)
    def get(self):
        return Item.query.all()

    @api.expect(item_add_fields)
    @api.marshal_with(item_fields)
    def post(self):
        args = utils.cut_to_model(request.get_json(), item_add_fields)

        old_item = Item.query.filter_by(name=args['name']).first()

        if old_item is not None:
            raise Conflict('item already exists')

        item = Item(**args)

        db.session.add(item)
        db.session.commit()

        return item


@api.route('/api/items/<int:id>')
class Items(Resource):
    @api.marshal_with(item_fields)
    def get(self, id):
        return Item.query.get(id)

    def delete(self, id):
        item = Item.query.get(id)
        if item is None:
            raise NotFound('item not found')
        db.session.delete(item)
        db.session.commit()
        return {'message': 'item removed'}


tobuy_fields = api.model('ToBuy', {
    'id': fields.Integer,
    'item_id': fields.Integer,
    'added_date': fields.DateTime(dt_format='iso8601'),
    'bought_date': fields.DateTime(dt_format='iso8601'),
    'comment': fields.String,
})


tobuy_add_fields = api.model('ToBuyAdd', {
    'item_id': fields.Integer(required=True, example=42),
    'comment': fields.String(example='Some comment'),
})


@api.route('/api/tobuy')
class ToBuyList(Resource):
    @api.marshal_list_with(tobuy_fields)
    def get(self):
        return LogEntry.query.filter_by(bought_date=None).all()

    @api.expect(tobuy_add_fields)
    @api.marshal_with(tobuy_fields)
    def post(self):
        try:
            args = utils.cut_to_model(request.get_json(), tobuy_add_fields)

            old_entry = LogEntry.query.filter_by(item_id=args['item_id'],
                                                 bought_date=None).first()
            if old_entry is not None:
                raise Conflict('item already in to-buy')

            entry = LogEntry(**args)

            db.session.add(entry)
            db.session.commit()

            return entry
        except IntegrityError:
            raise NotFound('item not found')


tobuy_mod_fields = api.model('ToBuyMod', {
    'comment': fields.String(example='New comment'),
})


@api.route('/api/tobuy/<int:id>')
class ToBuy(Resource):
    @api.marshal_with(tobuy_fields)
    def get(self, id):
        entry = LogEntry.query.filter_by(id=id, bought_date=None).first()
        if entry is None:
            raise NotFound('to-buy entry not found')
        return entry

    @api.marshal_with(tobuy_fields)
    @api.expect(tobuy_mod_fields)
    def patch(self, id):
        args = utils.cut_to_model(request.get_json(), tobuy_mod_fields)

        entry = LogEntry.query.filter_by(id=id, bought_date=None).first()
        if entry is None:
            raise NotFound('to-buy entry not found')

        utils.update_from_args(entry, args)

        db.session.commit()

        return entry

    def delete(self, id):
        entry = LogEntry.query.get(id)
        if entry is None:
            raise NotFound('to-buy entry not found')
        db.session.delete(entry)
        db.session.commit()
        return {'message': 'item removed from to-buy'}


@api.route('/api/tobuy/<int:id>/actions/<action>')
class ToBuyActions(Resource):
    @api.marshal_with(tobuy_fields)
    def get(self, id, action):
        if action != 'buy':
            raise BadRequest('%s is not a valid action' % action)
        # buy action
        log_entry = LogEntry.query.get_or_404(id)
        # already bought? do nothing
        if log_entry.bought_date is None:
            log_entry.bought_date = func.now()
            db.session.commit()

        return log_entry
