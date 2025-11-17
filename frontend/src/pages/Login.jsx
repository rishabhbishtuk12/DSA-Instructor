import React, { useState, useContext } from "react";
import api from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("All fields are required.");
    }

    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      nav("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-3">Welcome Back!</h1>
        <form className="space-y-4" onSubmit={submit}>
          <input
            className="input"
            name="email"
            placeholder="Email"
            onChange={update}
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={update}
          />
          <button className="btn-primary w-full cursor-pointer">Login</button>
        </form>

        <p className="mt-3 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600">
            Register
          </a>
        </p>

        {error && <p className="text-red-700 mt-1 text-sm">{error}</p>}
      </div>
    </div>
  );
}
