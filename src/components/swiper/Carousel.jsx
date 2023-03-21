import React from 'react';
import Slider from 'infinite-react-carousel';
import './carousel.css'

const SimpleSlider = () => (
  <>
  
    <h3>Gallery for Celebrants</h3>
    <Slider dots className="sliding">
      <div>
        <img src='https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' />
      </div>
      <div>
        <img src='https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg?auto=compress&cs=tinysrgb&w=600' alt=''/>
      </div>
      <div>
      <img src='https://images.pexels.com/photos/1071883/pexels-photo-1071883.jpeg?auto=compress&cs=tinysrgb&w=600' alt=''/>
      </div>
      <div>
      <img src='https://images.pexels.com/photos/2531546/pexels-photo-2531546.jpeg?auto=compress&cs=tinysrgb&w=600' alt=''/>
      </div>
      <div>
      <img src='https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=600' alt=''/>
      </div>
    </Slider>
  </>
);

export default SimpleSlider;