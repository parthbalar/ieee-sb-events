"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  Radio, 
  Eye, 
  BrainCircuit, 
  Waves, 
  Cpu, 
  ChevronDown, 
  Sparkles,
  Network,
  Users,
  Code,
  CalendarCheck,
  HeartPulse,
  Mic
} from "lucide-react";
import Link from 'next/link';

export default function SPSPage() {
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
    <main className="relative min-h-screen text-slate-200 font-sans selection:bg-emerald-500/30 pb-12 overflow-hidden bg-[#020f08]">
      
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #020f08; }
        ::-webkit-scrollbar-thumb { background: #132a1e; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #1f4231; }
      `}} />

      <motion.div 
        animate={{ 
          backgroundColor: ["#020f08", "#061f12", "#03150b", "#020f08"] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 z-0"
      />

      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"></div>

      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1], 
          opacity: [0.15, 0.25, 0.15],
          x: [0, 100, -50, 0],
          y: [0, 50, -50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-600/20 rounded-full blur-[140px] pointer-events-none z-0"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.1, 0.2, 0.1],
          x: [0, -100, 50, 0],
          y: [0, -50, 50, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-[-15%] right-[-10%] w-[900px] h-[900px] bg-teal-600/20 rounded-full blur-[160px] pointer-events-none z-0"
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[30%] left-[30%] w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Hero Section */}
      <section className="relative z-10 w-full min-h-[calc(100vh-85px)] flex flex-col items-center justify-center px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 shadow-inner hover:bg-white/10 transition-colors cursor-default backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase">RNGPIT IEEE Student Branch</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white mb-4 leading-tight"
        >
          Signal Processing <br />
          <motion.span 
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 drop-shadow-2xl bg-[length:200%_auto]"
          >
            Society (SPS)
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-12 drop-shadow-md"
        >
          Empowering the next generation of engineers to manipulate, analyze, and interpret the signals that define our modern digital world.
        </motion.p>

      </section>

      <section className="relative z-10 w-full px-4 lg:px-8 max-w-[1300px] mx-auto">
        
        {/* About SPS Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-8"
        >
          <motion.div 
            variants={slideUp} 
            whileHover={{ y: -8 }}
            className="md:col-span-12 bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 lg:p-12 border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group hover:border-emerald-500/40 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <motion.div animate={floatAnimation} className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500/20 transition-colors duration-300 shadow-md">
                  <Activity size={32} />
                </motion.div>
                <h2 className="text-3xl font-serif font-bold text-white mb-4">About SPS Chapter</h2>
                <p className="text-slate-300 text-[15px] leading-relaxed mb-6">
                  The IEEE Signal Processing Society (SPS) chapter at RNGPIT is dedicated to advancing the understanding and application of signal processing technologies. From deep learning and computer vision to audio engineering and biomedical signals, we provide a collaborative ecosystem for students to experiment with both software algorithms and hardware implementations.
                </p>
                <Link href="/register">
                  <button className="px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-sm hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                    Join SPS Chapter
                  </button>
                </Link>
              </div>
              <div className="flex-1 w-full relative">
                <div className="w-full h-[300px] rounded-xl border border-white/10 bg-[#020f08]/50 overflow-hidden relative group-hover:border-emerald-500/30 transition-colors duration-500 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0,transparent_70%)]"></div>
                  <Waves size={100} className="text-emerald-500/20" strokeWidth={1} />
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-full h-full border-[1px] border-dashed border-emerald-500/20 rounded-full scale-150"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Impact & Reach Metrics */}
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
            className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">120+</h3>
            <h4 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-2">Active Members</h4>
            <p className="text-slate-400 text-xs leading-relaxed">A thriving community of students passionate about algorithms, hardware, and digital signals.</p>
          </motion.div>

          <motion.div 
            variants={slideUp} 
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-teal-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all duration-500 flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
              <Code size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">15+</h3>
            <h4 className="text-sm font-bold tracking-widest text-teal-400 uppercase mb-2">Research Projects</h4>
            <p className="text-slate-400 text-xs leading-relaxed">Hands-on technical initiatives spanning computer vision, audio processing, and embedded systems.</p>
          </motion.div>

          <motion.div 
            variants={slideUp} 
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <CalendarCheck size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">20+</h3>
            <h4 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-2">Annual Workshops</h4>
            <p className="text-slate-400 text-xs leading-relaxed">Expert-led sessions on MATLAB, Python, DSP hardware programming, and deep learning.</p>
          </motion.div>
        </motion.div>

        {/* Core Technologies Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <motion.div variants={slideUp} className="text-center mb-10">
            <h3 className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3 drop-shadow-md">Areas of Expertise</h3>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">Core Technologies</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Eye size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Computer Vision</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                Analyzing and interpreting visual data using advanced image processing algorithms and deep learning models.
              </p>
            </motion.div>

            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-teal-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Radio size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Audio & Speech</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                Developing algorithms for acoustic modeling, speech recognition, and real-time noise cancellation systems.
              </p>
            </motion.div>

            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <BrainCircuit size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Machine Learning</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                Applying intelligent patterns to vast datasets to automate predictions and extract meaningful insights.
              </p>
            </motion.div>

            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-teal-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Network size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Sensor Networks</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                IoT integration and processing signals from distributed sensor nodes for smart infrastructure monitoring.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* SPS Projects & Workshops Section (Expanded to 4 boxes) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={slideUp} className="text-center mb-10">
            <h3 className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-3 drop-shadow-md">Hands-On Experience</h3>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">SPS Projects & Workshops</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Box 1 */}
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-gradient-to-br from-emerald-900/10 to-teal-900/10 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] transition-all duration-500 group cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  <Cpu size={22} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Real-Time DSP Hardware</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Implementation of digital filters and Fourier transforms directly onto FPGA and specialized DSP microprocessors for low-latency signal manipulation.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-900/30 text-[10px] text-emerald-300 uppercase tracking-wider border border-emerald-500/20">Hardware</span>
                <span className="px-3 py-1 rounded-full bg-emerald-900/30 text-[10px] text-emerald-300 uppercase tracking-wider border border-emerald-500/20">Embedded</span>
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-gradient-to-br from-teal-900/10 to-green-900/10 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-teal-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(20,184,166,0.15)] transition-all duration-500 group cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all">
                  <Sparkles size={22} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Generative AI & Image Synthesis</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Exploring Generative Adversarial Networks (GANs) and diffusion models to reconstruct and enhance degraded visual signals.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-900/30 text-[10px] text-teal-300 uppercase tracking-wider border border-teal-500/20">AI / ML</span>
                <span className="px-3 py-1 rounded-full bg-teal-900/30 text-[10px] text-teal-300 uppercase tracking-wider border border-teal-500/20">Algorithm Design</span>
              </div>
            </motion.div>

            {/* Box 3 */}
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-gradient-to-br from-teal-900/10 to-emerald-900/10 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-teal-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(20,184,166,0.15)] transition-all duration-500 group cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all">
                  <HeartPulse size={22} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Biomedical Signal Analysis</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Processing and analyzing physiological signals like ECG and EEG using advanced filtering techniques for anomaly detection and health monitoring applications.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-900/30 text-[10px] text-teal-300 uppercase tracking-wider border border-teal-500/20">Healthcare</span>
                <span className="px-3 py-1 rounded-full bg-teal-900/30 text-[10px] text-teal-300 uppercase tracking-wider border border-teal-500/20">Data Analysis</span>
              </div>
            </motion.div>

            {/* Box 4 */}
            <motion.div 
              variants={slideUp} 
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-gradient-to-br from-emerald-900/10 to-teal-900/10 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/5 shadow-lg hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] transition-all duration-500 group cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  <Mic size={22} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Acoustic Noise Cancellation</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Building adaptive algorithms to isolate and suppress background noise in real-time audio streams, enhancing modern communication and hearing systems.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-900/30 text-[10px] text-emerald-300 uppercase tracking-wider border border-emerald-500/20">Audio</span>
                <span className="px-3 py-1 rounded-full bg-emerald-900/30 text-[10px] text-emerald-300 uppercase tracking-wider border border-emerald-500/20">Algorithms</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </section>
    </main>
  );
}