import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useOrebiStore } from "../../store/useOrebiStore";
import BuySourceCodeBtn from "./BuySourceCodeBtn";

const SpecialCase = () => {
  const products = useOrebiStore((state) => state.products);
  return (
    <>
      <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
        <Link to="/signin">
          <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-secondary justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer border border-gray-200 hover:border-primeColor transition-colors">
            <div className="flex justify-center items-center">
              <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
              <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
            </div>
            <p className="text-xs font-semibold font-titleFont">Profile</p>
          </div>
        </Link>
        <Link to="/cart">
          <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-secondary justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative border border-gray-200 hover:border-primeColor transition-colors">
            <div className="flex justify-center items-center">
              <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
              <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
            </div>
            <p className="text-xs font-semibold font-titleFont">Buy Now</p>
            {products.length > 0 && (
              <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {products.length}
              </p>
            )}
          </div>
        </Link>
      </div>

      {/* Floating Buy Source Code CTA Button in Bottom-Right Corner */}
      <BuySourceCodeBtn />
    </>
  );
};

export default SpecialCase;
