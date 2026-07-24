import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { motion } from "framer-motion";
import { FiShield, FiTruck, FiRefreshCw, FiAward, FiUsers, FiGlobe } from "react-icons/fi";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    if (location.state?.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  const stats = [
    { id: 1, count: "120K+", label: "Happy Customers Worldwide", icon: FiUsers },
    { id: 2, count: "15K+", label: "Curated Premium Products", icon: FiAward },
    { id: 3, count: "99.8%", label: "On-Time Global Delivery", icon: FiTruck },
    { id: 4, count: "50+", label: "Countries Shipped To", icon: FiGlobe },
  ];

  const coreValues = [
    {
      id: 1,
      title: "Uncompromising Quality",
      desc: "Every product in our collection undergoes rigorous 5-step quality verification before reaching your doorstep.",
      icon: FiShield,
    },
    {
      id: 2,
      title: "Eco-Friendly Innovation",
      desc: "We commit 100% of our packaging to recyclable, sustainable materials without compromising luxury feel.",
      icon: FiRefreshCw,
    },
    {
      id: 3,
      title: "Customer-Centric Care",
      desc: "Our dedicated 24/7 concierge team is always available to assist with orders, styling recommendations, and returns.",
      icon: FiAward,
    },
  ];

  return (
    <div className="max-w-container mx-auto px-4 pb-20">
      <Breadcrumbs title="About Orebi" prevLocation={prevLocation} />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 flex flex-col md:flex-row items-center justify-between gap-10 border-b border-gray-200"
      >
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-secondary font-bold font-titleFont bg-gray-100 px-3 py-1 rounded-full">
            Our Brand Story
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-titleFont text-primeColor mt-4 mb-6 leading-tight">
            Crafting Exceptional Shopping Experiences Worldwide
          </h1>
          <p className="text-secondary text-base md:text-lg leading-relaxed mb-8">
            Founded with a vision to redefine modern e-commerce, <strong className="text-primeColor">Orebi Shopping</strong> bridges timeless aesthetic design with state-of-the-art functionality. We curate premium lifestyle essentials, cutting-edge gadgets, and high-fashion apparel tailored for discerning shoppers who demand quality without compromise.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/shop">
              <button className="px-8 py-3.5 bg-primeColor text-white font-semibold font-titleFont rounded-lg hover:bg-black transition-colors duration-300 shadow-md">
                Explore Collection
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-3.5 border border-gray-300 text-primeColor font-semibold font-titleFont rounded-lg hover:bg-gray-50 transition-colors duration-300">
                Contact Concierge
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto flex-shrink-0">
          {stats.map(({ id, count, label, icon: Icon }) => (
            <div
              key={id}
              className="bg-gray-50/80 border border-gray-200 p-6 rounded-xl flex flex-col items-center justify-center text-center w-full md:w-44 shadow-xs"
            >
              <Icon className="text-2xl text-primeColor mb-2" />
              <h3 className="text-2xl font-bold text-primeColor font-titleFont">{count}</h3>
              <p className="text-xs text-secondary mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Core Values Section */}
      <div className="py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-bold font-titleFont text-primeColor mb-4">
            Why Millions Trust Orebi
          </h2>
          <p className="text-secondary text-base">
            Driven by passion and built on trust, our core principles guide everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map(({ id, title, desc, icon: Icon }) => (
            <motion.div
              key={id}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 p-8 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-12 h-12 bg-gray-100 text-primeColor rounded-xl flex items-center justify-center text-2xl mb-6">
                <Icon />
              </div>
              <h3 className="text-xl font-bold font-titleFont text-primeColor mb-3">{title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
