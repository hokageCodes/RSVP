import "./hero.css";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__content">
                <h1 className="hero__title">Celebrate Yomi and Emelda's Birthday with Us!</h1>
                <p className="hero__description">Join us for a fun-filled evening of celebration, and lots of laughter. It's going to be a blast!</p>
                <div className="hero__cta">
                <button className="btn btn--cta">RSVP Now</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
