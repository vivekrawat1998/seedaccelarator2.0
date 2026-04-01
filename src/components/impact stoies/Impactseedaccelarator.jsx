import React, { useState } from "react";
import seedAcceleratorsData from "../../utils/Impactseedaccelaratordata";
import Typography from "../../ui/Heading";
import { ChevronDown } from "lucide-react";

export default function ImpactSeedAcceleratorsTable() {
    const [openState, setOpenState] = useState(0);

    return (
        <div className="container mx-auto mb-20 mt-16 px-4">

            {/* HEADER */}


            {/* MAIN CARD */}
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">

                {/* TABLE HEADER */}
                <div className="grid grid-cols-2 bg-prime text-black px-6 py-3 text-[20px] font-bold">
                    <span>Seed Accelerators</span>
                </div>

                {/* BODY */}
                {seedAcceleratorsData.map((group, index) => {
                    const isOpen = openState === index;

                    return (
                        <div key={index} className="border-t">

                            {/* STATE HEADER */}
                            <div
                                onClick={() => setOpenState(isOpen ? null : index)}
                                className="flex justify-between items-center px-6 py-3 bg-white text-black cursor-pointer"
                            >
                                <div className="flex gap-2 items-center">
                                    <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                                    <span className="font-semibold">{group.state}</span>
                                </div>

                                <ChevronDown
                                    className={`transition-transform ${isOpen ? "rotate-180" : ""
                                        }`}
                                />

                            </div>
                            {/* TABLE ROWS */}
                            <div
                                className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[300px]" : "max-h-0"
                                    }`}
                            >
                                <div className="overflow-y-auto max-h-[300px]">
                                    <div className="grid grid-cols-2 px-6 py-3 text-[16px] font-semibold bg-prime text-white">
                                        <span>Seed Accelerator</span>
                                        <span>Organization Type</span>
                                    </div>
                                    {group.data.map((item, i) => (
                                        <div
                                            key={i}
                                            className="grid grid-cols-2 overflow-y-auto px-6 py-2 border-b text-black bg-prime/20 font-Karla hover:bg-green-50"
                                        >
                                            <span>{item.name}</span>
                                            <span>{item.type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}