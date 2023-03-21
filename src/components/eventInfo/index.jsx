import React from "react";
import "./eventInfo.css";

const EventInfo = () => {
  return (
    <div className="event-info-container">
      
      <div className="event-info-image">
        <img
          src="https://images.pexels.com/photos/7099900/pexels-photo-7099900.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="couple"
        />
      </div>
      <div className="event-info-text">
        <h2>Join us for our 30th Wedding Anniversary!</h2>
        <p>
          You're invited to celebrate with us on Saturday, May 14th, 2022 at
          7:00pm. The event will be held at the Grand Ballroom at the Plaza
          Hotel, 768 5th Ave, New York, NY 10019.
        </p>
        <p>
          There will be dinner, dancing, and lots of fun memories to be made.
          Dress code is formal attire.
        </p>
        <button className="btn-rsvp">RSVP Now</button>
      </div>
    </div>
  );
};

export default EventInfo;
