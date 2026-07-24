import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
} from "../../assets/images";

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-13 md:h-13 bg-white/80 hover:bg-white text-primeColor rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 cursor-pointer hidden sm:flex"
    aria-label="Next Slide"
  >
    <FiChevronRight className="text-2xl" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-13 md:h-13 bg-white/80 hover:bg-white text-primeColor rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 cursor-pointer hidden sm:flex"
    aria-label="Previous Slide"
  >
    <FiChevronLeft className="text-2xl" />
  </button>
);

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);

  const slides = [
    {
      id: 1,
      title: "New Modern Collection 2026",
      subtitle: "Elevate your everyday lifestyle with curated premium apparel, minimalist accessories, and smart tech.",
      tag: "Spring / Summer Drop",
      ctaText: "Shop New Collection",
      ctaLink: "/shop",
      img: bannerImgOne,
    },
    {
      id: 2,
      title: "Flagship Tech & Wearables",
      subtitle: "Experience high-fidelity wireless audio, AMOLED smartwatches, and minimalist workspace gear.",
      tag: "Next-Gen Electronics",
      ctaText: "Discover Tech Deals",
      ctaLink: "/shop",
      img: bannerImgTwo,
    },
    {
      id: 3,
      title: "Scandinavian Accent Living",
      subtitle: "Handcrafted ceramic vases, Scandinavian accent furniture, and sustainable home essentials.",
      tag: "Interior & Living",
      ctaText: "Explore Home Decor",
      ctaLink: "/shop",
      img: bannerImgThree,
    },
    {
      id: 4,
      title: "Exclusive Seasonal Mega Sale",
      subtitle: "Enjoy up to 50% discount on luxury travel duffle bags, urban streetwear hoodies, and bestsellers.",
      tag: "Limited-Time Special Offer",
      ctaText: "Claim Mega Discount",
      ctaLink: "/offer",
      img: bannerImgFour,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <ul className="flex items-center gap-3"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
          i === dotActive ? "bg-white w-8 shadow-sm" : "bg-white/40 hover:bg-white/70"
        }`}
      />
    ),
  };

  return (
    <div className="w-full bg-gray-900 relative overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="relative w-full h-[420px] sm:h-[520px] md:h-[580px] lg:h-[640px] outline-none overflow-hidden"
          >
            {/* Background Image Container with Dynamic Scale Flow */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 z-10" />
            </div>

            {/* Slide Text Content Banner Overlay */}
            <div className="relative z-20 max-w-container mx-auto px-6 md:px-16 h-full flex flex-col justify-center text-white">
              <AnimatePresence mode="wait">
                {dotActive === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-2xl"
                  >
                    <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-white/20 shadow-xs">
                      {slide.tag}
                    </span>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-titleFont leading-tight mb-4 tracking-tight drop-shadow-md">
                      {slide.title}
                    </h1>

                    <p className="text-gray-200 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed font-bodyFont max-w-xl drop-shadow-xs">
                      {slide.subtitle}
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">
                      <Link to={slide.ctaLink}>
                        <button
                          type="button"
                          className="px-8 py-3.5 sm:py-4 bg-white text-primeColor font-bold font-titleFont text-sm rounded-xl hover:bg-black hover:text-white transition-all duration-300 shadow-xl flex items-center gap-2 group cursor-pointer"
                        >
                          {slide.ctaText}
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>

                      <Link to="/journal">
                        <button
                          type="button"
                          className="px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold font-titleFont text-sm rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
                        >
                          Read Style Journal
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
