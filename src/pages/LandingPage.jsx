import React from 'react'
import EventInfo from '../components/eventInfo'
import FunGames from '../components/funandgames'
import Hero from '../components/hero'
import RSVPForm from '../components/RSVP'
import RSVPCount from '../components/RsvpCount'
import SimpleSlider from '../components/swiper/Carousel'


export default function LandingPage() {
    return (
        <div>
            <Hero />
            <EventInfo />
            <SimpleSlider />
            <RSVPForm />
            <RSVPCount />
            <FunGames />
        </div>
    )
}
