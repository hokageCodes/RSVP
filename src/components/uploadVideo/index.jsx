import { useEffect, useState } from 'react';
import { database, storage } from '../../firebase'
import firebase from "firebase/compat/app";

function App() {
  const [name, setName] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const videosRef = database.ref("videos");
    videosRef.on("value", (snapshot) => {
      const videosData = snapshot.val();
      if (videosData) {
        const videosArray = Object.entries(videosData).map(([id, data]) => ({
          id,
          name: data.name,
          videoUrl: data.videoUrl,
          likes: data.likes || 0,
          userId: data.userId,
        }));
        setVideos(videosArray);
      } else {
        setVideos([]);
      }
    });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
    setVideoUrl("");
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setUploadProgress(0);
    setUploadError(null);

    const uploadTask = storage.ref(`videos/${videoFile.name}`).put(videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
        setUploadError("Error uploading video");
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setVideoUrl(downloadURL);
          const videosRef = database.ref("videos");
          const newVideoRef = videosRef.push();
          newVideoRef.set({
            name,
            videoUrl: downloadURL,
            userId: firebase.auth().currentUser.uid,
          });
          setSuccessMessage("Video uploaded successfully");
        });
      }
    );
  };
  const handleLike = (id, likes) => {
    database.ref(`videos/${id}`).update({
      likes: likes + 1,
    });
  };

  return (
    <div>
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
        <div>Uploading... {Math.round(uploadProgress)}%</div>
      )}
      {uploadError && <div>Error: {uploadError}</div>}
      {successMessage && <div>{successMessage}</div>}
      {videoUrl && (
        <video src={videoUrl} controls width="500">
          Your browser does not support the video tag.
        </video>
      )}
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.name}</h2>
          <video src={video.videoUrl} controls width="500">
            Your browser does not support the video tag.
          </video>
          <button onClick={() => handleLike(video.id, video.likes)}>Like ({video.likes})</button>
        </div>
      ))}
    </div>
  );
}

export default App;
