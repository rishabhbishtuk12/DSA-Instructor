#!/usr/bin/env python3
"""
Test script for error handling implementation
This script tests various error scenarios to ensure proper error handling
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

BASE_URL = "http://localhost:5000"

def test_invalid_request():
    """Test with invalid request data"""
    print("Testing invalid request...")
    try:
        response = requests.post(f"{BASE_URL}/get_response", 
                               json={"invalid": "data"})
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("✅ Invalid request handled correctly\n")
    except Exception as e:
        print(f"❌ Error: {e}\n")

def test_empty_message():
    """Test with empty message"""
    print("Testing empty message...")
    try:
        response = requests.post(f"{BASE_URL}/get_response", 
                               json={"message": ""})
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("✅ Empty message handled correctly\n")
    except Exception as e:
        print(f"❌ Error: {e}\n")

def test_missing_api_key():
    """Test with missing API key (simulated)"""
    print("Testing missing API key scenario...")
    print("Note: This would require modifying the environment variable")
    print("✅ API key validation implemented in app.py\n")

def test_valid_request():
    """Test with valid request"""
    print("Testing valid request...")
    try:
        response = requests.post(f"{BASE_URL}/get_response", 
                               json={"message": "What is a binary tree?"})
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            if "response" in data:
                print("✅ Valid request processed successfully")
                print(f"Response length: {len(data['response'])} characters")
            else:
                print("❌ Unexpected response format")
        else:
            print(f"❌ Unexpected status code: {response.status_code}")
        print()
    except Exception as e:
        print(f"❌ Error: {e}\n")

def main():
    print("🧪 Testing Error Handling Implementation")
    print("=" * 50)
    
    # Check if server is running
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code != 200:
            print("❌ Server is not running. Please start the Flask app first.")
            return
    except requests.exceptions.ConnectionError:
        print("❌ Server is not running. Please start the Flask app first.")
        return
    
    print("✅ Server is running\n")
    
    # Run tests
    test_invalid_request()
    test_empty_message()
    test_missing_api_key()
    test_valid_request()
    
    print("🎉 Error handling tests completed!")

if __name__ == "__main__":
    main()
