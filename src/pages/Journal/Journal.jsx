import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { motion } from "framer-motion";
import { FiClock, FiUser, FiArrowRight, FiSearch } from "react-icons/fi";
import { bannerImgOne, bannerImgTwo, bannerImgThree, newArrTwo } from "../../assets/images";

const Journal = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      id: 1,
      title: "The Ultimate Guide to Modern Minimalist Lifestyle & Tech 2026",
      excerpt: "Discover how simplifying your workspace and adopting high-efficiency smart tech gadgets can elevate daily focus and productivity.",
      category: "Tech & Style",
      author: "Alex Morgan",
      date: "July 20, 2026",
      readTime: "5 min read",
      img: bannerImgOne,
      featured: true,
    },
    {
      id: 2,
      title: "10 Essential Commuter Backpack Features You Shouldn't Ignore",
      excerpt: "From RFID protection to ergonomic weight distribution, here is what makes a travel bag durable and airport-friendly.",
      category: "Guides",
      author: "Sarah Jenkins",
      date: "July 15, 2026",
      readTime: "4 min read",
      img: bannerImgTwo,
    },
    {
      id: 3,
      title: "Why Smartwatches are Replacing Traditional Fitness Monitors",
      excerpt: "An in-depth analysis of AMOLED displays, real-time health telemetry, and long battery life in contemporary wearables.",
      category: "Tech",
      author: "David Chen",
      date: "July 10, 2026",
      readTime: "6 min read",
      img: newArrTwo,
    },
    {
      id: 4,
      title: "Curating Sustainable & Timeless Home Living Spaces",
      excerpt: "How selecting natural ceramic decor and minimalist furniture pieces creates enduring peace in urban apartments.",
      category: "Lifestyle",
      author: "Emma Watson",
      date: "July 02, 2026",
      readTime: "3 min read",
      img: bannerImgThree,
    },
  ];

  const tags = ["All", "Tech & Style", "Guides", "Tech", "Lifestyle"];

  const filteredArticles = articles.filter((art) => {
    const matchesTag = selectedTag === "All" || art.category === selectedTag;
    const matchesQuery =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="max-w-container mx-auto px-4 pb-20">
      <Breadcrumbs title="Orebi Journal" />

      {/* Header & Search Bar */}
      <div className="py-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-secondary font-bold font-titleFont bg-gray-100 px-3 py-1 rounded-full">
            Insights & Inspiration
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-titleFont text-primeColor mt-3">
            Stories, Trends & Buying Guides
          </h1>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search journal articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 py-2.5 pl-10 pr-4 rounded-lg text-sm text-primeColor outline-none focus:border-primeColor shadow-xs"
          />
          <FiSearch className="absolute left-3 top-3 text-secondary text-base" />
        </div>
      </div>

      {/* Category Tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors duration-200 cursor-pointer ${
              selectedTag === tag
                ? "bg-primeColor text-white shadow-xs"
                : "bg-gray-100 text-secondary hover:bg-gray-200 hover:text-primeColor"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((art) => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col group"
          >
            <div className="h-52 overflow-hidden bg-gray-100 relative">
              <img
                src={art.img}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primeColor text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {art.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-secondary mb-3">
                  <span className="flex items-center gap-1">
                    <FiUser /> {art.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiClock /> {art.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-titleFont text-primeColor mb-3 group-hover:text-accent transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed line-clamp-3 mb-6">
                  {art.excerpt}
                </p>
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm font-bold text-primeColor group-hover:translate-x-1 transition-transform"
              >
                Read Article <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
