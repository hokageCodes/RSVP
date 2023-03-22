import React, { useState, useEffect } from "react";
import "firebase/auth";
import "firebase/firestore";
import { validateEmail } from "../utils";
import { ExcelRenderer } from "react-excel-renderer";
import { ExcelFile, ExcelSheet, ExcelColumn } from "react-export-excel";

const RsvpForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("rsvps")
      .onSnapshot((snapshot) => {
        let yes = 0;
        let no = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
  
          if (data.response === "yes") {
            yes++;
          } else if (data.response === "no") {
            no++;
          }
        });
  
        setYesCount(yes);
        setNoCount(no);
      });

    return () => unsubscribe();
  }, []);

  // const validateForm = () => {
  //   if (!name || !phone || !email || !response) {
  //     setError("Please fill out all required fields.");
  //     return false;
  //   }
  
  //   if (!validateEmail(email)) {
  //     setError("Please enter a valid email address.");
  //     return false;
  //   }
  
  //   setError("");
  //   return true;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
  
    try {
      const { currentUser } = auth;
      const data = {
        name,
        phone,
        email,
        response,
        additionalInfo,
        createdAt: new Date(),
        createdBy: currentUser.uid,
      };
  
      await firestore.collection("rsvps").add(data);
  
      setName("");
      setPhone("");
      setEmail("");
      setResponse("");
      setAdditionalInfo("");
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  
    setLoading(false);
  };

  const handleExport = async () => {
    try {
      const rsvpsRef = firestore.collection("rsvps");
      const snapshot = await rsvpsRef.get();
      const rsvps = snapshot.docs.map((doc) => doc.data());
    
      const excelData = rsvps.map((rsvp) => ({
        Name: rsvp.name,
        "Phone Number": rsvp.phone,
        Email: rsvp.email,
        "Response Type": rsvp.response,
        "Additional Info": rsvp.additionalInfo,
      }));
    
      const fileName = "rsvp_data.xlsx";
    
      ExcelRenderer(excelData, fileName);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleSignIn = async () => {
    try {
      const provider = new auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
<form onSubmit={handleSubmit}>
<label>
Name:
<input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
required
/>
</label>
<label>
Phone number:
<input
type="tel"
value={phone}
onChange={(e) => setPhone(e.target.value)}
required
/>
</label>
<label>
Email:
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</label>
<label>
Are you coming?
<select
value={response}
onChange={(e) => setResponse(e.target.value)}
required
>
<option value="">Please select</option>
<option value="yes">Yes, I'll be there!</option>
<option value="no">No, I can't make it.</option>
</select>
</label>
<label>
Additional info:
<textarea
value={additionalInfo}
onChange={(e) => setAdditionalInfo(e.target.value)}
/>
</label>
{error && <p>{error}</p>}
<button type="submit" disabled={loading}>
{loading ? "Submitting..." : "Submit"}
</button>
<button onClick={handleSignIn}>Sign In</button>
</form>
{success && <p>Thank you for your RSVP!</p>}
<div>
<p>Number of RSVPs:</p>
<ul>
<li>Yes: {yesCount}</li>
<li>No: {noCount}</li>
</ul>
<button onClick={handleExport}>Export to Excel</button>
</div>
</>
);
}

export default RsvpForm;

