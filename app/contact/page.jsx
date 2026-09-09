"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Building, Mail, Send, Sparkles } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // 1. Add state for loading and status feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Update handleSubmit to send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // Show success message
      setSubmitStatus({ type: "success", message: "Message sent successfully!" });
      
      // Clear the form fields
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Optional: Clear the success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      // Show error message
      setSubmitStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <main className="relative w-full min-h-[calc(100vh-85px)] flex items-center justify-center bg-[#070b14] font-sans text-slate-200 p-4 lg:p-8 py-12 overflow-hidden">

      {/* Background Ambient Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          boxShadow: "0 25px 65px -10px rgba(6, 182, 212, 0.15)",
          borderColor: "rgba(255,255,255,0.08)"
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[1100px] min-h-[620px] h-auto bg-[#0c101a] border border-white/5 rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row overflow-hidden transition-colors duration-500"
      >

        {/* Left Information Panel */}
        <div className="w-full lg:w-5/12 bg-gradient-to-br from-[#12182b] to-[#0c101a] p-10 lg:p-12 flex flex-col border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 flex flex-col h-full justify-between gap-12 lg:gap-0">
            <div>
              <motion.div variants={fadeRight} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-8 shadow-inner">
                <Sparkles size={12} />
                <span>Connect With Us</span>
              </motion.div>

              <motion.h1 variants={fadeRight} className="text-4xl lg:text-5xl font-serif font-bold text-white mb-3 leading-tight">
                Let's start a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 drop-shadow-lg">conversation</span>
              </motion.h1>

              <motion.p variants={fadeRight} className="text-slate-400 text-sm mb-10 leading-relaxed max-w-[280px]">
                Reach out to the Information Technology department at RNGPIT. Whether you have a question or want to collaborate, our team is ready to assist you.
              </motion.p>
            </div>

            <div className="space-y-6">
              <motion.div variants={fadeRight} whileHover={{ x: 5 }} className="flex items-center gap-5 transition-transform cursor-default">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <Building size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Department</p>
                  <p className="text-sm text-slate-200 font-semibold">Information Technology</p>
                </div>
              </motion.div>

              <motion.div variants={fadeRight} whileHover={{ x: 5 }} className="flex items-center gap-5 transition-transform cursor-default">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.1)]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Location</p>
                  <p className="text-sm text-slate-200 font-semibold">RNGPIT, Surat, Gujarat</p>
                </div>
              </motion.div>

              <motion.div variants={fadeRight} whileHover={{ x: 5 }} className="flex items-center gap-5 transition-transform cursor-default">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Email</p>
                  <p className="text-sm text-slate-200 font-semibold">contact@rngpit.ac.in</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full lg:w-7/12 p-10 lg:p-14 flex flex-col justify-center bg-[#070b14]">
          
          {/* 3. Add Status Message Display */}
          {submitStatus && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl text-sm border font-medium ${
                submitStatus.type === 'success' 
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}
            >
              {submitStatus.message}
            </motion.div>
          )}

          <motion.form 
            variants={staggerContainer} 
            initial="hidden" 
            animate="visible"
            onSubmit={handleSubmit} 
            className="w-full flex flex-col mt-4" 
          >
            <div className="space-y-8 lg:space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={slideUp} className="relative group mt-4">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_1px_0_0_rgba(6,182,212,1)] transition-all duration-300 placeholder-transparent peer disabled:opacity-50"
                    placeholder="YOUR NAME"
                    required
                  />
                  <label className="absolute left-0 -top-5 text-[10px] font-semibold text-slate-500 uppercase tracking-widest peer-focus:text-cyan-400 transition-colors">
                    Your Name
                  </label>
                </motion.div>

                <motion.div variants={slideUp} className="relative group mt-4 md:mt-4">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-400 focus:shadow-[0_1px_0_0_rgba(79,70,229,1)] transition-all duration-300 placeholder-transparent peer disabled:opacity-50"
                    placeholder="EMAIL ADDRESS"
                    required
                  />
                  <label className="absolute left-0 -top-5 text-[10px] font-semibold text-slate-500 uppercase tracking-widest peer-focus:text-indigo-400 transition-colors">
                    Email Address
                  </label>
                </motion.div>
              </div>

              <motion.div variants={slideUp} className="relative group">
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_1px_0_0_rgba(6,182,212,1)] transition-all duration-300 placeholder-transparent peer disabled:opacity-50"
                  placeholder="PHONE NUMBER (OPTIONAL)"
                />
                <label className="absolute left-0 -top-5 text-[10px] font-semibold text-slate-500 uppercase tracking-widest peer-focus:text-cyan-400 transition-colors">
                  Phone Number (Optional)
                </label>
              </motion.div>

              <motion.div variants={slideUp} className="relative mt-8 group">
                <div className="absolute -top-3 left-4 bg-[#141a29] px-3 py-1 rounded-full border border-white/5 z-10 transition-colors duration-300 group-focus-within:border-cyan-400/30 group-focus-within:shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">
                    Your Message
                  </label>
                </div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full bg-[#141a29]/50 border border-white/5 rounded-2xl p-5 pt-6 text-sm text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 h-[140px] resize-none relative z-0 disabled:opacity-50"
                  required
                ></textarea>
              </motion.div>
            </div>

            <motion.div variants={slideUp} className="mt-10">
              {/* 4. Disable button and show loading state */}
              <motion.button 
                whileHover={!isSubmitting ? { scale: 1.02, backgroundColor: "#f8fafc" } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-white text-black font-bold py-4 rounded-full flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] group transition-all duration-300 ${
                  isSubmitting 
                    ? "opacity-70 cursor-not-allowed shadow-none" 
                    : "shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                }`}
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                {!isSubmitting && (
                  <Send size={16} className="-mt-0.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </main>
  );
}