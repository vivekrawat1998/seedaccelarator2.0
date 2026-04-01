import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const stats = [
  { label: "Products Evaluated", count: 130 },
  { label: "Trials Conducted", count: 1265 },
  { label: "Breeding Partners Collaborated", count: 17 },
  { label: "Seed Scalers Supported", count: 30 },
  { label: "Million ha in India under STRVs", count: 1, suffix: "M+" },
  { label: "Improved Varieties Integrated", count: 32 },
  { label: "Tons of EGS facilitated ", count: 33, suffix: " Tons" },
  { label: "Quality Seed Scaled (MT)", count: 15000, suffix: " Tons" },
];

const CountupSection = () => {
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-3 py-14 bg-white"
    >
      <h1 className="md:text-[60px] text-3xl mb-10 tracking-[4px] font-Nunito text-black md:text-6xl font-bold  text-center ">
        Our
        <span className="px-2 py-1  text-[#199b6a] rounded-xl font-Nunito  ">
          Impact
        </span>
        Matrics
      </h1>
      <div className="grid grid-cols-1 grid-cols-2 md:grid-cols-4 md:gap-8 gap-3">
        {stats.map(({ label, count, suffix }, index) => (
          <div
            key={index}
            className="bg-[#50b487] rounded-xl shadow p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow"
          >
            {startCount ? (
              <CountUp
                className="md:text-5xl text-[32px] font-Nunito tracking-wide font-extrabold text-white"
                end={count}
                duration={2.5}
                separator=","
                suffix={suffix || ""}
              />
            ) : (
              <span className="md:text-5xl text-[32px] font-extrabold text-white">
                0{suffix || ""}
              </span>
            )}
            <p className="text-gray-700 mt-3 font-semibold font-Karla  text-lg font-semibold   max-w-[180px]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountupSection;
