import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  /* ================= UI STATE ================= */
  const [tab, setTab] = useState("signin");
  const [signupType, setSignupType] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showMemberPassword, setShowMemberPassword] = useState(false); // ✅ NEW
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FORMS ================= */
  const [loginForm, setLoginForm] = useState({ identifier: "", password: "" });
  const [memberForm, setMemberForm] = useState({ name: "", email: "", password: "", category: "" });
  const [forgotEmail, setForgotEmail] = useState("");

  // ✅ Track input focus/active states for floating labels
  const [activeFields, setActiveFields] = useState({
    identifier: false, password: false,
    name: false, email: false, memberPassword: false, forgotEmail: false
  });

  const handleLoginChange = (e) => {
    setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMemberChange = (e) => {
    setMemberForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ FIXED #1: COMPLETE handleSignin FUNCTION (unchanged)
  const handleSignin = async () => {
    console.log("🔐 Signin clicked - API CALL STARTING");
    setLoading(true);
    setError("");

    try {
      console.log("📤 POST /auth/local", { identifier: loginForm.identifier, password: loginForm.password });

      const res = await api.post("/auth/local", {
        identifier: loginForm.identifier,
        password: loginForm.password,
      });

      console.log("✅ LOGIN SUCCESS", res.data);

      // Update auth context
      login(res.data);

      alert("✅ Login successful");
      navigate("/dashboard");

    } catch (err) {
      console.error("❌ LOGIN ERROR:", err.response?.data || err);
      setError(
        err?.response?.data?.error?.message ||
        err.response?.statusText ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED #2: COMPLETE handleMemberSignup FUNCTION (unchanged)
  const handleMemberSignup = async () => {
    console.log("👥 Member signup clicked - API CALL STARTING");
    setLoading(true);
    setError("");

    try {
      /* ===== STEP 1: REGISTER USER ===== */
      console.log("📤 POST /auth/local/register");
      const registerRes = await api.post("/auth/local/register", {
        username: memberForm.name,
        email: memberForm.email,
        password: memberForm.password,
      });

      const authData = registerRes.data;
      login(authData);
      const token = authData.jwt;
      console.log("✅ REGISTER SUCCESS", authData);

      /* ===== STEP 2: GET CURRENT USER ===== */
      console.log("📤 GET /users/me");
      const meRes = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const currentUser = meRes.data;
      console.log("✅ USER FETCHED", currentUser);

      /* ===== STEP 3: UPDATE USER TYPE ===== */
      try {
        console.log("📤 PUT /users/me - userType: member");
        await api.put("/users/me", { userType: "member" }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("✅ UserType updated");
      } catch (e) {
        console.warn("⚠️ UserType update skipped:", e.message);
      }

      /* ===== STEP 4: CREATE MEMBER PROFILE ===== */
      console.log("📤 POST /members");
      await api.post("/members", {
        data: {
          name: memberForm.name,
          email: memberForm.email,
          Organization: memberForm.category,
          users_permissions_user: { connect: [currentUser.id] },
        },
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("🎉 ALL STEPS COMPLETE");
      alert("🎉 Member account created successfully!");
      navigate("/dashboard");

    } catch (err) {
      console.error("❌ MEMBER SIGNUP ERROR:", err.response?.data || err);
      setError(
        err?.response?.data?.error?.message ||
        err.response?.statusText ||
        "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED #3: COMPLETE handleForgotPassword FUNCTION (unchanged)
  const handleForgotPassword = async () => {
    console.log("🔑 Forgot password clicked");
    setLoading(true);
    setError("");

    try {
      console.log("📤 POST /auth/forgot-password");
      await api.post("/auth/forgot-password", {
        email: forgotEmail,
      });

      alert("📧 Password reset email sent!");
      setTab("signin");
      setForgotEmail("");

    } catch (err) {
      console.error("❌ FORGOT PASSWORD ERROR:", err.response?.data || err);
      setError("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const goToNetworkPage = () => {
    console.log("🚀 Redirecting to network page");
    navigate("/network-members#register");
  };

  // Floating label handlers
  const handleFocus = (field) => setActiveFields(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field, value) => {
    if (!value) setActiveFields(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 space-y-8 hover:shadow-3xl transition-all duration-500">

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg ring-4 ring-white/50">
              <div className="text-3xl drop-shadow-lg">
                {tab === "signin" ? "🔐" :
                  tab === "forgot" ? "🔑" :
                    signupType === "member" ? "👥" : "🌱"}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Nunito">
                {tab === "signin" ? "Welcome Back" :
                  tab === "forgot" ? "Reset Password" :
                    signupType === "member" ? "Member Account" : "Join SAN Network"}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {tab === "signin" ? "Quick sign in to your account" :
                  tab === "forgot" ? "Enter email to reset password" :
                    signupType === "member" ? "Create your member profile" : "Choose your account type"}
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-1 shadow-inner">
            <div className="flex">
              <button
                onClick={() => { setTab("signin"); setSignupType(null); setError(""); }}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 relative group ${tab === "signin"
                  ? "bg-white shadow-lg shadow-green-100 text-green-700 -translate-y-0.5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-md"
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setTab("signup"); setSignupType(null); setError(""); }}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 relative group ${tab === "signup"
                  ? "bg-white shadow-lg shadow-green-100 text-green-700 -translate-y-0.5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-md"
                  }`}
              >
                Sign Up
              </button>
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

          {/* ================= SIGN IN FORM ================= */}
          {tab === "signin" && (
            <div className="space-y-5">
              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  name="identifier"
                  placeholder="Email"
                  value={loginForm.identifier}
                  onChange={handleLoginChange}
                  onFocus={() => handleFocus('identifier')}
                  onBlur={() => handleBlur('identifier', loginForm.identifier)}
                  className="w-full pl-12 pr-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-gray-300 shadow-sm peer z-0"
                />
                <label className={`absolute left-12 text-xs font-medium transition-all duration-300 z-10 pointer-events-none ${activeFields.identifier || loginForm.identifier
                  ? 'top-2 text-green-600 bg-white px-1 -translate-y-2'
                  : 'top-1/2 -translate-y-1/2 text-gray-500'
                  }`}>
                  Email Address
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password', loginForm.password)}
                  className="w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-gray-300 shadow-sm peer z-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 p-1 transition-all duration-200 z-10"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <label className={`absolute left-12 text-xs font-medium transition-all duration-300 z-10 pointer-events-none ${activeFields.password || loginForm.password
                  ? 'top-2 text-green-600 bg-white px-1 -translate-y-2'
                  : 'top-1/2 -translate-y-1/2 text-gray-500'
                  }`}>
                  Password
                </label>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSignin}
                disabled={loading || !loginForm.identifier || !loginForm.password}
                className="group relative w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Sign In
                    </>
                  )}
                </span>
              </button>

              <button
                onClick={() => setTab("forgot")}
                className="w-full text-sm bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 hover:text-blue-800 border border-blue-200/50 py-3 px-4 rounded-xl backdrop-blur-sm hover:shadow-md transition-all duration-200 font-medium"
              >
                🔑 Forgot Password?
              </button>
            </div>
          )}

          {/* Forgot Password Form */}
          {tab === "forgot" && (
            <div className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  placeholder="Email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  onFocus={() => handleFocus('forgotEmail')}
                  onBlur={() => handleBlur('forgotEmail', forgotEmail)}
                  className="w-full pl-12 pr-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-gray-300 shadow-sm peer z-0"
                />
                <label className={`absolute left-12 text-xs font-medium transition-all duration-300 z-10 pointer-events-none ${activeFields.forgotEmail || forgotEmail
                  ? 'top-2 text-green-600 bg-white px-1 -translate-y-2'
                  : 'top-1/2 -translate-y-1/2 text-gray-500'
                  }`}>
                  Enter your email
                </label>
              </div>

              <button
                onClick={handleForgotPassword}
                disabled={loading || !forgotEmail}
                className="group relative w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </span>
              </button>
            </div>
          )}

          {/* ✅ NEW: MEMBER REGISTRATION FORM */}
          {tab === "signup" && signupType === "member" && (
            <div className="space-y-5">
              {/* Name Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  name="name"
                  placeholder="Full Name"
                  value={memberForm.name}
                  onChange={handleMemberChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name', memberForm.name)}
                  className="w-full pl-12 pr-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-gray-300 shadow-sm peer z-0"
                />
                <label className={`absolute left-12 text-xs font-medium transition-all duration-300 z-10 pointer-events-none ${activeFields.name || memberForm.name
                  ? 'top-2 text-green-600 bg-white px-1 -translate-y-2'
                  : 'top-1/2 -translate-y-1/2 text-gray-500'
                  }`}>
                  Full Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={memberForm.email}
                  onChange={handleMemberChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email', memberForm.email)}
                  className="w-full pl-12 pr-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-gray-300 shadow-sm peer z-0"
                />
                <label className={`absolute left-12 text-xs font-medium transition-all duration-300 z-10 pointer-events-none ${activeFields.email || memberForm.email
                  ? 'top-2 text-green-600 bg-white px-1 -translate-y-2'
                  : 'top-1/2 -translate-y-1/2 text-gray-500'
                  }`}>
                  Email Address
                </label>
              </div>

              {/* Category Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <select
                  name="category"
                  value={memberForm.category}
                  onChange={handleMemberChange}
                  onFocus={() => handleFocus('category')}
                  onBlur={() => handleBlur('category', memberForm.category)}
                  className="w-full pl-12 pr-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-gray-300 shadow-sm peer z-0 appearance-none"
                >
                  <option value="">Select Category</option>
                  <option value="individual">Farmer</option>
                  <option value="Student">Student</option>
                  <option value="Private Company">Private Company</option>
                  <option value="Government Organization">Government Organization</option>
                  <option value="FPO/FPC/NGO">FPO/FPC/NGO</option>
                  <option value="Others">Others</option>
                </select>
                <label className={`absolute left-12 text-xs font-medium transition-all duration-300 z-10 pointer-events-none ${activeFields.category || memberForm.category
                  ? 'top-2 text-green-600 bg-white px-1 -translate-y-2'
                  : 'top-1/2 -translate-y-1/2 text-gray-500'
                  }`}>
                  Organization/Category
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  name="password"
                  type={showMemberPassword ? "text" : "password"}
                  placeholder="Password"
                  value={memberForm.password}
                  onChange={handleMemberChange}
                  onFocus={() => handleFocus('memberPassword')}
                  onBlur={() => handleBlur('memberPassword', memberForm.password)}
                  className="w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-gray-300 shadow-sm peer z-0"
                />
                <button
                  type="button"
                  onClick={() => setShowMemberPassword(!showMemberPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 p-1 transition-all duration-200 z-10"
                >
                  {showMemberPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <label className={`absolute left-12 text-xs font-medium transition-all duration-300 z-10 pointer-events-none ${activeFields.memberPassword || memberForm.password
                  ? 'top-2 text-green-600 bg-white px-1 -translate-y-2'
                  : 'top-1/2 -translate-y-1/2 text-gray-500'
                  }`}>
                  Password
                </label>
              </div>

              {/* Member Sign Up Button */}
              <button
                onClick={handleMemberSignup}
                disabled={loading || !memberForm.name || !memberForm.email || !memberForm.password || !memberForm.category}
                className="group relative w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5" />
                      Create Member Account
                    </>
                  )}
                </span>
              </button>
            </div>
          )}

          {/* Sign Up Options */}
          {tab === "signup" && !signupType && (
            <div className="space-y-4">
              <div className="text-center text-sm text-gray-600 mb-6 py-4 border-b border-gray-100">
                Choose your account type
              </div>
              <button
                onClick={() => setSignupType("member")}
                className="group relative w-full bg-gradient-to-br from-emerald-500 to-green-600 text-white py-6 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex flex-col items-center gap-2 p-4">
                  <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center text-2xl">👥</div>
                  <div className="font-bold text-lg">Member Account</div>
                  <div className="text-sm opacity-90">Join as regular network member</div>
                </div>
              </button>
              <button
                onClick={goToNetworkPage}
                className="group relative w-full bg-gradient-to-br from-yellow-500 to-orange-500 text-white py-6 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex flex-col items-center gap-2 p-4">
                  <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center text-2xl">🚀🌱</div>
                  <div className="font-bold text-lg">Accelerator / Breeder</div>
                  <div className="text-sm opacity-90">Specialized startup accounts</div>
                </div>
              </button>
            </div>
          )}

          {/* Back button */}
          {(tab === "forgot" || (tab === "signup" && signupType === "member")) && (
            <button
              onClick={() => {
                setTab("signin");
                setSignupType(null);
                setError("");
                setActiveFields({
                  identifier: false, password: false,
                  name: false, email: false, memberPassword: false, forgotEmail: false
                });
                setMemberForm({ name: "", email: "", password: "", category: "" });
              }}
              className="flex items-center justify-center gap-2 w-full text-sm text-gray-600 hover:text-gray-900 py-3 px-4 border-t border-gray-100/50 mt-6 backdrop-blur-sm hover:bg-gray-50/50 rounded-b-xl transition-all duration-200 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </button>
          )}
        </div>

        <div className="text-center mt-8 text-xs text-gray-500 space-y-1">
          <p>Need help? <Link to="/contact" className="text-green-600 hover:underline font-medium">Contact support</Link></p>
        </div>
      </div>
    </div>
  );
}
