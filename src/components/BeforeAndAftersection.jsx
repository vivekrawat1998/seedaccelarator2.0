import React from 'react';

const beforeAfter = [
    {
        before: "/before.png",  
        after: "/after.png",    
        title: "Modern Irrigation Solutions",
        caption: " Rice fields before and after implementation of modern irrigation solutions.",
    },

];

export default function BeforeAfterSection() {
    return (
        <div className="max-w-3xl mx-auto py-8 px-4 flex flex-col gap-10">
            {beforeAfter.map((item, idx) => (
                <div key={idx}>
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                        <div className="flex-1">
                            <img src={item.before} alt="Before" className="w-full h-64 object-cover rounded-lg" />
                            <p className="text-center mt-2 text-gray-500 font-semibold">Before</p>
                        </div>
                        <div className="flex-1">
                            <img src={item.after} alt="After" className="w-full h-64 object-cover rounded-lg" />
                            <p className="text-center mt-2 text-gray-500 font-semibold">After</p>
                        </div>
                    </div>
                    <h1 className='text-xl font-bold font-parkinsans mt-4'>{item.title}</h1>
                    <p className="text-base text-gray-700 font-medium  mt-2">{item.caption}</p>
                </div>
            ))}
        </div>
    );
}
