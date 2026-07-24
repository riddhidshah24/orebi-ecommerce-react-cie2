import React from "react";
import { motion } from "framer-motion";
import { SiBuymeacoffee } from "react-icons/si";
import { FaCode } from "react-icons/fa";

const BuySourceCodeBtn = () => {
  return (
    <motion.a
      href="https://buymeacoffee.com/reactbd/e/442025"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#FFDD00] text-gray-900 font-bold px-4 py-3 rounded-full shadow-2xl border-2 border-gray-900 cursor-pointer hover:bg-[#ffe536] transition-all duration-300 group"
      title="Get Full Source Code on BuyMeACoffee"
    >
      <div className="w-8 h-8 rounded-full bg-gray-900 text-[#FFDD00] flex items-center justify-center text-lg group-hover:rotate-12 transition-transform duration-300">
        <SiBuymeacoffee />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] uppercase font-extrabold tracking-wider leading-none text-gray-800">
          Source Code
        </span>
        <span className="text-xs font-black font-titleFont leading-tight flex items-center gap-1 text-gray-900">
          Get Source Code <FaCode className="text-xs" />
        </span>
      </div>
    </motion.a>
  );
};

export default BuySourceCodeBtn;
