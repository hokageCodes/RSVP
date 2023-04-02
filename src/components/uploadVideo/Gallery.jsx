import { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !name) return;

    // Create a storage reference
    const storageRef = firebase.storage().ref(`videos/${file.name}`);

    // Upload file
    const uploadTask = storageRef.put(file);

    // Update state while uploading
    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    // Listen to state changes, errors, and completion of the upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get upload progress as a percentage
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        // Handle error
        setUploading(false);
        setUploadError(error.message);
      },
      async () => {
        // Handle successful upload
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        setUploading(false);
        setUploadSuccess(true);
        setFile(null);
        setName("");
        console.log("Video uploaded successfully:", downloadURL);
      }
    );
  };

  const handleCancel = () => {
    // Cancel upload
    setFile(null);
    setName("");
    setUploading(false);
    setUploadProgress(0);
    setUploadError(null);
  };

  return (
    <div className="upload-form">
      <form onSubmit={handleUpload} noValidate>
        <label htmlFor="name-input" className="input-label">
          Your Name
        </label>
        <input
          id="name-input"
          type="text"
          placeholder="Enter your name"
          value={name}
          maxLength="50"
          required
          onChange={handleNameChange}
          className="input-field"
        />
        <label htmlFor="file-input" className="input-label">
          Upload Your Video
        </label>
        <input
          id="file-input"
          type="file"
          accept="video/*"
          required
          onChange={handleFileChange}
          className="input-field"
        />
        <div className="button-container">
          <button type="submit" disabled={!file || !name || uploading} className="primary-button">
            {uploading ? `Uploading...${uploadProgress}%` : "Upload"}
          </button>
          {uploading && (
            <button type="button" onClick={handleCancel} className="secondary-button">
              Cancel
            </button>
          )}
        </div>
        {uploadError && (
          <div className="error-message">
            <p>{uploadError}</p>
          </div>
        )}
        {uploadSuccess && (
          <div className="success-message">
            <p>Video uploaded successfully!</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadForm;
