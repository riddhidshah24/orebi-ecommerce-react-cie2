import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiZap, FiShoppingBag } from "react-icons/fi";
import { newArrTwo } from "../../../assets/images";
import { useOrebiStore } from "../../../store/useOrebiStore";
import { toast } from "react-toastify";

const FlashSale = () => {
  const addToCartStore = useOrebiStore((state) => state.addToCart);

  // Countdown state (starts at 18 hours 42 minutes 15 seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProduct = {
    _id: "flash-deal-101",
    productName: "Smart Watch Ultra Pro",
    price: "199.00",
    color: "Black",
    badge: true,
    img: newArrTwo,
    des: "Limited-time flash offer! Save $51 on the flagship AMOLED Smart Watch.",
  };

  const handleClaimOffer = () => {
    addToCartStore({ ...dealProduct, quantity: 1 });
    toast.success("Flash Offer Claimed! Smart Watch Ultra Pro added to cart ⚡", {
      icon: "⚡",
    });
  };

  return (
    <div className="w-full my-12 bg-gradient-to-r from-gray-900 via-primeColor to-gray-900 text-white rounded-2xl p-6 md:p-10 shadow-xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Deal Information & Countdown */}
        <div className="max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 shadow-xs">
            <FiZap className="text-sm fill-current" /> Flash Deal of the Day
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-titleFont mb-3 leading-tight">
            Save up to 40% on Flagship Tech
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
            Hurry! Exclusive price drop available while stock lasts. Free express shipping included.
          </p>

          {/* Countdown Clock */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 min-w-[70px]">
              <span className="text-2xl font-bold font-titleFont">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-300">Hours</span>
            </div>
            <span className="text-2xl font-bold text-amber-400">:</span>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 min-w-[70px]">
              <span className="text-2xl font-bold font-titleFont">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-300">Mins</span>
            </div>
            <span className="text-2xl font-bold text-amber-400">:</span>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 min-w-[70px]">
              <span className="text-2xl font-bold font-titleFont text-amber-400">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-300">Secs</span>
            </div>
          </div>
        </div>

        {/* Product Card Spotlight */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white text-primeColor rounded-xl p-5 w-full max-w-sm flex flex-col items-center text-center shadow-2xl border border-gray-100"
        >
          <div className="w-44 h-44 bg-gray-50 rounded-lg overflow-hidden relative mb-4 p-2">
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
              -20% OFF
            </span>
            <img src={dealProduct.img} alt={dealProduct.productName} className="w-full h-full object-contain" />
          </div>
          <h3 className="text-lg font-bold font-titleFont mb-1">{dealProduct.productName}</h3>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-primeColor">${dealProduct.price}</span>
            <span className="text-sm text-gray-400 line-through">$250.00</span>
          </div>

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={handleClaimOffer}
              className="flex-1 py-2.5 bg-primeColor text-white font-semibold rounded-lg hover:bg-black transition-colors duration-300 flex items-center justify-center gap-2 text-sm shadow-xs cursor-pointer"
            >
              <FiShoppingBag /> Claim Offer
            </button>
            <Link to="/shop" className="py-2.5 px-4 border border-gray-300 text-primeColor font-semibold text-sm rounded-lg hover:bg-gray-50 transition-colors">
              Details
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlashSale;
