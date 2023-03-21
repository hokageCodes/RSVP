import React, { useState } from 'react';
import './rsvp.css';

const RSVPForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [isAttending, setIsAttending] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleGuestCountChange = (event) => {
    setGuestCount(parseInt(event.target.value));
  };

  const handleIsAttendingChange = (event) => {
    setIsAttending(event.target.value === 'yes');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Guest Count:', guestCount);
    console.log('Is Attending:', isAttending);
    // TODO: Submit the form data to the backend or display a confirmation message
  };

  return (
    <div className="rsvp-form-container">
      <h2>RSVP Form</h2>
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="guest-count">Number of Guests</label>
          <input type="number" id="guest-count" value={guestCount} onChange={handleGuestCountChange} min="1" max="10" />
        </div>
        <div className="form-group">
          <label htmlFor="attending">Are you attending?</label>
          <select id="attending" value={isAttending ? 'yes' : 'no'} onChange={handleIsAttendingChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RSVPForm;
