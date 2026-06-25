import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/provider";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  try {

    const response = await api.post("/login", {
      email,
      password,
    });

    console.log(response.data);

    localStorage.setItem(
      "token",
      response.data.message
    );

    localStorage.setItem(
      "role",
      response.data.role
    );

    navigate("/home");

  } catch (error) {

    console.log(error);

    alert("Invalid Credentials");

  }

};
  return (
    <div className="min-h-screen bg-[#0b0914] text-white flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#251a45_0%,#0b0914_70%)]" />

      <div className="relative z-10 w-full max-w-md">

        <div className="bg-black/40 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 shadow-2xl">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">
              Welcome Back
            </h1>

            <p className="text-gray-400 mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 outline-none focus:border-purple-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 outline-none focus:border-purple-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="w-full border border-gray-700 py-4 rounded-xl hover:bg-gray-900 transition"
            >
              Skip Now
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}