import React, { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      return setError("All fields are required.");
    }

    if (!form.email.includes("@")) {
      return setError("Invalid email address.");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      await api.post("/auth/register", form); // your python backend must expose this
      nav("/");
    } catch (err) {
      setError(err?.response?.data?.detail || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Create Account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            className="input"
            placeholder="Full Name"
            onChange={update}
          />
          <input
            name="email"
            className="input"
            placeholder="Email"
            onChange={update}
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            onChange={update}
          />

          <button type="submit" className="btn-primary w-full cursor-pointer">
            Register
          </button>
        </form>

        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <a href="/" className="text-blue-600">
            Login
          </a>
        </p>
        {error && (
          <p className="text-red-700 mt-1 text-sm rounded">{error}</p>
        )}
      </div>
    </div>
  );
}
