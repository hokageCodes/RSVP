import React from 'react'
// import EventInfo from '../components/eventInfo'
import Hero from '../components/hero'
import RSVPForm from '../components/RSVP'
import SimpleSlider from '../components/swiper/Carousel'
import FunGames from '../components/funandgames'


export default function LandingPage() {
    return (
        <div>
            <Hero />
            <SimpleSlider />
            <RSVPForm />
            <FunGames />
        </div>
    )
}
