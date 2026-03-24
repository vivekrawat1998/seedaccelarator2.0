const IndiaSvg = ({ onStateClick, getColor }) => {
    return (
        <svg viewBox="0 0 800 800" className="w-full h-full">

            <path id="Uttar Pradesh" d="M300,200 L380,200 L400,260 L320,280 Z"
                fill={getColor("Uttar Pradesh")}
                onClick={() => onStateClick("Uttar Pradesh")}
            />

            <path id="Bihar" d="M400,200 L450,200 L460,250 L410,260 Z"
                fill={getColor("Bihar")}
                onClick={() => onStateClick("Bihar")}
            />

            <path id="Jharkhand" d="M380,260 L430,260 L440,300 L390,300 Z"
                fill={getColor("Jharkhand")}
                onClick={() => onStateClick("Jharkhand")}
            />

            <path id="Odisha" d="M400,300 L460,300 L470,360 L410,360 Z"
                fill={getColor("Odisha")}
                onClick={() => onStateClick("Odisha")}
            />

            <path id="Maharashtra" d="M250,350 L350,350 L360,450 L260,450 Z"
                fill={getColor("Maharashtra")}
                onClick={() => onStateClick("Maharashtra")}
            />

            <path id="Telangana" d="M320,400 L380,400 L390,450 L330,450 Z"
                fill={getColor("Telangana")}
                onClick={() => onStateClick("Telangana")}
            />

            <path id="West Bengal" d="M460,250 L500,250 L510,320 L470,320 Z"
                fill={getColor("West Bengal")}
                onClick={() => onStateClick("West Bengal")}
            />

            <path id="Gujarat" d="M150,350 L230,350 L240,420 L160,420 Z"
                fill={getColor("Gujarat")}
                onClick={() => onStateClick("Gujarat")}
            />

            <path id="Rajasthan" d="M200,250 L300,250 L310,350 L210,350 Z"
                fill={getColor("Rajasthan")}
                onClick={() => onStateClick("Rajasthan")}
            />

            <path id="Tamil Nadu" d="M350,550 L450,550 L460,650 L360,650 Z"
                fill={getColor("Tamil Nadu")}
                onClick={() => onStateClick("Tamil Nadu")}
            />

            <path id="Karnataka" d="M300,450 L380,450 L390,550 L310,550 Z"
                fill={getColor("Karnataka")}
                onClick={() => onStateClick("Karnataka")}
            />

            <path id="Kerala" d="M260,500 L290,500 L300,650 L270,650 Z"
                fill={getColor("Kerala")}
                onClick={() => onStateClick("Kerala")}
            />

        </svg>
    );
};

export default IndiaSvg;