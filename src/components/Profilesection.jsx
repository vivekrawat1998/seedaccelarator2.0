import React from 'react';

const ProfileSection = ({ bgImage, name, breadcrumbs }) => {
    return (
        <div
            className="h-[60vh] relative bg-no-repeat bg-cover bg-center brightness-75"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundPosition: "center 30%", 
                backgroundSize: "cover"
            }}
        >
            {/* Optional Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/20" />
            
            {/* Content - TOP POSITIONED */}
            <div className="absolute inset-0 flex flex-col items-center justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 z-9999">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                              font-bold text-white drop-shadow-2xl
                              bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent
                              tracking-tight leading-tight">
                    {name}
                </h1>
            </div>
        </div>
    );
};

export default ProfileSection;
