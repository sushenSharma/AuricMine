import React, { useRef } from 'react';
import Testimonials from './Testimonial'; // Import the Testimonials component
import './clienttestimonial.css';
import Mycard from './Mycard';

export default function Clienttestimonials() {
    const boxRef = useRef(null);

    const btnpressprev = () => {
        if (boxRef.current) {
            const width = boxRef.current.clientWidth;
            boxRef.current.scrollLeft =  boxRef.current.scrollLeft-width;
        }
   
    };

    const btnpressnext = () => {
        if (boxRef.current) {
            const width = boxRef.current.clientWidth;
            boxRef.current.scrollLeft =   boxRef.current.scrollLeft+width;
        }
     
    };

    return (
        <div className='product-slider'>
            <button className='prebtn' onClick={btnpressprev}><p>&lt;</p></button>
            <button className='postbtn' onClick={btnpressnext}><p>&gt;</p></button>
            <div className='product-container' ref={boxRef}>
                <Mycard cardno="1"/>
                <Mycard cardno="2"/>
                <Mycard cardno="3"/>
                <Mycard cardno="4"/>
                <Mycard cardno="5"/>
                <Mycard cardno="6"/>
            </div>
        </div>
    );
}
