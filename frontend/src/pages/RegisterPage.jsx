import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { name, email, password }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8 animate-slide-up">
          <Link
            to="/"
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform"
          >
            ResumeHub
          </Link>
          <p className="text-gray-600 mt-2 font-semibold">Join Our Resume Revolution 🚀</p>
        </div>

        {/* Card */}
        <div className="card-featured shadow-2xl">
          <div className="mb-8">
            <h2 className="heading-medium text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">
              Get started with AI-powered resume analysis in 30 seconds
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
              <p className="text-red-700 font-semibold text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-2">
                👤 Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-modern"
                required
              />
            </div>

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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-modern"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Use a mix of letters, numbers, and symbols for security
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-800 mb-2">
                ✅ Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-modern"
                required
              />
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-3 text-xs text-gray-600 py-2">
              <input type="checkbox" id="agree" className="mt-1" required />
              <label htmlFor="agree">
                I agree to the <span className="text-blue-600 font-semibold">Terms of Service</span> and{" "}
                <span className="text-blue-600 font-semibold">Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary font-bold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⚙️</span> Creating Account...
                </>
              ) : (
                <>
                  ✨ Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-gray-500 text-sm">Already have an account?</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-700">
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 underline">
              Sign in to existing account →
            </Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-10 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <span className="text-2xl">✅</span>
            <p className="text-sm font-semibold">Free resume analysis in seconds</p>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <span className="text-2xl">🤖</span>
            <p className="text-sm font-semibold">AI-powered personalized feedback</p>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <span className="text-2xl">🎯</span>
            <p className="text-sm font-semibold">Match resumes to job descriptions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
