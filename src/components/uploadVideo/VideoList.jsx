import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './uploadform.css'

const PAGE_SIZE = 10;

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDocument, setLastDocument] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const firestore = firebase.firestore();
        const videosRef = firestore.collection('videos').orderBy('name').limit(PAGE_SIZE);
        const videosSnapshot = await videosRef.get();
        const videosData = videosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setVideos(videosData);
        setLastDocument(videosSnapshot.docs[videosSnapshot.docs.length - 1]);
        setTotalPages(Math.ceil(videosSnapshot.size / PAGE_SIZE));
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const firestore = firebase.firestore();
        const videosRef = firestore.collection('videos').orderBy('name').startAfter(lastDocument).limit(PAGE_SIZE);
        const videosSnapshot = await videosRef.get();
        const videosData = videosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setVideos((prevVideos) => [...prevVideos, ...videosData]);
        setLastDocument(videosSnapshot.docs[videosSnapshot.docs.length - 1]);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    if (currentPage > 1) {
      fetchVideos();
    }
  }, [currentPage]);

  const handleLikeClick = async (id) => {
    try {
      const firestore = firebase.firestore();
      const videoRef = firestore.collection('videos').doc(id);
      const videoSnapshot = await videoRef.get();
      const videoData = videoSnapshot.data();
      const updatedLikes = videoData.likes + 1;
      await videoRef.update({ likes: updatedLikes });
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video.id === id ? { ...video, likes: updatedLikes } : video))
      );
    } catch (error) {
      setError(error);
    }
  };

  const handlePrevPageClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPageClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const paginatedVideos = videos.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="video-list">
      {isLoading ? (
        <div className="video-list__loading">Loading...</div>
      ) : error ? (
        <div className="video-list__error">{error.message}</div>
      ) : (
        <>
          {paginatedVideos.map((video) => (
            <div key={video.id} className="video-list__item">
            <video src={video.url} controls className="video-list__video"></video>
            <div className="video-list__details">
              <h2 className          ="video-list__name">{video.name}</h2>
          <button onClick={() => handleLikeClick(video.id)} className="video-list__like">
            {video.likes} Likes
          </button>
        </div>
      </div>
      ))}
      <div className="video-list__pagination">
        <button
          onClick={handlePrevPageClick}
          disabled={currentPage === 1}
          className="video-list__pagination-btn"
        >
          Prev
        </button>
        <span className="video-list__pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPageClick}
          disabled={currentPage === totalPages}
          className="video-list__pagination-btn"
        >
          Next
        </button>
      </div>
    </>
  )}
</div>
);
};

export default VideoList;
