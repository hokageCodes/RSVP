import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

import './uploadform.css';

function UploadForm({ onUploadComplete }) {
  const [name, setName] = useState('');
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [error, setError] = useState(null);

  const storageRef = firebase.storage().ref();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!name || !video) {
      return;
    }

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const videoRef = storageRef.child(`videos/${video.name}`);
      const uploadTask = videoRef.put(video);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, (error) => {
        setError(error.message);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newVideo = {
            name,
            url: downloadURL,
            timestamp: new Date(),
          };
          setUploadedVideos([...uploadedVideos, newVideo]);
          setName('');
          setVideo(null);
          setUploading(false);
          onUploadComplete();
        });
      });
    } catch (error) {
      setError(error.message);
      setProgress(0);
      setUploading(false);
    }
  };

  const handleClearError = () => {
    setError(null);
  };

  return (
    <div className="upload-form">
    <h3>Upload a 60 second video:</h3>
    <div className="upload-form__input-container">
    <div className="upload-form__input-wrapper">
    <input
             type="text"
             value={name}
             onChange={handleNameChange}
             placeholder="Enter your name"
             required
           />
    <label className="upload-form__label">Your Name:</label>
    </div>
    <div className="upload-form__input-wrapper">
    <input
             type="file"
             accept="video/*"
             onChange={handleVideoChange}
             required
           />
    <label className="upload-form__label">Upload a video:</label>
    </div>
    {video && (
    <div className="upload-form__video-preview">
    <video
               src={URL.createObjectURL(video)}
               controls
               className="upload-form__video-preview"
             />
    </div>
    )}
    {uploading && (
      <div className="upload-form__progress-container">
        <div className="upload-form__progress-bar">
          <div className="upload-form__progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="upload-form__progress-text">{`${progress}%`}</span>
      </div>

    )}
    {error && (
    <div className="upload-form__error-container">
    <span className="upload-form__error-message">{error}</span>
    <button className="upload-form__error-clear-button" onClick={handleClearError}>
    Clear
    </button>
    </div>
    )}
    <button
    className="upload-form__submit-button"
    disabled={!name || !video || uploading}
    onClick={handleUpload}
    >
    {uploading ? "Uploading..." :"Upload Video"}
    </button>
    </div>
    </div>
    );
    }
    
    export default UploadForm;
    
    
    
    