import os
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, render_template, request, jsonify
from google import genai
from google.genai import types

app = Flask(__name__)

api_key = os.getenv("API_KEY_GOOGLE")
client = genai.Client(api_key=api_key)



@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_response", methods=["POST"])
def get_response():
    user_message = request.json["message"]
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=user_message,
        config=types.GenerateContentConfig(
        system_instruction="You are a Data structure and Algorithm Instructor. You will only reply to the problem related to Data structure and Algorithm. You have to solve query of user in simplest way if user ask any question which is not related to Data structure and Algorithm, reply them rudely and take context from previous chats"),
        
        #temperature=0.7,
        #max_output_tokens=1024,
    )
    print("DSA AI \n",response.text)
    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(debug=True)