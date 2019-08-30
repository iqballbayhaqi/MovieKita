import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

const sliders = [
  {
    id: 1,
    src: "/images/slide1.jpg",
    alt: "Credit to Joshua Earle on Unsplash"
  },
  {
    id: 2,
    src: "/images/slide2.jpg",
    alt: "Credit to Alisa Anton on Unsplash"
  },
  {
    id: 3,
    src: "/images/slide3.jpg",
    alt: "Credit to Joshua Earle on Unsplash"
  },
  {
    id: 4,
    src: "/images/slide4.jpg",
    alt: "Credit to Joshua Earle on Unsplash"
  },
  {
    id: 5,
    src: "/images/slide5.jpg",
    alt: "Credit to Joshua Earle on Unsplash"
  },
  {
    id: 6,
    src: "/images/slide6.jpg",
    alt: "Credit to Joshua Earle on Unsplash"
  }
];

class slider extends Component {
  render() {
    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true
    };

    return (
      <div className="container-slider">
        <Slider {...settings}>
          {sliders.map(slider => (
            <div key={slider.id}>
              <img src={slider.src} alt={slider.alt} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default slider;
