import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useOrebiStore } from "../../store/useOrebiStore";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { FiTrash2, FiTag, FiTruck, FiShield, FiLock, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";

const Cart = () => {
  const products = useOrebiStore((state) => state.products);
  const user = useOrebiStore((state) => state.user);
  const resetCartStore = useOrebiStore((state) => state.resetCart);
  const navigate = useNavigate();

  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [couponInput, setCouponInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState({ text: "", error: false });

  // Calculate subtotal
  useEffect(() => {
    let sum = 0;
    products.forEach((item) => {
      sum += (parseFloat(item.price) || 0) * (item.quantity || 1);
    });
    setTotalAmt(sum);
  }, [products]);

  // Shipping calculation (Free over $300)
  const freeShippingThreshold = 300;
  useEffect(() => {
    if (totalAmt === 0) {
      setShippingCharge(0);
    } else if (totalAmt >= freeShippingThreshold) {
      setShippingCharge(0);
    } else if (totalAmt <= 150) {
      setShippingCharge(25);
    } else {
      setShippingCharge(15);
    }
  }, [totalAmt]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      toast.warning("Please enter a valid coupon code.");
      setCouponMsg({ text: "Please enter a coupon code.", error: true });
      return;
    }

    if (code === "OREBI20" || code === "SAVE20") {
      setDiscountPercent(20);
      setCouponMsg({ text: "Coupon OREBI20 applied! (20% Off)", error: false });
      toast.success("Coupon OREBI20 applied! You saved 20% 🎉");
    } else if (code === "WELCOME10") {
      setDiscountPercent(10);
      setCouponMsg({ text: "Coupon WELCOME10 applied! (10% Off)", error: false });
      toast.success("Coupon WELCOME10 applied! You saved 10% 🎉");
    } else {
      setDiscountPercent(0);
      setCouponMsg({ text: "Invalid coupon code. Try 'OREBI20' or 'WELCOME10'.", error: true });
      toast.error("Invalid coupon code. Try 'OREBI20' or 'WELCOME10'.");
    }
  };

  const handleResetCart = () => {
    resetCartStore();
    toast.info("Shopping cart cleared.", { icon: "🧹" });
  };

  const handleCheckoutClick = () => {
    if (!user) {
      toast.warning("Please sign in or create an account to proceed to checkout!", {
        icon: "🔒",
      });
      navigate("/signin", { state: { from: "/cart" } });
    } else {
      navigate("/paymentgateway");
    }
  };

  const discountAmount = (totalAmt * discountPercent) / 100;
  const grandTotal = Math.max(0, totalAmt - discountAmount + shippingCharge);
  const freeShippingProgress = Math.min(100, (totalAmt / freeShippingThreshold) * 100);

  return (
    <div className="max-w-container mx-auto px-4 pb-20">
      <Breadcrumbs title="Shopping Cart" />

      {products.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Main Cart Items Segment */}
          <div className="flex-1 w-full">
            {/* Free Shipping Progress Indicator */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 shadow-xs">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-primeColor mb-2">
                <span className="flex items-center gap-2">
                  <FiTruck className="text-base text-primeColor" />
                  {totalAmt >= freeShippingThreshold ? (
                    <span className="text-green-600 font-bold">You unlocked FREE Express Shipping! 🎉</span>
                  ) : (
                    <span>
                      Add <strong className="text-primeColor">${(freeShippingThreshold - totalAmt).toFixed(2)}</strong> more to get FREE Express Shipping
                    </span>
                  )}
                </span>
                <span>{freeShippingProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primeColor h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Header */}
            <div className="hidden sm:grid grid-cols-5 bg-gray-100 border border-gray-200 rounded-xl p-4 text-xs font-bold uppercase tracking-wider text-secondary mb-4">
              <span className="col-span-2">Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Subtotal</span>
            </div>

            {/* List of Cart Items */}
            <div className="flex flex-col gap-4 mb-6">
              {products.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
              <Link to="/shop">
                <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-primeColor hover:bg-gray-50 transition-colors cursor-pointer">
                  ← Continue Shopping
                </button>
              </Link>
              <button
                type="button"
                onClick={handleResetCart}
                className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FiTrash2 /> Empty Cart
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <h2 className="text-xl font-bold font-titleFont text-primeColor mb-6 pb-3 border-b border-gray-200">
              Order Summary
            </h2>

            {/* Auth Requirements Notice */}
            {!user ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-6 flex items-start gap-3">
                <FiLock className="text-amber-600 text-lg flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <strong className="block font-bold mb-0.5">Sign In Required</strong>
                  Please sign in to proceed with checkout.
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-6 flex items-center gap-2 text-xs text-green-800 font-semibold">
                <FiCheckCircle className="text-green-600 text-base" />
                <span>Signed in as <strong>{user.name}</strong></span>
              </div>
            )}

            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="mb-6">
              <label htmlFor="coupon" className="block text-xs font-bold text-secondary uppercase mb-2">
                Have a Promo Code?
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    id="coupon"
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Try 'OREBI20'"
                    className="w-full border border-gray-200 rounded-lg py-2 pl-8 pr-3 text-sm outline-none focus:border-primeColor uppercase"
                  />
                  <FiTag className="absolute left-2.5 top-3 text-gray-400 text-xs" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primeColor text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponMsg.text && (
                <p className={`text-xs mt-2 font-medium ${couponMsg.error ? "text-red-500" : "text-green-600"}`}>
                  {couponMsg.text}
                </p>
              )}
            </form>

            {/* Pricing Breakdown */}
            <div className="flex flex-col gap-3 text-sm border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex justify-between text-secondary">
                <span>Subtotal ({products.length} items)</span>
                <span className="font-semibold text-primeColor">${totalAmt.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-secondary">
                <span>Shipping Estimate</span>
                <span className="font-semibold text-primeColor">
                  {shippingCharge === 0 ? <strong className="text-green-600">FREE</strong> : `$${shippingCharge.toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold font-titleFont text-primeColor">Total</span>
              <span className="text-2xl font-bold font-titleFont text-primeColor">
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button with Auth Gate */}
            {user ? (
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-primeColor text-white font-bold font-titleFont text-center rounded-xl hover:bg-black transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-gray-200 text-gray-600 font-bold font-titleFont text-center rounded-xl hover:bg-primeColor hover:text-white transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiLock /> Sign In to Checkout
              </button>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-secondary">
              <FiShield className="text-base text-green-600" />
              <span>Guaranteed 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>

        </div>
      ) : (
        /* Empty Cart State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <img className="w-64 mb-6" src={emptyCart} alt="Empty Cart" />
          <h2 className="text-2xl font-bold font-titleFont text-primeColor mb-2">
            Your Shopping Cart is Empty
          </h2>
          <p className="text-secondary text-sm max-w-md mb-6 leading-relaxed">
            Looks like you haven't added anything to your cart yet. Explore our curated shop collection to discover trending products.
          </p>
          <Link to="/shop">
            <button className="px-8 py-3.5 bg-primeColor text-white font-bold font-titleFont rounded-xl hover:bg-black transition-colors shadow-md">
              Start Shopping Now
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
