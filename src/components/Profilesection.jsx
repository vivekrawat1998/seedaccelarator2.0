import React from 'react';


const ProfileSection = ({ bgImage, name, breadcrumbs }) => {
    return (
        <div
            className=" h-[60vh] relative bg-no-repeat bg-cover"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundPosition: "center 30%", 
            }}
        >
         
            <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 pb-10"> </div>
        </div>
    );
};

export default ProfileSection;
