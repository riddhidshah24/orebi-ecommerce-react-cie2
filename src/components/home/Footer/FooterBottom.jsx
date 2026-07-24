import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-black text-gray-400 py-6 border-t border-gray-900">
      <div className="max-w-container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <p className="flex items-center gap-1">
          <AiOutlineCopyright className="text-sm" />
          <span>Copyright 2026 | <strong>Orebi Shopping</strong> | All Rights Reserved</span>
        </p>

        <p className="flex items-center gap-1 text-gray-400">
          <span>Powered by</span>
          <a
            href="https://github.com/noorjsdivs"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:underline font-semibold font-titleFont ml-1"
          >
            ReactJSBD & Noor Mohammad
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
