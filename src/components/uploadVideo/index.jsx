import React, { useState } from "react";
import "./uploadform.css";
import firebase from "firebase/compat/app";

function UploadForm() {
  const [name, setName] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videos, setVideos] = useState([]);

  const handleUpload = async (event) => {
    event.preventDefault();
    setUploadProgress(0);
    setUploadError(null);
    setSuccessMessage(null);
  
    try {
      const storageRef = firebase.storage().ref();
      const videoRef = storageRef.child(videoFile.name);
  
      const uploadTask = videoRef.put(videoFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          throw error;
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          setSuccessMessage("Video uploaded successfully!");
          setVideos((prevVideos) => [          ...prevVideos,          {            name: name,            liked: false,            likes: 0,            url: downloadURL,          },        ]);
          setVideoFile(null);
          setName("");
        }
      );
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploadProgress(null);
    }
  };
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
    setVideoUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleLike = (index) => {
    setVideos((prevVideos) =>
      prevVideos.map((video, i) => {
        if (i === index) {
          return {
            ...video,
            liked: !video.liked,
            likes: video.likes + (video.liked ? -1 : 1),
          };
        }
        return video;
      })
    );
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
        <input
          type="file"
          accept="video/*"
          required
          onChange={handleFileChange}
        />
        <button type="submit" disabled={!videoFile}>
          Upload
        </button>
      </form>
      {uploadProgress !== null && (
        <div className="upload-progress">Uploading... {Math.round(uploadProgress)}%</div>
      )}
      {uploadError && <div className="upload-error">Error: {uploadError}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {videoUrl && (
        <div className="video-preview">
          <video src={videoUrl} controls />
        </div>
      )}
      {videos.length > 0 && (
        <div className="uploaded-videos">
          <h2>Uploaded Videos</h2>
          <div className="video-grid">
            {videos.map((video, index) => (
              <div className="video-card" key={index}>
                <video src={video.url} controls />
                <div className="video-details">
                  <p className="video-name">{video.name}</p>
                  <button className="like-button" onClick={() => handleLike(index)}>
                    {video.liked ? "Unlike" : "Like"}
                  </button>
                  <p className="likes-count">Likes: {video.likes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
