import React from "react";
import Typography from "../../ui/Heading";

// Update the image path or import as required
const networkMapImg = "/evaluationparnter.png"; // Place the actual image in your public folder or import if using bundler

export default function EvaluationPartners() {
    return (
        <section className="bg-white rounded-lg  my-10">

            <div className="flex flex-col md:flex-row gap-7">
                <div className="md:w-1/2 flex flex-col justify-center">
                    <Typography variant="h1" >
                        Evaluation Partners
                    </Typography>
                    <Typography variant="p" >
                        Conducted in a very structured manner, in India, IRRI partners with Krishi Vigyan Kendras
                        (KVKs or Farm Science Centres), State Agriculture Universities (SAUs), linked Non Government Organizations (NGOs)
                        and Community Based Organizations (CBOs) to ensure robust product evaluation.
                    </Typography>
                    <Typography variant="h1" className="mt-10" >The KVK and NGO Network (2022-25)</Typography>
                    <Typography variant="p">
                        The map shows the nationwide network of KVKs and NGOs engaged with IRRI in multi-location evaluation, ensuring
                        inclusive, field-level engagement and result validation across India’s diverse agro-ecologies.
                    </Typography>
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
