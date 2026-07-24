import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { MdClose, MdLogout, MdPerson } from "react-icons/md";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useOrebiStore } from "../../../store/useOrebiStore";
import { paginationItems } from "../../../constants";
import { toast } from "react-toastify";

const HeaderBottom = () => {
  const products = useOrebiStore((state) => state.products);
  const user = useOrebiStore((state) => state.user);
  const logoutUser = useOrebiStore((state) => state.logoutUser);

  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const categoryRef = useRef(null);
  const userRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShowCategoryMenu(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      setIsSearchOpen(false);
      return;
    }

    const q = searchQuery.toLowerCase();
    const matches = paginationItems.filter(
      (item) =>
        item.productName.toLowerCase().includes(q) ||
        (item.cat && item.cat.toLowerCase().includes(q)) ||
        (item.brand && item.brand.toLowerCase().includes(q)) ||
        (item.color && item.color.toLowerCase().includes(q))
    );
    setFilteredProducts(matches);
    setIsSearchOpen(true);
  }, [searchQuery]);

  const handleSelectProduct = (item) => {
    setSearchQuery("");
    setIsSearchOpen(false);
    navigate(`/product/${String(item.productName).toLowerCase().split(" ").join("")}`, {
      state: { item },
    });
  };

  const handleLogout = () => {
    logoutUser();
    setShowUserDropdown(false);
    toast.info("Signed out of your account.", { icon: "👋" });
  };

  const categories = [
    { title: "Accessories", link: "/shop" },
    { title: "Electronics", link: "/shop" },
    { title: "Clothes", link: "/shop" },
    { title: "Bags", link: "/shop" },
    { title: "Home appliances", link: "/shop" },
    { title: "Gadgets", link: "/shop" },
  ];

  const totalCartCount = products.reduce((acc, p) => acc + (p.quantity || 1), 0);

  return (
    <div className="w-full bg-gray-100/90 border-b border-gray-200 sticky top-20 z-40 backdrop-blur-md">
      <div className="max-w-container mx-auto px-4">
        <Flex className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between w-full py-3 lg:py-0 h-auto lg:h-20 gap-4 lg:gap-0">
          
          {/* Shop By Category Dropdown */}
          <div ref={categoryRef} className="relative">
            <button
              type="button"
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="flex h-12 items-center gap-2.5 px-4 bg-white border border-gray-200 rounded-xl text-primeColor font-semibold text-sm hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
            >
              <HiOutlineMenuAlt4 className="w-5 h-5 text-primeColor" />
              <span>Shop by Category</span>
              <FaCaretDown className={`transition-transform duration-300 text-xs text-secondary ${showCategoryMenu ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showCategoryMenu && (
                <motion.ul
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-14 left-0 z-50 bg-white border border-gray-200 rounded-xl w-60 text-primeColor shadow-xl py-2 overflow-hidden"
                >
                  {categories.map((cat, idx) => (
                    <li key={idx}>
                      <Link
                        to="/shop"
                        onClick={() => setShowCategoryMenu(false)}
                        className="flex items-center justify-between px-5 py-2.5 text-sm text-secondary hover:text-primeColor hover:bg-gray-50 font-medium transition-colors"
                      >
                        {cat.title}
                        <span className="text-xs text-gray-400">→</span>
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Live Search Bar */}
          <div ref={searchRef} className="relative w-full lg:w-[550px]">
            <div className="relative w-full h-[46px] text-base text-primeColor bg-white border border-gray-200 rounded-xl flex items-center justify-between px-4 shadow-xs focus-within:border-primeColor transition-colors">
              <FaSearch className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                className="flex-1 h-full px-3 outline-none text-sm text-primeColor placeholder:text-gray-400 placeholder:text-sm bg-transparent"
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                placeholder="Search products, categories, brands..."
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="p-1 text-gray-400 hover:text-primeColor text-sm rounded-full transition-colors cursor-pointer"
                >
                  <MdClose />
                </button>
              )}
            </div>

            {/* Live Search Modal Results */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 top-14 w-full bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto"
                >
                  {filteredProducts.length > 0 ? (
                    <div>
                      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-secondary font-semibold">
                        <span>Matching Results ({filteredProducts.length})</span>
                        <span>Click to view product</span>
                      </div>
                      {filteredProducts.map((item) => (
                        <div
                          key={item._id}
                          onClick={() => handleSelectProduct(item)}
                          className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 flex items-center gap-4 cursor-pointer transition-colors"
                        >
                          <img
                            className="w-14 h-14 object-cover rounded-md border border-gray-100 flex-shrink-0 bg-gray-50"
                            src={item.img}
                            alt={item.productName}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-primeColor truncate font-titleFont">
                              {item.productName}
                            </h4>
                            <p className="text-xs text-secondary truncate mt-0.5">{item.des}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-bold text-primeColor font-titleFont">
                                ${item.price}
                              </span>
                              {item.cat && (
                                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                  {item.cat}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm font-semibold text-primeColor mb-1">No products found</p>
                      <p className="text-xs text-secondary">
                        No results matching "{searchQuery}". Try searching for apparel, watch, or bags.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Account & Cart Status Controls */}
          <div className="flex items-center gap-6 justify-end">
            
            {/* User Profile / Auth State Dropdown */}
            <div ref={userRef} className="relative">
              <button
                type="button"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-primeColor font-semibold hover:text-black transition-colors rounded-lg cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-primeColor text-white flex items-center justify-center font-bold text-xs">
                  {user ? user.name.charAt(0).toUpperCase() : <FaUser className="text-xs" />}
                </div>
                <span className="hidden sm:inline-block max-w-[120px] truncate">
                  {user ? user.name : "Account"}
                </span>
                <FaCaretDown className={`text-xs text-secondary transition-transform duration-200 ${showUserDropdown ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showUserDropdown && (
                  <motion.ul
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 right-0 z-50 bg-white border border-gray-200 rounded-xl w-52 text-primeColor shadow-xl py-2 overflow-hidden"
                  >
                    {user ? (
                      <div>
                        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                          <p className="text-xs font-bold text-primeColor truncate">{user.name}</p>
                          <p className="text-[11px] text-secondary truncate">{user.email}</p>
                        </div>
                        <li>
                          <Link
                            to="/shop"
                            onClick={() => setShowUserDropdown(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-secondary hover:text-primeColor hover:bg-gray-50 transition-colors"
                          >
                            <MdPerson className="text-base text-gray-500" /> My Account
                          </Link>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 font-medium cursor-pointer"
                          >
                            <MdLogout className="text-base" /> Sign Out
                          </button>
                        </li>
                      </div>
                    ) : (
                      <div>
                        <li>
                          <Link
                            to="/signin"
                            onClick={() => setShowUserDropdown(false)}
                            className="block px-4 py-2.5 text-sm font-semibold text-primeColor hover:bg-gray-50 transition-colors"
                          >
                            Sign In
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/signup"
                            onClick={() => setShowUserDropdown(false)}
                            className="block px-4 py-2.5 text-sm text-secondary hover:text-primeColor hover:bg-gray-50 transition-colors border-t border-gray-100"
                          >
                            Create Account
                          </Link>
                        </li>
                      </div>
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart Button with Animated Bounce */}
            <Link to="/cart">
              <motion.div
                key={totalCartCount}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center gap-2 bg-primeColor text-white px-4 py-2 rounded-xl hover:bg-black transition-colors duration-300 shadow-xs cursor-pointer"
              >
                <FaShoppingCart className="text-sm" />
                <span className="text-xs font-bold font-titleFont">Cart</span>
                <span className="bg-white text-primeColor text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-1">
                  {totalCartCount}
                </span>
              </motion.div>
            </Link>

          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
