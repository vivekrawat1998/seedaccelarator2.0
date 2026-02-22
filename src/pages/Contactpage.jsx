import React, { useState, useEffect, useCallback } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ProfileSection from "../components/Profilesection";
import api from "../api/axios";
import profileBg from '/hero/Contact us.jpg';

const categories = [
  "Farmer",
  "Student",
  "Private Company",
  "Government Organization",
  "FPO/FPC/NGO",
  "Others"
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // ✅ FIXED: Real-time validation with useCallback
  const validateField = useCallback((name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        error = value.trim() ? '' : 'Name is required';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = emailRegex.test(value) ? '' : 'Please enter a valid email';
        break;
      case 'phone':
        error = /^\d{10,15}$/.test(value) ? '' : 'Phone must be 10-15 digits';
        break;
      case 'category':
        error = value ? '' : 'Please select a category';
        break;
      case 'message':
        error = value.trim().length >= 10 ? '' : 'Message must be at least 10 characters';
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // ✅ Validate immediately
    validateField(name, value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 15);
    handleInputChange({
      target: {
        name: 'phone',
        value: value
      }
    });
  };

  // ✅ FIXED: Simpler form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email';
    if (!formData.phone || !/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = 'Phone must be 10-15 digits';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (formData.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // NO AXIOS - Direct fetch
      const response = await fetch('http://localhost:1337/api/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            category: formData.category,
            message: formData.message
          }
        })
      });

      console.log('STATUS:', response.status);
      console.log('HEADERS:', response.headers.get('allow'));

      const text = await response.text();
      console.log('RAW RESPONSE:', text);

      if (response.ok) {
        setSubmitStatus('✅ SUCCESS!');
      } else {
        setSubmitStatus(`❌ ${response.status}: ${text}`);
      }
    } catch (error) {
      setSubmitStatus('Network error');
    }
  };



  // ✅ FIXED: Better isFormValid logic
  const isFormValid = Object.values(errors).every(error => !error) &&
    formData.name.trim() &&
    formData.email &&
    formData.phone &&
    formData.category &&
    formData.message.trim().length >= 10;

  return (
    <>
      <ProfileSection
        bgImage={profileBg}
        name="Contact Us"
        breadcrumbs={['Home', 'Contact us']}
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50/50 to-white font-Nunito py-16 px-4 flex flex-col items-center">

        {/* Contact Form Card */}
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100/50 px-8 py-12 mx-4">
          <div className="flex flex-col items-center mb-10">
            <h2 className="md:text-5xl text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent mb-4 text-center">
              Get in Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
          </div>

          {submitStatus && (
            <div className={`mb-6 p-4 rounded-xl text-center font-semibold ${submitStatus.includes('successfully')
              ? 'bg-green-100 border-2 border-green-200 text-green-800'
              : 'bg-red-100 border-2 border-red-200 text-red-800'
              }`}>
              {submitStatus}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-800 mb-2 text-lg font-bold">Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl text-green-800 border-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-200/50 transition-all duration-300 ${errors.name
                    ? 'border-red-300 bg-red-50'
                    : formData.name.trim()
                      ? 'border-green-300 bg-green-50'
                      : 'border-green-200 hover:border-green-300'
                    }`}
                  type="text"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-green-800 mb-2 text-lg font-bold">Email Address *</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl text-green-800 border-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-200/50 transition-all duration-300 ${errors.email
                    ? 'border-red-300 bg-red-50'
                    : formData.email
                      ? 'border-green-300 bg-green-50'
                      : 'border-green-200 hover:border-green-300'
                    }`}
                  type="email"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-800 mb-2 text-lg font-bold">Phone Number *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-3 rounded-xl text-green-800 border-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-200/50 transition-all duration-300 ${errors.phone
                    ? 'border-red-300 bg-red-50'
                    : formData.phone
                      ? 'border-green-300 bg-green-50'
                      : 'border-green-200 hover:border-green-300'
                    }`}
                  type="tel"
                  placeholder="10-15 digits only"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-green-800 mb-2 text-lg font-bold">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl text-green-800 border-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-200/50 transition-all duration-300 font-semibold ${errors.category
                    ? 'border-red-300 bg-red-50'
                    : formData.category
                      ? 'border-green-300 bg-green-50'
                      : 'border-green-200 hover:border-green-300'
                    }`}
                >
                  <option value="">Select Category *</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-green-800 mb-2 text-lg font-bold">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className={`w-full px-4 py-3 rounded-xl text-green-800 border-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-200/50 resize-vertical transition-all duration-300 ${errors.message
                  ? 'border-red-300 bg-red-50'
                  : formData.message.trim().length >= 10
                    ? 'border-green-300 bg-green-50'
                    : 'border-green-200 hover:border-green-300'
                  }`}
                placeholder="Tell us how we can help you (min 10 characters)..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  {errors.message}
                </p>
              )}
            </div>

            {/* ✅ FIXED: Button now clickable */}
            <button
              className={`w-full py-4 px-8 rounded-xl font-bold text-lg shadow-xl transform transition-all duration-300 flex items-center justify-center gap-3 ${isSubmitting || !isFormValid
                ? 'bg-green-400 cursor-not-allowed opacity-70 shadow-green-300'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-400 hover:shadow-green-500 hover:-translate-y-1 active:scale-95'
                }`}
              type="submit"
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  ✉️ Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Section + Map - UNCHANGED */}
        <div className="w-full max-w-7xl mt-16 grid grid-cols-1 xl:grid-cols-2 gap-10 mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100/50 shadow-2xl px-10 py-12 flex flex-col gap-8 justify-center hover:shadow-3xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-green-800 font-parkinsans text-center mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-start md:items-center group hover:scale-105 transition-all duration-300">
                <FaMapMarkerAlt className="text-green-600 text-4xl mb-4 group-hover:scale-110 transition-all duration-300" />
                <div className="font-bold text-xl text-green-800 font-parkinsans mb-3">Headquarters</div>
                <div className="text-gray-700 font-Karla text-base mb-3 leading-relaxed">
                  Pili Drive, Los Baños,<br />
                  Laguna 4031, Philippines
                </div>
                <div className="w-full h-px bg-gradient-to-r from-green-200 to-transparent"></div>
                <div className="font-bold text-lg text-green-800 mt-3 font-parkinsans">Mailing Address</div>
                <div className="text-gray-700 font-Karla text-sm leading-relaxed mt-1">
                  DAPO Box 7777<br />
                  Metro Manila 1301,<br />
                  Philippines<br /><br />
                  IRRI PO BOX 34499<br />
                  UPLB Post Office<br />
                  Los Baños, Laguna 4031
                </div>
              </div>

              <div className="flex flex-col items-start md:items-center">
                <FaPhoneAlt className="text-green-600 text-4xl mb-4" />
                <div className="font-bold text-xl text-green-800 font-parkinsans mb-4">Contact Numbers</div>
                <div className="space-y-1 text-gray-800 text-lg font-medium">
                  <div>+63 2 8580 5600</div>
                  <div>+63 2 8845 0563</div>
                  <div>+63 2 8580 5699</div>
                  <div>+63 2 8845 0606</div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-center">
                <FaEnvelope className="text-green-600 text-4xl mb-4" />
                <div className="font-bold text-xl text-green-800 font-parkinsans mb-4">Email Us</div>
                <div className="text-gray-800 text-lg font-semibold bg-green-50 px-4 py-2 rounded-xl border-2 border-green-100 hover:bg-green-100 transition-all duration-200 cursor-pointer">
                  <a href="mailto:info@irri.org" className="hover:underline">info@irri.org</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 shadow-2xl rounded-2xl overflow-hidden border border-green-200/50 hover:shadow-3xl transition-all duration-300">
            <div className="bg-green-600 text-white px-6 py-4 font-semibold">
              📍 Find Us on Map
            </div>
            <iframe
              title="IRRI Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246044.07251506368!2d120.95832447085655!3d14.177575943912557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd63fd3642235f%3A0x7cb761c875d697bb!2sInternational%20Rice%20Research%20Institute!5e0!3m2!1sen!2sph!4v1718035220006!5m2!1sen!2sph"
              width="100%"
              height="450"
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
