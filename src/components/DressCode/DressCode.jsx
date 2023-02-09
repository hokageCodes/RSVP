import React, {useState} from 'react';
import {SiStylelint} from 'react-icons/si';
import './DressCode.css';

export default function DressCode() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className='dress__code'>
      <div className="dress__info"></div>
      <h2  onClick={() => setShowDetails(!showDetails)} >
        <SiStylelint className='icon'/>
        Dress Code
      </h2>
      {showDetails && (
        <>
          <img src="https://img.freepik.com/premium-photo/physical-activity-close-up-girl-tying-shoelaces-sports-shoes-gym_118454-4695.jpg?w=740" alt='Dress Code' />
          <div className='dress__details'>
            <div className='gentleman'>
              <h3>Gentleman</h3>
              <p>A sharp suit or a stylish blazer with dress pants and shoes will do the trick.</p>
            </div>
            <div className='lady'>
              <h3>Ladies</h3>
              <p>A gorgeous dress or a skirt and blouse with heels or pumps will turn heads.</p>
            </div>
            <div className='accessories'>
              <h3>Accessories</h3>
              <p>Add a pop of color with a tie or a statement necklace to complete the look.</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}