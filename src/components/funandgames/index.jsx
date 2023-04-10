import React from 'react';
import './games.css'

function FunGames() {
  return (
    <section className='fun'>
      <h2>Celebrate with us</h2>
      <p>Answer 5 questions about the celebrant or upload a 60secs video saying nice things about the celebrant</p>
      <div>
        <a href='/takequiz'>Take the Quiz</a>
        <a href='/uploadvideo'>Upload Video</a>
      </div>
    </section>
  );
}
export default FunGames;
