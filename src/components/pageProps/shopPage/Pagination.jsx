import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import { BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useOrebiStore } from "../../../store/useOrebiStore";
import { toast } from "react-toastify";

const Pagination = ({ items, itemsPerPage, isGridView }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const addToCartStore = useOrebiStore((state) => state.addToCart);
  const navigate = useNavigate();

  // Reset pagination offset whenever items change (e.g. after filtering)
  useEffect(() => {
    setItemOffset(0);
  }, [items, itemsPerPage]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleAddToCart = (item) => {
    addToCartStore({
      _id: item._id,
      productName: item.productName,
      quantity: 1,
      img: item.img,
      badge: item.badge,
      price: item.price,
      color: item.color,
    });
    toast.success(`${item.productName} added to cart!`, { icon: "🛒" });
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className="w-full py-16 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-xl font-semibold text-primeColor mb-2">No matching products found</p>
          <p className="text-sm text-secondary">
            Try adjusting or clearing your filters to view more products.
          </p>
        </div>
      ) : isGridView ? (
        /* Grid View Layout */
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lgl:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {currentItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <Product
                  _id={item._id}
                  img={item.img}
                  productName={item.productName}
                  price={item.price}
                  color={item.color}
                  badge={item.badge}
                  des={item.des}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* List View Layout */
        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {currentItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
              >
                {/* Product Image */}
                <div className="w-full sm:w-48 h-48 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden relative border border-gray-100 flex items-center justify-center">
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-primeColor text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
                      New Arrival
                    </span>
                  )}
                  <img
                    src={item.img}
                    alt={item.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col gap-2.5 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h2 className="text-xl font-bold font-titleFont text-primeColor">
                      {item.productName}
                    </h2>
                    <span className="text-2xl font-bold text-primeColor font-titleFont">
                      ${item.price}
                    </span>
                  </div>

                  {/* Metadata Tags */}
                  <div className="flex items-center gap-3 text-xs text-secondary flex-wrap">
                    {item.cat && (
                      <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium text-gray-700">
                        {item.cat}
                      </span>
                    )}
                    {item.brand && (
                      <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium text-gray-700">
                        Brand: {item.brand}
                      </span>
                    )}
                    {item.color && (
                      <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium text-gray-700">
                        Color: {item.color}
                      </span>
                    )}
                    {item.rating && (
                      <span className="flex items-center gap-1 text-amber-500 font-semibold">
                        <FaStar className="text-xs" /> {item.rating}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-secondary line-clamp-2 mt-1 leading-relaxed">
                    {item.des}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 flex-wrap">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="py-2 px-5 bg-primeColor text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors duration-300 flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                    <button
                      onClick={() =>
                        navigate(
                          `/product/${String(item.productName)
                            .toLowerCase()
                            .split(" ")
                            .join("")}`,
                          { state: { item } }
                        )
                      }
                      className="py-2 px-4 border border-gray-300 text-primeColor text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MdOutlineLabelImportant className="text-base" /> View Details
                    </button>
                    <button
                      onClick={() => toast.success(`${item.productName} added to wishlist!`, { icon: "❤️" })}
                      title="Add to Wish List"
                      className="p-2.5 text-secondary hover:text-red-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <BsSuitHeartFill className="text-base" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination Footer Controls */}
      {items.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-gray-200">
          <ReactPaginate
            nextLabel="Next >"
            previousLabel="< Prev"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            pageLinkClassName="w-9 h-9 border border-gray-200 rounded-md hover:border-primeColor duration-200 flex justify-center items-center text-sm font-medium text-primeColor"
            previousLinkClassName="px-3 h-9 border border-gray-200 rounded-md hover:border-primeColor duration-200 flex justify-center items-center text-sm font-medium text-primeColor"
            nextLinkClassName="px-3 h-9 border border-gray-200 rounded-md hover:border-primeColor duration-200 flex justify-center items-center text-sm font-medium text-primeColor"
            pageClassName="mr-2"
            containerClassName="flex items-center text-sm font-semibold font-titleFont flex-wrap gap-y-2"
            activeClassName="bg-primeColor text-white rounded-md"
            activeLinkClassName="bg-primeColor text-white border-primeColor"
          />

          <p className="text-sm font-medium text-secondary">
            Showing <span className="font-semibold text-primeColor">{itemOffset + 1}</span> to{" "}
            <span className="font-semibold text-primeColor">
              {Math.min(endOffset, items.length)}
            </span>{" "}
            of <span className="font-semibold text-primeColor">{items.length}</span> results
          </p>
        </div>
      )}
    </div>
  );
};

export default Pagination;
