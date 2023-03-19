import { useState } from 'react';
import './swiper.css';

const images = [
  'https://images.pexels.com/photos/7867472/pexels-photo-7867472.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7867472/pexels-photo-7867472.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3831786/pexels-photo-3831786.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8015132/pexels-photo-8015132.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4397844/pexels-photo-4397844.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel__prev" onClick={handlePrevClick}>
        &lt;
      </button>
      <div className="carousel__images">
        {images.map((image, index) => (
          <img
            key={index}
            className={`carousel__image ${
              index === activeIndex ? 'active' : ''
            }`}
            src={image}
            alt={`slide ${index + 1}`}
          />
        ))}
      </div>
      <button className="carousel__next" onClick={handleNextClick}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
