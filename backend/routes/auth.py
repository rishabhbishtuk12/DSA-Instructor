from flask import Blueprint, request, jsonify
from utils.mongodb import get_db
from models.user import User
from utils.jwt_utils import create_token

auth_bp = Blueprint("auth", __name__)

# REGISTER
@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json() or {}

        name = data.get("name", "").strip()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "").strip()

        # Basic validation
        if not all([name, email, password]):
            return jsonify({"detail": "All fields are required"}), 400

        if "@" not in email:
            return jsonify({"detail": "Invalid email format"}), 400

        if len(password) < 6:
            return jsonify({"detail": "Password must be at least 6 characters"}), 400

        user_model = User(get_db())
        user_id, err = user_model.create(name, email, password)

        if err:
            return jsonify({"detail": err}), 400

        return jsonify({"message": "Account created successfully"}), 201

    except Exception as e:
        print("REGISTER ERROR:", e)
        return jsonify({"detail": "Internal server error"}), 500


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json() or {}

        email = data.get("email", "").strip().lower()
        password = data.get("password", "").strip()

        if not email or not password:
            return jsonify({"detail": "All fields are required"}), 400

        user_model = User(get_db())
        user = user_model.authenticate(email, password)

        if not user:
            return jsonify({"detail": "Invalid email or password"}), 401

        token = create_token(str(user["_id"]))

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"]
            }
        }), 200

    except Exception as e:
        print("LOGIN ERROR:", e)
        return jsonify({"detail": "Internal server error"}), 500
