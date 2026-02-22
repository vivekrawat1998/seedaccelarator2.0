import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClose }) {

  const { login } = useAuth();
  const navigate = useNavigate();

  /* ================= UI STATE ================= */

  const [tab, setTab] = useState("signin"); 
  const [signupType, setSignupType] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= LOGIN FORM ================= */

  const [loginForm, setLoginForm] = useState({
    identifier: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= MEMBER FORM ================= */

  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
  });

  const handleMemberChange = (e) => {
    setMemberForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ======================================================
      🔐 SIGN IN (ALL USER TYPES)
  ====================================================== */

  const handleSignin = async () => {

    setLoading(true);
    setError("");

    try {

      const res = await api.post("/auth/local", {
        identifier: loginForm.identifier,
        password: loginForm.password,
      });

      login(res.data);

      alert("✅ Login successful");

      onClose();
      navigate("/dashboard");

    } catch (err) {

      console.error(err.response?.data || err);

      setError(
        err?.response?.data?.error?.message ||
        "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
      🧑 MEMBER SIGNUP (FULL FLOW)
  ====================================================== */

  const handleMemberSignup = async () => {

    setLoading(true);
    setError("");

    try {

      /* ===== STEP 1: REGISTER USER ===== */
      const registerRes = await api.post("/auth/local/register", {
        username: memberForm.name,
        email: memberForm.email,
        password: memberForm.password,
      });

      const authData = registerRes.data;

      login(authData);

      const token = authData.jwt;

      /* ===== STEP 2: GET CURRENT USER ===== */
      const meRes = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const currentUser = meRes.data;

      /* ===== STEP 3: UPDATE USER ROLE (optional) ===== */
      try {
        await api.put(
          "/users/me",
          { userType: "member" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (e) {
        console.warn("UserType update skipped");
      }

      /* ===== STEP 4: CREATE MEMBER PROFILE ===== */
      await api.post(
        "/members",
        {
          data: {
            name: memberForm.name,
            email: memberForm.email,
            Organization: memberForm.category,
            users_permissions_user: {
              connect: [currentUser.id],
            },
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("🎉 Member account created successfully!");

      onClose();
      navigate("/dashboard");

    } catch (err) {

      console.error("❌ MEMBER CREATE ERROR:", err.response?.data || err);

      setError(
        err?.response?.data?.error?.message ||
        "Signup failed"
      );

    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
      🔑 FORGOT PASSWORD
  ====================================================== */

  const [forgotEmail, setForgotEmail] = useState("");

  const handleForgotPassword = async () => {

    setLoading(true);
    setError("");

    try {

      await api.post("/auth/forgot-password", {
        email: forgotEmail,
      });

      alert("📧 Password reset email sent!");

      setTab("signin");

    } catch (err) {

      console.error(err.response?.data || err);

      setError("Failed to send reset email");

    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
      🚀 REDIRECT ACCELERATOR / BREEDER
  ====================================================== */

  const goToNetworkPage = () => {
    onClose();
    navigate("/network-members#register");
  };

  /* ======================================================
      UI
  ====================================================== */

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">

        {/* ===== TABS ===== */}
        <div className="flex mb-6 border-b">

          <button
            onClick={() => {
              setTab("signin");
              setSignupType(null);
            }}
            className={`flex-1 py-2 font-semibold ${tab === "signin" ? "border-b-2 border-green-700 text-green-700" : ""}`}
          >
            Sign In
          </button>

          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 font-semibold ${tab === "signup" ? "border-b-2 border-green-700 text-green-700" : ""}`}
          >
            Sign Up
          </button>

        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg border">
            {error}
          </p>
        )}

        {/* ================= SIGNIN ================= */}
        {tab === "signin" && (
          <div className="space-y-4">

            <input
              name="identifier"
              placeholder="Email"
              value={loginForm.identifier}
              onChange={handleLoginChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              className="w-full border p-3 rounded-lg"
            />

            <button
              onClick={handleSignin}
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              onClick={() => setTab("forgot")}
              className="text-sm text-blue-600 underline"
            >
              Forgot Password?
            </button>

          </div>
        )}

        {/* ================= FORGOT ================= */}
        {tab === "forgot" && (
          <div className="space-y-4">

            <input
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <button
              onClick={handleForgotPassword}
              className="w-full bg-green-700 text-white py-3 rounded-lg"
            >
              Send Reset Link
            </button>

          </div>
        )}

        {/* ================= SIGNUP OPTIONS ================= */}
        {tab === "signup" && !signupType && (
          <div className="space-y-4">

            <button
              onClick={() => setSignupType("member")}
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              🧑 Sign up as Member
            </button>

            <button
              onClick={goToNetworkPage}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold"
            >
              🚀 Accelerator / 🌱 Breeder
            </button>

          </div>
        )}

        {/* ================= MEMBER FORM ================= */}
        {signupType === "member" && (
          <div className="space-y-4">

            <input name="name" placeholder="Full Name" onChange={handleMemberChange} className="w-full border p-3 rounded-lg" />

            <input name="email" placeholder="Email" onChange={handleMemberChange} className="w-full border p-3 rounded-lg" />

            <input type="password" name="password" placeholder="Password" onChange={handleMemberChange} className="w-full border p-3 rounded-lg" />

            <select name="category" onChange={handleMemberChange} className="w-full border p-3 rounded-lg">
              <option value="">Select Category</option>
              <option>Farmer</option>
              <option>Student</option>
              <option>Private Company</option>
              <option>Government Organization</option>
              <option>FPO/FPC/NGO</option>
              <option>Others</option>
            </select>

            <button
              onClick={handleMemberSignup}
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Creating..." : "Create Member Account"}
            </button>

          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-6 border border-gray-300 py-2 rounded-lg"
        >
          Close
        </button>

      </div>
    </div>
  );
}