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
                <Mycard  testimonial="Before I tried TradingJournal, I wasn't sure if AI-powered stock trading apps were any good. But after using it, I've changed my mind. The app has two great features - the Trading Ledger and AI Insights - which have really helped me with my trading." personname="AKSHAY GUPTA"  />
                <Mycard  testimonial="TradingJournal is a great app for keeping me disciplined in my trading and helping me grow my investments. In trading, it's hard to stay steady and make choices based on facts instead of feelings. TradingJournal is really good at this. It helps me keep track of my trades and check how I'm doing, which keeps me focused on my plan and stops me from making quick, emotional decisions." personname=" NARENDER RAJU"/>
                <Mycard  testimonial="Trading Ledger has made trading stocks a breeze. Their Trading Ledger and AI Insights provide me with all the information I need to make informed decisions. I highly recommend Trading Ledger to any serious trader." personname="JAGANDEEP SINGH"/>
                {/* <Mycard  testimonial="Trading Ledger's AI-powered platform transformed my skepticism into success. The Trading Ledger and AI Insights unlocked profitable trades, elevating my trading experience. A must have for serious traders. " personname="DAVID WILSON" faceImage={Person5} />
                <Mycard  testimonial="Trading Ledger's user-friendly platform and real-time AI Insights have propelled my trading portfolio to new heights. The accuracy of their data is unmatched, empowering me to make informed decisions."  personname="LIAM ANDERSON"  faceImage={Person4} />
                <Mycard  testimonial="Thanks to Trading Ledger's AI prowess, I've unlocked a new level of profitability. The Trading Ledger platform and AI Insights are invaluable tools for making smart investment decisions." personname="OLIVIA MITCHELL" faceImage={Person6} />
                <Mycard  testimonial="Trading Ledger shattered my skepticism with its AI-driven brilliance. Profits soared as the Trading Ledger platform and AI Insights became my go-to for strategic and successful trades. Highly recommended" personname="ELLA THOMPSON" faceImage={Person2} /> */}
                
            </div>
        </div>
    );
}
