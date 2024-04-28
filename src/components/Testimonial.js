// Testimonials.js
import React from "react";
import Mycard from "./Mycard";
import "../../src/assets/styles/Testimonial.css";

const Testimonials = () => {
  const testimonials = [
    { id: 1, text: "This is the first testimonial." },
    { id: 2, text: "This is the second testimonial." },
    { id: 3, text: "This is the third testimonial." },
    { id: 4, text: "This is the first testimonial." },
    { id: 5, text: "This is the second testimonial." },
    { id: 6, text: "This is the third testimonial." },
    { id: 7, text: "This is the first testimonial." },
    { id: 8, text: "This is the second testimonial." },
    { id: 9, text: "This is the third testimonial." },
  ];

  return (
    <div className="testimonials-container">
      {testimonials.map((testimonial) => (
        <Mycard
          key={testimonial.id}
          cardno={testimonial.id}
          testimonial={testimonial.text}
        />
      ))}
    </div>
  );
};

export default Testimonials;
