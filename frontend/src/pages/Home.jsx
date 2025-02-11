import React from 'react'
import Hero from '../components/Hero'
import LatesCollection from '../components/LatesCollection.jsx'
import BestSeller from '../components/BestSeller.jsx'
import OurPolicies from '../components/OurPolicies.jsx'

const Home = () => {
  
  return (
    <div>
      <Hero />
      <LatesCollection />
      <BestSeller/>
      <OurPolicies/>
    </div>
  )
}

export default Home