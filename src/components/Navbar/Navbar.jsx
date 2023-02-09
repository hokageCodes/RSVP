import Logo from '../../assets/HW.png'
import './Navbar.css'
import {GiShamblingZombie} from 'react-icons/gi'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const [showNabar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNabar)
    }

    return(
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <GiShamblingZombie />
                </div>
                <div className={`nav-elements ${showNabar && 'active'}`}>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Key Details</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Map</NavLink>
                        </li>
                        <li>
                            <NavLink to="/gallery">Gallery</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Dress Code</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Directions</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">RSVP</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}