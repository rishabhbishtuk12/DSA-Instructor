import os
import logging
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, render_template, request, jsonify
from google import genai
from google.genai import types, errors
import requests.exceptions

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Validate API key
api_key = os.getenv("API_KEY_GOOGLE")
if not api_key:
    logger.error("API_KEY_GOOGLE environment variable is not set")
    raise ValueError("API_KEY_GOOGLE environment variable is required")

try:
    client = genai.Client(api_key=api_key)
    logger.info("Gemini API client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Gemini API client: {str(e)}")
    raise

@app.route("/")
def index():
    return render_template("index.html")

def handle_api_error(error, user_message_length):
    """Handle different types of API errors and return appropriate responses"""
    error_message = str(error).lower()
    
    if "api_key" in error_message or "authentication" in error_message or "unauthorized" in error_message:
        logger.error(f"Authentication error: Invalid API key")
        return {
            "error": "authentication_error",
            "message": "API authentication failed. Please check your API key configuration.",
            "user_friendly": "Invalid API configuration. Please contact support."
        }
    elif "quota" in error_message or "rate" in error_message or "limit" in error_message:
        logger.error(f"Rate limit exceeded for message length: {user_message_length}")
        return {
            "error": "rate_limit_error", 
            "message": "API rate limit exceeded",
            "user_friendly": "Rate limit exceeded. Please wait a moment before trying again."
        }
    elif "timeout" in error_message or "connection" in error_message:
        logger.error(f"Network timeout error for message length: {user_message_length}")
        return {
            "error": "network_error",
            "message": "Network timeout or connection error",
            "user_friendly": "Network error. Please check your connection and try again."
        }
    elif "service" in error_message or "unavailable" in error_message or "503" in error_message:
        logger.error(f"Service unavailable error for message length: {user_message_length}")
        return {
            "error": "service_unavailable",
            "message": "API service temporarily unavailable",
            "user_friendly": "API service is temporarily unavailable. Please try again in a few minutes."
        }
    elif "bad_request" in error_message or "400" in error_message:
        logger.error(f"Bad request error for message length: {user_message_length}")
        return {
            "error": "bad_request",
            "message": "Invalid request format",
            "user_friendly": "Invalid request. Please try rephrasing your question."
        }
    else:
        logger.error(f"Unknown API error for message length: {user_message_length}: {str(error)}")
        return {
            "error": "unknown_error",
            "message": f"Unknown API error: {str(error)}",
            "user_friendly": "An unexpected error occurred. Please try again."
        }

@app.route("/get_response", methods=["POST"])
def get_response():
    try:
        # Validate request data
        if not request.json or "message" not in request.json:
            logger.warning("Invalid request: missing message field")
            return jsonify({
                "error": "invalid_request",
                "message": "Missing message field in request",
                "user_friendly": "Invalid request. Please try again."
            }), 400
        
        user_message = request.json["message"].strip()
        if not user_message:
            logger.warning("Empty message received")
            return jsonify({
                "error": "empty_message",
                "message": "Message cannot be empty",
                "user_friendly": "Please enter a question about Data Structures and Algorithms."
            }), 400
        
        logger.info(f"Processing request with message length: {len(user_message)}")
        
        # Make API call with comprehensive error handling
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=user_message,
                config=types.GenerateContentConfig(
                    system_instruction="You are a Data structure and Algorithm Instructor. You will only reply to the problem related to Data structure and Algorithm Instructor. You have to solve query of user in simplest way if user ask any question which is not related to Data structure and Algorithm, reply them rudely.You are a knowledge assistant. Always output responses in clean Markdown format, using the following rules: Use `#`, `##`, `###` for headings and subheadings in a logical hierarchy.- Use bullet points (`-`) for lists and sub-lists.- Bold important terms using `**`.- Avoid inline HTML unless necessary.- Do not wrap everything in code blocks.- Use blank lines between sections for readability.- If giving examples, use fenced code blocks (```language).- Keep the structure consistent for all answers. "),
                )
            
            logger.info(f"Successfully generated response for message length: {len(user_message)}")
            return jsonify({"response": response.text})
            
        except errors.APIError as e:
            error_response = handle_api_error(e, len(user_message))
            logger.error(f"APIError: {error_response['message']}")
            return jsonify(error_response), 500
            
        except errors.ClientError as e:
            error_response = handle_api_error(e, len(user_message))
            logger.error(f"ClientError: {error_response['message']}")
            return jsonify(error_response), 400
            
        except errors.ServerError as e:
            error_response = handle_api_error(e, len(user_message))
            logger.error(f"ServerError: {error_response['message']}")
            return jsonify(error_response), 500
            
        except requests.exceptions.Timeout:
            logger.error(f"Request timeout for message length: {len(user_message)}")
            return jsonify({
                "error": "timeout_error",
                "message": "Request timeout",
                "user_friendly": "Request timed out. Please try again."
            }), 504
            
        except requests.exceptions.ConnectionError:
            logger.error(f"Connection error for message length: {len(user_message)}")
            return jsonify({
                "error": "connection_error", 
                "message": "Connection error",
                "user_friendly": "Unable to connect to the service. Please check your internet connection."
            }), 503
            
        except Exception as e:
            error_response = handle_api_error(e, len(user_message))
            logger.error(f"Unexpected error: {error_response['message']}")
            return jsonify(error_response), 500
            
    except Exception as e:
        logger.error(f"Critical error in get_response endpoint: {str(e)}")
        return jsonify({
            "error": "server_error",
            "message": "Internal server error",
            "user_friendly": "A server error occurred. Please try again later."
        }), 500

if __name__ == "__main__":
    app.run(debug=True)