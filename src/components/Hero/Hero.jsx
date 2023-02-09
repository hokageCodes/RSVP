import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [attendance, setAttendance] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        const eventDate = new Date("2023-07-29T18:30:00");
        const currentDate = new Date();
        const difference = eventDate - currentDate;

        if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((difference / 1000 / 60) % 60));
        setSeconds(Math.floor((difference / 1000) % 60));
        }
    }, []);

    const handleFormOpen = () => {
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
    };


    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleInputChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value
        });
    };

    // const handleFormSubmit = (event) => {
    //     event.preventDefault();

    //     firebase.database().ref('heroSectionForm').push().set({
    //     name: formData.name,
    //     email: formData.email
    //     });

    //     setFormData({ name: '', email: '' });
    // };

    return (
        <div className="hero">
        <div className="hero-content">
            <h1 className="hero-title">Birthday Celebration!!!</h1>
            <p className="hero-subtitle">
            Yomi Ogunde & Emelda Ogunde
            </p>
            <div className="hero-countdown">
            <p>The celebration begins in:</p>
            <div className="countdown">
                <div className="countdown-item">
                <p className="countdown-value">{days}</p>
                <p className="countdown-label">Days</p>
                </div>
                <div className="countdown-item">
                <p className="countdown-value">{hours}</p>
                <p className="countdown-label">Hours</p>
                </div>
                <div className="countdown-item">
                <p className="countdown-value">{minutes}</p>
                <p className="countdown-label">Minutes</p>
                </div>
                <div className="countdown-item">
                <p className="countdown-value">{seconds}</p>
                <p className="countdown-label">Seconds</p>
                </div>
            </div>
            </div>
            <button className="reserve" onClick={handleFormOpen}>
            Reserve A Spot
            </button>
        </div>
        {showForm && (
            <div className="form-overlay">
                <form className="form-container">
                    <h2 className="form-title">Reserve Your Spot</h2>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="form-input"
                        value={fullName}
                        onChange={handleInputChange}
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="form-input" 
                        value={email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="form-input"
                        value={phoneNumber}
                        onChange={handleInputChange}
                    />
                    <select
                        className="form-input"
                        value={attendance}
                        onChange={handleInputChange}
                        >
                        <option value="" disabled>
                            Will you be attending for sure?
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <button className="form-button">Submit</button>
                    <button className="form-close" onClick={handleFormClose}>
                        ×
                    </button>
                </form>
            </div>
            )}
        </div>
    );
};

export default Hero;



