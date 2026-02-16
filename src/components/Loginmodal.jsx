import React,{ useState } from "react";
import { loginUser } from "../api/auth";

export default function LoginModal({ onClose }) {
    const [form, setForm] = useState({
        identifier: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await loginUser(form);
            localStorage.setItem("token", data.jwt);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Login successful!");
            onClose();
        } catch (err) {
            setError(err.response?.data?.error?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl mt-44 w-[400px] p-6">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="identifier"
                        placeholder="Email or Username"
                        required
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <button
                    onClick={onClose}
                    className="text-sm text-gray-500 mt-4 block mx-auto"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
