import React from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";

const ProductBanner = ({
  isGridView,
  setIsGridView,
  itemsPerPage,
  setItemsPerPage,
  sortBy,
  setSortBy,
  totalProductsCount,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50 p-3 rounded-lg border border-gray-200">
      {/* Grid / List View Toggle Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 border border-gray-200 rounded-md p-1 bg-white">
          <button
            type="button"
            onClick={() => setIsGridView(true)}
            title="Grid View"
            className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
              isGridView
                ? "bg-primeColor text-white shadow-xs"
                : "text-secondary hover:text-primeColor hover:bg-gray-100"
            }`}
          >
            <BsGridFill className="text-base" />
          </button>
          <button
            type="button"
            onClick={() => setIsGridView(false)}
            title="List View"
            className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
              !isGridView
                ? "bg-primeColor text-white shadow-xs"
                : "text-secondary hover:text-primeColor hover:bg-gray-100"
            }`}
          >
            <ImList className="text-sm" />
          </button>
        </div>
        <span className="text-sm text-secondary font-medium hidden sm:inline-block">
          Showing {totalProductsCount} {totalProductsCount === 1 ? "Product" : "Products"}
        </span>
      </div>

      {/* Sort By & Show Options */}
      <div className="flex items-center gap-3 md:gap-6 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2 text-sm text-secondary relative">
          <label htmlFor="sortBy" className="block whitespace-nowrap font-medium">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-36 md:w-44 border border-gray-200 bg-white py-1.5 pl-3 pr-8 rounded-md cursor-pointer text-primeColor text-sm font-medium appearance-none focus:outline-none focus:border-primeColor shadow-xs"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="rating">Top Rated</option>
            </select>
            <span className="absolute text-xs right-2.5 top-3 pointer-events-none text-gray-500">
              <GoTriangleDown />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-secondary relative">
          <label htmlFor="itemsPerPage" className="block whitespace-nowrap font-medium">
            Show:
          </label>
          <div className="relative">
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="w-16 md:w-20 border border-gray-200 bg-white py-1.5 pl-3 pr-6 rounded-md cursor-pointer text-primeColor text-sm font-medium appearance-none focus:outline-none focus:border-primeColor shadow-xs"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
            </select>
            <span className="absolute text-xs right-2 top-3 pointer-events-none text-gray-500">
              <GoTriangleDown />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
