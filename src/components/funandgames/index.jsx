import React from 'react';
import { Link } from 'react-router-dom';

const LandingPageSection = () => {
    return (
        <section className="landing-page-section">
        <div className="landing-page-section-content">
            <h2>Join us in celebrating [Celebrant's Name]!</h2>
            <p>Answer a few questions about [Celebrant's Name], or upload a video to share your kind words.</p>
            <div className="cta-buttons">
            <Link to="/quiz" className="cta-button">Answer Questions</Link>
            <Link to="/upload" className="cta-button">Upload Video</Link>
            </div>
        </div>
        </section>
    );
}

export default LandingPageSection;
