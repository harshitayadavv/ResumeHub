import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Left Side - Branding */}
        <div className="text-center mb-8 animate-slide-up">
          <Link
            to="/"
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform"
          >
            ResumeHub
          </Link>
          <p className="text-gray-600 mt-2">Your AI Resume Assistant</p>
        </div>

        {/* Card */}
        <div className="card-featured shadow-2xl">
          <div className="mb-8">
            <h2 className="heading-medium text-gray-900">Welcome Back 👋</h2>
            <p className="text-gray-600 mt-2">
              Sign in to your account to continue improving your resume
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
              <p className="text-red-700 font-semibold text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2">
                📧 Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-modern"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-2">
                🔒 Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-modern"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary font-bold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⚙️</span> Signing In...
                </>
              ) : (
                <>
                  🔓 Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-gray-500 text-sm">New to ResumeHub?</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-700">
            <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 underline">
              Create a free account →
            </Link>
          </p>
        </div>

        {/* Features Reminder */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="text-center text-gray-600">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-xs font-semibold">Instant Analysis</p>
          </div>
          <div className="text-center text-gray-600">
            <div className="text-2xl mb-2">✨</div>
            <p className="text-xs font-semibold">AI Insights</p>
          </div>
          <div className="text-center text-gray-600">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-xs font-semibold">Job Matching</p>
          </div>
          <div className="text-center text-gray-600">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-xs font-semibold">Fast Results</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
