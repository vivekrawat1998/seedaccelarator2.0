import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Typography from "../../ui/Heading";

const dashboard = [
  { label: " Regions Covered", value: 6 },
  { label: " Organizations Participated", value: 64 },
  { label: "Seed Varieties Promoted", value: 60 },
];

const DashboardOverview = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section ref={ref} className="max-w-5xl mx-auto py-12" data-aos="fade-up">
        <Typography variant="h1" className="md:text-2xl text-lg mb-10 font-bold text-black mb-6 text-center  tracking-wide">Seed Acclerator Network (SAN) Meets </Typography>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {dashboard.map((item, idx) => (
          <div
            key={idx}
            className="
    group
    bg-[#50b487]
    rounded-2xl
    transition-all duration-300
    hover:bg-yellow-400 hover:scale-105
    shadow-lg hover:shadow-2xl
  "
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <div
              className="
      rounded-2xl h-full w-full text-center 
      flex flex-col items-center justify-center
      py-8 px-5
    "
            >
              {/* VALUE */}
              <div
                className="
        text-4xl md:text-5xl font-Nunito tracking-[3px] font-extrabold
        text-white group-hover:text-black transition-colors duration-300 mb-2
      "
              >
                {typeof item.value === "number" ? (
                  inView ? (
                    <CountUp end={item.value} duration={1} />
                  ) : (
                    0
                  )
                ) : (
                  <span>{item.value}</span>
                )}
              </div>

              {/* LABEL */}
              <div className="text-white/90 group-hover:text-black mt-2 text-xs md:text-base font-Karla font-semibold transition-colors duration-300">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardOverview;
