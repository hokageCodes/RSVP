import React from 'react';
import Logo from '../../assets/HW.png'
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer__container'>
      <div className='footer__logo'>
        <img src={Logo} alt='Footer Logo' />
        <div className='footer__hashtag'>
            #yomiemelda
        </div>
      </div>
      <div className='footer__inquiry'>
        <p>For more inquiry, please call:</p>
        <a href='tel:+1234567890'>+1 (234) 567-890</a>
      </div>
      <div className='footer__copyright'>
        Copyright &copy; Busayo Ogunde
      </div>
    </footer>
  );
}