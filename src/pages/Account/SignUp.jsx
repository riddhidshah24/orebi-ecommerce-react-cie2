import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { useOrebiStore } from "../../store/useOrebiStore";

const SignUp = () => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAgree, setErrAgree] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loginUserStore = useOrebiStore((state) => state.loginUser);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    let valid = true;
    if (!clientName) {
      setErrClientName("Enter your full name");
      valid = false;
    }
    if (!email || !email.includes("@")) {
      setErrEmail("Enter a valid email address");
      valid = false;
    }
    if (!phone) {
      setErrPhone("Enter your phone number");
      valid = false;
    }
    if (!password || password.length < 6) {
      setErrPassword("Password must be at least 6 characters");
      valid = false;
    }
    if (!checked) {
      setErrAgree("You must agree to the Terms of Service");
      valid = false;
    }

    if (valid) {
      loginUserStore({
        name: clientName,
        email: email,
        phone: phone,
        address: address,
        city: city,
        zip: zip,
      });

      setSuccessMsg(`Welcome to Orebi, ${clientName}! Account created successfully.`);
      setTimeout(() => {
        navigate("/shop");
      }, 1500);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row m-4">
        
        {/* Left Side Showcase */}
        <div className="w-full md:w-5/12 bg-primeColor text-white p-8 md:p-12 flex flex-col justify-between">
          <div>
            <Link to="/">
              <img src={logoLight} alt="Orebi Logo" className="w-28 mb-8" />
            </Link>
            <h2 className="font-titleFont text-2xl md:text-3xl font-bold mb-3 leading-snug">
              Create Your Free VIP Account
            </h2>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              Join thousands of global shoppers enjoying exclusive rewards, fast shipping, and seamless checkout.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BsCheckCircleFill className="text-green-400 mt-1 flex-shrink-0" />
                <p className="text-xs text-gray-300">
                  <strong className="text-white block font-titleFont">100% Free Lifetime Membership</strong>
                  No hidden fees or recurring subscriptions.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <BsCheckCircleFill className="text-green-400 mt-1 flex-shrink-0" />
                <p className="text-xs text-gray-300">
                  <strong className="text-white block font-titleFont">Instant $10 Welcome Voucher</strong>
                  Applied automatically to your first purchase over $50.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <BsCheckCircleFill className="text-green-400 mt-1 flex-shrink-0" />
                <p className="text-xs text-gray-300">
                  <strong className="text-white block font-titleFont">Priority Customer Support</strong>
                  24/7 dedicated support via live chat & email.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400 mt-8">
            <span>© 2026 OREBI</span>
            <div className="flex gap-4">
              <Link to="/about" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>

        {/* Right Side Sign Up Form */}
        <div className="w-full md:w-7/12 p-8 md:p-10 bg-white">
          {successMsg ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold font-titleFont text-primeColor mb-2">Account Created!</h3>
              <p className="text-sm text-secondary mb-6">{successMsg}</p>
              <Link to="/shop">
                <button className="px-8 py-3 bg-primeColor text-white font-bold rounded-xl hover:bg-black transition-colors">
                  Explore Shop
                </button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSignUp} className="w-full">
              <h1 className="font-titleFont font-bold text-2xl md:text-3xl text-primeColor mb-1">
                Create Account
              </h1>
              <p className="text-xs text-secondary mb-6">
                Fill in your details below to set up your new account.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-secondary mb-1">Full Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => { setClientName(e.target.value); setErrClientName(""); }}
                    placeholder="John Doe"
                    className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-primeColor shadow-xs"
                  />
                  {errClientName && <p className="text-[11px] text-red-500 font-semibold mt-0.5">{errClientName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase text-secondary mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrEmail(""); }}
                    placeholder="john@example.com"
                    className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-primeColor shadow-xs"
                  />
                  {errEmail && <p className="text-[11px] text-red-500 font-semibold mt-0.5">{errEmail}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase text-secondary mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrPhone(""); }}
                    placeholder="+1 (555) 000-0000"
                    className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-primeColor shadow-xs"
                  />
                  {errPhone && <p className="text-[11px] text-red-500 font-semibold mt-0.5">{errPhone}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold uppercase text-secondary mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrPassword(""); }}
                      placeholder="Min. 6 characters"
                      className="w-full h-10 border border-gray-200 rounded-lg px-3 pr-10 text-sm outline-none focus:border-primeColor shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-primeColor text-sm"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errPassword && <p className="text-[11px] text-red-500 font-semibold mt-0.5">{errPassword}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold uppercase text-secondary mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-primeColor shadow-xs"
                  />
                </div>

                {/* Zip */}
                <div>
                  <label className="block text-xs font-bold uppercase text-secondary mb-1">Zip / Postal Code</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="10001"
                    className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-primeColor shadow-xs"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase text-secondary mb-1">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Shopping Blvd, Suite 400"
                  className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-primeColor shadow-xs"
                />
              </div>

              {/* Agree Checkbox */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => { setChecked(e.target.checked); setErrAgree(""); }}
                    className="w-4 h-4 rounded text-primeColor focus:ring-primeColor cursor-pointer"
                  />
                  <span className="text-xs text-secondary">
                    I agree to the <strong className="text-primeColor">Terms of Service</strong> and <strong className="text-primeColor">Privacy Policy</strong>.
                  </span>
                </label>
                {errAgree && <p className="text-[11px] text-red-500 font-semibold mt-1">{errAgree}</p>}
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-primeColor text-white font-bold font-titleFont text-sm rounded-lg hover:bg-black transition-colors shadow-md cursor-pointer mb-4"
              >
                Create Free Account
              </button>

              <p className="text-xs text-center text-secondary">
                Already have an account?{" "}
                <Link to="/signin" className="font-bold text-primeColor hover:underline">
                  Sign In Here
                </Link>
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default SignUp;
