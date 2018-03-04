import datetime
from decimal import Decimal
from sqlalchemy import func
from sqlalchemy.schema import ForeignKey, UniqueConstraint

from app import db


class Item(db.Model):

    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    category_id = db.Column(db.Integer, ForeignKey('categories.id'),
                            nullable=False)

    def __repr__(self):
        return '<Item {0}>'.format(self.name)


class Category(db.Model):

    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    priority = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Category {0}>'.format(self.name)


class LogEntry(db.Model):

    __tablename__ = "log"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    item_id = db.Column(db.Integer, ForeignKey('items.id'), nullable=False)
    # server_default is needed to avoid default behavior for TIMESTAMP fields
    # where ON UPDATE CURRENT_TIMESTAMP is auto-added
    added_date = db.Column(db.TIMESTAMP, nullable=False, default=func.now(),
                           server_default=db.text('CURRENT_TIMESTAMP'))
    bought_date = db.Column(db.TIMESTAMP, nullable=True)
    comment = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return '<LogEntry {0}>'.format(self.name)
