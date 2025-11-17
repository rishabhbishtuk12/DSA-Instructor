from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId

class User:
    def __init__(self, db):
        self.db = db
        self.collection = self.db.users

    # CREATE USER
    def create(self, name, email, password):
        existing = self.collection.find_one({"email": email})
        if existing:
            return None, "Email already registered"

        new_user = {
            "name": name,
            "email": email,
            "password": generate_password_hash(password),
        }

        user_id = self.collection.insert_one(new_user).inserted_id

        return str(user_id), None

    # AUTHENTICATE USER
    def authenticate(self, email, password):
        user = self.collection.find_one({"email": email})

        if not user:
            return None  # email not found

        if not check_password_hash(user["password"], password):
            return None  # wrong password

        return user  # MUST RETURN FULL USER DOCUMENT
