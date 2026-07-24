import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Color = ({ selectedColor, onSelectColor }) => {
  const [showColors, setShowColors] = useState(true);
  const colors = [
    { _id: 9001, title: "Black", base: "#000000" },
    { _id: 9002, title: "Gray", base: "#9ca3af" },
    { _id: 9003, title: "Blank and White", base: "#6b7280" },
    { _id: 9004, title: "Mixed", base: "#8b5cf6" },
    { _id: 9005, title: "Green", base: "#22c55e" },
    { _id: 9006, title: "Red", base: "#ef4444" },
    { _id: 9007, title: "Blue", base: "#3b82f6" },
    { _id: 9008, title: "Yellow", base: "#eab308" },
  ];

  return (
    <div>
      <div onClick={() => setShowColors(!showColors)} className="cursor-pointer">
        <NavTitle title="Shop by Color" icons={true} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col gap-2 text-sm lg:text-base">
            {colors.map((item) => {
              const isSelected = selectedColor === item.title;
              return (
                <li
                  key={item._id}
                  onClick={() => onSelectColor && onSelectColor(isSelected ? null : item.title)}
                  className={`border-b-[1px] border-b-border pb-2 flex items-center justify-between cursor-pointer duration-200 transition-colors ${
                    isSelected
                      ? "font-bold text-primeColor border-b-primeColor"
                      : "text-secondary hover:text-primeColor hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      style={{ background: item.base }}
                      className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block shadow-xs"
                    ></span>
                    <span>{item.title}</span>
                  </div>
                  {isSelected && (
                    <span className="text-xs bg-primeColor text-white px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
