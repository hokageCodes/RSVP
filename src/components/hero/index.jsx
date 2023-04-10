import heroBg from "../../images/hero-bg.jpg";
import './hero.css'

const Hero = () => {
    return (
        <section
        className="hero"
        style={{ backgroundImage: `url(${heroBg})` }}
        >
        <div className="hero-content">
            <h1 className="hero-title">
            Celebrate and Party with Us!
            </h1>
            <p className="hero-description">
            Join us for a fun-filled evening of celebration, and lots of laughter.
            It's going to be a blast!
            </p>
            <div className="hero-cta">
            <a
                href="#rsvpform"
                className="cta-button "
            >
                RSVP
            </a>
            </div>
        </div>
        </section>
    );
};

export default Hero;
