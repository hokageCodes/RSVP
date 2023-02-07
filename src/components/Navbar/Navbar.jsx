import Logo from '../../assets/HW.png'
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className='nav__container'>
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <div className="nav__links">
                <ul>
                    <li>Home</li>
                    <li>Key Details</li>
                    <li>Map</li>
                    <li>Gallery</li>
                    <li>Details</li>
                    <li>Getting There</li>
                    <li>Dress Code</li>
                    <li>RSVP</li>
                </ul>
            </div>
        </nav>
    )
}
