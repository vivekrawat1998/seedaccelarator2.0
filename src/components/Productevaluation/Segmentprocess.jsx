// SegmentationProcessSection.jsx

import React from 'react';

const segmentationData = [
    {
        title: 'Species',
        items: [
            'Oryza sativa Indica',
            'Oryza sativa tropical japonica',
            'Oryza sativa temperate japonica',
            'Oryza sativa Basmati'
        ],
    },
    {
        title: 'Establishment',
        items: [
            'Direct Seeded (dry and puddled)',
            'Transplanted'
        ],
    },
    {
        title: 'Duration',
        items: [
            'Early (≤ 125 days)',
            'Medium (125-135 days)',
            'Late (≥ 135 days)'
        ],
    },
    {
        title: 'Grain Shape',
        items: [
            'Long (L:B >3)',
            'Medium (L:B 2-3)',
            'Short/round (L:B <2)'
        ],
    },
    {
        title: 'Texture',
        items: [
            'Firm and dry (Am>25%)',
            'Soft (Am 20-25%)',
            'Sticky (Am 10-20%)',
            'Waxy (Am <2%)'
        ],
    },
    {
        title: 'Ecosystem',
        items: [
            'Upland',
            'Rainfed Lowland (shallow and deep)',
            'Semi deep and deepwater',
            'Irrigated lowland'
        ],
    },
];

const SegmentationProcessSection = () => (
    <section className="w-full container mx-auto my-10 rounded-3xl  px-6 py-10">
        <h2 className="text-4xl text-center font-extrabold mb-6 text-prime font-parkinsans tracking-tight">
            Segmentation Process
        </h2>
        <div className="grid md:grid-cols-2 gap-y-8 gap-x-8">
            {segmentationData.map((segment, idx) => (
                <div
                    key={segment.title}
                    className="bg-green-50 border-l-8 border-green-700 rounded-xl p-5 shadow flex flex-col"
                >
                    <div className="font-bold font-parkinsans text-green-900 text-xl mb-2">
                        {segment.title}
                    </div>
                    <ul className="list-disc ml-5">
                        {segment.items.map((item, j) => (
                            <li key={j} className="text-gray-800 font-Nunito mb-1">{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

export default SegmentationProcessSection;
