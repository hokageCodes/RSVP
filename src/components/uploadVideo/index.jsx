import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import './uploadform.css';

const UploadForm = () => {
const [name, setName] = useState('');
const [videoFile, setVideoFile] = useState(null);
const [uploadProgress, setUploadProgress] = useState(0);
const [uploadError, setUploadError] = useState(null);
const [successMessage, setSuccessMessage] = useState(null);

const handleNameChange = (e) => {
setName(e.target.value);
};

const handleFileChange = (e) => {
const file = e.target.files[0];
if (file) {
setVideoFile(file);
}
};

const handleUpload = async (e) => {
e.preventDefault();
setUploadProgress(0);
setUploadError(null);
setSuccessMessage(null);

try {
  if (!videoFile) {
    setUploadError('Please select a video to upload');
    return;
  }

  const storageRef = firebase.storage().ref();
  const videoRef = storageRef.child(videoFile.name);
  const uploadTask = videoRef.put(videoFile);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    },
    (error) => {
      setUploadError(error.message);
    },
    async () => {
      try {
        const downloadUrl = await videoRef.getDownloadURL();
        setSuccessMessage('Video uploaded successfully!');

        const firestore = firebase.firestore();
        await firestore.collection('videos').add({
          name,
          url: downloadUrl,
          likes: 0,
          comments: [],
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setName('');
        setVideoFile(null);
      } catch (error) {
        setUploadError(error.message);
      }
    }
  );
} catch (error) {
  setUploadError(error.message);
}
}
return (
  <div className="UploadForm">
  <h1 className="UploadForm__title">Upload Your Video</h1>
  <form onSubmit={handleUpload} noValidate>
  <div className="UploadForm__field">
  <label className="UploadForm__label" htmlFor="name">
  Video Name:
  </label>
  <input
           id="name"
           type="text"
           placeholder="Enter video name"
           value={name}
           maxLength="50"
           required
           onChange={handleNameChange}
           className="UploadForm__input"
         />
  </div>
  <div className="UploadForm__field">
  <label className="UploadForm__label" htmlFor="video">
  Select a video file:
  </label>
  <input
           id="video"
           type="file"
           accept="video/*"
           required
           onChange={handleFileChange}
           className="UploadForm__input"
         />
  </div>
  <button
         type="submit"
         disabled={!videoFile}
         className="UploadForm__button"
       >
  Upload
  </button>
  </form>
  {uploadProgress > 0 && (
  <div className="UploadForm__progress">
  Uploading... {Math.round(uploadProgress)}%
  </div>
  )}
  {uploadError && <div className="UploadForm__error">{uploadError}</div>}
  {successMessage && (
  <div className="UploadForm__success">{successMessage}</div>
  )}
  </div>
)} 


export default UploadForm
  
