import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useOrebiStore } from "../../store/useOrebiStore";
import { FiCheckCircle, FiCreditCard, FiLock, FiShield } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaPaypal, FaApplePay } from "react-icons/fa";

const Payment = () => {
  const products = useOrebiStore((state) => state.products);
  const resetCart = useOrebiStore((state) => state.resetCart);
  const user = useOrebiStore((state) => state.user);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState(user?.name || "");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = products.reduce((acc, p) => acc + (parseFloat(p.price) || 0) * (p.quantity || 1), 0);
  const shipping = subtotal > 300 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + shipping;

  const handlePay = (e) => {
    e.preventDefault();
    const generatedId = "ORB-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsSuccess(true);
    resetCart();
  };

  return (
    <div className="max-w-container mx-auto px-4 pb-20">
      <Breadcrumbs title="Secure Payment Gateway" />

      {isSuccess ? (
        <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg my-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            <FiCheckCircle />
          </div>
          <h2 className="text-3xl font-bold font-titleFont text-primeColor mb-2">Order Confirmed!</h2>
          <p className="text-secondary text-sm mb-6 leading-relaxed">
            Thank you for shopping with Orebi. Your order <strong className="text-primeColor">{orderId}</strong> has been successfully placed and is being prepared for dispatch.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-secondary mb-6 text-left space-y-1">
            <p><strong>Order Number:</strong> {orderId}</p>
            <p><strong>Total Paid:</strong> ${grandTotal.toFixed(2)}</p>
            <p><strong>Estimated Delivery:</strong> 2–4 Business Days</p>
          </div>
          <Link to="/shop">
            <button className="px-8 py-3.5 bg-primeColor text-white font-bold rounded-xl hover:bg-black transition-colors shadow-md">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Payment Form */}
          <div className="flex-1 w-full bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold font-titleFont text-primeColor mb-6 pb-3 border-b border-gray-200">
              Select Payment Method
            </h2>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { id: "card", label: "Credit Card", icon: FiCreditCard },
                { id: "paypal", label: "PayPal", icon: FaPaypal },
                { id: "apple", label: "Apple Pay", icon: FaApplePay },
                { id: "cod", label: "Cash on Delivery", icon: FiShield },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPaymentMethod(id)}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === id
                      ? "border-primeColor bg-primeColor text-white shadow-xs"
                      : "border-gray-200 text-secondary hover:border-gray-400 bg-white"
                  }`}
                >
                  <Icon className="text-xl" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-secondary mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm text-primeColor outline-none focus:border-primeColor shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-secondary mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• 8892"
                      className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm text-primeColor outline-none focus:border-primeColor shadow-xs"
                    />
                    <div className="absolute right-3 top-3 flex gap-1 text-xl text-gray-500">
                      <FaCcVisa />
                      <FaCcMastercard />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-secondary mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm text-primeColor outline-none focus:border-primeColor shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-secondary mb-1">CVC / CVV</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="•••"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm text-primeColor outline-none focus:border-primeColor shadow-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primeColor text-white font-bold font-titleFont text-base rounded-xl hover:bg-black transition-colors shadow-md mt-6 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiLock /> Pay ${grandTotal.toFixed(2)} Securely
                </button>
              </form>
            )}

            {paymentMethod !== "card" && (
              <div className="text-center py-10 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                <p className="text-sm font-semibold text-primeColor mb-4">
                  Click below to authorize purchase via {paymentMethod.toUpperCase()}.
                </p>
                <button
                  type="button"
                  onClick={handlePay}
                  className="px-8 py-3.5 bg-primeColor text-white font-bold rounded-xl hover:bg-black transition-colors shadow-md cursor-pointer"
                >
                  Confirm & Pay ${grandTotal.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-96 flex-shrink-0 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-lg font-bold font-titleFont text-primeColor mb-4 pb-2 border-b border-gray-200">
              Checkout Summary
            </h3>

            <div className="space-y-3 mb-4 text-sm max-h-60 overflow-y-auto">
              {products.map((p) => (
                <div key={p._id} className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-primeColor truncate max-w-[180px]">
                    {p.productName} (x{p.quantity})
                  </span>
                  <span className="font-bold text-primeColor">
                    ${((parseFloat(p.price) || 0) * p.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-2 text-sm">
              <div className="flex justify-between text-secondary">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="text-green-600">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-primeColor pt-2 border-t border-gray-100">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Payment;
