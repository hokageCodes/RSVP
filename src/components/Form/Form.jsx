import React from 'react'

export default function Form() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleInputChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value
        });
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();

        firebase.database().ref('heroSectionForm').push().set({
        name: formData.name,
        email: formData.email
        });
        setFormData({ name: '', email: '' });
    };


    return (
        <div>
            <div className="form-overlay">
                <form className="form-container" onSubmit={handleFormSubmit}>
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
        </div>
    )
}
