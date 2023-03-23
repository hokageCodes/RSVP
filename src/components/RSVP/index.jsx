import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/database';
import { useState } from 'react';
import './rsvp.css'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAWnNCLZg8ObNGN8d0WLGZR7eLObcNnc4g",
  authDomain: "rsvp-17c7b.firebaseapp.com",
  projectId: "rsvp-17c7b",
  storageBucket: "rsvp-17c7b.appspot.com",
  messagingSenderId: "287348157655",
  appId: "1:287348157655:web:4af470413717f656189492"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function RSVPForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add RSVP to database
    const newRSVPRef = database.ref('rsvps').push();
    newRSVPRef.set({
      name,
      phone,
      email,
      attendance,
      additionalInfo,
    })
      .then(() => {
        setSuccessMessage('Thank you for RSVPing!');
        setErrorMessage('');
        setName('');
        setPhone('');
        setEmail('');
        setAttendance('yes');
        setAdditionalInfo('');
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage('Error submitting RSVP: ' + error.message);
      });
  };
  const formatCountText = (count) => {
    if (count === 1) {
      return `${count} person`;
    } else {
      return `${count} people`;
    }
  };

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
	    <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="phone">Phone Number</label>
      <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

      <label htmlFor="email">Email Address</label>
      <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label htmlFor="attendance">Will you be attending?</label>
      <select id="attendance" name="attendance" value={attendance} onChange={(e) => setAttendance(e.target.value)} required>
        <option value="yes">Yes, I will be attending</option>
        <option value="no">No, I will not be attending</option>
      </select>

      <label htmlFor="additional-info">Additional Information</label>
      <textarea id="additional-info" name="additional-info" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)}></textarea>

      <button type="submit">Submit</button>
    </form>
  );
}

export default RSVPForm;
