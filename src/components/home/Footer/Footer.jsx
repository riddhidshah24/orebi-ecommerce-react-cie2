import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaMedium,
  FaDiscord,
  FaWhatsapp,
} from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard, logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { SOCIAL_LINKS } from "../../../constants/socialLinks";
import { toast } from "react-toastify";

const iconMap = {
  medium: FaMedium,
  youtube: FaYoutube,
  github: FaGithub,
  instagram: FaInstagram,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  discord: FaDiscord,
  whatsapp: FaWhatsapp,
};

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = (e) => {
    e.preventDefault();
    if (emailInfo.trim() === "") {
      setErrMsg("Please provide your email address.");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please provide a valid email address.");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
      toast.success("Thank you for subscribing to the Orebi VIP newsletter! 🎉");
    }
  };

  return (
    <footer className="w-full bg-primeColor text-gray-300 py-16 border-t border-gray-800">
      <div className="max-w-container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-10">
        
        {/* Brand & Social Links */}
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            <Link to="/">
              <img src={logoLight} alt="Orebi Logo" className="w-28 mb-6" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              Orebi Shopping is a global e-commerce destination celebrating classic modern style, curated premium gadgets, and sustainable lifestyle products.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3 font-titleFont">
              Follow Our Channels
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = iconMap[link.id] || FaGithub;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    title={link.label}
                    className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 transition-all duration-300 ${link.hover}`}
                  >
                    <IconComponent className="text-base" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Shop Links */}
        <div>
          <FooterListTitle title="Shop Categories" />
          <ul className="flex flex-col gap-2.5 text-sm">
            {[
              "Accessories",
              "Electronics",
              "Clothes",
              "Bags",
              "Home appliances",
              "Gadgets",
            ].map((cat) => (
              <li key={cat}>
                <Link
                  to="/shop"
                  className="text-gray-400 hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account Links */}
        <div>
          <FooterListTitle title="Customer Care" />
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link to="/signin" className="text-gray-400 hover:text-white hover:underline underline-offset-4 transition-colors">
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-gray-400 hover:text-white hover:underline underline-offset-4 transition-colors">
                View Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/paymentgateway" className="text-gray-400 hover:text-white hover:underline underline-offset-4 transition-colors">
                Payment Options
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white hover:underline underline-offset-4 transition-colors">
                Help & Concierge
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white hover:underline underline-offset-4 transition-colors">
                About Orebi
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            <FooterListTitle title="Subscribe to VIP Drops" />
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Get 10% off your first purchase and stay updated on exclusive limited-time deals.
            </p>

            {subscription ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 text-green-400 text-sm font-semibold text-center"
              >
                ✓ You are subscribed to Orebi VIP newsletter!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscription} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    onChange={(e) => { setEmailInfo(e.target.value); setErrMsg(""); }}
                    value={emailInfo}
                    className="w-full h-11 bg-white/5 border border-gray-700 rounded-xl px-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-white transition-colors"
                    type="text"
                    placeholder="Enter your email address..."
                  />
                </div>
                {errMsg && (
                  <p className="text-red-400 text-xs font-semibold">{errMsg}</p>
                )}
                <button
                  type="submit"
                  className="w-full h-11 bg-white text-primeColor font-bold font-titleFont text-sm rounded-xl hover:bg-gray-200 transition-colors shadow-md cursor-pointer"
                >
                  Subscribe Now
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800">
            <span className="text-xs text-gray-500 block mb-2 font-titleFont">Accepted Payment Gateways:</span>
            <Image className="w-56 opacity-80" imgSrc={paymentCard} alt="Accepted Cards" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
