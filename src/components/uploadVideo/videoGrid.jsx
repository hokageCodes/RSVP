import React from "react";

function VideoGrid({ videos }) {
    return (
        <div className="video-grid">
        {videos.map((video, index) => (
            <div key={index} className="video-card">
            <video controls src={video.url} />
            <div className="video-info">
                <div className="video-name">{video.name}</div>
                <button className="like-button">Like</button>
            </div>
            </div>
        ))}
        </div>
    );
}

export default VideoGrid;
