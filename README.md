# DSA-Instructor

DSA-Instructor is a web-based AI chat application designed to help users with Data Structures and Algorithms (DSA) queries. Powered by Gemini AI, it provides clear, structured, and markdown-formatted solutions to DSA problems.

## Features

- *Interactive Chat Interface:* Ask any question related to Data Structures and Algorithms and get instant, well-formatted answers.
- *AI-Powered Solutions:* Utilizes Gemini AI to generate concise explanations and code samples.
- *Markdown Support:* Responses are provided in clean Markdown with headings, lists, bolding, and code blocks for clarity.
- *User-Friendly UI:* Modern, responsive design with smooth chat experience.

## Usage

1. Clone the repository:
   bash
   git clone https://github.com/rishabhbishtuk12/DSA-Instructor.git
   cd DSA-Instructor
   

2. Install dependencies:
   bash
   pip install -r requirements.txt
   

3. Set up your Google Gemini API key in a .env file:
   
   API_KEY_GOOGLE=your_gemini_api_key
   

4. Run the application:
   bash
   python app.py
   

5. Open your browser and go to http://localhost:5000.

## Project Structure

- app.py - Flask backend serving the chat interface and integrating Gemini AI.
- templates/ - HTML templates for the frontend.
- static/ - Contains CSS, JS, and image assets.

## Example

Ask questions such as:
- "How does quicksort work?"
- "What is the difference between a stack and a queue?"
- "Write code for binary search in Python."
