import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import VideoItem from "./Gallery";
import "./uploadform.css";

const UploadForm = () => {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.includes("video")) {
      setVideo(selected);
      setError(null);
    } else {
      setVideo(null);
      setError("Please select a video file (mp4, mov, or avi)");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!video) {
      setError("Please select a video file");
      return;
    }
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!relationship) {
      setError("Please select your relationship to the celebrant");
      return;
    }
    if (!location) {
      setError("Please enter your location");
      return;
    }

    setUploading(true);
    setError(null);

    const storageRef = firebase.storage().ref(`videos/${video.name}`);
    const uploadTask = storageRef.put(video);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        setError("Sorry, there was an error uploading your video.");
      },
      () => {
        storageRef.getDownloadURL().then((url) => {
          const newVideo = {
            name,
            relationship,
            location,
            url,
          };
          setVideos((prevVideos) => [...prevVideos, newVideo]);
          setVideo(null);
          setName("");
          setRelationship("");
          setLocation("");
          setProgress(0);
          setUploading(false);
        });
      }
    );
  };

  return (
    <div className="upload-form">
      <h2>Upload Video Greetings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="relationship">
            Your Relationship to the Celebrant:
          </label>
          <select
            id="relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="colleague">Colleague</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="location">Your Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          </div>
          <div className="form-control">
          <label htmlFor="video">Upload a Video Greeting:</label>
          <input type="file" id="video" onChange={handleChange} />
          {error && <div className="error">{error}</div>}
          </div>
          <button disabled={uploading} className="btn">
          {uploading ? "Uploading..." : "Upload"}
          </button>
          {progress > 0 && <progress value={progress} max="100" />}
          </form>
          {/* <div className="video-list">
          <h3>Video Greetings Received:</h3>
          {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
          ))}
          </div> */}
          </div>
          );
          };

export default UploadForm;





