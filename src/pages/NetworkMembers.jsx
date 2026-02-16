import React, { useEffect, useRef, useState } from "react";
import DashboardStatsSection from "../components/networkpage/Dashboardoverview";
import NetworkMembersHero from "../components/networkpage/Networkmemberhero";
import CoolStatsTables from "../components/networkpage/Coolstatstable";
import RegistrationForm from "../components/networkpage/Registrationform";
import SeedScalingTerms from "../components/networkpage/Seedterms";
import { Link, useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { san1Participants, San2Participants } from "../utils/Networkmembers";
import BreederRegistrationForm from "../components/networkpage/Breederloginsection";
import RegistrationPage from "../components/networkpage/Registerationsection";

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


const NetworkMembersFootprintsPage = () => {

  const registrationFormRef = useRef(null);
  const location = useLocation();
  const [registerAs, setRegisterAs] = useState("");

  useEffect(() => {
    if (location.hash === "#register" && registrationFormRef.current) {
      registrationFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);
  return (
    <div className="bg-white to-slate-100 min-h-screen py-12 px-2 font-sans">
      <NetworkMembersHero />
      <DashboardStatsSection />
      <CoolStatsTables />
      <div className=" md:gap-10 md:px-10  ">
        <section className="  md:mt-10 mx-auto mb-20 bg-white rounded-3xl ">
          <h2 className="md:text-2xl text-lg mb-10 font-bold text-green-800 mb-6 text-center font-parkinsans tracking-wide">Seed Acclerator Network 1.0 Participation</h2>
          <div className="overflow-auto max-h-[500px]  rounded-md">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-prime text-white font-parkinsans  sticky top-0">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">S.No.</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Organization</th>
                </tr>
              </thead>
              <tbody>
                {san1Participants.map(({ id, name, organization }) => (
                  <tr key={id} className={`odd:bg-green-50 font-Nunito even:bg-white`}>
                    <td className="border border-gray-300 px-4 py-2">{id}.</td>
                    <td className="border border-gray-300 px-4 py-2">{name}</td>
                    <td className="border border-gray-300 px-4 py-2">{organization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Marquee>
            {
              images.map((image, index) => (
                <div key={index} className="mx-4 mt-10 flex items-center justify-center">
                  <img src={image.src} alt={image.alt} className="h-20 object-cover" />
                </div>
              ))
            }
          </Marquee>
        </section>
        <section className=" mb-20 bg-white md:mt-10 rounded-3xl  ">
          <h2 className="md:text-2xl text-lg font-parkinsans mb-10 font-bold text-green-800 mb-6 text-center tracking-wide">
            Seed Acclerator Network 2.0 Participation
          </h2>
          <div className="overflow-auto max-h-[500px] border border-green-300 rounded-md">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-prime  text-white font-parkinsans sticky top-0">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">S.No.</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Organization</th>
                </tr>
              </thead>
              <tbody>
                {San2Participants.map(({ id, name, organization }) => (
                  <tr key={id} className={`odd:bg-green-50 font-Nunito even:bg-white`}>
                    <td className="border border-gray-300 px-4 py-2">{id}.</td>
                    <td className="border border-gray-300 px-4 py-2">{name}</td>
                    <td className="border border-gray-300 px-4 py-2">{organization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Marquee>
            {
              images2.map((image, index) => (
                <div key={index} className="mx-4 mt-10 flex items-center justify-center">
                  <img src={image.src} alt={image.alt} className="h-20 object-cover" />
                </div>
              ))
            }
          </Marquee>

        </section>
      </div>
      <div className="w-full mb-10 grid place-items-center mt-4">
        <Link to="/network-members#register" className="bg-prime rounded-md animate-bounce px-6 py-2 font-parkinsans cursor-pointer hover:bg-yellow-700 text-white font-semibold" >Become a Member </Link>
      </div>
      <div ref={registrationFormRef}>
        <RegistrationPage />
      </div>
    </div>
  )
}



export default NetworkMembersFootprintsPage;
