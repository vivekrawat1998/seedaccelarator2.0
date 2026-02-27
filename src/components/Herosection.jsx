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
import Typography from "../ui/Heading"

const sections = [
  {
    title: "The Emerging Rice Sector",
    mobile: "/hero2/mobile/1.png",
    tablet: "/hero2/mobile/1.png",
    desktop: "/hero2/desktop/Slider 1_Emerging Rice Sector.jpg",
    caption: "India needs to fast-pace the adoption of emerging rice segments at vast agricultural base.",
  },
  {
    title: "Seeds: The Heart of Farming",
    mobile: "/hero2/mobile/5.png",
    tablet: "/hero2/tablet/6.png",
    desktop: "/hero2/desktop/Slider 2_Seeds the Heart of Farming.jpg",
    caption: "Seeds determine yield, profitability, and resilience — yet older varieties dominate.",
  },
  {
    title: "From Research to Farmer's field",
    mobile: "/hero2/mobile/4.png",
    tablet: "/hero2/tablet/5.png",
    desktop: "/hero2/desktop/Slider 3_From Research to Farmer's Field.jpg",
    caption: "Testing, positioning, advocating new varieties in real farming conditions to build trust.",
  },
  {
    title: "Challenges for Seed Accelerators",
    mobile: "/hero2/mobile/2.png",
    tablet: "/hero2/tablet/4.png",
    desktop: "/hero2/desktop/Slider 4_Challenges for Seed Accelerators.jpg",
    caption: "Seed accelerators struggle to access timely information and basic seeds of new varieties.",
  },
  {
    title: "The Birth of the Seed Accelerator Network (SAN)",
    mobile: "/hero2/mobile/3.png",
    tablet: "/hero2/tablet/3.png",
    desktop: "/hero2/desktop/Slider 5 _The Birth of SAN.jpg",
    caption: "Connecting seed accelerators, breeders, and farmers for stronger seed systems.",
  },
  {
    title: "Stronger Seed Systems",
    mobile: "/hero2/mobile/7.png",
    tablet: "/hero2/tablet/7.png",
    desktop: "/hero2/desktop/Slider 6_Stronger Seed System.JPG",
    caption: "Improving seed availability, awareness campaigns, and enterprise development.",
  },
  {
    title: "Towards Resilient Farming Futures",
    mobile: "/hero2/mobile/6.png",
    tablet: "/hero2/tablet/2.png",
    desktop: "/hero2/desktop/Slider7_Towards Resilient Farming  Features.JPG",
    caption: "Faster varietal turnover means higher yields, better incomes, and climate resilience.",
  },
];

const HeroSection = () => {
  const swiperRef = useRef(null);

  // ✅ PERFECT RESPONSIVE IMAGE LOADING
  const getImageSources = (section) => ({
    mobile: section.mobile,
    tablet: section.tablet,
    desktop: section.desktop,
  });

  // Navigation handlers
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
      offset: 100
    });
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay, EffectFade, Navigation]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
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
              {/* ✅ PERFECT RESPONSIVE PICTURE ELEMENT */}
              <picture className="block w-full h-full">
                <source
                  media="(max-width: 640px)"
                  srcSet={getImageSources(section).mobile}
                  type="image/webp"
                />
                <source
                  media="(max-width: 1024px)"
                  srcSet={getImageSources(section).tablet}
                  type="image/webp"
                />
                <img
                  src={getImageSources(section).desktop}
                  alt={section.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-all duration-1000 opacity-0 brightness-75 hover:brightness-70 group-hover:scale-[1.02]
                           loaded:opacity-100 loaded:scale-100
                           xl:object-[50%_30%] lg:object-center md:object-[60%_40%]"
                  onLoad={(e) => {
                    e.target.classList.add("loaded");
                    e.target.style.opacity = "1";
                  }}
                />
              </picture>

              {/* Gradient Overlay - Responsive */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/50 
                              lg:from-black/50 lg:via-transparent lg:to-black/50" />

              {/* Text Content - Perfect Responsive Typography */}
              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-12 z-10">
                <div
                  className="w-full max-w-5xl tracking-tighter  text-center transform transition-all duration-700"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {/* Title - Responsive */}
                  <h1 className="font-Arsenal font-black tracking-tight md:leading-[62px] mb-4 
                                text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl
                                text-white/95 drop-shadow-2xl
                                bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    {section.title}
                  </h1>
                  {/* Caption - Responsive */}
                  <p className="font-Karla font-medium leading-relaxed tracking-wide
                               text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
                               text-gray-100/90 max-w-2xl mx-auto
                               drop-shadow-lg px-4 sm:px-0">
                    {section.caption}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls - Perfect Responsive */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="pointer-events-auto absolute left-3 sm:left-4 md:left-6 lg:left-8 xl:left-12
                      top-1/2 -translate-y-1/2
                       w-5 h-5 sm:w-12 sm:h-12 md:w-14 md:h-14
                      flex items-center justify-center
                      rounded-full bg-yellow-600/90 hover:bg-prime
                      hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-110
                      backdrop-blur-md border border-emerald-400/50
                      transition-all duration-300 active:scale-95"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Button */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="pointer-events-auto absolute right-3 sm:right-4 md:right-6 lg:right-8 xl:right-12
                      top-1/2 -translate-y-1/2
                      w-5 h-5 sm:w-12 sm:h-12 md:w-14 md:h-14
                      flex items-center justify-center
                      rounded-full bg-emerald-600/90 hover:bg-yellow-400
                      hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-110
                      backdrop-blur-md border border-emerald-400/50
                      transition-all duration-300 active:scale-95"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30 pointer-events-auto">
          {sections.map((_, idx) => (
            <button
              key={idx}
              onClick={() => swiperRef.current?.slideTo(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${swiperRef.current?.realIndex === idx
                ? 'w-8 bg-white shadow-lg'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70 hover:w-3'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
