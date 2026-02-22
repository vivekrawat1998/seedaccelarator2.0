import React from "react";

const styles = {
    h1: {
        tag: "h1",
        className: "font-bold text-prime font-Nunito tracking-tight ",
        size: "clamp(1.7rem, 2.8vw, 2.8rem)",
    },

    h2: {
        tag: "h2",
        className: "font-semibold text-gray-900 font-parkinsans mb-5",
        size: "clamp(1.2rem, 2vw, 1.5rem)",
    },

    subtitle: {
        tag: "h3",
        className: "font-medium font-karla text-gray-900",
        size: "clamp(1rem, 1.4vw, 1.2rem)",
    },

    body: {
        tag: "p",
        className: "text-gray-700",
        size: "clamp(0.9rem, 1.1vw, 1rem)",
    },
};

const Typography = ({
    variant = "body",
    children,
    className = "",
}) => {

    const Component = styles[variant]?.tag || "p";

    return (
        <Component
            className={`${styles[variant]?.className} ${className}`}
            style={{
                fontSize: styles[variant]?.size,
            }}
        >
            {children}
        </Component>
    );
};

export default Typography;
