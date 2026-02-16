module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./public/**/*.html"
    ],
    theme: {
        container: {
            center: true,
            screens: {
                sm: "100%",
                md: "82rem",
                lg: "72rem",
                xl: "90rem",
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: "#002244",
                secondary: "#FF7722",
                dark: "#0f172a",
            },
            fontFamily: {
                Gilroy: ["Gilroy"],
            },
            fontSize: {
                responsive: "clamp(1rem, 2vw + 1.3rem, 4rem)",
            },
            keyframes: {
                shine: {
                    "0%": { "background-position": "100%" },
                    "100%": { "background-position": "-100%" },
                },
            },
            animation: {
                shine: "shine 5s linear infinite",
            },
        },
    },
};