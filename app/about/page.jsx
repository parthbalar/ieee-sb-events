"use client";

import { motion } from "framer-motion";
import { 
  Target, Telescope, Users, Zap, TrendingUp, 
  Code, Database, Cpu, Calendar, Trophy, Laptop, ChevronDown 
} from "lucide-react";

export default function About() {
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
    <main className="relative min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 pb-12 overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}} />

      {/* --- DYNAMIC ANIMATED BACKGROUND --- */}
      <motion.div 
        animate={{ 
          backgroundColor: ["#020617", "#0a0f24", "#05101a", "#020617"] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 z-0"
      />

      {/* Animated Grid Overlay */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"></div>

      {/* Floating Ambient Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1], 
          opacity: [0.15, 0.3, 0.15],
          x: [0, 150, -50, 0],
          y: [0, 100, -100, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-600/30 rounded-full blur-[140px] pointer-events-none z-0"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.4, 1], 
          opacity: [0.1, 0.25, 0.1],
          x: [0, -150, 50, 0],
          y: [0, -100, 100, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-[-15%] right-[-10%] w-[900px] h-[900px] bg-indigo-600/20 rounded-full blur-[160px] pointer-events-none z-0"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[30%] left-[30%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-0"
      />
      {/* ----------------------------------- */}

      <section className="relative z-10 w-full min-h-[calc(100vh-85px)] flex flex-col items-center justify-center px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 shadow-inner hover:bg-white/10 transition-colors cursor-default backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-widest text-cyan-300 uppercase">RNGPIT IT Department</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white mb-4 leading-tight"
        >
          Pioneering <br />
          <motion.span 
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 drop-shadow-2xl bg-[length:200%_auto]"
          >
            Technical Excellence
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-12 drop-shadow-md"
        >
          Fostering innovation and building the next generation of software engineers through collaborative, hands-on academic excellence and modern architectural training.
        </motion.p>

      
      </section>

      <section className="relative z-10 w-full px-4 lg:px-8 max-w-[1300px] mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-16"
        >
          <motion.div 
            variants={slideUp} 
            whileHover={{ y: -8 }}
            className="md:col-span-8 bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 lg:p-12 border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group hover:border-cyan-500/40 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <motion.div animate={floatAnimation} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500/20 transition-colors duration-300 shadow-md">
                <Target size={28} />
              </motion.div>
              <h2 className="text-3xl font-serif font-bold text-white mb-3">Our Mission</h2>
              <p className="text-slate-300 text-[15px] leading-relaxed">
                To provide a dynamic platform for engineering students at the R. N. G. Patel Institute of Technology to develop elite technical skills and engage in rigorous, hands-on projects. We strive to bridge the gap between theoretical knowledge and practical industry applications by designing comprehensive educational experiences, from robust centralized systems to cutting-edge mobile-first applications.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={slideUp} 
            whileHover={{ y: -8 }}
            className="md:col-span-4 bg-gradient-to-br from-cyan-900/10 to-indigo-900/10 backdrop-blur-2xl rounded-[2rem] p-8 lg:p-12 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group hover:border-indigo-400/40 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 flex flex-col justify-center relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <motion.div animate={floatAnimation} className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6 group-hover:bg-indigo-500/40 transition-colors duration-300 shadow-md">
                <Telescope size={28} />
              </motion.div>
              <h2 className="text-3xl font-serif font-bold text-white mb-3">Our Vision</h2>
              <p className="text-blue-100/90 text-[15px] leading-relaxed">
                To be the leading academic hub for technological advancement, fostering a culture where students become industry-ready architects of tomorrow.
              </p>
            </div>
          </motion.div>

          <motion.div variants={slideUp} whileHover={{ y: -5, scale: 1.02 }} className="md:col-span-4 bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 lg:p-10 border border-white/5 shadow-lg group hover:border-indigo-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform duration-300">
              <Users size={24} />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Community</h2>
            <p className="text-slate-400 leading-relaxed text-[13px]">
              Building a highly collaborative environment where students mentor one another. We participate in state-wide hackathons and technical symposiums to build a global professional network.
            </p>
          </motion.div>

          <motion.div variants={slideUp} whileHover={{ y: -5, scale: 1.02 }} className="md:col-span-4 bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 lg:p-10 border border-white/5 shadow-lg group hover:border-cyan-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform duration-300">
              <Zap size={24} />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Innovation</h2>
            <p className="text-slate-400 leading-relaxed text-[13px]">
              Encouraging out-of-the-box thinking through specialized technical events like the WebGenAI and AgenticX_IT series, pushing the boundaries of what student developers can create.
            </p>
          </motion.div>

          <motion.div variants={slideUp} whileHover={{ y: -5, scale: 1.02 }} className="md:col-span-4 bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 lg:p-10 border border-white/5 shadow-lg group hover:border-indigo-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Growth</h2>
            <p className="text-slate-400 leading-relaxed text-[13px]">
              Equipping members with deep competencies in algorithms, layered architecture, and systems design required for successful, long-term careers in software engineering.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <motion.div variants={slideUp} className="text-center mb-10">
            <h3 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3 drop-shadow-md">Technical Initiatives</h3>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">Flagship Projects</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-cyan-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all duration-500 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                <Database size={22} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Centralized College ERP</h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                A comprehensive system developed to handle core institutional workflows including admissions, fee structures, hostel management, and examination processing, complete with detailed layered architecture diagrams.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-900/30 text-[10px] text-cyan-300 uppercase tracking-wider border border-cyan-500/20">Systems Design</span>
                <span className="px-3 py-1 rounded-full bg-cyan-900/30 text-[10px] text-cyan-300 uppercase tracking-wider border border-cyan-500/20">Architecture</span>
              </div>
            </motion.div>

            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-indigo-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(99,102,241,0.15)] transition-all duration-500 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                <Cpu size={22} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Agentic Car Rental Platform</h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                A mobile-first application integrating modern automation techniques. The project focuses heavily on UX specification and utilizing AI-driven completion assistants for rapid, scalable development.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-900/30 text-[10px] text-indigo-300 uppercase tracking-wider border border-indigo-500/20">Mobile-First</span>
                <span className="px-3 py-1 rounded-full bg-indigo-900/30 text-[10px] text-indigo-300 uppercase tracking-wider border border-indigo-500/20">Automation</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={slideUp} className="text-center mb-10">
            <h3 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3 drop-shadow-md">Active Participation</h3>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">Events & Hackathons</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-cyan-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 group"
            >
              <Trophy size={26} className="text-cyan-400 mb-5 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">June 2026</div>
              <h4 className="text-md font-bold text-white mb-2">Odoo x Parul University Hackathon</h4>
              <p className="text-slate-300 text-[13px] leading-relaxed">
                Regional competitive programming and software development hackathon focusing on rapid deployment and innovative solutions.
              </p>
            </motion.div>

            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-indigo-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500 group"
            >
              <Calendar size={26} className="text-indigo-400 mb-5 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">September 2025</div>
              <h4 className="text-md font-bold text-white mb-2">WebGenAI & AgenticX_IT</h4>
              <p className="text-slate-300 text-[13px] leading-relaxed">
                Department-hosted specialized events centered around the integration of Generative AI in modern web development architectures.
              </p>
            </motion.div>

            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-cyan-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 group"
            >
              <Laptop size={26} className="text-cyan-400 mb-5 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">February 2026</div>
              <h4 className="text-md font-bold text-white mb-2">Future Tech Conference</h4>
              <p className="text-slate-300 text-[13px] leading-relaxed">
                Engagement with emerging career opportunities spanning Artificial Intelligence, Machine Learning, Data Science, and Cybersecurity.
              </p>
            </motion.div>
          </div>
        </motion.div>

      </section>
    </main>
  );
}