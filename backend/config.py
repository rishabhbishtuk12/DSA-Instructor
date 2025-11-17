from dotenv import load_dotenv
load_dotenv()
import os
from datetime import timedelta

MONGO_URI = os.getenv("MONGO_URI")
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA = timedelta(days=1)
