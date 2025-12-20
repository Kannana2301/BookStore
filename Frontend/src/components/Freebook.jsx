import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";
function Freebook() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";
  
  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/book`);

        const data = res.data.filter((data) => data.category === "Free");
        console.log(data);
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-16">
        <div className="mb-8">
          <h1 className="font-bold text-3xl md:text-4xl pb-2">Free Courses Available</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Start your learning journey with our collection of free books. 
            No credit card required - just sign up and start reading!
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg text-pink-500"></span>
          </div>
        ) : book.length > 0 ? (
          <div>
            <Slider {...settings}>
              {book.map((item) => (
                <Cards item={item} key={item._id} />
              ))}
            </Slider>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">No free books available at the moment.</p>
          </div>
        )}
      </div>
    </>
  );
}
export default Freebook;
