import React from "react";

// Update the image path or import as required
const networkMapImg = "/evaluationparnter.png"; // Place the actual image in your public folder or import if using bundler

export default function EvaluationPartners() {
    return (
        <section className="bg-white rounded-lg  p-6 container mx-auto my-10">

            <div className="flex flex-col md:flex-row gap-7">
                <div className="md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4 font-parkinsans text-green-800">
                        Evaluation Partners
                    </h2>
                    <p className="text-gray-700 mb-4 font-Nunito text-base leading-relaxed">
                        Conducted in a very structured manner, in India, IRRI partners with Krishi Vigyan Kendras
                        (KVKs or Farm Science Centres), State Agriculture Universities (SAUs), linked Non Government Organizations (NGOs)
                        and Community Based Organizations (CBOs) to ensure robust product evaluation.
                    </p>
                    <h3 className="text-green-700 font-semibold mb-3 text-base font-parkinsans">The KVK and NGO Network (2022-25)</h3>
                    <p className="text-gray-700 text-sm font-Nunito leading-relaxed font-Nunito">
                        The map shows the nationwide network of KVKs and NGOs engaged with IRRI in multi-location evaluation, ensuring
                        inclusive, field-level engagement and result validation across India’s diverse agro-ecologies.
                    </p>
                </div>
                <div className="md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
                    <img
                        src={networkMapImg}
                        alt="KVK and NGO Network Map 2022-25"
                        className="w-full max-w-2xl mx-auto rounded "
                    />
                </div>

            </div>
        </section>
    );
}
