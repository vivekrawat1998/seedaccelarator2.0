import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const code = params.get("code");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      setError("Invalid reset link");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/reset-password", {
        code: code,
        password: password,
        passwordConfirmation: confirmPassword,
      });

      alert("Password reset successful ✅");
      navigate("/login");

    } catch (err) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.error?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 space-y-8 hover:shadow-3xl transition-all duration-500">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg ring-4 ring-white/50">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Nunito">
                Reset Password
              </h1>
              <p className="text-gray-500 text-sm mt-1">Enter your new password</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-200/50 text-red-800 backdrop-blur-sm px-5 py-4 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">!</span>
                </div>
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-gray-300 shadow-sm peer z-0"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 p-1 transition-all duration-200 z-10"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-gray-300 shadow-sm peer z-0"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 p-1 transition-all duration-200 z-10"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={password.length >= 6 ? 'text-green-600 font-medium' : 'text-gray-500'}>
                    At least 6 characters
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      password.length >= 6 ? 'bg-green-500 w-full' : 
                      password.length >= 3 ? 'bg-yellow-500 w-1/2' : 'bg-red-400 w-1/4'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || password !== confirmPassword || password.length < 6}
              className="group relative w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Resetting...
                  </>
                ) : password === confirmPassword && password.length >= 6 ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Reset Password
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Set New Password
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Back to Login */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 w-full text-sm text-gray-600 hover:text-gray-900 py-3 px-4 border-t border-gray-100/50 mt-6 backdrop-blur-sm hover:bg-gray-50/50 rounded-b-xl transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </button>
        </div>

        <div className="text-center mt-8 text-xs text-gray-500 space-y-1">
          <p>
            Need help? <a href="/contact" className="text-green-600 hover:underline font-medium">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
