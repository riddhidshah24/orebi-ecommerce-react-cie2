import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

const Contact = () => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const EmailValidation = (mail) => {
    return String(mail)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handlePost = (e) => {
    e.preventDefault();
    let valid = true;

    if (!clientName) {
      setErrClientName("Please enter your full name");
      valid = false;
    }
    if (!email) {
      setErrEmail("Please enter your email");
      valid = false;
    } else if (!EmailValidation(email)) {
      setErrEmail("Please enter a valid email address");
      valid = false;
    }
    if (!messages) {
      setErrMessages("Please write your inquiry or message");
      valid = false;
    }

    if (valid) {
      setSuccessMsg(
        `Thank you, ${clientName}! Your message has been received. Our concierge team will reply to ${email} within 24 hours.`
      );
      setClientName("");
      setEmail("");
      setMessages("");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 pb-20">
      <Breadcrumbs title="Contact Support" />

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Contact Details Card */}
        <div className="w-full lg:w-5/12 bg-primeColor text-white p-8 md:p-10 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-300 font-bold bg-white/10 px-3 py-1 rounded-full">
              Get In Touch
            </span>
            <h2 className="text-3xl font-bold font-titleFont mt-4 mb-4">
              We'd Love to Hear From You
            </h2>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              Have a question about an order, styling recommendation, or partnership? Reach out to our dedicated support team anytime.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl text-amber-400">
                  <FiMail />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-300 uppercase">Concierge Email</h4>
                  <p className="text-sm font-semibold">support@orebishopping.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl text-amber-400">
                  <FiPhone />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-300 uppercase">Phone & WhatsApp</h4>
                  <p className="text-sm font-semibold">+1 (800) 555-OREBI (6732)</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl text-amber-400">
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-300 uppercase">Global Headquarters</h4>
                  <p className="text-sm font-semibold">5th Avenue, Fashion District, New York, NY</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl text-amber-400">
                  <FiClock />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-300 uppercase">Concierge Hours</h4>
                  <p className="text-sm font-semibold">24 Hours / 7 Days a Week</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 mt-8 text-xs text-gray-400">
            Response guaranteed within 24 hours.
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-7/12 bg-white border border-gray-200 rounded-2xl p-8 shadow-xs">
          {successMsg ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold font-titleFont text-primeColor mb-2">Message Sent!</h3>
              <p className="text-sm text-secondary max-w-md mx-auto leading-relaxed">{successMsg}</p>
              <button
                type="button"
                onClick={() => setSuccessMsg("")}
                className="mt-6 px-6 py-2.5 bg-primeColor text-white font-semibold text-sm rounded-lg hover:bg-black transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handlePost} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-titleFont text-primeColor mb-1">
                  Send Us a Message
                </h2>
                <p className="text-xs text-secondary mb-6">
                  Fill in the details below and we will get back to you promptly.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-secondary mb-1.5 font-titleFont">
                  Full Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => { setClientName(e.target.value); setErrClientName(""); }}
                  placeholder="John Doe"
                  className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm text-primeColor outline-none focus:border-primeColor shadow-xs"
                />
                {errClientName && <p className="text-xs text-red-500 font-semibold mt-1">{errClientName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-secondary mb-1.5 font-titleFont">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrEmail(""); }}
                  placeholder="john@example.com"
                  className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm text-primeColor outline-none focus:border-primeColor shadow-xs"
                />
                {errEmail && <p className="text-xs text-red-500 font-semibold mt-1">{errEmail}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-secondary mb-1.5 font-titleFont">
                  Inquiry Message
                </label>
                <textarea
                  rows={5}
                  value={messages}
                  onChange={(e) => { setMessages(e.target.value); setErrMessages(""); }}
                  placeholder="How can we assist you today?"
                  className="w-full border border-gray-200 rounded-lg p-4 text-sm text-primeColor outline-none focus:border-primeColor shadow-xs resize-none"
                />
                {errMessages && <p className="text-xs text-red-500 font-semibold mt-1">{errMessages}</p>}
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-primeColor text-white font-bold font-titleFont text-sm rounded-xl hover:bg-black transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiSend /> Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
