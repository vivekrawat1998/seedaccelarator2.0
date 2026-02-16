import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SeedScalingTerms = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section
      className="max-w-7xl mx-auto my-12 bg-white rounded-2xl px-3 md:px-6 py-8"
    >
      <h2
        className="md:text-3xl text-md font-parkinsans font-extrabold text-green-800 mb-6 text-center"
        data-aos="fade-up"
      >
        Seed Scaling Program: Terms & Conditions
      </h2>
      <ul className="list-disc pl-6 space-y-4 mb-8 text-gray-900">
        <li data-aos="fade-up" data-aos-delay="50">
          <span className="font-parkinsans font-semibold">
            Open and Voluntary Membership:
          </span>
          <ul className="list-disc font-Nunito pl-6 mt-1 space-y-2 text-gray-700">
            <li data-aos="fade-up" data-aos-delay="100">
              Membership open to individuals and organizations in seed systems (startups, FPO/FPC, private/public sector, NGOs, research institutions, etc.).
            </li>
            <li data-aos="fade-up" data-aos-delay="150">
              Participation is voluntary, no membership fee.
            </li>
          </ul>
        </li>

        <li data-aos="fade-up" data-aos-delay="200">
          <span className="font-semibold font-parkinsans">
            Data Sharing for Seed Facilitation:
          </span>
          <ul className="list-disc font-Nunito pl-6 mt-1 space-y-2 text-gray-700">
            <li data-aos="fade-up" data-aos-delay="250">
              Institutions/groups sharing seed access must provide:
              <ul className="list-disc pl-6 mt-1">
                <li data-aos="fade-up" data-aos-delay="300">
                  Seed production data (crop, variety, quantity, location)
                </li>
                <li data-aos="fade-up" data-aos-delay="350">
                  Sales data (volume sold, region, impact, beneficiaries)
                </li>
              </ul>
            </li>
            <li data-aos="fade-up" data-aos-delay="400">
              This supports transparency, planning, and collective impact assessment.
            </li>
          </ul>
        </li>

        <li data-aos="fade-up" data-aos-delay="450">
          <span className="font-parkinsans font-semibold">
            No Royalty Liability on Listed Products:
          </span>
          <ul className="list-disc pl-6 mt-1 font-Nunito space-y-2 text-gray-700">
            <li data-aos="fade-up" data-aos-delay="500">
              No royalty charged by IRRI; terms by supplying institution if applicable.
            </li>
            <li data-aos="fade-up" data-aos-delay="550">
              Breeding lines are publicly available or by documented, legal route.
            </li>
            <li data-aos="fade-up" data-aos-delay="600">
              Follow national indent or direct request to relevant institution for special lines.
            </li>
          </ul>
        </li>

        <li data-aos="fade-up" data-aos-delay="650">
          <span className="font-semibold font-parkinsans">
            IRRI Disclaimer & Liability:
          </span>
          <ul className="list-disc pl-6 mt-1 font-Nunito text-gray-700">
            <li data-aos="fade-up" data-aos-delay="700">
              IRRI isn’t liable for seed quality of supplied/outsourced product.
            </li>
            <li data-aos="fade-up" data-aos-delay="750">
              No responsibility for commercial transactions or any deviation by third parties.
            </li>
            <li data-aos="fade-up" data-aos-delay="800">
              Role is technical coordination and enabling wider use—not brokering transactions.
            </li>
          </ul>
        </li>

        <li data-aos="fade-up" data-aos-delay="850">
          <span className="font-semibold font-parkinsans">
            Trade Name & Attribution Protocol:
          </span>
          <ul className="list-disc font-Nunito pl-6 mt-1 text-gray-700">
            <li data-aos="fade-up" data-aos-delay="900">
              Members must credit the original source for commercialized seeds (e.g., IRRI, ICAR, SAUs).
            </li>
            <li data-aos="fade-up" data-aos-delay="950">
              Non-compliance may face public scrutiny or reputational risk.
            </li>
            <li data-aos="fade-up" data-aos-delay="1000">
              Changes in varietal name or developer removal are at the member's risk.
            </li>
          </ul>
        </li>

        <li data-aos="fade-up" data-aos-delay="1050">
          <span className="font-semibold font-parkinsans">
            Compliance with Seed Laws & Ethics:
          </span>
          <ul className="list-disc pl-6 mt-1 font-Nunito text-gray-700">
            <li data-aos="fade-up" data-aos-delay="1100">
              Members must adhere to all national laws (Seed Act, PV&FR Act, etc.).
            </li>
            <li data-aos="fade-up" data-aos-delay="1150">
              Certifications/quality checks as per latest regulations.
            </li>
            <li data-aos="fade-up" data-aos-delay="1200">
              Commercialization must prioritize farmer benefit, local adaptation, and ethical practice.
            </li>
          </ul>
        </li>

        <li data-aos="fade-up" data-aos-delay="1250">
          <span className="font-semibold font-parkinsans">
            Collaboration over Competition:
          </span>
          <ul className="list-disc font-Nunito pl-6 mt-1 text-gray-700">
            <li data-aos="fade-up" data-aos-delay="1300">
              Promote sharing of seed access rather than competition.
            </li>
            <li data-aos="fade-up" data-aos-delay="1350">
              Support capacity building and training, technology sharing.
            </li>
          </ul>
        </li>
      </ul>
      <div
        className="bg-red-50 border-l-4 border-red-400 px-4 font-Nunito py-3 mb-4 text-sm text-red-800"
        data-aos="fade-up"
        data-aos-delay="1400"
      >
        <strong>Note:</strong> IRRI and the source institutions hold no responsibility for commercial transactions, seed quality, or non-attribution. All sharing is royalty-free unless otherwise noted; deviations or misattribution remain the responsibility of the scaling/commercializing party.
        <br />
        All data and impact must be reported as per agreement, and source credit must always be given.
      </div>
    </section>
  );
};

export default SeedScalingTerms;
