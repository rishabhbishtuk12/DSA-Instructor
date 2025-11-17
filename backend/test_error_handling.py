import requests
import json
import os
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

PORT = os.getenv("PORT", "8000")
BASE_URL = f"http://localhost:{PORT}"

GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
BLUE = "\033[94m"
END = "\033[0m"


def print_header(title):
    print(f"\n{BLUE}=== {title} ==={END}")


# 1. Register Tests
def test_register_invalid():
    print_header("Test: Register with missing fields")
    r = requests.post(f"{BASE_URL}/api/auth/register", json={})
    print("Status:", r.status_code)
    print("Response:", r.json())


def test_register_success():
    print_header("Test: Register a new user")
    payload = {
        "name": "Test User",
        "email": "test_user@example.com",
        "password": "123456",
    }
    r = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
    print("Status:", r.status_code)
    print("Response:", r.json())


# 2. Login Tests
def test_login_invalid():
    print_header("Test: Login invalid credentials")
    r = requests.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": "wrong@example.com", "password": "wrongpass"},
    )
    print("Status:", r.status_code)
    print("Response:", r.json())


def test_login_success():
    print_header("Test: Login valid credentials")
    payload = {
        "email": "test_user@example.com",  # same user registered above
        "password": "123456",
    }
    r = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
    print("Status:", r.status_code)
    print("Response:", r.json())

    if r.status_code == 200:
        return r.json()["token"]
    return None


# 3. AI Generation Tests
def test_generate_without_token():
    print_header("Test: AI Generate WITHOUT token")
    r = requests.post(f"{BASE_URL}/api/generate", json={"prompt": "Test message"})
    print("Status:", r.status_code)
    # print("Response:", r.json())


def test_generate_invalid_prompt(token):
    print_header("Test: AI Generate with empty prompt")
    r = requests.post(
        f"{BASE_URL}/api/generate",
        json={"prompt": ""},
        headers={"Authorization": f"Bearer {token}"},
    )
    print("Status:", r.status_code)
    print("Response:", r.json())


def test_generate_success(token):
    print_header("Test: AI Generate Success")
    r = requests.post(
        f"{BASE_URL}/api/generate",
        json={"prompt": "Explain binary search tree"},
        headers={"Authorization": f"Bearer {token}"},
    )

    print("Status:", r.status_code)

    try:
        data = r.json()
        print("Response:", data)
        if "output" in data:
            print(GREEN + "✔ AI response received successfully" + END)
    except Exception:
        print(RED + "✘ Response is not valid JSON" + END)


# MAIN RUNNER
def main():
    print(f"{YELLOW}\n🧪 Starting Backend Tests...\n{END}")

    # Check if server is running
    try:
        _ = requests.get(BASE_URL)
        print(GREEN + "✔ Server is running\n" + END)
    except requests.exceptions.ConnectionError:
        print(
            RED
            + "✘ Server is NOT running! Start backend first: python app.py"
            + END
        )
        return

    # Run tests
    test_register_invalid()
    test_register_success()

    test_login_invalid()
    token = test_login_success()

    if not token:
        print(RED + "✘ Cannot continue without token\n" + END)
        return
    
    test_generate_without_token()
    test_generate_invalid_prompt(token)
    test_generate_success(token)

    print(GREEN + "\n🎉 All tests finished!\n" + END)


if __name__ == "__main__":
    main()
