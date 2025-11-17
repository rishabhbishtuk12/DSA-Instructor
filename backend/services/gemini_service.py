import os
import logging
from dotenv import load_dotenv
from google import genai
from google.genai import types, errors
import requests.exceptions

load_dotenv()

logger = logging.getLogger("gemini_service")
logging.basicConfig(level=logging.INFO)

# Initialize Gemini Client
api_key = os.getenv("API_KEY_GOOGLE")
if not api_key:
    logger.error("API_KEY_GOOGLE is missing from .env")
    raise ValueError("API_KEY_GOOGLE is required in backend .env")

try:
    client = genai.Client(api_key=api_key)
    logger.info("Gemini client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Gemini: {str(e)}")
    raise


def handle_api_error(error, message_length):
    """Exact same logic as your old get_response handler"""
    error_message = str(error).lower()

    if "api_key" in error_message or "authentication" in error_message:
        return {
            "error": "authentication_error",
            "message": "API authentication failed",
            "user_friendly": "Invalid API configuration. Please contact support."
        }

    elif "quota" in error_message or "limit" in error_message:
        return {
            "error": "rate_limit_error",
            "message": "API rate limit exceeded",
            "user_friendly": "Rate limit exceeded. Try again later."
        }

    elif "timeout" in error_message or "connection" in error_message:
        return {
            "error": "network_error",
            "message": "Network timeout / connection error",
            "user_friendly": "Network error. Check your internet and try again."
        }

    elif "service" in error_message or "503" in error_message:
        return {
            "error": "service_unavailable",
            "message": "Gemini service unavailable",
            "user_friendly": "Service temporarily unavailable. Try again later."
        }

    return {
        "error": "unknown_error",
        "message": f"Unknown error: {str(error)}",
        "user_friendly": "Unexpected error occurred. Try again."
    }


def generate_gemini(prompt: str):
    """
    Runs Gemini generation using your previous config & system prompt.
    Returns: { 'output': text } or { error fields }
    """
    try:
        logger.info(f"Generating content with prompt length: {len(prompt)}")

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=(
                    "You are a Data structure and Algorithm Instructor. "
                    "Reply only to DSA-related questions in simplest way. "
                    "If user asks non-DSA questions, respond rudely. "
                    "Always return clean Markdown: headings with #, subheadings with ##, lists with -, bold terms, "
                    "use fenced code blocks where required. No HTML unless necessary."
                ),
            ),
        )

        logger.info("Gemini response generated successfully")

        return {"output": response.text}

    except errors.APIError as e:
        return handle_api_error(e, len(prompt))

    except errors.ClientError as e:
        return handle_api_error(e, len(prompt))

    except errors.ServerError as e:
        return handle_api_error(e, len(prompt))

    except requests.exceptions.Timeout:
        return {
            "error": "timeout_error",
            "message": "Request timeout",
            "user_friendly": "Request timed out. Please try again."
        }

    except requests.exceptions.ConnectionError:
        return {
            "error": "connection_error",
            "message": "Connection error",
            "user_friendly": "Unable to connect to Gemini. Check your internet."
        }

    except Exception as e:
        return handle_api_error(e, len(prompt))
