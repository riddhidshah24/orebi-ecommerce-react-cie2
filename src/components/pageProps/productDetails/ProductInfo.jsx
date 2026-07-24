import React, { useState } from "react";
import { FaStar, FaShoppingCart, FaCheck } from "react-icons/fa";
import { FiShield, FiTruck, FiRefreshCw } from "react-icons/fi";
import { useOrebiStore } from "../../../store/useOrebiStore";
import { toast } from "react-toastify";

const ProductInfo = ({ productInfo }) => {
  const addToCartStore = useOrebiStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCartStore({
      _id: productInfo._id || productInfo.id,
      productName: productInfo.productName,
      quantity: 1,
      img: productInfo.img,
      badge: productInfo.badge,
      price: productInfo.price,
      color: productInfo.color,
      cat: productInfo.cat,
      brand: productInfo.brand,
    });

    setAdded(true);
    toast.success(`${productInfo.productName} added to cart!`, { icon: "🛒" });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Category & Brand Badges */}
      <div className="flex items-center gap-3">
        {productInfo.cat && (
          <span className="bg-gray-100 text-primeColor text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {productInfo.cat}
          </span>
        )}
        {productInfo.brand && (
          <span className="text-xs text-secondary font-semibold">
            Brand: <strong className="text-primeColor">{productInfo.brand}</strong>
          </span>
        )}
      </div>

      <h2 className="text-3xl font-bold font-titleFont text-primeColor">
        {productInfo.productName}
      </h2>

      {/* Star Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-amber-400 text-sm">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <span className="text-xs font-semibold text-secondary">
          ({productInfo.rating || 4.8} / 5.0 • 42 Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 my-1">
        <span className="text-3xl font-bold font-titleFont text-primeColor">
          ${productInfo.price}
        </span>
        <span className="text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
          In Stock • Express Shipping
        </span>
      </div>

      <p className="text-sm text-secondary leading-relaxed border-t border-b border-gray-100 py-3">
        {productInfo.des || "Premium quality lifestyle essential crafted for maximum durability and timeless aesthetic."}
      </p>

      {/* Product Options */}
      {productInfo.color && (
        <p className="text-sm font-medium text-primeColor">
          Color: <span className="font-normal text-secondary">{productInfo.color}</span>
        </p>
      )}

      {/* Add to Cart CTA */}
      <button
        type="button"
        onClick={handleAdd}
        className={`w-full py-3.5 rounded-xl font-bold font-titleFont text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
          added
            ? "bg-green-600 text-white"
            : "bg-primeColor text-white hover:bg-black"
        }`}
      >
        {added ? (
          <>
            <FaCheck /> Added to Cart!
          </>
        ) : (
          <>
            <FaShoppingCart /> Add to Cart
          </>
        )}
      </button>

      {/* Guarantees */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100 text-center">
        <div className="flex flex-col items-center">
          <FiTruck className="text-lg text-primeColor mb-1" />
          <span className="text-[11px] text-secondary font-medium">Free Shipping &gt;$300</span>
        </div>
        <div className="flex flex-col items-center">
          <FiShield className="text-lg text-primeColor mb-1" />
          <span className="text-[11px] text-secondary font-medium">2 Year Warranty</span>
        </div>
        <div className="flex flex-col items-center">
          <FiRefreshCw className="text-lg text-primeColor mb-1" />
          <span className="text-[11px] text-secondary font-medium">30 Day Returns</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
