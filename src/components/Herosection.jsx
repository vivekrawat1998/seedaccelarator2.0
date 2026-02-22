import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "The Emerging Rice Sector",
    image: "/DSC_0199.jpg",
    caption: "India needs to fast-pace the adoption of emerging rice segments at vast agricultural base.",
  },
  {
    title: "Seeds: The Heart of Farming",
    image: "/hero/seeds the heart of farming.jpg",
    caption: "Seeds determine yield, profitability, and resilience — yet older varieties dominate.",
  },
  {
    title: "From Research to Farmer's field",
    image: "/hero/Research for the farmers field.JPG",
    caption: "Testing, positioning, advocating new varieties in real farming conditions to build trust.",
  },
  {
    title: "Challenges for Seed Accelerators",
    image: "/hero/Challenge for seed acceleration.JPG",
    caption: "Seed accelerators struggle to access timely information and basic seeds of new varieties.",
  },
  {
    title: "The Birth of the Seed Accelerator Network (SAN)",
    image: "/DSC_0315 (1).JPG",
    caption: "Seeds determine yield, profitability, and resilience — yet older varieties dominate.",
  },
  {
    title: "Stronger Seed Systems",
    image: "/hero/Strong seed system1.jpg",
    caption: "Improving seed availability, awareness campaigns, and enterprise development.",
  },
  {
    title: "Towards Resilient Farming Futures",
    image: "/hero/Slider 7 _Towards Resilient Farming  Features.JPG",
    caption: "Faster varietal turnover means higher yields, better incomes, and climate resilience.",
  },
];

const HeroSection = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay]}
        autoplay={{ delay: 2600, disableOnInteraction: false }}
        loop
        className="absolute inset-0 w-full h-full"
      >
        {sections.map((section, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <picture>
                <source srcSet={section.image.replace(".webp", "-mobile.webp")} media="(max-width: 768px)" />
                <source srcSet={section.image.replace(".webp", "-tablet.webp")} media="(max-width: 1200px)" />
                <img
                  src={section.image}
                  alt={section.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchpriority={idx === 0 ? "high" : "auto"}
                  onLoad={(e) => e.target.classList.add("loaded")}
                  className="w-full h-full object-cover object-center transition-all duration-700  loaded:blur-0 loaded:scale-100 brightness-75"
                />
              </picture>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="max-w-4xl text-center">
                  <h2 className="text-3xl md:text-6xl font-Arsenal font-extrabold text-white mb-2">
                    {section.title}
                  </h2>
                  <p className="text-base font-Karla md:text-xl text-gray-100">
                    {section.caption}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute inset-0 z-20 pointer-events-none">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous Slide"
          className="pointer-events-auto  bg-yellow-600 absolute left-4 md:left-8 top-1/2 -translate-y-1/2
      inline-flex items-center justify-center
      w-12 h-12 md:w-14 md:h-14
      rounded-full
    bg-transparent transition"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Button */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next Slide"
          className="pointer-events-auto absolute right-4 md:right-8 top-1/2 -translate-y-1/2
      inline-flex items-center justify-center
      w-12 h-12 md:w-14 md:h-14
      rounded-full bg-green-800 hover:bg-yellow-400
      focus:outline-none focus:ring-4 focus:ring-yellow-400
      shadow-lg transition"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

    </section>
  );
};

export default HeroSection;
