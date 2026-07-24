import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Verified Buyer",
      comment: "Orebi's shipping speed and packaging quality blew me away! The Smart Watch Ultra arrived in pristine condition within 48 hours.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sophia Martinez",
      role: "Interior Designer",
      comment: "The ceramic flower vase and Scandinavian tea table fit perfectly in my minimalist studio. Outstanding quality and authentic craftsmanship.",
      rating: 5,
    },
    {
      id: 3,
      name: "Daniel Reynolds",
      role: "Frequent Shopper",
      comment: "Customer support is top notch. I had a quick question about sizing for the urban hoodie and received a response within minutes!",
      rating: 5,
    },
  ];

  return (
    <div className="w-full my-16 py-12 border-t border-b border-gray-200">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-secondary font-bold font-titleFont bg-gray-100 px-3 py-1 rounded-full">
          Customer Stories
        </span>
        <h2 className="text-3xl font-bold font-titleFont text-primeColor mt-3">
          Loved by Over 100,000+ Shoppers
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <motion.div
            key={rev.id}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
              <FaQuoteLeft className="text-gray-200 text-3xl mb-2" />
              <p className="text-secondary text-sm leading-relaxed mb-6 italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primeColor text-white font-bold flex items-center justify-center font-titleFont text-sm">
                {rev.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-primeColor font-titleFont">{rev.name}</h4>
                <p className="text-xs text-secondary font-medium">{rev.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
