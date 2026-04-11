import React, { useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Typography from "../ui/Heading";

// ✅ CLEAN DATA (ONLY DESKTOP IMAGES)
const sections = [
  {
    title: "The Emerging Rice Sector",
    desktop: "/hero/The Emerging Rice Sector (1920 x 1080 px).jpg.jpeg",
    caption: "India needs to fast-pace the targeted adoption of emerging rice segments.",
  },
  {
    title: "Seeds: The Heart of Farming",
    desktop: "/hero/Seed_The Heart of Rice Sector_1920X1080.jpg.jpeg",
    caption: "Improved seeds increase yield, profitability and resilience, yet older varieties dominate.",
  },
  {
    title: "From Research to Farmers' Fields",
    desktop: "/hero/From Research to Farmer's Field.jpg.jpeg",
    caption: "Testing, positioning and advocating improved varieties and building stakeholders’ trust.",
  },
  {
    title: "Challenges for Seed Accelerators",
    desktop: "/hero2/desktop/Slider 4_Challenges for Seed Accelerators.jpg",
    caption: "Seed accelerators struggle to access timely information and early generation seeds of new varieties.",
  },
  {
    title: "Seed Accelerator Network (SAN)",
    desktop: "/hero/The Seed Acceleration Network_1920X1080 px.jpg.jpeg",
    caption: "Connecting seed accelerators, breeders, and farmers for stronger seed systems.",
  },
  {
    title: "Stronger Seed Systems",
    desktop: "/hero/Slider 6_Stronger Seed System.JPG.jpeg",
    caption: "Accelerate availability, access and adoption of improved rice varieties and catalyze seed enterprises.",
  },
  {
    title: "Building a Resilient Farming Future",
    desktop: "/hero2/desktop/Slider7_Towards Resilient Farming  Features.JPG",
    caption: "Faster varietal turnover means higher yields, better incomes, and climate resilience.",
  },
];

const HeroSection = () => {
  const swiperRef = useRef(null);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section className="relative w-full md:h-full h-screen mt-20 overflow-hidden bg-black">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay, EffectFade, Navigation]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={800}
        className="w-full h-full"
      >
        {sections.map((section, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">

              {/* ✅ ONLY DESKTOP IMAGE */}
              <img
                src={section.desktop}
                alt={section.title}
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "auto"}
                decoding="async"
                className="w-full h-full object-cover object-center 
                           transition-all duration-1000 opacity-0 brightness-75 
                           hover:brightness-70"
                onLoad={(e) => {
                  e.target.style.opacity = "1";
                }}
              />

              {/* ✅ GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/50 
                              lg:from-black/50 lg:via-transparent lg:to-black/50" />

              {/* ✅ TEXT CONTENT */}
              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-12 z-10">
                <div
                  className="w-full max-w-5xl text-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h1 className="font-Arsenal font-black tracking-tight mb-4 
                                text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl
                                text-white drop-shadow-2xl">
                    {section.title}
                  </h1>

                  <p className="font-Karla leading-relaxed 
                               text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
                               text-gray-200 max-w-2xl mx-auto">
                    {section.caption}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ NAVIGATION BUTTONS */}
      <div className="absolute inset-0 z-20 pointer-events-none">

        {/* LEFT */}
        <button
          onClick={handlePrev}
          className="pointer-events-auto absolute left-4 md:left-8 top-1/2 -translate-y-1/2
                     w-10 h-10 md:w-14 md:h-14 flex items-center justify-center
                     rounded-full bg-yellow-600/90 hover:bg-yellow-500
                     transition-all duration-300"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* RIGHT */}
        <button
          onClick={handleNext}
          className="pointer-events-auto absolute right-4 md:right-8 top-1/2 -translate-y-1/2
                     w-10 h-10 md:w-14 md:h-14 flex items-center justify-center
                     rounded-full bg-emerald-600/90 hover:bg-emerald-500
                     transition-all duration-300"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* DOT INDICATORS */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto">
          {sections.map((_, idx) => (
            <button
              key={idx}
              onClick={() => swiperRef.current?.slideTo(idx)}
              className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;