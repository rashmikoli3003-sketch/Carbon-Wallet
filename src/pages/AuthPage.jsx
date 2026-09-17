import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, MapPin, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import ClimateVisual from "../components/ClimateVisual";

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
    <div className="min-h-screen bg-[#07110B] text-[#F4F2E8] flex items-center justify-center p-4 lg:p-8 bg-mesh-grid overflow-hidden">
      
      {/* Sliding Editorial Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl editorial-card overflow-hidden grid lg:grid-cols-12 min-h-[640px]"
      >
        
        {/* Left Side: Climate Canvas Visual */}
        <div className="lg:col-span-5 bg-[#0D2116]/80 p-6 lg:p-10 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#8EBB91]/20">
          
          {/* Header Tag */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <span className="font-heading font-extrabold text-base tracking-wider text-[#F4F2E8]">
                CARBON WALLET AI
              </span>
            </div>
            <span className="bg-[#B8F56B]/15 text-[#B8F56B] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-[#B8F56B]/30">
              LIVE SESSION
            </span>
          </div>

          {/* Main Visual */}
          <div className="my-6">
            <ClimateVisual />
          </div>

          {/* Bottom Note */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#8EBB91] bg-[#07110B]/60 p-3 rounded-xl border border-[#8EBB91]/20">
            <ShieldCheck className="w-4 h-4 text-[#B8F56B] shrink-0" />
            <span>Secure Interactive Session • Fast Instant Access</span>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:col-span-7 p-6 lg:p-12 flex flex-col justify-center bg-[#07110B]/90">
          <div className="max-w-md mx-auto w-full space-y-6">
            
            {/* Title Header */}
            <div>
              <span className="text-xs font-mono text-[#B8F56B] uppercase tracking-widest">
                {isSignUp ? "SIGNUP" : "LOGIN"}
              </span>
              <h2 className="font-heading text-3xl font-extrabold text-[#F4F2E8] mt-1">
                {isSignUp ? "START YOUR CARBON JOURNEY." : "WELCOME BACK, ECO EXPLORER."}
              </h2>
              <p className="text-xs text-[#8EBB91] mt-1">
                {isSignUp
                  ? "Create your account and track daily emissions like a bank balance."
                  : "Log in to access your personal carbon wallet."}
              </p>
            </div>

            {/* Notification alert */}
            <AnimatePresence>
              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${
                    notification.type === "error"
                      ? "bg-red-950/80 text-red-300 border-red-500/50"
                      : "bg-[#0D2116] text-[#B8F56B] border-[#B8F56B]/40"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{notification.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Social Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-3 rounded-xl bg-[#0D2116] border border-[#8EBB91]/30 font-mono font-bold text-xs text-[#F4F2E8] flex items-center justify-center gap-3 hover:border-[#B8F56B]/50 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>CONTINUE WITH GOOGLE</span>
            </motion.button>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-[#8EBB91]/20 w-full" />
              <span className="bg-[#07110B] px-3 text-[10px] font-mono text-[#8EBB91] uppercase tracking-wider">
                OR WITH EMAIL
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-mono text-[#8EBB91] mb-1">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-[#8EBB91]" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-[#0D2116] border border-[#8EBB91]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#F4F2E8] focus:outline-none focus:border-[#B8F56B]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-[#8EBB91] mb-1">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-[#8EBB91]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eco.explorer@earth.org"
                    className="w-full bg-[#0D2116] border border-[#8EBB91]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#F4F2E8] focus:outline-none focus:border-[#B8F56B]"
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-xs font-mono text-[#8EBB91] mb-1">
                    CITY / LOCATION (OPTIONAL)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-[#8EBB91]" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="San Francisco, CA"
                      className="w-full bg-[#0D2116] border border-[#8EBB91]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#F4F2E8] focus:outline-none focus:border-[#B8F56B]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-[#8EBB91] mb-1">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-[#8EBB91]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0D2116] border border-[#8EBB91]/30 rounded-xl pl-10 pr-10 py-2.5 text-xs font-bold text-[#F4F2E8] focus:outline-none focus:border-[#B8F56B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#8EBB91] hover:text-[#B8F56B]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-xs font-mono text-[#8EBB91] mb-1">
                    CONFIRM PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-[#8EBB91]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#0D2116] border border-[#8EBB91]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#F4F2E8] focus:outline-none focus:border-[#B8F56B]"
                    />
                  </div>
                </div>
              )}

              {/* Login Checkbox & Forgot Password */}
              {!isSignUp && (
                <div className="flex items-center justify-between text-xs font-mono">
                  <label className="flex items-center gap-2 cursor-pointer text-[#8EBB91]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#8EBB91] bg-[#0D2116] text-[#B8F56B] focus:ring-0"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Password reset link sent to your email!")}
                    className="text-[#8EBB91] hover:text-[#B8F56B]"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#B8F56B] text-[#07110B] font-heading font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 glow-lime"
              >
                <span>{isSignUp ? "CREATE YOUR CARBON WALLET" : "LOGIN"}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>

            {/* Toggle SignUp / Login */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setNotification(null);
                }}
                className="text-xs font-mono text-[#8EBB91] hover:text-[#B8F56B]"
              >
                {isSignUp
                  ? "Already have an account? Log in ↗"
                  : "Don't have an account? Sign up ↗"}
              </button>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
