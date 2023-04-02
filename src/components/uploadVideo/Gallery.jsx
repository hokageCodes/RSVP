import React, { useState } from "react";
import './uploadform.css'

const VideoItem = ({ name, url, likes, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(true);
    onLike();
  };

  return (
    <div className="video-item">
      <h3>{name}</h3>
      <video src={url} controls />
      <div className="video-meta">
        <button onClick={handleLike} disabled={isLiked}>
          {isLiked ? "Liked!" : "Like"}
        </button>
        <span>{likes} likes</span>
      </div>
    </div>
  );
};

export default VideoItem;
