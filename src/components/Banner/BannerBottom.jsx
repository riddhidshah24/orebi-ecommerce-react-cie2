import React from "react";
import { MdLocalShipping, MdShield, MdHeadsetMic } from "react-icons/md";
import { CgRedo } from "react-icons/cg";

const BannerBottom = () => {
  const features = [
    {
      id: 1,
      title: "2-Year Warranty",
      desc: "Guaranteed protection on all tech & appliances",
      icon: MdShield,
    },
    {
      id: 2,
      title: "Free Express Shipping",
      desc: "On all orders above $300 worldwide",
      icon: MdLocalShipping,
    },
    {
      id: 3,
      title: "30-Day Return Policy",
      desc: "Hassle-free 100% money back guarantee",
      icon: CgRedo,
    },
    {
      id: 4,
      title: "24/7 Concierge Support",
      desc: "Dedicated customer service team",
      icon: MdHeadsetMic,
    },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 py-6 px-4">
      <div className="max-w-container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ id, title, desc, icon: Icon }) => (
          <div
            key={id}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primeColor text-white flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Icon />
            </div>
            <div>
              <h4 className="text-sm font-bold font-titleFont text-primeColor leading-snug">
                {title}
              </h4>
              <p className="text-xs text-secondary mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerBottom;
