import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "./uploadform.css";
import _ from "lodash";

const PAGE_SIZE = 6;

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likedVideos, setLikedVideos] = useState([]);


  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const videosSnapshot = await firebase
          .firestore()
          .collection("videos")
          .get();
        const videos = videosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videos);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const numPages = Math.ceil(videos.length / PAGE_SIZE);
    setTotalPages(numPages);
  }, [videos]);

  const handleLikeClick = (id) => {
    if (likedVideos.includes(id)) {
      // If video is already liked, remove it from the array and decrease likes by 1
      setLikedVideos((prevLikedVideos) => prevLikedVideos.filter((likedId) => likedId !== id));
      setVideos((prevVideos) =>
        prevVideos.map((video) => {
          if (video.id === id) {
            return {
              ...video,
              likes: video.likes - 1,
            };
          }
          return video;
        })
      );
    } else {
      // If video is not liked, add it to the array and increase likes by 1
      setLikedVideos((prevLikedVideos) => [...prevLikedVideos, id]);
      setVideos((prevVideos) =>
        prevVideos.map((video) => {
          if (video.id === id) {
            return {
              ...video,
              likes: video.likes + 1,
            };
          }
          return video;
        })
      );
    }
  };
  
  
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedVideos = _.chunk(videos, PAGE_SIZE)[currentPage - 1] || [];

  return (
    <div className="video-list">
      {isLoading ? (
        <div className="video-list-loading">Loading...</div>
      ) : error ? (
        <div className="video-list-error">{error.message}</div>
      ) : (
        <>
          {paginatedVideos.map((video) => (
            <div key={video.id} className="video-list-item">
              <video src={video.url} controls className="video-list-video"></video>
              <div className="video-list-details">
                <h2 className="video-list-name">{video.name}</h2>
                <button
                  onClick={() => handleLikeClick(video.id)}
                  className="video-list-like"
                  disabled={likedVideos.includes(video.id)}
                >
                  {video.likes} Likes
                </button>

              </div>
            </div>
          ))}
          <div className="video-list-pagination">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="video-list-pagination-btn"
              >
                Prev
              </button>
            )}
            <span className="video-list-pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="video-list-pagination-btn"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoList;
