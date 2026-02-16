import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Priya Sharma",
    title: "Daughter of a patient",
    image: "/care-patient1.jpg",
    text: "Portea Medical provided such compassionate care at home. Their professionals made my mother's recovery comfortable and stress-free for our family.",
  },
  {
    name: "Anil Verma",
    title: "Post-surgery patient",
    image: "/care-patient2.jpg",
    text: "The visiting nurse was punctual and attentive. I felt safe and well looked after during every stage of my rehabilitation.",
  },
  {
    name: "Rita Mehra",
    title: "Caregiver",
    image: "/care-patient3.jpg",
    text: "Getting quality physiotherapy for my father at home was a huge relief. The team was understanding and adapted to his needs.",
  },
  {
    name: "Sonia Kapoor",
    title: "Mother & baby program client",
    image: "/care-patient4.jpg",
    text: "As a new mom, having a trusted medical professional visit home made the postpartum period much less overwhelming.",
  },
];

const TestimonialCard = ({ testimonial }) => (
  <div className="flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden bg-white w-full md:h-[15rem] h-[22rem]">
    <div className="md:w-[300px] flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-full h-full object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
        loading="lazy"
      />
    </div>
    <div className="md:w-[300px] flex flex-col justify-center p-6">
      <p className="text-base md:text-lg font-medium mb-4 text-gray-900 leading-snug italic">
        “{testimonial.text}”
      </p>
      <div>
        <h3 className="text-gray-900 font-semibold text-base md:text-lg">
          {testimonial.name}
        </h3>
        <p className="text-gray-600 text-xs md:text-sm">{testimonial.title}</p>
      </div>
    </div>
  </div>
);

// The pagination remains unchanged
const CustomPagination = ({ slides, activeIdx, progress, onDotClick }) => (
  <div className="flex justify-center items-center gap-2 mt-10">
    {slides.map((_, idx) =>
      idx !== activeIdx ? (
        <button
          key={idx}
          type="button"
          aria-label={`Go to slide ${idx + 1}`}
          onClick={() => onDotClick(idx)}
          className="w-2 h-2 bg-gray-200/90 rounded-full  outline-none focus:ring-2 focus:ring-[#F36F25]"
        />
      ) : (
        <div
          key={idx}
          className="w-9 h-2 bg-gray-200/90 rounded-full overflow-hidden relative flex items-center "
        >
          <div
            className="absolute left-0 top-0 h-2 bg-[#F36F25] rounded-full"
            style={{
              width: `${progress * 100}%`,
              // transition: "width 0.25s",
            }}
          />
        </div>
      )
    )}
  </div>
);

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const delay = 5000; // ms

  useEffect(() => {
    setProgress(0);
    let start;
    let af;
    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(1, elapsed / delay);
      setProgress(pct);
      if (pct < 1) af = requestAnimationFrame(animate);
    }
    af = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(af);
  }, [activeIndex]);

  const handleDotClick = (toIdx) => {
    setActiveIndex(toIdx);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(toIdx);
    }
  };

  return (
    <div className="bg-white font-parkinsans max-w-7xl mx-auto flex items-center justify-center">
      <div className="w-full py-24 container md:px-0 px-3 mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-opensans font-bold text-gray-900 text-center mb-10">
          Words of Our Patients
        </h2>
        <div>
          <Swiper
            ref={swiperRef}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1536: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
            }}
            className="rounded mr-3"
          >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <CustomPagination
          slides={testimonials}
          activeIdx={activeIndex}
          progress={progress}
          onDotClick={handleDotClick}
        />
      </div>
    </div>
  );
};

export default TestimonialCarousel;
