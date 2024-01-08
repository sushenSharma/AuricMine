import React, { useRef } from 'react';
import Testimonials from './Testimonial'; // Import the Testimonials component
import './clienttestimonial.css';
import Mycard from './Mycard';
import Person1 from '../assets/resources/person1.jpeg';
import Person2 from '../assets/resources/person2.jpeg';
import Person3 from '../assets/resources/person3.jpeg';
import Person4 from '../assets/resources/person4.jpeg';
import Person5 from '../assets/resources/person5.jpeg';
import Person6 from '../assets/resources/person6.jpeg';
import Person7 from '../assets/resources/person7.jpeg';
import Person8 from '../assets/resources/person8.jpeg';
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
                <Mycard  testimonial="I was skeptical of AI-powered stock trading platforms but,     Trading Ledger has exceeded my expectations. Their Trading Ledger and AI Insights have helped me make    profitable trades that I wouldn't have made without their platform." personname="JOHN CARTER" faceImage={Person1} />
                <Mycard  testimonial="Trading Ledger has helped me grow my trading portfolio and make better decisions. Their platform is user-friendly and their AI Insights provide me with the most accurate data in real-time. Their customer support team is also top-notch." personname=" SARAH THOMPSON" faceImage={Person7}/>
                <Mycard  testimonial="Trading Ledger has made trading stocks a breeze. Their Trading Ledger and AI Insights provide me with all the information I need to make informed decisions. I highly recommend Trading Ledger to any serious trader." personname="EMMA RODGRIGUEZ" faceImage={Person3} />
                <Mycard  testimonial="Trading Ledger's AI-powered platform transformed my skepticism into success. The Trading Ledger and AI Insights unlocked profitable trades, elevating my trading experience. A must have for serious traders. " personname="DAVID WILSON" faceImage={Person5} />
                <Mycard  testimonial="Trading Ledger's user-friendly platform and real-time AI Insights have propelled my trading portfolio to new heights. The accuracy of their data is unmatched, empowering me to make informed decisions."  personname="LIAM ANDERSON"  faceImage={Person4} />
                <Mycard  testimonial="Thanks to Trading Ledger's AI prowess, I've unlocked a new level of profitability. The Trading Ledger platform and AI Insights are invaluable tools for making smart investment decisions." personname="OLIVIA MITCHELL" faceImage={Person6} />
                <Mycard  testimonial="Trading Ledger shattered my skepticism with its AI-driven brilliance. Profits soared as the Trading Ledger platform and AI Insights became my go-to for strategic and successful trades. Highly recommended" personname="ELLA THOMPSON" faceImage={Person2} />
                
            </div>
        </div>
    );
}
