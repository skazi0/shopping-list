import datetime
from decimal import Decimal
from sqlalchemy import select, func
from sqlalchemy.schema import ForeignKey, UniqueConstraint
from sqlalchemy.orm import column_property, relationship

from app import db


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

    item = relationship("Item", back_populates="log_entries")

    def __repr__(self):
        return '<LogEntry {0}>'.format(self.name)


class Item(db.Model):

    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    category_id = db.Column(db.Integer, ForeignKey('categories.id'),
                            nullable=False)

    log_entries = relationship("LogEntry",
                               back_populates="item", 
                               cascade="all, delete-orphan")

    count = column_property(select([func.count(LogEntry.bought_date)]).
                            where(LogEntry.item_id==id).
                            correlate_except(LogEntry))

    def __repr__(self):
        return '<Item {0}>'.format(self.name)


class Category(db.Model):

    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    priority = db.Column(db.Integer, nullable=False)

    items = relationship("Item")

    def __repr__(self):
        return '<Category {0}>'.format(self.name)

