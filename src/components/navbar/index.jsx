import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
    const [toggleNav, setToggleNav] = useState(false);

    const handleToggleNav = () => {
        setToggleNav(!toggleNav);
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <NavLink exact to="/">
                    Yomi&amp;Emelda
                </NavLink>
            </div>
            <ul className={toggleNav ? "navbar__list active" : "navbar__list"}>
                <li className="navbar__item">
                    <NavLink
                        exact
                        to="/about"
                        activeClassName="navbar__item--active"
                        onClick={handleToggleNav}
                    >
                        About
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        exact
                        to="/gallery"
                        activeClassName="navbar__item--active"
                        onClick={handleToggleNav}
                    >
                        Gallery
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        exact
                        to="/videos"
                        activeClassName="navbar__item--active"
                        onClick={handleToggleNav}
                    >
                        Games
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        exact
                        to="/games"
                        activeClassName="navbar__item--active"
                        onClick={handleToggleNav}
                    >
                        FAQs
                    </NavLink>
                </li>
            </ul>
            <div className="navbar__cta">
                <button className="btn btn--cta">Reserve Spot</button>
            </div>
            <div className="navbar__icon" onClick={handleToggleNav}>
                {toggleNav ? <FaTimes /> : <FaBars />}
            </div>
        </nav>
    );
};

export default Navbar;
