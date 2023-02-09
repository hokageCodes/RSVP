import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Carousel from '../components/Carousel/Carousel'
import Party from '../components/PartyNow/Party'
import Directions from '../components/Directions/Directions'
import DressCode from '../components/DressCode/DressCode'
import Footer from '../components/Footer/Footer'

export default function LandingPage() {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Hero />
                <Carousel />
                <Party />
                <Directions />
                <DressCode />
                <Footer />
            </BrowserRouter>
        </div>
    )
}
