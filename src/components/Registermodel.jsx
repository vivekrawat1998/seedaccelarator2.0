import React,{ useState } from "react";
import { registerUser } from "../api/auth";

export default function RegisterModal({ onClose }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
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
            const data = await registerUser(form);
            localStorage.setItem("token", data.jwt);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Registered successfully!");
            onClose();
        } catch (err) {
            setError(err.response?.data?.error?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center mt-44 z-50">
            <div className="bg-white rounded-xl w-[400px] p-6">
                <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
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
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                        {loading ? "Creating..." : "Register"}
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
