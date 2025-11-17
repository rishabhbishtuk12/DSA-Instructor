from dotenv import load_dotenv
load_dotenv()
import os
from flask import Flask
from flask_cors import CORS
from config import MONGO_URI
from utils.mongodb import init_mongo
from routes.auth import auth_bp
from routes.gemini import gemini_bp

app = Flask(__name__)
app.config["MONGO_URI"] = MONGO_URI

CORS(app, resources={r"*": {"origins": "*"}}, supports_credentials=True)
init_mongo(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(gemini_bp, url_prefix="/api")

port = os.getenv("PORT", 8000)

if __name__ == "__main__":
    app.run(debug=True, port=port)
