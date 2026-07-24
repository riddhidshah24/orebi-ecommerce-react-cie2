import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { logo, logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";

const Header = () => {
  const [sidenav, setSidenav] = useState(false);
  const location = useLocation();

  return (
    <header className="w-full h-20 bg-white/90 sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md transition-all">
      <div className="h-full px-4 max-w-container mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Image className="w-20 object-contain transition-transform group-hover:scale-105" imgSrc={logo} alt="Orebi Logo" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navBarList.map(({ _id, title, link }) => {
            const isActive = location.pathname === link;
            return (
              <NavLink
                key={_id}
                to={link}
                className={({ isActive }) =>
                  `px-5 py-2 text-sm font-titleFont transition-all rounded-full cursor-pointer relative ${
                    isActive
                      ? "font-bold text-primeColor bg-gray-100"
                      : "font-medium text-secondary hover:text-primeColor hover:bg-gray-50"
                  }`
                }
              >
                {title}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-primeColor rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setSidenav(true)}
          className="md:hidden p-2 text-primeColor hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Open Mobile Menu"
        >
          <HiMenuAlt2 className="w-7 h-7" />
        </button>

        {/* Mobile Slide-in Drawer */}
        <AnimatePresence>
          {sidenav && (
            <div className="fixed inset-0 z-50 flex">
              {/* Overlay Backdroop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidenav(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              />

              {/* Slide Drawer Content */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-4/5 max-w-sm h-full bg-primeColor text-white p-6 shadow-2xl z-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
                    <img className="w-28" src={logoLight} alt="Orebi Light Logo" />
                    <button
                      type="button"
                      onClick={() => setSidenav(false)}
                      className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <MdClose className="text-2xl" />
                    </button>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {navBarList.map(({ _id, title, link }) => (
                      <li key={_id}>
                        <NavLink
                          to={link}
                          onClick={() => setSidenav(false)}
                          className={({ isActive }) =>
                            `block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                              isActive
                                ? "bg-white/15 text-white"
                                : "text-gray-300 hover:text-white hover:bg-white/5"
                            }`
                          }
                        >
                          {title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-700 text-xs text-gray-400">
                  <p>© 2026 Orebi Shopping Inc. All rights reserved.</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
