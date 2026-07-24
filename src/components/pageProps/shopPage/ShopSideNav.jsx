import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";
import { BiReset } from "react-icons/bi";

const ShopSideNav = ({
  selectedCategory,
  onSelectCategory,
  selectedColor,
  onSelectColor,
  selectedBrand,
  onSelectBrand,
  selectedPrice,
  onSelectPrice,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {hasActiveFilters && (
        <button
          onClick={onResetFilters}
          className="w-full py-2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-primeColor text-primeColor hover:text-white rounded-md text-sm font-semibold transition-colors duration-300 border border-gray-200"
        >
          <BiReset className="text-lg" /> Reset All Filters
        </button>
      )}
      <Category selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
      <Color selectedColor={selectedColor} onSelectColor={onSelectColor} />
      <Brand selectedBrand={selectedBrand} onSelectBrand={onSelectBrand} />
      <Price selectedPrice={selectedPrice} onSelectPrice={onSelectPrice} />
    </div>
  );
};

export default ShopSideNav;
