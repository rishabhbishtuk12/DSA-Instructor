import jwt
from datetime import datetime, timedelta
from config import JWT_SECRET, JWT_ALGORITHM, JWT_EXP_DELTA
from flask import request, abort

def create_token(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.utcnow() + JWT_EXP_DELTA
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

def decode_token(token):
    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return data["user_id"]
    except jwt.ExpiredSignatureError:
        abort(401, description="Token expired")
    except jwt.InvalidTokenError:
        abort(401, description="Invalid token")

def token_required(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get("Authorization", None)
        if not auth:
            abort(401, description="Missing token")
        parts = auth.split()
        if parts[0].lower() != "bearer" or len(parts) != 2:
            abort(401, description="Invalid auth header")
        user_id = decode_token(parts[1])
        # optionally you can attach user_id to g
        return f(user_id=user_id, *args, **kwargs)
    return decorated
