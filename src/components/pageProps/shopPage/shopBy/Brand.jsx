import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Brand = ({ selectedBrand, onSelectBrand }) => {
  const [showBrands, setShowBrands] = useState(true);
  const brands = [
    { _id: 9006, title: "Apple" },
    { _id: 9007, title: "Ultron" },
    { _id: 9008, title: "Shoppers Home" },
    { _id: 9009, title: "Hoichoi" },
    { _id: 9010, title: "Unknown" },
  ];

  return (
    <div>
      <div onClick={() => setShowBrands(!showBrands)} className="cursor-pointer">
        <NavTitle title="Shop by Brand" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col gap-2 text-sm lg:text-base">
            {brands.map((item) => {
              const isSelected = selectedBrand === item.title;
              return (
                <li
                  key={item._id}
                  onClick={() => onSelectBrand && onSelectBrand(isSelected ? null : item.title)}
                  className={`border-b-[1px] border-b-border pb-2 flex items-center justify-between cursor-pointer duration-200 transition-colors ${
                    isSelected
                      ? "font-bold text-primeColor border-b-primeColor"
                      : "text-secondary hover:text-primeColor hover:border-gray-400"
                  }`}
                >
                  <span>{item.title}</span>
                  {isSelected && (
                    <span className="text-xs bg-primeColor text-white px-2 py-0.5 rounded-full">
                      Active
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

export default Brand;
