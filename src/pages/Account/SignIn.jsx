import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { useOrebiStore } from "../../store/useOrebiStore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loginUserStore = useOrebiStore((state) => state.loginUser);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    let valid = true;
    if (!email) {
      setErrEmail("Please enter your email address");
      valid = false;
    }
    if (!password) {
      setErrPassword("Please enter your password");
      valid = false;
    }

    if (valid) {
      const username = email.split("@")[0] || "User";
      const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
      
      loginUserStore({
        name: formattedName,
        email: email,
      });

      setSuccessMsg(`Welcome back, ${formattedName}! Redirecting to shop...`);
      setTimeout(() => {
        navigate("/shop");
      }, 1500);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-5xl h-auto md:h-[650px] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row m-4">
        
        {/* Left Side Brand Showcase */}
        <div className="w-full md:w-1/2 bg-primeColor text-white p-8 md:p-12 flex flex-col justify-between">
          <div>
            <Link to="/">
              <img src={logoLight} alt="Orebi Logo" className="w-28 mb-8" />
            </Link>
            <h2 className="font-titleFont text-2xl md:text-3xl font-bold mb-3 leading-snug">
              Welcome Back to Orebi Shopping
            </h2>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              Sign in to manage your orders, access exclusive VIP discounts, and enjoy seamless one-click checkout.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BsCheckCircleFill className="text-green-400 mt-1 flex-shrink-0" />
                <p className="text-xs text-gray-300">
                  <strong className="text-white block font-titleFont">Track Orders Live</strong>
                  Real-time status updates on all your pending deliveries.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <BsCheckCircleFill className="text-green-400 mt-1 flex-shrink-0" />
                <p className="text-xs text-gray-300">
                  <strong className="text-white block font-titleFont">Member-Only Flash Offers</strong>
                  Unlock up to 40% discount on seasonal tech and style drops.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <BsCheckCircleFill className="text-green-400 mt-1 flex-shrink-0" />
                <p className="text-xs text-gray-300">
                  <strong className="text-white block font-titleFont">Secure & Encrypted</strong>
                  Your personal profile and payment details are protected with 256-bit encryption.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
            <span>© 2026 OREBI</span>
            <div className="flex gap-4">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Help</Link>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          {successMsg ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h3 className="text-xl font-bold font-titleFont text-primeColor mb-2">Signed In Successfully</h3>
              <p className="text-sm text-secondary mb-6">{successMsg}</p>
              <Link to="/shop">
                <button className="px-6 py-2.5 bg-primeColor text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors">
                  Go to Shop Now
                </button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSignIn} className="w-full">
              <h1 className="font-titleFont font-bold text-2xl md:text-3xl text-primeColor mb-2">
                Sign In to Account
              </h1>
              <p className="text-sm text-secondary mb-8">
                Enter your credentials to access your account profile.
              </p>

              <div className="space-y-4 mb-6">
                {/* Email Input */}
                <div>
                  <label className="block text-xs font-bold uppercase text-secondary mb-1.5 font-titleFont">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="john@example.com"
                    className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm text-primeColor outline-none focus:border-primeColor shadow-xs"
                  />
                  {errEmail && (
                    <p className="text-xs text-red-500 font-semibold mt-1">{errEmail}</p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-bold uppercase text-secondary mb-1.5 font-titleFont">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePassword}
                      placeholder="••••••••"
                      className="w-full h-11 border border-gray-200 rounded-lg px-4 pr-10 text-sm text-primeColor outline-none focus:border-primeColor shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-primeColor text-base"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errPassword && (
                    <p className="text-xs text-red-500 font-semibold mt-1">{errPassword}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-primeColor text-white font-bold font-titleFont text-sm rounded-lg hover:bg-black transition-colors duration-300 shadow-md cursor-pointer mb-6"
              >
                Sign In
              </button>

              <p className="text-sm text-center text-secondary">
                Don't have an account yet?{" "}
                <Link to="/signup" className="font-bold text-primeColor hover:underline">
                  Create Account
                </Link>
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default SignIn;
