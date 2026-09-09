import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '../../lib/dbConnect';
import Event from '../../models/Event';
import RegistrationForm from './RegistrationForm'; 

export default async function EventDetailsPage({ params }) {
  const resolvedParams = await params;
  const eventId = resolvedParams.id;

  await dbConnect();

  let event;
  try {
    event = await Event.findById(eventId).lean();
  } catch (error) {
    notFound();
  }

  if (!event) notFound();

  const currentDate = new Date();
  const eventDate = new Date(event?.event_info?.date);
  const status = eventDate >= currentDate ? 'Upcoming' : 'Completed';

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  // Clean the MongoDB objects into plain Javascript objects
  const safeTracks = event?.technical_tracks?.map(track => ({
    track_id: track.track_id,
    title: track.title,
    sub_topics: track.sub_topics || []
  })) || [];

  // Safely extract guidelines from the database
  const safeGuidelines = event?.event?.rules_and_guidelines || [];

  // =========================================================================
  // DYNAMIC TIMELINE LOGIC
  // =========================================================================
  const schedule = event?.schedule || {};
  const rawSteps = [
    { id: 1, title: 'Registration Deadline & Project Abstract Submission', dateStr: schedule.deadline || 'TBA' },
    { id: 2, title: 'Acceptance Notification', dateStr: schedule.acceptance || 'TBA' },
    { id: 3, title: 'Event Day', dateStr: schedule.event_date || 'TBA' }
  ];

  const currentYear = currentDate.getFullYear();
  let activeFound = false;

  const timelineSteps = rawSteps.map((step) => {
    if (!step.dateStr || step.dateStr === 'TBA') {
      return { ...step, status: 'upcoming' };
    }

    // Try to parse date (assuming the current year if not provided)
    const parsedDate = new Date(`${step.dateStr} ${currentYear}`);
    
    if (isNaN(parsedDate)) {
      return { ...step, status: 'upcoming' };
    }

    // Set to end of that specific day for accurate comparison
    parsedDate.setHours(23, 59, 59, 999);

    if (currentDate.getTime() > parsedDate.getTime()) {
      return { ...step, status: 'completed' };
    } else if (!activeFound) {
      activeFound = true;
      return { ...step, status: 'active' };
    } else {
      return { ...step, status: 'upcoming' };
    }
  });
  // =========================================================================

  return (
    <main className="min-h-screen bg-[#050810] text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative pb-24 overflow-x-hidden">
      
      {/* Ambient Cinematic Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-cyan-900/10 rounded-full blur-[150px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
      </div>

      {/* ========================================================= */}
      {/* GUIDELINES SIDE DRAWER (PURE CSS IMPLEMENTATION) */}
      {/* ========================================================= */}
      {safeGuidelines.length > 0 && (
        <>
          <input type="checkbox" id="guidelines-drawer" className="peer hidden" />
          
          {/* Drawer Overlay */}
          <label 
            htmlFor="guidelines-drawer" 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[150] opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-opacity duration-300 cursor-pointer"
          ></label>
          
          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 z-[200] w-full sm:w-[500px] lg:w-[600px] bg-[#050810] border-l border-slate-800 shadow-[0_0_50px_rgba(8,145,178,0.2)] translate-x-full peer-checked:translate-x-0 transition-transform duration-500 ease-in-out flex flex-col h-full">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 bg-[#0a0f1c] border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">Rules & Guidelines</h3>
              </div>
              <label htmlFor="guidelines-drawer" className="p-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all transform hover:rotate-90 cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </label>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-4">
              {safeGuidelines.map((guideline, index) => (
                <details 
                  key={index} 
                  className="group bg-[#0a0f1c] border border-slate-800/80 rounded-[1.5rem] overflow-hidden shadow-lg [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between p-6 sm:p-8 cursor-pointer hover:bg-cyan-950/20 hover:border-cyan-500/30 transition-all duration-300 list-none outline-none">
                    <h4 className="text-lg md:text-xl text-slate-200 font-bold group-open:text-cyan-400 transition-colors">
                      {guideline.section}
                    </h4>
                    <span className="transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4">
                      <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  
                  <div className="px-6 sm:px-8 pb-8 pt-0 border-t border-slate-800/50 mt-2">
                    {/* Bullet Point Rules */}
                    {guideline.rules && guideline.rules.length > 0 && (
                      <ul className="space-y-4 mt-6">
                        {guideline.rules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-slate-400 leading-relaxed text-sm md:text-base">
                            <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-cyan-500/20">
                              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                            </div>
                            <span className="flex-1">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tracks (if present) */}
                    {guideline.tracks && guideline.tracks.length > 0 && (
                      <ul className="space-y-3 mt-6">
                        {guideline.tracks.map((track, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-slate-300 font-semibold text-sm md:text-base">
                            <span className="text-cyan-500 font-black">→</span>
                            {track}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Note (if present) */}
                    {guideline.note && (
                      <div className="mt-6 p-4 rounded-xl bg-cyan-900/10 border border-cyan-500/20 text-cyan-400 text-sm italic">
                        <strong>Note:</strong> {guideline.note}
                      </div>
                    )}

                    {/* Evaluation Criteria Grid (if present) */}
                    {guideline.criteria && guideline.criteria.length > 0 && (
                      <div className="mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {guideline.criteria.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-slate-800">
                              <span className="text-slate-300 text-sm font-medium">{item.criterion}</span>
                              <span className="text-cyan-400 font-black">{item.weightage}</span>
                            </div>
                          ))}
                        </div>
                        {guideline.total_weightage && (
                          <div className="flex justify-between items-center bg-cyan-900/20 p-4 rounded-xl border border-cyan-500/30 mt-4">
                            <span className="text-cyan-100 font-bold uppercase tracking-widest text-xs">Total Weightage</span>
                            <span className="text-cyan-400 font-black text-lg">{guideline.total_weightage}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </>
      )}
      {/* ========================================================= */}

      <div className="relative max-w-7xl mx-auto px-6 pt-24 md:pt-10">
        
        {/* Back Navigation */}
        <Link href="/events" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-10 text-sm font-bold tracking-wide uppercase">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return to Events
        </Link>

        {/* --- 1. FULL WIDTH HEADER (Title & Badges) --- */}
        <div className="mb-12 border-b border-slate-800/80 pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${status === 'Upcoming' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}>
              <span className={`w-2 h-2 rounded-full mr-2.5 ${status === 'Upcoming' ? 'bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]' : 'bg-slate-500'}`}></span>
              {status === 'Upcoming' ? 'Registration Open' : 'Archived Event'}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-widest">
              {event?.event_info?.host_department || 'Department Event'}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
            {event?.event_info?.title}
          </h1>
          <p className="text-xl md:text-2xl text-cyan-100/70 font-medium">
            Theme: <span className="text-white">{event?.event_info?.theme}</span>
          </p>
        </div>

        {/* --- 2. MAIN SPLIT LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Overview, Timeline, Tracks */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-16 order-2 lg:order-1">
            
            {/* Mobile Event Specs */}
            <div className="grid grid-cols-2 gap-4 lg:hidden mb-8">
              <div className="bg-[#0a0f1c] border border-slate-800/80 p-5 rounded-2xl">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Venue</p>
                <p className="text-slate-200 font-bold truncate" title={event?.event_info?.venue}>{event?.event_info?.venue || 'TBA'}</p>
              </div>
              <div className="bg-[#0a0f1c] border border-slate-800/80 p-5 rounded-2xl">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Deadline</p>
                <p className="text-red-400 font-bold">{event?.schedule?.deadline || 'TBA'}</p>
              </div>
              <div className="bg-[#0a0f1c] border border-slate-800/80 p-5 rounded-2xl">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Team Size</p>
                <p className="text-slate-200 font-bold">{event?.guidelines?.team_size?.min_members} - {event?.guidelines?.team_size?.max_members} Members</p>
              </div>
              <div className="bg-[#0a0f1c] border border-slate-800/80 p-5 rounded-2xl">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Format</p>
                <p className="text-slate-200 font-bold truncate">{event?.guidelines?.format || 'Standard'}</p>
              </div>
            </div>

            {/* Overview Section & Guidelines Trigger Button */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
                <h2 className="text-3xl font-black text-white tracking-tight">Event Overview</h2>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed font-light mb-8">
                Join us for our flagship technical event. Explore cutting-edge problem statements, showcase your research, and present innovative architectures to industry experts. Prepare your abstracts and secure your team's spot today.
              </p>
              
              {/* GUIDELINES TRIGGER BUTTON */}
              {safeGuidelines.length > 0 && (
                <label 
                  htmlFor="guidelines-drawer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-900/20 border border-cyan-500/30 rounded-2xl text-cyan-400 hover:text-black hover:bg-cyan-500 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] font-bold cursor-pointer group w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Complete Rules & Guidelines
                </label>
              )}
            </div>

            {/* TIMELINE SECTION */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
                <h3 className="text-3xl font-black text-white tracking-tight">Mission Timeline</h3>
              </div>
              
              <div className="relative space-y-6">
                <div className="absolute top-6 bottom-6 left-[21px] sm:left-[27px] w-[2px] bg-slate-700 z-0"></div>
                
                {timelineSteps.map((step) => {
                  const isCompleted = step.status === 'completed';
                  const isActive = step.status === 'active';
                  const isUpcoming = step.status === 'upcoming';
                  
                  return (
                    <div key={step.id} className="relative z-10 flex items-start gap-4 sm:gap-6 group">
                      
                      <div className="relative flex-shrink-0 w-11 sm:w-14 flex justify-center mt-4">
                        {isCompleted && (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#050810] flex items-center justify-center z-10">
                            <div className="w-full h-full rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            </div>
                          </div>
                        )}
                        {isActive && (
                          <div className="relative w-6 h-6 sm:w-8 sm:h-8 bg-[#050810] rounded-full z-10">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <div className="relative w-full h-full rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-400 rounded-full"></div>
                            </div>
                          </div>
                        )}
                        {isUpcoming && (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#050810] flex items-center justify-center z-10">
                            <div className="w-full h-full rounded-full border-2 border-slate-700 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-700 rounded-full group-hover:bg-slate-500 transition-colors"></div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className={`flex flex-col flex-1 p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                        isActive 
                          ? 'bg-cyan-950/20 border-cyan-500/30 shadow-[0_4px_20px_rgba(34,211,238,0.1)]' 
                          : isCompleted
                            ? 'bg-slate-900/40 border-emerald-500/10 opacity-70'
                            : 'bg-slate-900/20 border-slate-800/80 opacity-50 hover:opacity-100 hover:border-slate-700'
                      }`}>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h4 className={`text-lg sm:text-xl font-bold ${isActive ? 'text-cyan-400' : isCompleted ? 'text-emerald-400' : 'text-slate-300'}`}>
                            {step.title}
                          </h4>
                          {isActive && (
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                              Live Now
                            </span>
                          )}
                          {isCompleted && (
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Completed
                            </span>
                          )}
                        </div>
                        <p className={`text-lg font-bold font-mono tracking-wide ${isActive ? 'text-white' : 'text-slate-500'}`}>
                          {step.dateStr}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technical Tracks Grid */}
            {safeTracks.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
                  <h3 className="text-3xl font-black text-white tracking-tight">Technical Tracks</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {safeTracks.map((track) => (
                    <div key={track.track_id} className="bg-[#0a0f1c] border border-slate-800/80 p-6 rounded-[2rem] hover:bg-cyan-950/20 hover:border-cyan-500/30 transition-all duration-300 group shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-cyan-500 font-black text-sm tracking-widest uppercase">Track {track.track_id}</span>
                        <svg className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <h4 className="text-xl text-slate-200 font-bold mb-5 leading-snug">{track.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {track.sub_topics.map((topic, i) => (
                          <span key={i} className="text-xs px-3 py-1.5 bg-black/50 text-slate-300 font-medium rounded-lg border border-slate-800">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>

          {/* RIGHT COLUMN: Poster, Specs & Registration (Sticky Sidebar) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 order-1 lg:order-2 lg:sticky lg:top-8">
            
            {/* PORTRAIT POSTER CONTAINER */}
            <div className="w-full rounded-[2rem] overflow-hidden border border-slate-800 bg-[#0a0f1c] shadow-2xl p-2 flex justify-center items-center">
              <img src="/poster_competition.png" alt={event?.event_info?.title} className="w-full h-auto max-h-[70vh] object-contain rounded-3xl" />
            </div>

            {/* DOWNLOAD TEMPLATE BUTTON */}
            <a 
              href="/Offical_Poster_Template.pptx" 
              download="Official_Poster_Template"
              className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/30 hover:border-cyan-500/30 font-bold transition-all duration-300 group shadow-lg"
            >
              <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Official Template
            </a>

            {/* Event Specs Card */}
            <div className="bg-[#0a0f1c] border border-slate-800/80 p-8 rounded-[2rem] shadow-2xl hidden lg:block">
              <h4 className="text-lg font-black text-white mb-6 tracking-wide uppercase border-b border-slate-800/80 pb-4">Key Logistics</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Event Date</p>
                    <p className="text-slate-200 font-semibold">{formattedDate}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Venue</p>
                    <p className="text-slate-200 font-semibold">{event?.event_info?.venue || 'TBA'}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Registration Component */}
            {status === 'Upcoming' && (
              <div className="w-full">
                <RegistrationForm 
                  eventId={event._id.toString()} 
                  minMembers={event?.guidelines?.team_size?.min_members || 1}
                  maxMembers={event?.guidelines?.team_size?.max_members || 1}
                  technicalTracks={safeTracks} 
                />
              </div>
            )}
            
          </div>
        </div>
      </div>
    </main>
  );
}