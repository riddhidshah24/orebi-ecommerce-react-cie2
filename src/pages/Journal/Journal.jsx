import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiUser, FiArrowRight, FiSearch, FiArrowLeft, FiShare2, FiMessageCircle } from "react-icons/fi";
import { bannerImgOne, bannerImgTwo, bannerImgThree, newArrTwo } from "../../assets/images";
import { toast } from "react-toastify";

const Journal = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Elena Rostova", time: "2 hours ago", text: "Great insights on minimalist living! I upgraded my workspace last week and my focus has doubled." },
    { id: 2, user: "James Wilson", time: "1 day ago", text: "The smartwatch comparison section was very detailed. Ordering the Smart Watch Ultra Pro now!" }
  ]);

  const articles = [
    {
      id: 1,
      title: "The Ultimate Guide to Modern Minimalist Lifestyle & Tech 2026",
      excerpt: "Discover how simplifying your workspace and adopting high-efficiency smart tech gadgets can elevate daily focus and productivity.",
      content: `
        Embracing minimalism in 2026 isn't just about owning fewer possessions—it's about intentional curation of tools that elevate your focus, health, and daily workflow.

        Key Takeaways for Minimalist Tech setup:
        1. Single-cable Thunderbolt docking to declutter your desk.
        2. High-fidelity wireless audio for distraction-free deep work.
        3. Dimmable warm LED ambient lighting to reduce late-night eye strain.

        When you reduce visual friction in your environment, your cognitive bandwidth expands. Orebi curated tech accessories are designed with matte finishes and clean geometric lines to fit seamlessly into any modern studio.
      `,
      category: "Tech & Style",
      author: "Alex Morgan",
      date: "July 20, 2026",
      readTime: "5 min read",
      img: bannerImgOne,
    },
    {
      id: 2,
      title: "10 Essential Commuter Backpack Features You Shouldn't Ignore",
      excerpt: "From RFID protection to ergonomic weight distribution, here is what makes a travel bag durable and airport-friendly.",
      content: `
        Navigating urban transit or international airports requires a backpack built for security, comfort, and weather resistance.

        Top 4 Non-Negotiable Backpack Features:
        - RFID-Blocking Concealed Pocket for passports and cards.
        - High-density EVA foam back panel for lumbar support.
        - Water-repellent 1680D ballistic nylon exterior.
        - Dedicated padded 15.6" laptop compartment with drop protection.

        Whether commuting daily or taking weekend getaway flights, investing in a properly balanced duffle or backpack prevents back strain and keeps your gear organized.
      `,
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
      content: `
        Modern smartwatches have evolved beyond simple step counters into real-time health intelligence hubs.

        Wearable Innovations to Watch in 2026:
        - Continuous ECG and SpO2 tracking with early anomaly alerts.
        - Ultra-bright 2000-nits outdoor AMOLED displays.
        - 14-day extended battery management algorithms.
        - Waterproof swim telemetry up to 50M depth.

        Pairing a sleek smartwatch with minimalist apparel bridges the gap between athletic performance tracking and high-end streetwear.
      `,
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
      content: `
        Creating a calming sanctuary begins with raw materials—natural clay ceramics, solid ash woods, and muted organic linens.

        Design Tips for Tranquil Interiors:
        - Choose one sculptural centerpiece (like an artisan ceramic vase) per room.
        - Incorporate warm neutral tones (beige, gray, cream) over harsh saturated hues.
        - Maximize natural sunlight with sheer linen window treatments.

        Our home accent collection is hand-assembled by master ceramic artisans to bring warmth and understated elegance to modern homes.
      `,
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

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComm = {
      id: Date.now(),
      user: "You (Verified Reader)",
      time: "Just now",
      text: commentInput,
    };
    setComments([newComm, ...comments]);
    setCommentInput("");
    toast.success("Comment posted successfully!");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 pb-20">
      <Breadcrumbs title={activeArticle ? activeArticle.title : "Orebi Journal"} />

      {/* ARTICLE READER VIEW */}
      {activeArticle ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-xs"
        >
          {/* Back Button */}
          <button
            type="button"
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-2 text-sm font-bold text-primeColor hover:text-black mb-8 px-4 py-2 bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <FiArrowLeft /> Back to All Articles
          </button>

          {/* Article Header */}
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest bg-primeColor text-white font-bold px-3 py-1 rounded-full">
              {activeArticle.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-titleFont text-primeColor mt-4 mb-4 leading-tight">
              {activeArticle.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-secondary border-b border-gray-200 pb-6">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-semibold text-primeColor">
                  <FiUser /> {activeArticle.author}
                </span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FiClock /> {activeArticle.readTime}
                </span>
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-primeColor font-semibold cursor-pointer"
              >
                <FiShare2 /> Share Article
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full h-80 md:h-[450px] rounded-xl overflow-hidden mb-8 border border-gray-100 bg-gray-50">
            <img src={activeArticle.img} alt={activeArticle.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Content */}
          <div className="prose max-w-none text-secondary text-base leading-relaxed space-y-6 mb-12 border-b border-gray-200 pb-12 whitespace-pre-line font-bodyFont">
            {activeArticle.content}
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold font-titleFont text-primeColor mb-6 flex items-center gap-2">
              <FiMessageCircle /> Reader Discussion ({comments.length})
            </h3>

            {/* New Comment Input */}
            <form onSubmit={handleAddComment} className="mb-8">
              <textarea
                rows={3}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Share your thoughts on this article..."
                className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none focus:border-primeColor mb-3 resize-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-primeColor text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors cursor-pointer"
              >
                Post Comment
              </button>
            </form>

            {/* List of Comments */}
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-primeColor">{c.user}</span>
                    <span className="text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        /* MAIN JOURNAL GRID VIEW */
        <div>
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
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col group cursor-pointer"
                onClick={() => {
                  setActiveArticle(art);
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
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
                    <h3 className="text-xl font-bold font-titleFont text-primeColor mb-3 group-hover:text-black transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed line-clamp-3 mb-6">
                      {art.excerpt}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveArticle(art);
                      window.scrollTo({ top: 200, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primeColor group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    Read Article <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;
