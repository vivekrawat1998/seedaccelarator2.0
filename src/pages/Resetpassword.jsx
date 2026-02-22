import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const code = params.get("code");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!code) {
            alert("Invalid reset link ❌");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match ❌");
            return;
        }

        try {
            setLoading(true);

            // ✅ CORRECT ENDPOINT
            await api.post("/auth/reset-password", {
                code: code,
                password: password,
                passwordConfirmation: confirmPassword,
            });

            alert("Password reset successful ✅");
            navigate("/login");

        } catch (err) {
            console.error(err.response?.data || err);
            alert("Reset failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto" }}>
            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
}