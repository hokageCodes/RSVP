import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import PropTypes from "prop-types";

const UploadForm = ({ storageLocation }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/mov", "video/avi"];
    const fileSizeLimit = 100 * 1024 * 1024; // 100MB

    if (selectedFile && fileTypes.includes(selectedFile.type) && selectedFile.size < fileSizeLimit) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please select a video file (mp4, mov, avi) less than 100MB.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setUploadProgress(0);

    const storageRef = firebase.storage().ref();
    const videoRef = storageRef.child(`${storageLocation}/${file.name}`);

    try {
      const uploadTask = videoRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          setError(error.message);
          setUploading(false);
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          console.log("File available at", downloadURL);
          setName("");
          setFile(null);
          setUploading(false);
          setUploadProgress(0);
        }
      );
    } catch (error) {
      setError(error.message);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCancel = () => {
    setName("");
    setFile(null);
    setError(null);
    setUploading(false);
    setUploadProgress(0);
  };

  return (
    <div className="upload-form">
      <form onSubmit={handleUpload} noValidate>
        <input
          type="text"
          placeholder="Name"
          value={name}
          maxLength="50"
          required
          onChange={handleNameChange}
        />
        <input type="file" accept="video/*" required onChange={handleFileChange} />
        <button type="submit" disabled={!file || !name || uploading}>
          {uploading ? `Uploading...${uploadProgress}%` : "Upload"}
        </button>
        {uploading && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

UploadForm.propTypes = {
  storageLocation: PropTypes.string.isRequired,
};

export default UploadForm;
