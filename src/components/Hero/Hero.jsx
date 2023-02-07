import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [attendance, setAttendance] = useState("");

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

    // const handleFormOpen = () => {
    //     setShowForm(true);
    // };

    // const handleFormClose = () => {
    //     setShowForm(false);
    // };

    return (
        <div className="hero">
        <div className="hero-content">
            <h1 className="hero-title">Birthday Celebration!!!</h1>
            <p className="hero-subtitle">
            Yomi Ogunde & Emelda Ogunde
            </p>
            <div className="hero-countdown">
                <p className="date">29th July, 2023</p>
                <p className="celeb">The celebration begins in:</p>
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
            <button className="reserve">
                Reserve A Spot
            </button>
        </div>
        </div>
    );
};

export default Hero;



