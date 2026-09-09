"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaChevronRight } from 'react-icons/fa';

export default function TeamPage() {
  const exeComMembers = [
    {
      id: 1,
      name: "Meet Mungala",
      role: "Student Chairperson",
      image: "/Committee/Meet.png",
      description: "Leads the IEEE Student Branch, oversees activities, and guides the team toward achieving its goals and objectives.",
    },
    {
      id: 2,
      name: "Bhavini Chauhan",
      role: "Vice Chairperson",
      image: "/Committee/Bhavini.png",
      description: "Supports the Chair in managing the Student Branch and coordinates activities, events, and team responsibilities.",
    }, 
    {
      id: 4,
      name: "Parth Balar",
      role: "Vise Chairperson",
      image: "/Committee/Parth.jpeg",
      description: "Assists the leadership team in planning and executing IEEE activities while supporting coordination among members.",
    },
    {
      id: 3,
      name: "Dhruv Ribadiya",
      role: "Treasurer",
      image: "/Committee/Dhruv.png",
      description: "Manages the branch's financial activities, including budgeting, expense tracking, and maintaining financial records.",
    },
    {
      id: 5,
      name: "Tirth kosambiya",
      role: "Secretary",
      image: "/Committee/tirth.jpeg",
      description: "Crafting the visual identity, event flyers, and UI/UX components for all branch initiatives.",
    },
    {
      id: 6,
      name: "Anuj Pradhan",
      role: "Web master",
      image: "/Committee/anuj.jpeg",
      description: "Manages and maintains the IEEE website, ensuring updated content, smooth functionality, and an engaging online presence.",
    }
  ];

  const advisors = [
    {
      id: 101,
      name: "Dr. Latesh B. Chaudhari",
      role: "SB Directorr",
      image: "/Committee/latsh-sir.jpeg",
      description: "Provides strategic direction and leadership to the IEEE Student Branch, ensuring effective coordination and successful execution of its activities."
    },
    {
      id: 102,
      name: "Dr. Vivek C. Joshi",
      role: "SB Branch Advisor",
      image: "/Committee/IMG-20260508-WA0083.jpg.jpeg",
      description: "Guides and mentors the IEEE Student Branch team, offering valuable support in planning, decision-making, and professional development."
    },
    {
      id: 103,
      name: "Prof. Monali R. Gandhi",
      role: "Branch Counselor",
      image: "/Committee/Monali Mam.jpeg",
      description: "Provides guidance and mentorship to the IEEE Student Branch, supporting students in professional, technical, and organizational activities."
    },
    {
      id: 104,
      name: "Prof. Pooja D. patel",
      role: "Faculty Chair",
      image: "/Committee/Pooja Mam.jpeg",
      description: "Provides faculty-level leadership and guidance, helping the IEEE team organize impactful technical and professional activities."
    }
  ];

  // Framer Motion Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <main className="bg-[#020617] text-slate-300 font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden relative">
      
      {/* Animated Background Lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] bg-amber-900/20 rounded-full blur-[150px] mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] bg-orange-900/10 rounded-full blur-[150px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* 1. HERO SECTION (Perfectly Full Screen, Centered, Animated Background) */}
      <section className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        
        {/* Dynamic Hero Background Animation */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          {/* Fading Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]"></div>
          
          {/* Slow Rotating Dual-Glow */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[800px] h-[800px] opacity-40"
          >
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px] mix-blend-screen" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-orange-600/20 rounded-full blur-[100px] mix-blend-screen" />
          </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative text-center max-w-5xl mx-auto flex flex-col items-center z-10"
        >
          {/* Core Text Ambient Glow */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none z-0"
          />

          <div className="relative z-10 flex flex-col items-center">
            
            <motion.div variants={fadeUpVariant} className="group inline-flex items-center gap-4 px-8 py-3.5 bg-[#0a0f1d]/80 border border-amber-500/20 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.05)] backdrop-blur-xl mb-10 overflow-hidden relative transition-all hover:border-amber-500/50 cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5bg-amber-500"></span>
              </span>
              <span className="relative text-amber-400 font-bold text-md md:text-base uppercase tracking-[0.3em]">
                IEEE RNGPIT • ExeCom
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-7xl md:text-8xl lg:text-[9.5rem] font-extralight text-white mb-10 tracking-tight leading-[1.05]">
              Meet the <br className="md:hidden" />
              <span className="font-black relative inline-block md:ml-6">
                <span className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 blur-2xl rounded-full"></span>
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-orange-600 drop-shadow-sm">
                  Board
                </span>
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl lg:text-3xl text-slate-400 font-light leading-relaxed max-w-4xl mx-auto mb-16">
              The dedicated syndicate of <strong className="text-slate-200 font-medium">engineers, designers, and leaders</strong> driving technological excellence and shaping the campus tech ecosystem.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="flex items-center justify-center gap-4 w-full max-w-lg mx-auto">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-white/10"></div>
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
              <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-white/10"></div>
            </motion.div>

          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-amber-500/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Content Container below Hero */}
      <section className="max-w-7xl mx-auto px-6 relative z-10 pb-32">
        
        {/* 2. ADVISORS & MENTORS SECTION */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mb-32 pt-10"
        >
          <motion.div variants={fadeUpVariant} className="flex items-center gap-6 mb-12 border-b border-white/5 pb-5">
            <h2 className="text-3xl font-bold text-white tracking-tight">Faculty Advisors</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {advisors.map((advisor) => (
              <motion.div 
                variants={fadeUpVariant}
                key={advisor.id} 
                className="group relative rounded-[2rem] border border-white/5 hover:border-amber-500/40 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.25)] aspect-[4/5] bg-[#0a0f1d]"
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2rem]">
                  <Image 
                    src={advisor.image} 
                    alt={advisor.name} 
                    fill 
                    unoptimized 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                  <p className="text-amber-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 shadow-black drop-shadow-md">
                    {advisor.role}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-3 shadow-black drop-shadow-lg leading-tight group-hover:text-amber-300 transition-colors duration-300">
                    {advisor.name}
                  </h3>
                  <p className="text-slate-300 text-sm font-light leading-relaxed line-clamp-3 shadow-black drop-shadow-md opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {advisor.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3. CORE EXECUTIVE COMMITTEE GRID */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <motion.div variants={fadeUpVariant} className="flex items-center gap-6 mb-12 border-b border-white/5 pb-5">
            <h2 className="text-3xl font-bold text-white tracking-tight">Executive Committee</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {exeComMembers.map((member) => (
              <motion.div 
                variants={fadeUpVariant}
                key={member.id} 
                className="group relative rounded-[2.5rem] border border-white/5 hover:border-amber-500/40 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(245,158,11,0.25)] h-[480px] bg-[#0a0f1d]"
              >
                
                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2.5rem]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    unoptimized={true}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <p className="text-amber-400 font-bold text-[11px] uppercase tracking-[0.2em] mb-2 shadow-black drop-shadow-md">
                      {member.role}
                    </p>
                    <h3 className="text-3xl font-bold text-white tracking-tight mb-4 shadow-black drop-shadow-lg group-hover:text-amber-300 transition-colors duration-300">
                      {member.name}
                    </h3>

                    <p className="text-slate-300 text-sm font-light leading-relaxed mb-6 shadow-black drop-shadow-md line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {member.description}
                    </p>

                    <div className="flex gap-3 relative opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                      {member.socials?.linkedin && (
                        <Link href={member.socials.linkedin} className="flex items-center justify-center w-10 h-10 text-white hover:text-[#020617] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-amber-500 hover:border-amber-500 rounded-full transition-all duration-300 z-10 shadow-lg">
                          <FaLinkedin size={16} />
                        </Link>
                      )}
                      {member.socials?.github && (
                        <Link href={member.socials.github} className="flex items-center justify-center w-10 h-10 text-white hover:text-[#020617] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white hover:border-white rounded-full transition-all duration-300 z-10 shadow-lg">
                          <FaGithub size={16} />
                        </Link>
                      )}
                      {member.socials?.twitter && (
                        <Link href={member.socials.twitter} className="flex items-center justify-center w-10 h-10 text-white hover:text-[#020617] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-amber-400 hover:border-amber-400 rounded-full transition-all duration-300 z-10 shadow-lg">
                          <FaTwitter size={16} />
                        </Link>
                      )}
                      {member.socials?.mail && (
                        <Link href={member.socials.mail} className="flex items-center justify-center w-10 h-10 text-white hover:text-white bg-white/5 backdrop-blur-md border border-white/10 hover:bg-orange-500 hover:border-orange-500 rounded-full transition-all duration-300 z-10 shadow-lg">
                          <FaEnvelope size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4. CONTACT CTA */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
          className="relative rounded-[3rem] overflow-hidden border border-amber-500/20 bg-[#0a0f1d]/80 backdrop-blur-xl p-10 md:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Get in touch with the <span className="text-amber-400">Board.</span></h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Whether you have questions about our upcoming events, want to explore partnership opportunities, or simply wish to connect with our technical community, our team is here to help.
            </p>
          </div>
          
          <div className="relative z-10 flex-shrink-0">
            <Link href="/contact" className="group flex items-center gap-3 px-8 py-4 bg-white text-[#020617] rounded-full font-bold text-sm tracking-widest uppercase hover:bg-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
              Contact Our Team
              <FaChevronRight className="group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
        </motion.div>

      </section>
    </main>
  );
}