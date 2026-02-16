import api from "./axios";

// REGISTER
export const registerUser = async ({ username, email, password }) => {
    const res = await api.post("/auth/local/register", {
        username,
        email,
        password,
    });

    return res.data;
};

// LOGIN
export const loginUser = async ({ identifier, password }) => {
    const res = await api.post("/auth/local", {
        identifier, // email or username
        password,
    });

    return res.data;
};
