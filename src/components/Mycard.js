import React from 'react';
import './Mycard.css';

const Mycard = (props) => {
  return (
    <div className='mycard'>
    
      <div className='card-rating'>
        {/* Example of star ratings - you can replace this with a star rating component */}
        <span className='star'>★★★★★</span>
      </div>
      <div className='card-testimonial'>
        {/* Testimonial content */}
        <p className='testpara'>"{props.testimonial}"</p>
      </div>
      <div className='card-face '>
        {/* Example of a person's face - you can replace this with an image component */}
        {/* <img src={props.faceImage} alt="Person's face" className='personimage' /> */}
        <p className='person'>{props.personname}</p>
      </div>
    </div>
  );
}

export default Mycard;
