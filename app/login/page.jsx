"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // NEW: Added success state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // AUTO-DISMISS ERROR TOAST AFTER 4 SECONDS
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // Save the user data to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Trigger the success toast
      setSuccess("Login successful! Loading dashboard...");

      // Use a slight delay so the user sees the success toast before the hard reload
      setTimeout(() => {
        if (data.user.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }, 800);
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false); // Only stop loading if there's an error (prevents button flashing on success)
    } 
  };

  return (
    <main className="min-h-screen bg-[#070b14] flex flex-col justify-center items-center font-sans relative overflow-hidden selection:bg-blue-500/30">
      
      {/* ======================================================== */}
      {/* CUSTOM FLOATING TOAST NOTIFICATION                       */}
      {/* ======================================================== */}
      <div 
        className={`fixed top-6 right-6 sm:top-10 sm:right-10 z-[9999] transition-all duration-500 ease-out transform ${
          error || success ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-[120%] opacity-0 scale-95'
        }`}
      >
        {(error || success) && (
          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border backdrop-blur-xl ${
            success 
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' 
              : 'bg-red-950/40 border-red-500/30 text-red-400'
          }`}>
            {success ? (
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <p className="text-sm font-bold tracking-wide">{success || error}</p>
            
            <button onClick={() => { setError(''); setSuccess(''); }} className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
      </div>
      {/* ======================================================== */}

      {/* Background Ambient Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-900/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-900/10 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      {/* Main Login Container */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6 py-12">
        <div
          className={`bg-[#0a0f1c]/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 border border-slate-800 shadow-2xl shadow-black/50 transition-all duration-1000 ease-out transform w-full ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#131c31] border border-slate-700 mb-5 sm:mb-6 shadow-sm">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-[#5eead4]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              Access your member dashboard
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5 sm:gap-6">
            {/* Email Field */}
            <div
              className={`flex flex-col gap-2 transition-all duration-700 delay-150 transform ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <label
                htmlFor="email"
                className="text-sm font-bold text-slate-300 ml-1"
              >
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="student@rngpit.ac.in"
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium text-sm sm:text-base"
              />
            </div>

            {/* Password Field */}
            <div
              className={`flex flex-col gap-2 transition-all duration-700 delay-300 transform ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="flex justify-between items-center ml-1">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-300"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium text-sm sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-2 sm:mt-4 py-3.5 sm:py-4 px-6 bg-[#2563eb] hover:bg-blue-600 disabled:bg-blue-800 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-500 shadow-lg shadow-blue-900/20 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 delay-500 text-sm sm:text-base flex justify-center items-center ${isMounted ? "opacity-100" : "opacity-0"}`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Signing In...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          {/* Footer Link */}
          <p
            className={`mt-6 sm:mt-8 text-center text-xs sm:text-sm font-medium text-slate-400 transition-opacity duration-1000 delay-700 ${isMounted ? "opacity-100" : "opacity-0"}`}
          >
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[#3b82f6] font-bold hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}