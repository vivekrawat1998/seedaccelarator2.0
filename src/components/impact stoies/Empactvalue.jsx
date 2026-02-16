import React,{ useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function EconomicValueSection() {
    useEffect(() => {
        AOS.init({ duration: 900, once: true });
    }, []);

    return (
        <section className="container mx-auto bg-white py-10 px-6 flex flex-col items-start justify-center">
            <h3
                className="text-green-700 font-bold md:text-2xl text-lg mb-5 font-Nunito "
                data-aos="fade-down"
            >
                Economic value of return estimated
            </h3>
            <p className="text-gray-900  font-Karla text-base leading-relaxed" data-aos="fade-up">
                Through the Seed Accelerator Network, newly released and improved rice varieties are systematically multiplied and distributed to farmers, ensuring wider access to quality seeds. These varieties are not only high yielding but also better adapted to local conditions, which results in significant yield advantages per hectare. When this yield improvement is considered across the expanded acreage and monetized at prevailing farm-gate prices, the contribution becomes substantial. For India alone, the estimated average annual economic gain is about <span className="font-semibold text-green-700">USD 565 million</span>, reflecting the transformative potential of faster varietal turnover and seed system strengthening.
            </p>
        </section>
    );
}
