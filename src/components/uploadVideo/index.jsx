import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import './uploadform.css'

const UploadForm = () => {
  const [video, setVideo] = useState(null);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.includes('video')) {
      setVideo(selected);
      setError(null);
    } else {
      setVideo(null);
      setError('Please select a video file (mp4, mov, or avi)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    const storageRef = firebase.storage().ref(`videos/${video.name}`);
    const uploadTask = storageRef.put(video);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
        setError('Failed to upload the video. Please try again later.');
        setUploading(false);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log('Video URL:', url);
          setUploading(false);
          setVideo(null);
        });
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="file" onChange={handleChange} />
        <span>Select a video file (mp4, mov, or avi)</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {uploading && <div className="loading">Uploading...</div>}
        {video && <div>{video.name}</div>}
      </div>
      <label>
        <span>Name:</span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        <span>Relationship to celebrant:</span>
        <select value={relationship} onChange={(e) => setRelationship(e.target.value)}>
          <option value="">Select one</option>
          <option value="Family">Family</option>
          <option value="Friend">Friend</option>
          <option value="Colleague">Colleague</option>
        </select>
      </label>
      <label>
        <span>Location:</span>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <button disabled={!video}>Upload</button>
      <p>Instructions: Please record a video message to congratulate the celebrant on their special occasion. The recommended video length is between 30 seconds to 2 minutes. Please ensure the video is in mp4, mov, or avi format and the content is appropriate for all ages.</p>
    </form>
  );
};

export default UploadForm;
