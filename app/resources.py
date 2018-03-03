from flask import request, send_file
from flask_restful import Resource, reqparse, fields, marshal_with, marshal
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import NoResultFound
from io import BytesIO
import json

from app import db
from app.models import *


category_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'priority': fields.Integer,
}


class CategoriesList(Resource):
    @marshal_with(category_fields)
    def get(self):
        return Category.query.all()


class Categories(Resource):
    @marshal_with(category_fields)
    def get(self, id):
        return Category.query.get(id)


item_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'category_id': fields.Integer,
}


class ItemsList(Resource):
    @marshal_with(item_fields)
    def get(self):
        return Item.query.all()

class Items(Resource):
    @marshal_with(item_fields)
    def get(self, id):
        return Item.query.get(id)
