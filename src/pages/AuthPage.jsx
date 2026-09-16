import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, MapPin, ArrowRight, CheckCircle2, ShieldCheck, ArrowDown } from "lucide-react";
import { UnderlineScribble, LeafDecoration, StarDoodle } from "../components/HandDrawnDoodles";

export default function AuthPage({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form states
  const [name, setName] = useState("Eco Explorer");
  const [email, setEmail] = useState("eco.explorer@earth.org");
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const [city, setCity] = useState("San Francisco, CA");

  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && password !== confirmPassword) {
      setNotification({ type: "error", message: "Passwords do not match!" });
      return;
    }
    
    setNotification({ type: "success", message: "Authentication Successful!" });
    setTimeout(() => {
      onLoginSuccess({
        name: name || "Eco Explorer",
        email: email || "user@carbonwallet.ai",
        city: city || "San Francisco, CA",
      });
    }, 600);
  };

  const handleGoogleLogin = () => {
    setNotification({ type: "success", message: "Google Auth Signed In!" });
    setTimeout(() => {
      onLoginSuccess({
        name: "Eco Explorer (Google)",
        email: "eco.explorer.google@gmail.com",
        city: "San Francisco, CA",
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] flex items-center justify-center p-4 lg:p-8 paper-texture overflow-hidden">
      
      {/* Sliding Down Container */}
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl bg-[#F6EFE0] rounded-3xl border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] overflow-hidden grid lg:grid-cols-12 min-h-[640px]"
      >
        
        {/* Left Side: Hand-drawn Artwork & Quote */}
        <div className="lg:col-span-5 bg-[#173D28] text-[#FFF8E8] p-6 lg:p-10 flex flex-col justify-between relative border-b-3 lg:border-b-0 lg:border-r-3 border-[#20251F]">
          {/* Header Tag */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span className="font-heading font-extrabold text-lg text-[#C4E89A]">
                Carbon Wallet AI
              </span>
            </div>
            <span className="bg-[#C4E89A] text-[#0B2418] text-[11px] font-black px-2.5 py-1 rounded-full border border-[#20251F] shadow-[1.5px_1.5px_0px_#0B2418]">
              Final Destination
            </span>
          </div>

          {/* Main Earth Sketch Image */}
          <div className="my-8 flex flex-col items-center text-center relative group">
            <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-full border-3 border-[#C4E89A] overflow-hidden shadow-[6px_6px_0px_#0B2418] bg-[#FFF8E8] transition-transform group-hover:scale-105">
              <img
                src="/earth_sketch.jpg"
                alt="Earth Sketch Illustration"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Handwritten Floating Quote */}
            <div className="mt-6 bg-[#FFF8E8] text-[#0B2418] px-4 py-2.5 rounded-2xl border-2 border-[#20251F] shadow-[3px_3px_0px_#C4E89A] rotate-[-2deg] transition-transform hover:rotate-0">
              <p className="font-handwritten text-xl font-bold text-[#173D28]">
                "Every small choice matters." 🌿
              </p>
            </div>
          </div>

          {/* Bottom Hackathon note */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#C4E89A]/90 bg-[#0B2418]/60 p-3 rounded-2xl border border-[#C4E89A]/30">
            <ShieldCheck className="w-4 h-4 text-[#C4E89A] shrink-0" />
            <span>Secure Authentication • Enter Your Wallet</span>
          </div>
        </div>

        {/* Right Side: Auth Form Container */}
        <div className="lg:col-span-7 p-6 lg:p-12 flex flex-col justify-center bg-[#FFF8E8]">
          <div className="max-w-md mx-auto w-full">
            
            {/* Title Header */}
            <div className="mb-6">
              <h2 className="font-heading text-2xl lg:text-3xl font-extrabold text-[#0B2418]">
                {isSignUp ? "Join the Movement 🌱" : "Welcome back, Eco Explorer 🌱"}
              </h2>
              <p className="text-sm text-[#173D28] font-medium mt-1">
                {isSignUp
                  ? "Start tracking your carbon budget like money today."
                  : "Let's make your carbon count."}
              </p>
              <UnderlineScribble className="w-36 h-3 text-[#A7C98F] mt-1" />
            </div>

            {/* Notification alert */}
            {notification && (
              <div
                className={`mb-4 p-3 rounded-xl border-2 border-[#20251F] text-xs font-extrabold flex items-center gap-2 ${
                  notification.type === "error"
                    ? "bg-red-100 text-red-900 border-red-500"
                    : "bg-[#C4E89A] text-[#0B2418]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{notification.message}</span>
              </div>
            )}

            {/* Google Social Button */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full sketch-button flex items-center justify-center gap-3 bg-[#F6EFE0] py-3 rounded-2xl font-extrabold text-xs text-[#0B2418] mb-5 hover:bg-[#A7C98F]/30"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t-2 border-[#20251F]/20 w-full" />
              <span className="bg-[#FFF8E8] px-3 text-[11px] font-bold text-[#173D28] uppercase tracking-wider">
                or with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-[#0B2418] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-[#173D28]" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#0B2418] focus:outline-none focus:ring-2 focus:ring-[#173D28]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#0B2418] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-[#173D28]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eco.explorer@earth.org"
                    className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#0B2418] focus:outline-none focus:ring-2 focus:ring-[#173D28]"
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-[#0B2418] mb-1">
                    City / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-[#173D28]" />
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="San Francisco, CA"
                      className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#0B2418] focus:outline-none focus:ring-2 focus:ring-[#173D28]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#0B2418] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-[#173D28]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl pl-10 pr-10 py-2.5 text-xs font-bold text-[#0B2418] focus:outline-none focus:ring-2 focus:ring-[#173D28]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#173D28] hover:text-[#0B2418]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-[#0B2418] mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-[#173D28]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#F6EFE0] border-2 border-[#20251F] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#0B2418] focus:outline-none focus:ring-2 focus:ring-[#173D28]"
                    />
                  </div>
                </div>
              )}

              {/* Login Checkbox & Forgot Password */}
              {!isSignUp && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-2 border-[#20251F] text-[#173D28] focus:ring-0"
                    />
                    <span className="text-xs font-extrabold text-[#173D28]">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Password reset link sent!")}
                    className="text-xs font-extrabold text-[#173D28] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full sketch-button-accent py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 mt-4"
              >
                <span>{isSignUp ? "Create My Account" : "Log In to Wallet"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle SignUp / Login */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setNotification(null);
                }}
                className="text-xs font-extrabold text-[#173D28] hover:underline"
              >
                {isSignUp
                  ? "Already have an account? Log in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
