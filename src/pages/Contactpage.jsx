import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ProfileSection from "../components/Profilesection";
import profileBg from '/hero/Contact us.jpg';

export default function ContactPage() {
  const [phone, setPhone] = useState('');

  // Allow only digits for phone input
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only accept digits, empty string allowed too
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  // Handle form submission: show alert popup and reset form
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for contacting us");
    // Optionally reset phone input (and could reset entire form if using controlled inputs)
    setPhone('');
    // You can also reset the entire form using e.target.reset() if inputs are uncontrolled
    e.target.reset();
  };

  return (
    <>
      <ProfileSection
        bgImage={profileBg}
        name="Contact Us"
        breadcrumbs={['Home', 'Contact us']}
      />
      <div className="min-h-screen bg-white font-parkinsans py-16 px-4 flex flex-col items-center">

        {/* Contact Form Card */}
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl px-8 py-12">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-extrabold text-green-800 mb-2">Get in Touch</h2>
          </div>
          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-800 mb-1 text-sm">Your Name*</label>
                <input
                  className="w-full px-3 py-2 rounded text-green-800 border-green-300 border shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-green-800 mb-1 text-sm">Your email*</label>
                <input
                  className="w-full px-3 py-2 rounded text-green-800 border-green-300 border shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-800 mb-1 text-sm">Your Phone*</label>
                <input
                  className="w-full px-3 py-2 rounded text-green-800 border-green-300 border shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                  type="text"
                  placeholder="Enter phone*"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
              <div>
                <label className="block text-green-800 mb-1 text-sm">Subject*</label>
                <input
                  className="w-full px-3 py-2 rounded text-green-800 border-green-300 border shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                  type="text"
                  placeholder="Enter subject*"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-green-800 mb-1 text-sm">Your message*</label>
              <textarea
                className="w-full px-3 py-2 rounded text-green-800 border-green-300 border shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                rows={4}
                placeholder="Write message"
                required
              />
            </div>
            <button
              className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-900 transition mt-4"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info Section + Map */}
        <div className="w-full max-w-7xl mt-10 grid grid-cols-1 xl:grid-cols-2 gap-10 mb-16">
          {/* Info Card */}
          <div className="bg-white  rounded-xl border border-green-100 px-10 py-12 flex flex-col gap-7 justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-start md:items-center">
                <FaMapMarkerAlt className="text-green-700 text-3xl mb-2" />
                <div className="font-bold text-green-800 font-parkinsans mb-2 text-lg">Headquarters</div>
                <div className="text-gray-800 text-base mb-2">
                  Pili Drive, Los Baños,<br />
                  Laguna 4031, Philippines
                </div>
                <div className="font-bold text-green-800  my-2 text-lg">Mailing Address</div>
                <div className="text-gray-700 text-sm mb-1">
                  DAPO Box 7777<br />
                  Metro Manila 1301,<br />
                  Philippines
                </div>
                <div className="text-gray-700 text-sm">
                  IRRI PO BOX 34499<br />
                  UPLB Post Office<br />
                  Los Baños, Laguna 4031 Philippines
                </div>
              </div>
              <div className="flex flex-col items-start md:items-center">
                <FaPhoneAlt className="text-green-700 text-3xl mb-2" />
                <div className="font-bold text-green-800  mb-2 text-lg">Contact Numbers</div>
                <div className="text-gray-800 text-base">+63 2 8580 5600</div>
                <div className="text-gray-800 text-base">+63 2 8845 0563</div>
                <div className="text-gray-800 text-base">+63 2 8580 5699</div>
                <div className="text-gray-800 text-base mb-2">+63 2 8845 0606</div>
              </div>
              <div className="flex flex-col items-start md:items-center">
                <FaEnvelope className="text-green-700 text-3xl mb-2" />
                <div className="font-bold text-green-800  mb-2 text-lg">Email Us</div>
                <div className="text-gray-800 text-base">info@irri.org</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 shadow-lg rounded-xl overflow-hidden flex items-center">
            <iframe
              title="IRRI Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246044.07251506368!2d120.95832447085655!3d14.177575943912557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd63fd3642235f%3A0x7cb761c875d697bb!2sInternational%20Rice%20Research%20Institute!5e0!3m2!1sen!2sph!4v1718035220006!5m2!1sen!2sph"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </>
  );
}
