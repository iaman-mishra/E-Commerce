import React from 'react'
import Hero from '../components/Hero'
import LatesCollection from '../components/LatesCollection.jsx'
import BestSeller from '../components/BestSeller.jsx'
import OurPolicies from '../components/OurPolicies.jsx'
import NewsLetterBox from '../components/NewsLetterBox.jsx'

const Home = () => {
  
  return (
    <div>
      <Hero />
      <LatesCollection />
      <BestSeller/>
      <OurPolicies/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home