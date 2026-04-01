import React from 'react'
import FilterPage from '../components/Productevaluation/Filterbystateandmarket'
import ProductInfoSection from '../components/Productevaluation/Productinfosection'
import MarketSegmentsTable from '../components/Productevaluation/Globalmarketsegment'
import MethodologySection from '../components/Productevaluation/Methodologysection'
import EvaluationPartners from '../components/Productevaluation/Evaluationpartner'
import StatisticalAnalysisSection from '../components/Productevaluation/Staticsanalysis'
import ProfileSection from '../components/Profilesection'
import ProductProfiles from '../components/Productevaluation/ProductProfiles'
import SegmentationProcessSection from '../components/Productevaluation/Segmentprocess'
import productImage from '/banner/Product Evalution_1920X600 px.jpg.jpeg';
import { Link } from 'react-router-dom'
import Typography from '../ui/Heading'

const Productpage = () => {
    return (
        <div className=' py-10'>
            <ProfileSection bgImage={productImage}
                name="Product Evaluation"
                breadcrumbs={['Home', 'Product Evaluation']} />
            <div className='container  px-4 mx-auto'>

                <ProductInfoSection />
                <SegmentationProcessSection />
                <MarketSegmentsTable />
                <MethodologySection />
                <EvaluationPartners />
                <StatisticalAnalysisSection />
                <FilterPage />
                <ProductProfiles />
            </div>
        </div>
    )
}
export default Productpage
