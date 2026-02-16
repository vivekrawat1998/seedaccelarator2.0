import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- Color and Style Variables for Professional Look ---
const ACCENT_COLOR = '#FDC700'; // Muted Blue for a professional feel (replaces bright green)
const TEXT_COLOR = '#006401';
const SUBTLE_GREEN = '#a3c9a8'; // Used sparingly for a touch of nature/agriculture

// --- Data remains unchanged ---
const sections = [
  {
    title: "The Emerging Rice",
    image: "/the emerginf rice.png",
    caption: "India needs to fast-pace the adoption of emerging rice segments at vast agricultural base.",
  },
  {
    title: "Seeds: The Heart of Farming",
    image: "/seeds.png",
    caption: "Seeds determine yield, profitability, and resilience — yet older varieties dominate.",
  },
  {
    title: "From Research to Farmers’ Fields",
    images: [
      "/field 1.png",
      "/field 2.png",
      "/field3.png",
    ],
    caption: "Testing, positioning, advocating new varieties in real farming conditions to build trust.",
  },
  {
    title: "Challenges for Seed Accelerators",
    image: "/challenge .png",
    caption: "Seed accelerators struggle to access timely information and basic seeds of new varieties.",
  },
  {
    title: "The Birth of the Seed Accelerator Network (SAN)",
    image: "/birth of san .png",
    caption: "Seeds determine yield, profitability, and resilience — yet older varieties dominate.",
  },
  {
    title: "Stronger Seed Systems",
    image: "/stronger seed system.png",
    caption: "Improving seed availability, awareness campaigns, and enterprise development.",
  },
  {
    title: "Towards Resilient Farming Futures",
    image: "/Towards refarming.png",
    caption: "Faster varietal turnover means higher yields, better incomes, and climate resilience.",
  },
];

const beforeAfter = [
  {
    before: "/before.png",
    after: "/after.png",
    title: "Modern Irrigation Solutions",
    caption: "Rice fields before and after implementation of modern irrigation solutions.",
  },
];


// --- 1. Refactored BeforeAfterCard to fit the professional grid card design ---
function BeforeAfterCard({ item, index }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="flex flex-col bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-500 p-4"
    >


      <div className="flex flex-row gap-4 items-center w-full mb-4">
        {/* Before */}
        <div className="flex-1 relative rounded-lg overflow-hidden shadow-md">
          <img
            src={item.before}
            alt="Before"
            className="w-full h-54 object-cover rounded-lg"
          />
          <span className="absolute bottom-1 right-2 text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded-full">
            Before
          </span>
        </div>
        {/* After */}
        <div className="flex-1 relative rounded-lg overflow-hidden shadow-md">
          <img
            src={item.after}
            alt="After"
            className="w-full h-54 object-cover rounded-lg"
          />
          <span className="absolute bottom-1 right-2 text-xs font-bold text-white bg-green-600/70 px-2 py-0.5 rounded-full">
            After
          </span>
        </div>
      </div>

      {/* Title */}
      <h2  className="text-xl md:text-2xl font-extrabold text-prime  font-parkinsans text-center mt-2 mb-4">
        {item.title}
      </h2>

      {/* Caption */}
      <p className="text-sm md:text-base text-gray-600 font-medium font-Nunito text-center leading-relaxed">
        {item.caption}
      </p>
    </div>
  );
}

// --- 2. Main Component Refactored to Grid Card Layout ---
export default function RiceSectionsCombined() {
  const [showAll, setShowAll] = useState(false);

  // Logic to build the card array, interleaving the before/after section
  let cards = [];
  const sectionsToRender = showAll ? sections : sections.slice(0, 2); // Showing 3 cards + 1 BA card initially

  sectionsToRender.forEach((s, i) => {
    cards.push({ section: s, type: 'normal', index: cards.length });

    // Insert the Before/After section after the second normal section (index 1)
    if (i === 1) {
      cards.push({ item: beforeAfter[0], type: 'beforeafter', index: cards.length });
    }
  });


  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
    });
    AOS.refresh();
  }, [showAll]);

  return (
    <div className="min-h-screen  py-16 px-4">
      {/* Header */}
      <header

        className="max-w-4xl mx-auto text-center mb-16" data-aos="fade-down">
        <h1 style={{ color: TEXT_COLOR }} className="text-2xl md:text-5xl font-parkinsans font-extrabold mb-3">
          	Revolution in Rice Research
        </h1>

      </header>
      {/* Card Grid Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {cards.map((entry) =>
            entry.type === 'beforeafter' ? (
              <BeforeAfterCard key={'beforeafter-' + entry.index} item={entry.item} index={entry.index} />
            ) : (
              // Normal Section Card
              <div
                key={entry.index}
                data-aos="fade-up"
                data-aos-delay={entry.index * 100}
                className="flex flex-col bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden border-t-4"
                style={{ borderColor: ACCENT_COLOR }} // Use the blue accent for the border
              >
                {/* Image/Swiper Area */}
                <div className="relative w-full aspect-video overflow-hidden">
                  {entry.section.image && (
                    <img
                      src={entry.section.image}
                      alt={entry.section.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                    />
                  )}
                  {entry.section.images && (
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      spaceBetween={0}
                      slidesPerView={1}
                      autoplay={{ delay: 3500, disableOnInteraction: false }}
                      pagination={{ clickable: true }}
                      style={{ height: '100%', width: '100%', '--swiper-pagination-color': ACCENT_COLOR }}
                      className="rounded-t-xl"
                    >
                      {entry.section.images.map((img, sidx) => (
                        <SwiperSlide key={sidx}>
                          <img
                            src={img}
                            alt={`${entry.section.title} ${sidx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                </div>

                {/* Text Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 style={{ color: TEXT_COLOR }} className="font-extrabold font-parkinsans text-xl md:text-2xl mb-3">
                    {entry.section.title}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base font-Nunito leading-relaxed flex-grow">
                    {entry.section.caption}
                  </p>

                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* View More Button */}
      {!showAll && (
        <div className="flex justify-center mt-20">
          <button
            onClick={() => setShowAll(true)}
            data-aos="zoom-in"
            style={{ backgroundColor: ACCENT_COLOR }}
            className="text-white font-bold tracking-wider cursor-pointer font-parkinsans px-12 py-4 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl hover:opacity-90"
          >
            Show All {sections.length} Initiatives
          </button>
        </div>
      )}
    </div>
  );
}