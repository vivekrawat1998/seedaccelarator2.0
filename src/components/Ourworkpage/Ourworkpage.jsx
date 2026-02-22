import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typography from '../../ui/Heading';

// --- Data ---
const workStreams = [
  {
    title: "Research Collaboration and Insights",
    description:
      "Partnering with IRRI–NARES and agricultural experts to run adaptive trials. We analyze results to share impactful insights for smarter, data-driven strategies.",
    icon: '🔬',
    image: '/Research Collaboration and Insights.JPG',
  },
  {
    title: "Varietal Deployment and Positioning",
    description:
      "Introducing high-performing rice varieties in areas that benefit most — guided by local demand, adaptability, and environmental suitability.",
    icon: '🚀',
    image: '/Varietal deployment and positioning.JPG',
  },
  {
    title: "Seed System Strengthening",
    description:
      "Empowering farmers with access to improved seeds through awareness campaigns, testing, and validation across multiple regions.",
    icon: '🌾',
    image: '/Seed System Strengthening.jpg',
  },
  {
    title: "Market Research and Demand Creation",
    description:
      "Analyzing consumer trends and market needs to support breeding programs and ensure that new varieties match real-world market expectations.",
    icon: '📈',
    image: '/Market Research and Demand Creation.jpg',
  },
  {
    title: "Knowledge Sharing and Extension",
    description:
      "Hosting training sessions, on-field demonstrations, and awareness drives to promote sustainable farming practices and rice innovation.",
    icon: '📚',
    image: '/Knowledge Sharing and Extension.JPG',
  },
  {
    title: "Seed Business & Enterprise Development",
    description:
      "Supporting small-scale entrepreneurs and farmer cooperatives in building profitable, scalable seed businesses that sustain rural livelihoods.",
    icon: '₹',
    image: '/Seed Business & Enterprise Development.JPG',
  },
];

// --- Step Card with Image ---
const StepCard = ({ stream, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`flex flex-col md:flex-row items-center overflow-hidden justify-between gap-10 overflow-hidden mb-20 ${!isLeft ? 'md:flex-row-reverse' : ''
        }`}
      data-aos={isLeft ? 'fade-right' : 'fade-left'}
      data-aos-delay={150 * index}
    >
      {/* Text Section */}
      <div className="bg-white mt-10 rounded-2xl md:w-1/2  transition-transform ">
        <div className="flex items-start space-x-4">
          <Typography variant="h1" className=" mb-2">
            {stream.title}
          </Typography>
        </div>
        <Typography variant="h3" className=" mb-2">
          {stream.description}
        </Typography>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={stream.image}
          alt={stream.title}
          className="w-full h-[50vh] object-cover  shadow-md hover:shadow-xl transition-transform hover:scale-105"
        />
      </div>
    </div>
  );
};

// --- Main Component ---
const OurWorkDownstairsFlow = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-quad', once: true });
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 min-h-screen">
      {/* Intro Section */}
      <div className="container mx-auto text-center mb-16">
        <Typography variant='h1'>
          Our Strategic Work Streams 🌱
        </Typography>

        <p className="text-lg md:text-xl mt-2 font-Karla text-gray-700 max-w-3xl mx-auto">
          At <strong>AccelerateSeeds</strong>, our mission is to strengthen the seed ecosystem
          through science, innovation, and collaboration.
          We work closely with researchers, farmers, and markets to create sustainable agricultural growth.
        </p>
      </div>
      <div className='grid md:grid-cols-2'>
        {/* Map Section */}
        <div className="grid place-items-center mb-24">
          <img
            src="/our work.png"
            alt="Our Work Map"
            className="w-[80vh] h-full object-cover rounded-xl"
          />
        </div>

        {/* New Content Before Map */}
        <div className="max-w-4xl mx-auto ">
          <Typography
            variant="h1" className='mb-5'
          >
            Transforming Agriculture Through Collaboration
          </Typography>

          <p className="text-gray-700 text-lg font-Karla mx-auto mb-4">
            From research to market, every step of our process is designed to empower farmers,
            improve productivity, and ensure food security through innovation and inclusivity.
          </p>
          <p className="text-gray-700 text-lg font-Karla mx-auto mb-4">
            We bring together farmers, scientists, and technology experts to develop
            sustainable solutions for real-world agricultural challenges — ensuring that
            every harvest is smarter, cleaner, and more profitable.
          </p>
          <p className="text-gray-700 text-lg font-Karla mx-auto ">
            Through collaboration and community-driven innovation, we’re helping rural
            farmers adopt modern practices, optimize resource usage, and connect directly
            with markets for fair value and transparency.
          </p>

        </div>
      </div>

      {/* Work Streams (Cards + Images) */}
      <div className="container mx-auto overflow-hidden  flex flex-col">
        {workStreams.map((stream, idx) => (
          <StepCard key={idx} stream={stream} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default OurWorkDownstairsFlow;
