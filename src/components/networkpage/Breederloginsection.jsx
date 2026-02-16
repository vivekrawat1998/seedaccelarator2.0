import React, { useState } from "react";

// Modal popup component
const SuccessModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full flex flex-col items-center">
        <h3 className="text-xl font-parkinsans font-bold text-green-700 mb-4">Success!</h3>
        <p className="mb-6 font-Nunito text-center">Successfully registered as breeder!</p>
        <button
          onClick={onClose}
          className="bg-green-700 cursor-pointer font-parkinsans px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-600 shadow active:scale-95 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const BreederRegistrationForm = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // show the success modal
  };

  return (
    <>
      <section className="max-w-4xl mx-auto my-14 bg-white rounded-3xl p-8">
        <h2 className="text-2xl font-extrabold text-green-800 mb-6 font-parkinsans text-center">
          Register as Breeder
        </h2>
        <form className="space-y-4 cursor-pointer" onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3" required />
          </div>
          <div>
            <label>Designation</label>
            <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3" required />
          </div>
          <div>
            <label>Organization</label>
            <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3" required />
          </div>
          <div>
            <label>Mail id</label>
            <input type="email" className="w-full border border-gray-300 rounded-md py-2 px-3" required />
          </div>
          <div>
            <label>Phone no.</label>
            <input type="tel" className="w-full border border-gray-300 rounded-md py-2 px-3" required />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-green-700 text-white py-3 rounded-xl shadow hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </section>

      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default BreederRegistrationForm;
