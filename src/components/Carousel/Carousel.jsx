import React, { useState, useEffect } from 'react';
import './Carousel.css'

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://img.freepik.com/free-photo/happy-african-people-celebrating-with-confetti-front-wooden-wall_181624-46739.jpg?w=740&t=st=1675792677~exp=1675793277~hmac=7582dbd927b36a9137ddfe55816939e1bf1c25b13bfa7acb02ac7af1b1c83cf9',
    'https://img.freepik.com/free-photo/people-christman-decorations-man-black-suit-group-celebrations-new-year-people-with-bengal-lights_1157-43171.jpg?size=626&ext=jpg&ga=GA1.1.680868894.1675792578&semt=sph',
    'https://img.freepik.com/free-photo/group-partying-african-girls-clinking-glasses-with-sparkling-wine-champagne_627829-814.jpg?size=626&ext=jpg&ga=GA1.1.680868894.1675792578&semt=sph',
    'https://img.freepik.com/free-photo/black-white-friends-party_23-2147652019.jpg?size=626&ext=jpg&ga=GA1.1.680868894.1675792578&semt=sph',
    'https://img.freepik.com/free-photo/festive-young-friends-having-fun-with-confetti_23-2147651889.jpg?size=626&ext=jpg&ga=GA1.2.680868894.1675792578&semt=sph',
    'https://img.freepik.com/free-photo/group-friends-throwing-confetti_23-2147652022.jpg?size=626&ext=jpg&ga=GA1.2.680868894.1675792578&semt=sph',
  ];

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, images]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-image"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      />
      <div className="carousel-dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${
              index === currentIndex ? 'active' : ''
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
