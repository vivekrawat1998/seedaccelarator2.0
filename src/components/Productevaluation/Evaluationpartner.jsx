import React from "react";
import Typography from "../../ui/Heading";
import SeedAcceleratorsTable from "./Seedaccelratortable";

// Update the image path or import as required
const networkMapImg = "/evaluationparnter.png";
// Place the actual image in your public folder or import if using bundler

export default function EvaluationPartners() {
    return (
        <section className="bg-white rounded-lg  my-10">

            <div className="mb-20">
                <div className="w-full flex flex-col justify-center">
                    <Typography variant="h1" >
                        Evaluation Partners
                    </Typography>
                    <Typography variant="h3" >
                        IRRI partners with Krishi Vigyan Kendras (KVKs or Farm Science Centres), State Agriculture Universities (SAUs), Non Government Organizations (NGOs) and Community Based Organizations (CBOs) in India to ensure robust product evaluation through a structured approach.
                    </Typography>
                    <SeedAcceleratorsTable />
                </div>
            </div>

                <Typography variant="h1" className="" >The KVK and NGO Network (2022-25)</Typography>
            <div className=" flex items-center justify-center mb-20">
                <img
                    src={networkMapImg}
                    alt="KVK and NGO Network Map 2022-25"
                    className="w-full max-w-2xl mx-auto rounded "
                />
            </div>
            <Typography variant="h3">
                The map shows the nationwide network of KVKs and NGOs engaged with IRRI in multi-location evaluation, ensuring
                inclusive, field-level engagement and result validation across India’s diverse agro-ecologies.
            </Typography>
        </section>
    );
}
