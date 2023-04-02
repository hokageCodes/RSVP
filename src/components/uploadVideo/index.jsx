import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import './uploadform.css'

const UploadForm = () => {
  const [video, setVideo] = useState(null);
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
      <button disabled={!video}>Upload</button>
    </form>
  );
};

export default UploadForm;
