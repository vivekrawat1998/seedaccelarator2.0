// SegmentationProcessSection.jsx

import React from 'react';
import Typography from '../../ui/Heading';

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
    <section className="w-full  mt-10    rounded-3xl  py-10">
        <Typography variant="h1" className="mb-5">
            Segmentation Process
        </Typography>

        <div className="grid md:grid-cols-2 gap-y-8 gap-x-8">
            {segmentationData.map((segment, idx) => (
                <div
                    key={segment.title}
                    className="bg-green-50 border-l-8 border-green-700 rounded-xl p-5 shadow flex flex-col"
                >
                    <Typography variant="h2">
                        {segment.title}
                    </Typography>
                    <ul className="list-disc ml-5">
                        {segment.items.map((item, j) => (
                            <li key={j} className="">
                                <Typography variant="h3" className="">
                                    {item} </Typography>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

export default SegmentationProcessSection;
