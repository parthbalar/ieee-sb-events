"use client";

import { motion } from "framer-motion";
import { 
  Code, 
  Users, 
  Briefcase, 
  Globe, 
  Award, 
  ChevronDown, 
  Sparkles,
  Laptop,
  Mic,
  Rocket,
  Building2,
  CalendarCheck,
  TrendingUp
} from "lucide-react";
import Link from 'next/link';

export default function WIEPage() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const floatAnimation = {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <main className="relative min-h-screen text-slate-200 font-sans selection:bg-fuchsia-500/30 pb-12 overflow-hidden bg-[#0a0514]">
      
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0514; }
        ::-webkit-scrollbar-thumb { background: #2d1b4e; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #452975; }
      `}} />

      {/* Dynamic Animated Background */}
      <motion.div 
        animate={{ 
          backgroundColor: ["#0a0514", "#130826", "#0f061c", "#0a0514"] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 z-0"
      />

      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"></div>

      {/* Floating Ambient Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1], 
          opacity: [0.15, 0.25, 0.15],
          x: [0, 100, -50, 0],
          y: [0, 50, -50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-fuchsia-600/20 rounded-full blur-[140px] pointer-events-none z-0"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.1, 0.2, 0.1],
          x: [0, -100, 50, 0],
          y: [0, -50, 50, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-[-15%] right-[-10%] w-[900px] h-[900px] bg-violet-600/20 rounded-full blur-[160px] pointer-events-none z-0"
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[30%] left-[30%] w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Hero Section */}
      <section className="relative z-10 w-full min-h-[calc(100vh-85px)] flex flex-col items-center justify-center px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 shadow-inner hover:bg-white/10 transition-colors cursor-default backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-widest text-fuchsia-300 uppercase">RNGPIT IEEE Student Branch</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white mb-4 leading-tight"
        >
          Women In <br />
          <motion.span 
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-400 to-rose-400 drop-shadow-2xl bg-[length:200%_auto]"
          >
            Engineering (WIE)
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-12 drop-shadow-md"
        >
          Dedicated to promoting women engineers and scientists, and inspiring girls around the world to follow their academic interests in a career in engineering.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-fuchsia-500/60"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-10 w-full px-4 lg:px-8 max-w-[1300px] mx-auto">
        
        {/* 1. About Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-8"
        >
          <motion.div 
            variants={slideUp} 
            className="md:col-span-12 bg-[#12081e] rounded-[2rem] p-8 lg:p-12 border border-white/5 shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
              
              {/* Left Side: Content */}
              <div className="flex-1 lg:pl-4">
                <motion.div animate={floatAnimation} className="w-14 h-14 rounded-2xl bg-[#261141] flex items-center justify-center text-fuchsia-400 mb-8 shadow-inner border border-white/5">
                  <Award size={28} />
                </motion.div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">About WIE Affinity Group</h2>
                <p className="text-slate-300 text-[15px] leading-relaxed mb-8">
                  The IEEE Women in Engineering (WIE) affinity group at RNGPIT is a vibrant community committed to fostering the leadership, technical skills, and professional growth of women in STEM. We provide a supportive ecosystem for networking, mentorship, and collaborative technical projects, ensuring every member has the resources to thrive in the tech industry.
                </p>
                <Link href="/register">
                  <button className="px-8 py-3.5 rounded-full bg-[#2a134a]/60 border border-fuchsia-500/30 text-fuchsia-200 font-medium text-sm hover:bg-[#3d1c6b]/80 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(217,70,239,0.1)] hover:shadow-[0_0_30px_rgba(217,70,239,0.2)]">
                    Join WIE Chapter
                  </button>
                </Link>
              </div>

              {/* Right Side: Graphic Box */}
              <div className="flex-1 w-full relative">
                <div className="w-full h-[320px] rounded-3xl border border-white/10 bg-[#0a0514]/50 overflow-hidden relative group-hover:border-fuchsia-500/40 transition-colors duration-500 flex items-center justify-center shadow-2xl">
                  
                  {/* Image Background */}
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Women collaborating on technology" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlays for blending into the dark theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-[#0a0514]/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0514] via-[#0a0514]/30 to-transparent"></div>
                  <div className="absolute inset-0 bg-fuchsia-900/30 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.15)_0,transparent_80%)]"></div>

                  {/* Animated Orbital Lines */}
                  <motion.div 
                    animate={{ rotate: -360 }} 
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[150%] h-[150%] border-[1px] border-dashed border-fuchsia-500/40 rounded-full pointer-events-none"
                  />
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[120%] h-[120%] border-[1px] border-dotted border-violet-500/40 rounded-full pointer-events-none"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>

        {/* 2. Impact & Reach Metrics */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
        >
          <motion.div 
            variants={slideUp} 
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-violet-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500 flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">150+</h3>
            <h4 className="text-sm font-bold tracking-widest text-violet-400 uppercase mb-2">Active Members</h4>
            <p className="text-slate-400 text-xs leading-relaxed">A rapidly growing community of female engineers and supportive male allies dedicated to inclusive tech.</p>
          </motion.div>

          <motion.div 
            variants={slideUp} 
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-rose-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] transition-all duration-500 flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
              <CalendarCheck size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">25+</h3>
            <h4 className="text-sm font-bold tracking-widest text-rose-400 uppercase mb-2">Annual Events</h4>
            <p className="text-slate-400 text-xs leading-relaxed">Regularly hosting hackathons, technical workshops, panel discussions, and career-building seminars.</p>
          </motion.div>

          <motion.div 
            variants={slideUp} 
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-fuchsia-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] transition-all duration-500 flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 rounded-full bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 mb-4 group-hover:scale-110 transition-transform">
              <Building2 size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">10+</h3>
            <h4 className="text-sm font-bold tracking-widest text-fuchsia-400 uppercase mb-2">Industry Partners</h4>
            <p className="text-slate-400 text-xs leading-relaxed">Collaborating with top-tier technology companies for internships, mentorship, and sponsorship.</p>
          </motion.div>
        </motion.div>

        {/* 3. Core Pillars */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <motion.div variants={slideUp} className="text-center mb-10">
            <h3 className="text-xs font-bold tracking-widest text-fuchsia-400 uppercase mb-3 drop-shadow-md">Core Initiatives</h3>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">Empowering Through Action</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-fuchsia-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-fuchsia-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Mentorship</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                Connecting students with seasoned industry professionals and alumni for career guidance and support.
              </p>
            </motion.div>

            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-violet-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Code size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Technical Upskilling</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                Hosting exclusive workshops on modern web development, algorithms, and emerging technologies.
              </p>
            </motion.div>

            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-rose-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Globe size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Global Networking</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                Building a strong, inclusive network of women in tech through state-wide symposiums and virtual summits.
              </p>
            </motion.div>

            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-fuchsia-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-fuchsia-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Briefcase size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Career Development</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                Providing resume reviews, mock interviews, and leadership training to prepare members for the industry.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* 4. Flagship Events */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={slideUp} className="text-center mb-10">
            <h3 className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3 drop-shadow-md">Active Participation</h3>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">Signature WIE Events</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Box 1 */}
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-gradient-to-br from-fuchsia-900/10 to-violet-900/10 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-fuchsia-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(217,70,239,0.15)] transition-all duration-500 group cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-fuchsia-500/20 transition-all">
                  <Laptop size={22} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">All-Female Hackathons</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Intensive, collaborative coding environments designed to encourage rapid prototyping, innovative problem solving, and teamwork among aspiring female software engineers.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-fuchsia-900/30 text-[10px] text-fuchsia-300 uppercase tracking-wider border border-fuchsia-500/20">Development</span>
                <span className="px-3 py-1 rounded-full bg-fuchsia-900/30 text-[10px] text-fuchsia-300 uppercase tracking-wider border border-fuchsia-500/20">Innovation</span>
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-gradient-to-br from-violet-900/10 to-rose-900/10 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-violet-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(139,92,246,0.15)] transition-all duration-500 group cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all">
                  <Mic size={22} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Women in Tech Summit</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  An annual flagship event featuring keynote speeches, panel discussions, and interactive sessions led by successful women leaders in the technology sector.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-violet-900/30 text-[10px] text-violet-300 uppercase tracking-wider border border-violet-500/20">Leadership</span>
                <span className="px-3 py-1 rounded-full bg-violet-900/30 text-[10px] text-violet-300 uppercase tracking-wider border border-violet-500/20">Networking</span>
              </div>
            </motion.div>

            {/* Box 3 */}
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-gradient-to-br from-rose-900/10 to-fuchsia-900/10 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-rose-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(244,63,94,0.15)] transition-all duration-500 group cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all">
                  <Rocket size={22} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">STEM Outreach Initiative</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Inspiring the next generation by organizing interactive coding and robotics workshops for local high school girls, breaking down barriers to entry in STEM fields.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-900/30 text-[10px] text-rose-300 uppercase tracking-wider border border-rose-500/20">Outreach</span>
                <span className="px-3 py-1 rounded-full bg-rose-900/30 text-[10px] text-rose-300 uppercase tracking-wider border border-rose-500/20">Community</span>
              </div>
            </motion.div>

            {/* Box 4 */}
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-gradient-to-br from-indigo-900/10 to-violet-900/10 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-indigo-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(99,102,241,0.15)] transition-all duration-500 group cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                  <Briefcase size={22} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Industry Mentorship Mixer</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Exclusive speed-mentoring sessions connecting our student members with seasoned female engineers and tech leaders to discuss career trajectories and technical challenges.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-900/30 text-[10px] text-indigo-300 uppercase tracking-wider border border-indigo-500/20">Mentorship</span>
                <span className="px-3 py-1 rounded-full bg-indigo-900/30 text-[10px] text-indigo-300 uppercase tracking-wider border border-indigo-500/20">Career</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </section>
    </main>
  );
}