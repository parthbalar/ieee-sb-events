import Link from 'next/link';
import dbConnect from '../lib/dbConnect'; 
import Event from '../models/Event';      

// Next.js Server Component
export default async function EventsPage() {
  // 1. Connect to MongoDB and fetch data
  await dbConnect();
  
  // Fetch all events, sorted by the nested date field (newest first)
  const eventsData = await Event.find({}).sort({ 'event_info.date': 1 }).lean();
  
  // 2. Format dates, extract nested data, and dynamically calculate status
  const currentDate = new Date();
  
  const allEvents = eventsData.map(event => {
    const eventDate = new Date(event?.event_info?.date);
    const status = eventDate >= currentDate ? 'Upcoming' : 'Completed';

    return {
      ...event,
      _id: event._id.toString(),
      title: event?.event_info?.title || 'Untitled Event',
      description: event?.event_info?.theme || 'No description provided.',
      posterUrl: event?.posterUrl || '/poster_competition.png', 
      status: status,
      formattedDate: eventDate.toLocaleDateString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric'
      })
    };
  });

  const upcomingEvents = allEvents.filter(e => e.status === 'Upcoming');
  const pastEvents = allEvents.filter(e => e.status === 'Completed');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden relative">
      
      {/* --- PREMIUM CSS ANIMATIONS & PATTERNS --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-scroll {
          animation: scrollBounce 2s infinite;
        }
        .tech-dots {
          background-image: radial-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
      `}} />

      {/* --- AMBIENT GLOWS & BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center">
        <div className="absolute inset-0 tech-dots mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[150px] mix-blend-screen animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/15 rounded-full blur-[150px] mix-blend-screen animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">

        {/* ======================================================== */}
        {/* 1. FULL SCREEN HERO SECTION */}
        {/* ======================================================== */}
        <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 relative pt-20">
          <div className="max-w-5xl mx-auto w-full animate-fade-up">
            
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-950/40 border border-blue-500/30 backdrop-blur-xl mb-8 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold tracking-[0.25em] text-blue-300 uppercase">
                IEEE Innovation Hub
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-extralight tracking-tighter text-white mb-8 leading-[1.05]">
              Discover <br className="md:hidden" />
              <span className="font-black relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                Experiences.
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-blue-200/60 font-light leading-relaxed max-w-3xl mx-auto mb-16">
              Dive into our upcoming technical symposiums, hackathons, and professional YP meetups. Push your limits and build the future with us.
            </p>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. IMPACT STATISTICS BAR */}
        {/* ======================================================== */}
        {/* <section className="w-full border-y border-white/5 bg-[#060b19]/60 backdrop-blur-xl relative z-20 animate-fade-up delay-2">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
              <div className="text-center px-4">
                <h4 className="text-4xl md:text-5xl font-black text-white mb-2 shadow-black drop-shadow-md">40<span className="text-cyan-500">+</span></h4>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Events Hosted</p>
              </div>
              <div className="text-center px-4">
                <h4 className="text-4xl md:text-5xl font-black text-white mb-2 shadow-black drop-shadow-md">2.5<span className="text-cyan-500">k</span></h4>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Participants</p>
              </div>
              <div className="text-center px-4">
                <h4 className="text-4xl md:text-5xl font-black text-white mb-2 shadow-black drop-shadow-md">15<span className="text-cyan-500">+</span></h4>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Expert Speakers</p>
              </div>
              <div className="text-center px-4">
                <h4 className="text-4xl md:text-5xl font-black text-white mb-2 shadow-black drop-shadow-md">3<span className="text-cyan-500">+</span></h4>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Global Chapters</p>
              </div>
            </div>
          </div>
        </section> */}

        <div className="max-w-7xl mx-auto px-6 pt-32">
          
          {/* ======================================================== */}
          {/* 3. EVENT CATEGORIES (NEW SECTION) */}
          {/* ======================================================== */}
          <section className="mb-40 animate-fade-up delay-3">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-black text-white tracking-tight mb-4">Our Focus Areas</h2>
                <p className="text-blue-200/60 font-light max-w-xl">From intense coding sprints to professional networking, we curate events that accelerate your career.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category 1 */}
              <div className="group bg-[#060b19] border border-white/5 rounded-3xl p-8 hover:border-blue-500/40 hover:bg-[#0a1128] transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Hackathons & Ideathons</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">24 to 48-hour intensive coding competitions where teams build innovative prototypes solving real-world problems.</p>
              </div>
              {/* Category 2 */}
              <div className="group bg-[#060b19] border border-white/5 rounded-3xl p-8 hover:border-cyan-500/40 hover:bg-[#0a1128] transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Workshops & Bootcamps</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">Hands-on technical sessions led by industry experts focusing on AI, Web Development, and Hardware architectures.</p>
              </div>
              {/* Category 3 */}
              <div className="group bg-[#060b19] border border-white/5 rounded-3xl p-8 hover:border-sky-500/40 hover:bg-[#0a1128] transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Professional Meetups</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">Exclusive Young Professionals (YP) meetups and networking symposiums bridging the gap between academia and industry.</p>
              </div>
            </div>
          </section>

          {/* ======================================================== */}
          {/* 4. UPCOMING EVENTS (GRID CARDS) */}
          {/* ======================================================== */}
          <section className="mb-40">
            <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="h-8 w-1.5 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                <h2 className="text-4xl font-black text-white tracking-tight">Active Deployments</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
                <div 
                  key={event._id} 
                  className={`group relative h-[480px] rounded-[2.5rem] border border-blue-500/20 hover:border-blue-400/50 overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] animate-fade-up delay-${(index % 4) + 1}`}
                >
                  
                  {/* Full Background Image */}
                  <img 
                    src={event.posterUrl} 
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Smooth Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-[#020617]/20 group-hover:via-[#020617]/60 transition-colors duration-500"></div>
                  
                  {/* Floating Date Badge (Top Right) */}
                  <div className="absolute top-6 right-6 bg-[#020617]/80 backdrop-blur-md border border-blue-500/30 px-4 py-2 rounded-xl z-20 shadow-lg">
                    <span className="text-xs font-mono font-bold text-blue-300">
                      {event.formattedDate}
                    </span>
                  </div>
                  
                  {/* Content Overlayed directly on image at the BOTTOM */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                    <div className="mb-3">
                      {/* GREEN BADGE */}
                      <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] rounded-full uppercase tracking-widest backdrop-blur-sm">
                        Registration Open
                      </span>
                    </div>
                    
                    {/* TITLE */}
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-300 transition-colors leading-tight">
                      {event.title}
                    </h3>
                    
                    {/* DESCRIPTION */}
                    <p className="text-slate-300 text-sm font-light leading-relaxed mb-6 line-clamp-2">
                      {event.description}
                    </p>
                    
                    {/* BUTTON */}
                    <div>
                      <Link 
                        href={`/events/${event._id}`} 
                        className="w-full flex items-center justify-center gap-2 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                      >
                        Secure Your Spot
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </Link>
                    </div>
                  </div>
                  
                </div>
              )) : (
                <div className="col-span-full py-20 text-center border border-dashed border-blue-500/20 rounded-[2.5rem] bg-blue-950/10 backdrop-blur-sm animate-fade-up delay-1">
                  <div className="w-20 h-20 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-6 text-blue-400">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <p className="text-blue-300 font-medium text-xl">No upcoming events right now.</p>
                  <p className="text-slate-500 text-base mt-3">Our team is currently preparing the next big hackathon.</p>
                </div>
              )}
            </div>
          </section>

          {/* ======================================================== */}
          {/* 5. PAST EVENTS (ARCHIVE LIST) */}
          {/* ======================================================== */}
          <section className="mb-40 animate-fade-up delay-3">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-12">
              <div className="h-8 w-1.5 bg-slate-600 rounded-full"></div>
              <h2 className="text-4xl font-black text-white tracking-tight">System Archive</h2>
            </div>

            <div className="flex flex-col gap-4">
              {pastEvents.length > 0 ? pastEvents.map((event) => (
                <div 
                  key={event._id} 
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 bg-[#060b19]/80 border border-white/5 rounded-[2rem] hover:bg-[#0a1128] hover:border-blue-500/30 transition-all duration-300 backdrop-blur-md"
                >
                  <div className="flex-1 mb-6 md:mb-0 md:pr-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-mono text-slate-400 bg-white/5 px-2 py-1 rounded-md">{event.formattedDate}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{event.status}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-200 group-hover:text-white transition-colors mb-2">
                      {event.title}
                    </h3>
                    <p className="text-base text-slate-500 font-light mt-2 line-clamp-2 md:line-clamp-1">
                      {event.description}
                    </p>
                  </div>
                  
                  <Link 
                    href={`/events/${event._id}`} 
                    className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
                  >
                    Review Details
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                </div>
              )) : (
                <div className="py-16 text-center border border-white/5 rounded-[2rem] bg-[#060b19]/50 backdrop-blur-sm">
                  <p className="text-slate-500 font-medium text-lg">No past events found in the archive.</p>
                </div>
              )}
            </div>
          </section>

          {/* ======================================================== */}
          {/* 6. BOTTOM CALL TO ACTION (NEW) */}
          {/* ======================================================== */}
          <section className="relative rounded-[3rem] overflow-hidden border border-cyan-500/20 bg-[#0a1128]/80 backdrop-blur-xl p-10 md:p-16 lg:p-20 text-center flex flex-col items-center justify-center shadow-2xl z-20 animate-fade-up delay-3">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none"></div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight relative z-10">
              Want to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Host or Speak?</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-200/70 font-light leading-relaxed max-w-2xl mx-auto mb-10 relative z-10">
              We are constantly looking for industry experts, researchers, and tech enthusiasts to conduct workshops and lead symposium tracks.
            </p>
            
            <Link 
              href="/contact" 
              className="relative z-10 group flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
            >
              Collaborate With Us
              <svg className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            </Link>
          </section>

        </div>
      </div>
    </main>
  );
}