import React from 'react';
import  './Carousel.css';
import slide11 from '../assets/slide11.png'
import slide12 from '../assets/slide12.png'
import slide13 from '../assets/slide13.png'
import slide14 from '../assets/slide14.png'

const images = [
    slide11,
    slide12,
    slide13,
    slide14
];
const Carousel = () => {
  return (
    <div className="carousel relative overflow-hidden w-full h-96">
      <div className="carousel-inner flex w-full h-full animate-slide">
        {images.map((image, index) => (
          <div key={index} className="carousel-item flex-shrink-0 w-full h-full">
            <img src={image} className="w-full h-full object-contain p-5" alt={`Slide ${index + 1}`} loading='lazy'/>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Carousel;