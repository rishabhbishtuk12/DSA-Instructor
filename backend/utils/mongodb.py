# backend/utils/mongodb.py

from flask_pymongo import PyMongo
from flask import g

mongo = PyMongo()

def init_mongo(app):
    """Initialize MongoDB with Flask app."""
    mongo.init_app(app)
    print("MongoDB initialized with:", app.config.get("MONGO_URI"))

def get_db():
    """Return active MongoDB database."""
    if "db" not in g:
        g.db = mongo.db
        if g.db is None:
            print("❌ ERROR: MongoDB is NOT initialized")
    return g.db
