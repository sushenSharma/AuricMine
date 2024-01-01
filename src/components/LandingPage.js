import React from 'react';
import '../assets/styles/landingPage.css'; // Import the CSS file for styling
import TradingImage from '../assets/resources/tradingBanner.png'; // Path to your image
import Logo from '../assets/resources/nav_image.png' // Path to your logo image

const LandingPage = ({ onLogin }) => {
  return (
    
    <div className="wrapper  overflow-x-hidden overflow-y-scroll w-[100vw] h-[100vh]">
      
      <nav className="flex items-center justify-between h-24 w-full sticky top-0 left-0 z-20" id="head">
    <img src={Logo} alt="logo" class="w-28"></img>
    <ul className="flex gap-8">
        <li className="text-white text-xl font-bold font-mullish py-2 hover:text-red-600 cursor-pointer transition duration-200 relative">
            <a href="#">Home</a>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 scale-0 group-hover:scale-100 transition duration-200"></div>
        </li>
        <li className="text-white text-xl font-bold font-mullish py-2 hover:text-red-600 cursor-pointer transition duration-200 relative">
            <a href="#">About</a>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 scale-0 group-hover:scale-100 transition duration-200"></div>
        </li>
        <li className="text-white text-xl font-bold font-mullish py-2 hover:text-red-600 cursor-pointer transition duration-200 relative">
            <a href="#">Services</a>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 scale-0 group-hover:scale-100 transition duration-200"></div>
        </li>
        <li className="text-white text-xl font-bold font-mullish py-2 hover:text-red-600 cursor-pointer transition duration-200 relative">
            <a href="#">Contact Us</a>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 scale-0 group-hover:scale-100 transition duration-200"></div>
        </li>
    </ul>
    <div className="flex gap-x-1">
        <button onClick={onLogin}  className="font-mullish py-2 px-4 text-xl font-bold border-2 border-white bg-black rounded-full text-white transition duration-200 hover:bg-white hover:text-black" id="redbutton">Log In</button>
        <button onClick={onLogin} className="font-mullish py-2 px-4 text-xl font-bold border-2 border-white bg-black rounded-full text-white transition duration-200 hover:bg-white hover:text-black" id="greenbutton">Sign Up</button>
    </div>
</nav>



<div className="main-section" id="second">
    <section className="banner py-8 lg:py-32">
        <div className="left-content flex flex-col justify-between mx-auto items-center w-10/12 lg:flex-row">
            <div className="space-y-4">
                <h1 className="text-white font-mullish font-bold text-4xl lg:text-5xl leading-normal lg:leading-relaxed">
                    Trading Made Easy,<br />
                    with <span className="text-red-700">Trading</span> <span className="text-green-600">Journal</span>.
                </h1>
                <div className="w-6 h-1 bg-red-600 m-2"></div>
                <p className="text-white text-lg lg:text-xl font-sans leading-normal lg:leading-relaxed">
                    Your ultimate destination for intelligent and efficient trading! Experts or beginners, our platform enhances every trading journey for all.
                    <strong>Welcome to a Smarter Way to Trade</strong>
                </p>
                <button 
                    className="bg-red-600 py-3 px-4 text-black font-bold text-lg rounded-md font-mullish hover:bg-green-500 transition duration-200 ease-in-out" 
                    id="signup" 
                    onClick={onLogin}
                >  Sign Up Now
                </button>
            </div>
            <img src={TradingImage} alt="Trading Office Scene" className="hero-banner w-full max-w-xl mt-4 lg:mt-0" />
        </div>
    </section>
</div>

<div className="feature -z-40" id="features">
  <section className="w-[100%] max-w-[1080px] mx-auto pt-4 -z-20">
    <h2 className="font-mullish pt-28 text-black font-extrabold text-deepBlueHead my-auto text-4xl leading-[3.375rem] ml-64 z-[5]">
      Why You Should Choose Us?
    </h2>
    <div className="w-[700px] mx-[15%] h-2 bg-gradient-to-r from-green-600 via-black to-red-600"></div>
    <div className="w-full grid grid-cols-2 grid-rows-2 gap-y-16 gap-x-20 py-10 h-fit pt-20">
      
      {/* CARD 1 */}
      <div className="p-6 px-20 rounded-xl flex-col bg-white border-4 border-black w-full max-h-[300px] cursor-pointer bg-cover bg-no-repeat hover:scale-105 transition-all duration-200 group" id="card">
        <i className="fa-solid fa-chart-line group-hover:hidden"></i>
        <h3 className="font-mullish font-bold text-black text-xl pt-4 group-hover:text-red-600">Smart Analytics</h3>
        <p className="font-mullish text-grayText text-xl font-bold leading-normal py-3 group-hover:text-white">
          Dive into your trading performance with charts and metrics powered by AI.
        </p>
        <div className="flex flex-row gap-x-2 items-center group">
          <a href="#" className="font-mullish text-lightBlue500 font-bold text-2xl group-hover:text-green-600 transition-all duration-200">Know More</a>
          <i className="fa-solid fa-angles-right"></i>
        </div>
      </div>
      
      {/* CARD 2 */}
      <div className="border-4 border-black rounded-xl flex-col bg-white p-6 px-20 shadow w-full max-h-[300px] cursor-pointer bg-cover bg-no-repeat hover:scale-105 transition-all duration-200 group" id="card">
        <i className="fa-regular fa-clock group-hover:hidden"></i>
        <h3 className="font-mullish font-bold text-black text-xl pt-4 group-hover:text-red-600">Real-Time Data</h3>
        <p className="font-mullish text-grayText text-xl font-bold leading-normal py-3 group-hover:text-white">
          Get up-to-the-minute market data to stay ahead of the curve.
        </p>
        <div className="flex flex-row gap-x-2 items-center group">
          <a href="#" className="font-mullish text-lightBlue500 font-bold text-2xl group-hover:text-green-600 transition-all duration-200">Know More</a>
          <i className="fa-solid fa-angles-right"></i>
        </div>
      </div>

      {/* CARD 3 */}
      <div className="border-black border-4 rounded-xl flex-col bg-white p-6 px-20 shadow w-full max-h-[300px] cursor-pointer bg-cover bg-no-repeat hover:scale-105 transition-all duration-200 group" id="card">
        <i className="fa-solid fa-book group-hover:hidden" style={{ height: '20px' }}></i>
        <h3 className="font-mullish font-bold text-black text-xl pt-4 group-hover:text-red-600">Journaling Made Easy</h3>
        <p className="font-mullish text-grayText text-xl font-bold leading-normal py-3 group-hover:text-white">
          Log your trades with a user-friendly interface and review your history anytime.
        </p>
        <div className="flex flex-row gap-x-2 items-center group">
          <a href="#" className="font-mullish text-lightBlue500 font-bold text-2xl group-hover:text-green-600 transition-all duration-200">Know More</a>
          <i className="fa-solid fa-angles-right"></i>
        </div>
      </div>
     
      {/* CARD 4 */}
      <div className="p-6 rounded-xl flex flex-col bg-white border-4 border-black w-full max-h-[300px] cursor-pointer bg-cover bg-no-repeat hover:scale-105 transition-all duration-200 group" id="card4">
        <i className="fa-solid fa-mobile group-hover:hidden"></i>
        <h3 className="font-mullish font-bold text-black text-xl pt-4 group-hover:text-red-600">Secure & Private</h3>
        <p className="font-mullish text-grayText text-xl font-bold leading-normal py-3 group-hover:text-white">
        Your data is encrypted and kept private at all times.
        </p>
        <div className="flex flex-row gap-x-2 items-center group">
          <a href="#" className="font-mullish text-lightBlue500 font-bold text-2xl group-hover:text-green-600 transition-all duration-200">Know More</a>
          <i className="fa-solid fa-angles-right"></i>
        </div>
      </div>
    </div>
  </section>
</div>
<div className="testimonials relative flex flex-col gap-6  items-center border-t-4 border-b-4 py-32 border-black">
<div className="heading relative">
    <h2 className="text-4xl font-sans font-bold">Client Testimonials</h2>
   <div className="slit flex flex-row gap-2 top-0">
       <div className="w-80 h-2 bg-gradient-to-r from-red-600 via-black to-green-600 "></div>
   </div>
</div>

<div className="swiper-container mySwiper relative flex flex-row gap-3">
  <div className="swiper-wrapper"></div>
 
<div className="swiper-slide">
   {/* First Slide */}
      <div className="swiper-slide flex flex-col gap-2 p-9 py-20 w-[36rem] mx-24 ml-10">
        <div className="rating flex flex-row">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
        <p className="font-sans text-xl left-64 ml-6">
          I was skeptical of AI-powered stock trading platforms but, Trading Ledger has exceeded my expectations. Their Trading Ledger and AI Insights have helped me make profitable trades that I wouldn't have made without their platform.
        </p>
        <div className="name flex flex-row gap-4 justify-center items-center">
          <img src="thispersondoesnotexist8.jpeg" className="border-4 border-black rounded-full" style={{ height: '120px', width: '100px' }} alt="" />
          <h2 className="font-bold text-xl font-serif">SARAH THOMPSON</h2>
        </div>
      </div>
</div>
{/* Second Slide */}
<div className="swiper-slide">
      <div className="swiper-slide flex flex-col gap-2 p-9 py-20 w-[36rem] mx-24 ml-10">
        <div className="rating flex flex-row">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
        <p className="font-sans text-xl left-64 ml-6">
        Initially, I had doubts about stock trading platforms powered by AI. However, Trading Ledger has surpassed what I anticipated. The Trading Ledger and AI Insights they offer have assisted me in executing profitable trades, which I likely wouldn't have achieved without using their platform.
        </p>
        <div className="name flex flex-row gap-4 justify-center items-center">
          <img src="thispersondoesnotexist8.jpeg" className="border-4 border-black rounded-full" style={{ height: '120px', width: '100px' }} alt="" />
          <h2 className="font-bold text-xl font-serif">ROB MUIR</h2>
        </div>
      </div>
</div>

    <div className="swiper-pagination"></div>
</div>
</div>

<footer className="foot flex flex-col lg:flex-row justify-around border-t-4 border-b-4 border-black bg-black text-white text-center lg:text-left">
  <div className="info flex flex-col gap-5 py-8 px-4 lg:px-8">
    <h3 className="font-serif font-bold text-xl lg:text-2xl">Trading Journal</h3>
    <p className="text-sm lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
      At Trading Ledger, our mission is to empower our clients with the most accurate and up-to-date information on their stock portfolio. We are committed to providing the best possible service to our clients, and our AI-powered platform enables us to achieve this goal.
    </p>
  </div>

  <div className="info flex flex-col gap-4 py-8 px-4 lg:px-8">
    <h3 className="font-serif font-bold text-xl lg:text-2xl">Quick Links</h3>
    <ul className="flex flex-col gap-2">
      <li><a className="font-sans text-lg lg:text-xl cursor-pointer" href="#">About</a></li>
      <li><a className="font-sans text-lg lg:text-xl cursor-pointer" href="#">Services</a></li>
      <li><a className="font-sans text-lg lg:text-xl cursor-pointer" href="#">Contact Us</a></li>
    </ul>
  </div>

  <div className="info flex flex-col gap-4 py-8 px-4 lg:px-8">
    <span className="font-serif font-bold text-xl lg:text-2xl">Contact Us</span>
    <a className="font-sans text-lg lg:text-xl" href="mailto:tradingjournal@gmail.com">tradingjournal@gmail.com</a>
    <div className="icons flex justify-center lg:justify-start flex-row gap-2">
      <i className="fa-brands fa-facebook-square text-2xl"></i>
      <i className="fa-brands fa-twitter-square text-2xl"></i>
      <i className="fa-brands fa-linkedin text-2xl"></i>
      <i className="fa-brands fa-instagram-square text-2xl"></i>
    </div>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;
