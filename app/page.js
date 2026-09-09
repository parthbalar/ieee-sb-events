import Link from 'next/link';
import Image from 'next/image';
import dbConnect from './lib/dbConnect'; // Adjust path if your page.jsx is nested differently
import Event from './models/Event';      // Adjust path if your page.jsx is nested differently

export default async function Page() {
  // 1. Connect to Database and fetch events
  await dbConnect();
  const eventsData = await Event.find({}).sort({ 'event_info.date': 1 }).lean();
  
  // 2. Find the first upcoming event based on today's date
  const currentDate = new Date();
  const upcomingEvent = eventsData.find(event => new Date(event?.event_info?.date) >= currentDate);

  return (
    <main className="min-h-screen bg-black text-slate-300 font-sans overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* PURE CSS 3D & AMBIENT ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-container { 
          perspective: 1200px; 
        }
        
        .animate-drop-3d {
          opacity: 0;
          animation: dropIn3D 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        
        .animate-swing-3d {
          opacity: 0;
          animation: swingIn3D 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s forwards;
        }
        
        .animate-swivel-3d {
          opacity: 0;
          animation: swivelIn3D 1s cubic-bezier(0.25, 1, 0.5, 1) 0.4s forwards;
        }
        
        .animate-fold-3d {
          opacity: 0;
          transform-origin: top;
          animation: foldIn3D 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s forwards;
        }
        
        .animate-gradient-shift {
          background-size: 200% auto;
          animation: gradientShift 5s linear infinite;
        }

        /* --- NEW: Premium Background Animations --- */
        .animate-bg-orb-1 {
          animation: floatOrb1 25s ease-in-out infinite;
        }
        
        .animate-bg-orb-2 {
          animation: floatOrb2 30s ease-in-out infinite;
        }

        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(5vw, -5vh) scale(1.1) rotate(5deg); }
          66% { transform: translate(-5vw, 5vh) scale(0.9) rotate(-5deg); }
        }
        
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-5vw, 5vh) scale(1.2) rotate(-5deg); }
          66% { transform: translate(5vw, -5vh) scale(0.8) rotate(5deg); }
        }
        /* ------------------------------------------ */

        @keyframes dropIn3D {
          0% { opacity: 0; transform: translateY(-50px) translateZ(-200px) rotateX(60deg); }
          100% { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0deg); }
        }
        
        @keyframes swingIn3D {
          0% { opacity: 0; transform: scale(0.8) translateZ(-300px) rotateX(-45deg); }
          100% { opacity: 1; transform: scale(1) translateZ(0) rotateX(0deg); }
        }
        
        @keyframes swivelIn3D {
          0% { opacity: 0; transform: translateX(50px) translateZ(-100px) rotateY(45deg); }
          100% { opacity: 1; transform: translateX(0) translateZ(0) rotateY(0deg); }
        }
        
        @keyframes foldIn3D {
          0% { opacity: 0; transform: translateY(50px) translateZ(-100px) rotateX(90deg); }
          100% { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0deg); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

      {/* PREMIUM AMBIENT BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Subtle Static Grid with soft radial fade */}
        <div className="absolute inset-0 static-tech-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>

        {/* Slow Breathing Orbs */}
        <div className="animate-ambient-glow-1 absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-600/30 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="animate-ambient-glow-2 absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
      </div>

      {/* 1. CINEMATIC IEEE HERO SECTION */}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-0 pb-10 -mt-24 overflow-visible perspective-container">
        
        <div className="animate-drop-3d inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-950/40 border border-blue-500/20 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)] mt-24">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-200">IEEE Student Branch • RNGPIT</span>
        </div>
        
        <h1 className="animate-swing-3d text-4xl sm:text-5xl md:text-6xl lg:text-[7.5rem] font-black tracking-tighter text-white mb-6 leading-tight">
          Advancing Tech. <br />
          <span className="animate-gradient-shift text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-600 drop-shadow-sm">
            For Humanity.
          </span>
        </h1>
        
        <p className="animate-swivel-3d text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto font-light mb-10 leading-relaxed">
          The premier technical ecosystem bridging the gap between academic theory and industry-grade system architecture. We build the future.
        </p>
        
        <div className="animate-fold-3d flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/events" className="group relative px-8 py-3.5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:-translate-y-1">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Branch Events
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
          <Link href="#about-ieee" className="px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 hover:border-blue-500/40 transition-all">
            Discover IEEE
          </Link>
        </div>
      </section>

      {/* 2. DYNAMIC UPCOMING EVENT SECTION */}
      {upcomingEvent && (
        <section className="relative z-10 w-full py-20 border-y border-blue-500/20 bg-blue-950/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="group relative bg-black border border-blue-500/30 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden hover:border-cyan-500/50 transition-colors duration-700">
              {/* Ambient Background for Event Card */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.15)_0%,transparent_60%)]"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                
                {/* Flyer Image Left */}
                <div className="w-full lg:w-5/12 aspect-[3/4] relative rounded-3xl overflow-hidden border border-white/10 group-hover:border-cyan-500/30 transition-colors shadow-2xl flex-shrink-0 bg-blue-950">
                  <div className="absolute inset-0 bg-blue-900/20 animate-pulse z-0"></div>
                  {/* Image path fixed: Never include "/public", just use "/" */}
                  <Image
                    src="/poster_competition.png" 
                    alt={upcomingEvent.event_info.title}
                    fill
                    className="object-cover relative z-10 opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Event Details Right */}
                <div className="w-full lg:w-7/12">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-400 font-bold text-xs rounded-full uppercase tracking-widest mb-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Flagship Upcoming Event
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                    {upcomingEvent.event_info.title}
                  </h2>

                  <h3 className="text-xl md:text-2xl text-cyan-400 font-semibold mb-6">
                    Theme: {upcomingEvent.event_info.theme}
                  </h3>
                  
                  <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">
                    Organized by {upcomingEvent.event_info.host_department}. Showcase your research and engineering problem-solving skills across our cutting-edge technical tracks.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Event Date</p>
                      <p className="text-slate-200 font-medium">
                        {new Date(upcomingEvent.event_info.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl border-l-2 border-l-red-500">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Registration Deadline</p>
                      <p className="text-red-400 font-medium">{upcomingEvent.schedule.deadline}</p>
                    </div>
                  </div>
                  
                  {/* Redirect Button */}
                  <Link href={`/events/${upcomingEvent._id}`} className="inline-flex px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                    View Complete Details & Register
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. WHAT IS IEEE SECTION */}
      <section id="about-ieee" className="relative z-10 w-full py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900/40 border border-white/10 p-10 md:p-16 rounded-[3rem] backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                  What is <span className="text-blue-500">IEEE?</span>
                </h2>
                <div className="h-1.5 w-20 bg-cyan-500 rounded-full"></div>
              </div>
              
              <div className="md:col-span-7">
                <p className="text-xl text-slate-300 font-light leading-relaxed mb-6">
                  The Institute of Electrical and Electronics Engineers (IEEE) is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. 
                </p>
                <p className="text-lg text-slate-400 font-light leading-relaxed">
                  Through its highly cited publications, conferences, technology standards, and professional and educational activities, IEEE is the trusted voice in a wide variety of areas ranging from aerospace systems, computers, and telecommunications to biomedical engineering, electric power, and consumer electronics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STRATEGIC PILLARS SECTION */}
     {/* Added pt-32 to push the entire section down from whatever is above it */}
<section className="relative z-10 w-full pt-25 pb-32">
  <div className="max-w-7xl mx-auto px-6">
    
    <div className="mb-32 text-center max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Our Core Motives</h2>
      <p className="text-xl text-slate-400 font-light">The strategic pillars that drive our student branch's initiatives, workshops, and global network.</p>
    </div>

    {/* ... rest of your cards code ... */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="group relative bg-black border border-white/10 p-10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-colors duration-500 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Technical Excellence</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Fostering profound technical knowledge through hands-on hackathons, intensive coding sprints, and deep architectural seminars. We push boundaries by hosting rigorous challenges like the Internal Smart India Hackathon and facilitating technical engagements such as the Kaushalya event.
              </p>
            </div>

            <div className="group relative bg-black border border-white/10 p-10 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/40 transition-colors duration-500 shadow-xl md:-translate-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-8">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Professional Growth</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Bridging the gap between academia and industry by connecting students with Young Professionals (YP) and organizing career-focused symposiums. We drive professional development through flagship events like the IEEE Student Branch Orientation Ceremony and the YP Meetup hosted directly at the RNGPIT campus.
              </p>
            </div>

            <div className="group relative bg-black border border-white/10 p-10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-colors duration-500 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Community</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Empowering members to become part of a worldwide network of innovators. We actively expand our network by participating in regional gatherings like the IEEE YP Connect Student-YP Meetup in Surat, as well as broader campus events like the 13th GTU Kshitij Youth Festival.
              </p>
            </div>

            <div className="group relative bg-black border border-white/10 p-10 rounded-[2.5rem] overflow-hidden hover:border-purple-500/40 transition-colors duration-500 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-8">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Inclusive Engineering</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Championing diversity in STEM. Through our dedicated Women in Engineering (WIE) affinity group, we are committed to promoting women engineers and inspiring all students to pursue their academic interests in a highly supportive, inclusive environment.
              </p>
            </div>

            <div className="group relative bg-black border border-white/10 p-10 rounded-[2.5rem] overflow-hidden hover:border-green-500/40 transition-colors duration-500 shadow-xl md:-translate-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mb-8">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Applied Research</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Translating complex theory into practical execution. Our Signal Processing Society (SPS) chapter and advanced project teams focus on the deep application of algorithms, signal analysis, and AI/ML architectures to solve real-world engineering problems.
              </p>
            </div>

            <div className="group relative bg-black border border-white/10 p-10 rounded-[2.5rem] overflow-hidden hover:border-amber-500/40 transition-colors duration-500 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 mb-8">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Leadership Cultivation</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Cultivating the next generation of tech leaders. By taking on roles within the ExeCom or managing complex project deployments, members build the organizational, financial, and management skills critical for industry success.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. OUR TECHNICAL CHAPTERS */}
      <section className="relative z-10 w-full py-32 px-6 bg-slate-950/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Our Technical Chapters</h2>
            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
              Explore specialized communities within our branch dedicated to specific fields of engineering and professional development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            <div className="group relative bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-[3rem] p-10 md:p-12 overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15)_0%,transparent_60%)]"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
                    <span className="text-purple-700 font-black text-xl tracking-tighter">WIE</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Women in Engineering</h3>
                    <p className="text-purple-400 text-sm font-semibold">Affinity Group</p>
                  </div>
                </div>
                
                <p className="text-slate-300 font-light leading-relaxed mb-8 flex-grow">
                  The WIE affinity group at RNGPIT is dedicated to promoting women engineers and scientists, and inspiring girls around the world to follow their academic interests to a career in engineering.
                </p>
                
                <Link href="/chapters/wie" className="inline-flex items-center justify-center w-full py-4 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/50 hover:border-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  Explore WIE Chapter
                </Link>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 rounded-[3rem] p-10 md:p-12 overflow-hidden hover:border-green-500/50 transition-all duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.15)_0%,transparent_60%)]"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
                    <span className="text-green-700 font-black text-xl tracking-tighter">SPS</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Signal Processing Society</h3>
                    <p className="text-green-400 text-sm font-semibold">Technical Chapter</p>
                  </div>
                </div>
                
                <p className="text-slate-300 font-light leading-relaxed mb-8 flex-grow">
                  The SPS chapter focuses on the theory and application of filtering, coding, transmitting, estimating, detecting, analyzing, and synthesizing signals to extract information.
                </p>
                
                <Link href="/chapters/sps" className="inline-flex items-center justify-center w-full py-4 bg-green-600/20 hover:bg-green-600 border border-green-500/50 hover:border-green-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  Explore SPS Chapter
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}