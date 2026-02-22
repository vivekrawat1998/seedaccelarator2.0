import React from "react";
import Typography from "../../ui/Heading";

const marketSegmentsData = [
    {
        id: 1,
        segment: "TEMS-I",
        maturity: "Early",
        features: "Transplanted early duration medium slender, soft grain rice for irrigated ecosystem"
    },
    {
        id: 2,
        segment: "DELS-I",
        maturity: "Early",
        features: "Direct seeded, early duration, long slender, soft grain rice for irrigated ecosystems"
    },
    {
        id: 3,
        segment: "DELS-R",
        maturity: "Early",
        features: "Direct seeded, early duration, long slender, soft grain rice for upland shallow areas"
    },
    {
        id: 4,
        segment: "DEMS-R",
        maturity: "Early",
        features: "Direct seeded, early duration, medium slender, soft grain rice for rainfed ecosystems"
    },
    {
        id: 5,
        segment: "TMeLS-I",
        maturity: "Medium",
        features: "Transplanted medium duration, long slender, soft grain type for irrigated rice"
    },
    {
        id: 6,
        segment: "DMeLS-R",
        maturity: "Medium",
        features: "Direct seeded, medium duration, long slender, soft grain type rice grown in rainfed areas"
    },
    {
        id: 7,
        segment: "DMeLS-I",
        maturity: "Medium",
        features: "Direct seeded, medium duration, long slender, soft grain type rice grown in irrigated areas"
    },
    {
        id: 8,
        segment: "TLaMF-I",
        maturity: "Late",
        features: "Transplanted, med-late duration, medium slender, firm and dry grain type for irrigated rice growing areas"
    },
    {
        id: 9,
        segment: "TLaSF-R",
        maturity: "Late",
        features: "Transplanted, late duration, small, firm grain type rice grown under rainfed areas"
    }
];

export default function MarketSegmentsTable() {
    return (
        <section className=" mt-10 ">
            <Typography variant="h1">
                Global Market Segments and Description
            </Typography>
            <Typography variant="h2">
                Below table describes the major rice market segments, their maturity group, and varietal features for each segment.
            </Typography>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white rounded text-left shadow ">
                    <thead>
                        <tr className="bg-green-200 font-parkinsans">
                            <th className="px-4 py-2 text-md font-semibold text-green-900">S.No</th>
                            <th className="px-4 py-2 text-md font-semibold text-green-900">Market Segments</th>
                            <th className="px-4 py-2 text-md font-semibold text-green-900">Maturity Segment</th>
                            <th className="px-4 py-2 text-md font-semibold text-green-900">Features</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marketSegmentsData.map(row => (
                            <tr key={row.id} className="odd:bg-green-50 font-Karla even:bg-white">
                                <td className="px-4 py-2 font-medium text-green-700">{row.id}</td>
                                <td className="px-4 py-2">{row.segment}</td>
                                <td className="px-4 py-2">{row.maturity}</td>
                                <td className="px-4 py-2">{row.features}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
