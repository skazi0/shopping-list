"""init structure

Revision ID: a283e8d4ba94
Revises: 
Create Date: 2018-03-03 22:39:46.870132

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a283e8d4ba94'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('priority', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('log',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('item_id', sa.Integer(), nullable=False),
    sa.Column('added_date', sa.TIMESTAMP(), server_default=sa.text(u'CURRENT_TIMESTAMP'), nullable=False),
    sa.Column('bought_date', sa.TIMESTAMP(), nullable=True),
    sa.Column('comment', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['item_id'], ['items.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('log')
    op.drop_table('items')
    op.drop_table('categories')
