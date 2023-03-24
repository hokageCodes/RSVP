import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

import { Button, Progress } from 'semantic-ui-react';

function UploadForm() {
  const [name, setName] = useState('');
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const storage = firebase.storage();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleUpload = () => {
    setUploading(true);
    const uploadTask = storage.ref(`videos/${video.name}`).put(video);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('videos')
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUploading(false);
          });
      }
    );
  };

  return (
    <div>
      <h3>Upload a 60 second video:</h3>
      <div>
        <label>
          Your Name:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
      </div>
      <div>
        <input type="file" accept="video/*" onChange={handleVideoChange} required />
      </div>
      {uploading && <Progress percent={progress} indicating />}
      <Button primary onClick={handleUpload} disabled={!name || !video || uploading}>
        Upload
      </Button>
    </div>
  );
}

export default UploadForm;
