import React from 'react'
import Hero from './homeComponents/Hero'
import HomeContent from './homeComponents/HomeContent'

export default function HomePage() {
  return (
    <div className='bg-slate-900'>
        <Hero />
        <HomeContent />
    </div>
  )
}
