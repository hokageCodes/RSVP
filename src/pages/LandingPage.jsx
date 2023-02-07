import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Carousel from '../components/Carousel/Carousel'
import Party from '../components/PartyNow/Party'
import Directions from '../components/Directions/Directions'

export default function LandingPage() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Carousel />
            <Party />
            <Directions />
        </div>
    )
}
