import React from 'react';

const ProfileSection = ({ bgImage, name, breadcrumbs }) => {
    return (
        <div
            className="md:h-[50vh] h-[30vh] mt-24 relative bg-no-repeat bg-cover bg-center "
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundPosition: "center 30%", 
                backgroundSize: "cover"
            }}
        >
            {/* Optional Dark overlay for better text readability */}
            
            {/* Content - TOP POSITIONED */}
            
        </div>
    );
};

export default ProfileSection;
