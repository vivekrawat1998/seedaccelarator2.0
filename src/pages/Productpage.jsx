import React from 'react'
import ProductFilter from '../components/ProductEvaluation'
import FilterPage from '../components/Productevaluation/Filterbystateandmarket'
import ProductInfoSection from '../components/Productevaluation/Productinfosection'
import MarketSegmentsTable from '../components/Productevaluation/Globalmarketsegment'
import MethodologySection from '../components/Productevaluation/Methodologysection'
import EvaluationPartners from '../components/Productevaluation/Evaluationpartner'
import StatisticalAnalysisSection from '../components/Productevaluation/Staticsanalysis'
import ProfileSection from '../components/Profilesection'
import ProductProfiles from '../components/Productevaluation/ProductProfiles'
import SegmentationProcessSection from '../components/Productevaluation/Segmentprocess'
import productImage from '/Product evaluation.jpg';
import { Link } from 'react-router-dom'

const Productpage = () => {
    return (
        <div className=''>
            <ProfileSection bgImage={productImage}
                name="Product Evaluation"
                breadcrumbs={['Home', 'Product Evaluation']} />

            <ProductInfoSection />
            <SegmentationProcessSection />
            <MarketSegmentsTable />
            <MethodologySection />
            <EvaluationPartners />
            <StatisticalAnalysisSection />
            <ProductFilter />
            <FilterPage />
            <ProductProfiles />
            <section
                className="py-10"
                data-aos="fade-up"
                data-aos-delay="150"
            >
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-xl md:text-2xl font-parkinsans font-semibold mb-3 text-green-700">
                        Join the Movement
                    </h2>
                    <p className="mb-6 font-Nunito">
                        SAN welcomes voluntary participation from seed corporations, research organizations, farmer producer companies, NGOs, and private sector innovators. Together, let’s accelerate progress and turn advancements in plant breeding into real benefits for communities across South Asia.
                    </p>
                     <Link to="contact"
                        className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
                    >
                        Contact us
                    </Link>
                </div>
            </section>
        </div>
    )
}
export default Productpage
