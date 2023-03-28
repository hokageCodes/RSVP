import { useState, useEffect } from 'react';
import { database } from '../../firebase'


function RSVPCount() {
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  useEffect(() => {
    const yesRSVPsRef = database.ref('rsvps').orderByChild('attendance').equalTo('yes');
    const noRSVPsRef = database.ref('rsvps').orderByChild('attendance').equalTo('no');

    // Get count of RSVPs where attendance is "yes"
    yesRSVPsRef.once('value', (snapshot) => {
      setYesCount(snapshot.numChildren());
    });

    // Get count of RSVPs where attendance is "no"
    noRSVPsRef.once('value', (snapshot) => {
      setNoCount(snapshot.numChildren());
    });
  }, []);

  return (

    <div className="rsvp-counter">
      <p>{yesCount} {yesCount === 1 ? 'person' : 'people'} will be attending</p>
      <p>{noCount} {noCount === 1 ? 'person' : 'people'} will not be attending</p>
    </div>
  );
}

export default RSVPCount;

