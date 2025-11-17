from flask import Blueprint, request, jsonify
from utils.jwt_utils import token_required
from services.gemini_service import generate_gemini

gemini_bp = Blueprint("gemini", __name__)

@gemini_bp.route("/generate", methods=["POST"])
@token_required
def generate(user_id):
    data = request.get_json()
    prompt = data.get("prompt", "").strip()

    if not prompt:
        return jsonify({
            "error": "empty_prompt",
            "user_friendly": "Prompt cannot be empty."
        }), 400

    result = generate_gemini(prompt)

    # If result contains error, forward it exactly
    if "error" in result:
        return jsonify(result), 500

    return jsonify(result), 200
