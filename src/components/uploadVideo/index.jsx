import { useEffect, useState } from "react";
import { storage, database } from "../../firebase.js";

export default function UploadForm({ user }) {
  const [name, setName] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setFormValid(e.target.checkValidity() && videoFile !== null);
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setFormValid(e.target.checkValidity() && name !== "");
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const videoRef = storage.ref().child(videoFile.name);
    const uploadTask = videoRef.put(videoFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setUploadError(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setVideoUrl(url);
          database.ref("videos").push({
            name: name,
            url: url,
            likes: 0,
            user: user.uid,
          });
        });
      }
    );
  };

  useEffect(() => {
    database.ref("videos").on("value", (snapshot) => {
      const videoList = [];
      snapshot.forEach((childSnapshot) => {
        const video = childSnapshot.val();
        videoList.push({
          id: childSnapshot.key,
          name: video.name,
          url: video.url,
          likes: video.likes,
          user: video.user,
        });
      });
      setVideos(videoList);
    });
  }, []);

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
        <button type="submit" disabled={!formValid}>
          Upload
        </button>
      </form>
      {uploadProgress !== null && (
        <div>
          Uploading... {Math.round(uploadProgress)}%
        </div>
      )}
      {uploadError && <div>Error: {uploadError}</div>}
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <video src={video.url} controls />
            <p>{video.name}</p>
            <p>{video.user === user.uid ? "You" : video.user}</p>
            <button onClick={() => handleLike(video.id, video.likes)}>
              {video.likes} Likes
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
