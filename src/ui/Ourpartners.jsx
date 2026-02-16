import React from 'react'
import Marquee from "react-fast-marquee";

const Ourpartners = () => {
    const images = [
        { src: "/partners/partner1.png", alt: "Partner 1" },
        { src: "/partners/partner2.png", alt: "Partner 2" },
        { src: "/partners/partner3.png", alt: "Partner 3" },
        { src: "/partners/partner4.png", alt: "Partner 4" },
        { src: "/partners/partner5.png", alt: "Partner 5" },
        { src: "/partners/partner6.png", alt: "Partner 6" },
        { src: "/partners/partner7.png", alt: "Partner 7" },
        { src: "/partners/partner8.png", alt: "Partner 8" },
        { src: "/partners/partner9.png", alt: "Partner 9" },
        { src: "/partners/partner10.png", alt: "Partner 10" },
        { src: "/partners/partner11.png", alt: "Partner 11" },
        { src: "/partners/partner12.png", alt: "Partner 12" },
        { src: "/partners/partner13.png", alt: "Partner 13" },
        { src: "/partners/partner14.png", alt: "Partner 14" },
        { src: "/partners/partner15.png", alt: "Partner 15" },
        { src: "/partners/partner16.png", alt: "Partner 16" },
        { src: "/partners/partner17.png", alt: "Partner 17" },
        { src: "/partners/partner18.png", alt: "Partner 18" },
        { src: "/partners/partner19.png", alt: "Partner 19" },
    ]
    const images2 = [
        { src: "/partners/san1.png", alt: "san 1" },
        { src: "/partners/san2.png", alt: "san 2" },
        { src: "/partners/san3.png", alt: "san 3" },
        { src: "/partners/san4.png", alt: "san 4" },
        { src: "/partners/san5.png", alt: "san 5" },
        { src: "/partners/san6.png", alt: "san 6" },
        { src: "/partners/san7.png", alt: "san 7" },
        { src: "/partners/san8.png", alt: "san 8" },
        { src: "/partners/san9.png", alt: "san 9" },
        { src: "/partners/san10.png", alt: "san 10" },
        { src: "/partners/san11.png", alt: "san 11" },
        { src: "/partners/san12.png", alt: "san 12" },
        { src: "/partners/san13.png", alt: "san 13" },
        { src: "/partners/san14.png", alt: "san 14" },
        { src: "/partners/san15.png", alt: "san 15" },
        { src: "/partners/san16.png", alt: "san 16" },
        { src: "/partners/san17.png", alt: "san 17" },
        { src: "/partners/san18.png", alt: "san 18" },
        { src: "/partners/san19.png", alt: "san 19" },
    ]
    return (
        <section
            className="w-full  mx-auto px-3 py-14 bg-white"
        >
            <h1 className="md:text-4xl text-3xl mb-10 font-Nunito text-black md:text-6xl font-bold  text-center ">
                Our
                <span className="px-2 py-1  text-prime rounded-xl font-parkinsans ">
                    Partners
                </span>
            </h1>
            <Marquee
                direction='left'
                speed={30}>
                {
                    images.map((image, index) => (
                        <div key={index} className="mx-4 mt-10 flex items-center justify-center">
                            <img src={image.src} alt={image.alt} className="h-24 object-cover" />
                        </div>
                    ))
                }
            </Marquee>
            <Marquee
            className='mt-5'
                direction='right'
                speed={30}
            >
                {
                    images2.map((image, index) => (
                        <div key={index} className="mx-4 mt-10 flex items-center justify-center">
                            <img src={image.src} alt={image.alt} className="h-24 object-cover" />
                        </div>
                    ))
                }
            </Marquee>
        </section>
    )
}

export default Ourpartners