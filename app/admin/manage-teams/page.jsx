"use client";

import { useState, useEffect } from 'react';

export default function AdminTeamManagement() {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]); // NEW: State to hold database events
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ type: '', text: '' });
  
  // Filtering and Viewing States
  const [eventFilter, setEventFilter] = useState('All');
  const [viewingTeam, setViewingTeam] = useState(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast.text) {
      const timer = setTimeout(() => setToast({ type: '', text: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.text]);

  // Fetch all data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch both Registrations and Events in parallel
      const [regRes, dashRes] = await Promise.all([
        fetch('/api/admin/registrations'),
        fetch('/api/dashboard/data') // Reusing the dashboard API to get the events list
      ]);
      
      const regJson = await regRes.json();
      const dashJson = await dashRes.json();

      if (regJson.success) {
        setRegistrations(regJson.data);
      } else {
        setToast({ type: 'error', text: regJson.error || 'Failed to load teams.' });
      }

      if (dashJson.success && dashJson.events) {
        setEvents(dashJson.events);
      }

    } catch (error) {
      setToast({ type: 'error', text: 'Server error while fetching data.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (teamId, newStatus) => {
    try {
      // Optimistically update the UI so it feels instant
      setRegistrations(prev => 
        prev.map(team => team._id === teamId ? { ...team, registrationStatus: newStatus } : team)
      );

      const res = await fetch(`/api/admin/registrations/${teamId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const json = await res.json();
      
      if (json.success) {
        setToast({ type: 'success', text: `Team ${teamId} updated to ${newStatus}` });
        // If reviewing, update the modal's state too
        if (viewingTeam && viewingTeam._id === teamId) {
          setViewingTeam(prev => ({ ...prev, registrationStatus: newStatus }));
        }
      } else {
        fetchData();
        setToast({ type: 'error', text: json.error });
      }
    } catch (error) {
      fetchData();
      setToast({ type: 'error', text: 'Network error updating status.' });
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Verified': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Not Verified': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'Shortlisted': return 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30';
      case 'Rejected': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  // --- DYNAMIC FILTER LOGIC ---
  const getRegEventTitle = (reg) => {
    if (reg.eventName) return reg.eventName;
    if (reg.eventId) return reg.eventId.event_info?.title || reg.eventId.title || 'Unknown Event';
    return 'Unknown Event';
  };

  // 1. Get titles directly from the Events database
  const dbEventTitles = events.map(e => e.event_info?.title || e.title).filter(Boolean);
  
  // 2. Get titles from existing registrations (fallback for deleted events)
  const regEventTitles = registrations.map(getRegEventTitle);

  // 3. Combine and Deduplicate for the Dropdown
  const uniqueEvents = ['All', ...new Set([...dbEventTitles, ...regEventTitles])];

  // 4. Filter registrations based on selected event
  const filteredRegistrations = eventFilter === 'All' 
    ? registrations 
    : registrations.filter(r => getRegEventTitle(r) === eventFilter);

  return (
    <div className="min-h-screen bg-[#050810] text-slate-300 font-sans p-6 sm:p-10 relative">
      
      {/* FLOATING TOAST */}
      <div className={`fixed top-6 right-6 z-[9999999] transition-all duration-500 ease-out transform ${toast.text ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-[120%] opacity-0 scale-95'}`}>
        {toast.text && (
          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl ${toast.type === 'success' ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' : 'bg-red-950/40 border-red-500/30 text-red-400'}`}>
            <p className="text-sm font-bold tracking-wide">{toast.text}</p>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Registration Approvals</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Manage, verify, and review event teams.</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* DYNAMIC EVENT FILTER DROPDOWN */}
            <div className="flex items-center bg-[#090c14] border border-slate-800 rounded-xl px-3 py-1 shadow-inner">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-3">Event Filter:</span>
              <select 
                value={eventFilter} 
                onChange={(e) => setEventFilter(e.target.value)}
                className="bg-transparent text-cyan-400 font-bold text-sm outline-none border-none py-2 cursor-pointer appearance-none min-w-[150px]"
              >
                {uniqueEvents.map((evt, idx) => (
                  <option key={idx} value={evt} className="bg-slate-900 text-white">{evt}</option>
                ))}
              </select>
              <svg className="w-4 h-4 text-cyan-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>

            <div className="px-4 py-2.5 bg-slate-900 rounded-xl border border-slate-800 font-bold text-cyan-400 text-sm shadow-inner">
              Showing: {filteredRegistrations.length} Teams
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <svg className="animate-spin h-8 w-8 text-cyan-500" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-bold bg-[#090c14] border border-slate-800/80 rounded-3xl">No registrations match your filter.</div>
        ) : (
          
          /* Data Table */
          <div className="bg-[#090c14] border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800/80 text-[10px] uppercase tracking-widest text-slate-400">
                    <th className="p-5 font-bold">Team ID & Event</th>
                    <th className="p-5 font-bold">Team Details</th>
                    <th className="p-5 font-bold text-center">Status</th>
                    <th className="p-5 font-bold text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredRegistrations.map((team) => (
                    <tr key={team._id} className="hover:bg-slate-900/20 transition-colors">
                      
                      {/* Team ID & Event Name */}
                      <td className="p-5 align-top">
                        <div className="mb-2">
                          <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                            {team._id}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 truncate max-w-[200px]" title={getRegEventTitle(team)}>{getRegEventTitle(team)}</p>
                        <p className="text-[10px] font-bold text-slate-600 mt-1 uppercase tracking-widest">{team.selectedTrack}</p>
                      </td>

                      {/* Team Details */}
                      <td className="p-5 align-top">
                        <p className="text-white font-bold text-sm mb-1">{team.teamName}</p>
                        <p className="text-slate-400 text-xs font-medium">Leader: {team.teamLeader?.name} ({team.teamLeader?.email})</p>
                        <p className="text-slate-500 text-xs font-medium mt-0.5">Size: {team.teamMembers?.length + 1} Members</p>
                      </td>

                      {/* Current Status Badge */}
                      <td className="p-5 text-center align-top">
                        <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusColor(team.registrationStatus || 'Pending')}`}>
                          {team.registrationStatus || 'Pending'}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="p-5 text-right align-top space-y-2">
                        <div className="flex justify-end gap-2 mb-2">
                          <button 
                            onClick={() => setViewingTeam(team)}
                            className="px-4 py-1.5 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-500 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            Review Docs
                          </button>
                        </div>
                        <div className="flex justify-end gap-2 flex-wrap">
                          <button onClick={() => handleStatusChange(team._id, 'Verified')} className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/30 hover:border-emerald-500 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all">Approve</button>
                          <button onClick={() => handleStatusChange(team._id, 'Shortlisted')} className="px-3 py-1.5 bg-fuchsia-500/10 hover:bg-fuchsia-500 text-fuchsia-400 hover:text-white border border-fuchsia-500/30 hover:border-fuchsia-500 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all">Shortlist</button>
                          
                          <button onClick={() => handleStatusChange(team._id, 'Rejected')} className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 hover:border-rose-500 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all">Reject</button>
                          <button onClick={() => handleStatusChange(team._id, 'Not Verified')} className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 hover:border-red-500 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all">Unverified</button>
                        </div>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* REVIEW DOCUMENTS MODAL                                    */}
      {/* ========================================================= */}
      {viewingTeam && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity">
          <div className="bg-[#090c14] border border-cyan-900/40 rounded-[2rem] w-full max-w-5xl h-[95vh] sm:h-[90vh] shadow-[0_0_80px_rgba(8,145,178,0.15)] flex flex-col overflow-hidden relative">
            
            {/* Modal Header */}
            <div className="bg-[#090c14] border-b border-slate-800 p-5 sm:px-8 flex justify-between items-center shrink-0 z-20 shadow-md">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-3">
                  Reviewing: {viewingTeam.teamName}
                  <span className={`text-[10px] px-2 py-1 rounded-md border tracking-widest uppercase ${getStatusColor(viewingTeam.registrationStatus || 'Pending')}`}>
                    {viewingTeam.registrationStatus || 'Pending'}
                  </span>
                </h3>
                <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mt-1">ID: {viewingTeam._id} • {getRegEventTitle(viewingTeam)}</p>
              </div>
              <button onClick={() => setViewingTeam(null)} className="p-3 bg-slate-800/50 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all transform hover:rotate-90">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 bg-[#090c14] space-y-8">
              
              {/* Abstract Section */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Project Abstract
                </h4>
                <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap bg-[#050810] p-5 rounded-2xl border border-slate-800/80">
                  {viewingTeam.abstract}
                </p>
              </div>

              {/* Payment Proof Section */}
              {viewingTeam.paymentAmount > 0 && (
                <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-3xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Payment Receipt (₹{viewingTeam.paymentAmount})
                    </h4>
                    <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">Ref: {viewingTeam.paymentTransactionId}</span>
                  </div>
                  {viewingTeam.paymentProofUrl ? (
                    <img src={viewingTeam.paymentProofUrl} alt="Payment Proof" className="max-w-md w-full h-auto object-contain rounded-2xl border border-slate-800 shadow-lg" />
                  ) : (
                    <p className="text-slate-500 text-sm italic">No screenshot uploaded.</p>
                  )}
                </div>
              )}

              {/* IEEE Proofs Section */}
              <div className="bg-blue-950/10 border border-blue-900/30 rounded-3xl p-6">
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                  IEEE Membership Proofs
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Leader Proof */}
                  {viewingTeam.teamLeader?.ieeeProofUrl && (
                    <div className="bg-[#050810] p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs text-blue-400 font-bold uppercase mb-1">Leader: {viewingTeam.teamLeader.name}</p>
                      <p className="text-[10px] text-slate-500 mb-3 font-mono">ID: {viewingTeam.teamLeader.ieeeMemberId}</p>
                      <img src={viewingTeam.teamLeader.ieeeProofUrl} alt="Leader IEEE" className="w-full h-auto object-contain rounded-xl border border-slate-800" />
                    </div>
                  )}

                  {/* Members Proofs */}
                  {viewingTeam.teamMembers?.map((m, i) => m.ieeeProofUrl && (
                    <div key={i} className="bg-[#050810] p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-300 font-bold uppercase mb-1">Member: {m.name}</p>
                      <p className="text-[10px] text-slate-500 mb-3 font-mono">ID: {m.ieeeMemberId}</p>
                      <img src={m.ieeeProofUrl} alt="Member IEEE" className="w-full h-auto object-contain rounded-xl border border-slate-800" />
                    </div>
                  ))}

                  {/* If no proofs uploaded at all */}
                  {!viewingTeam.teamLeader?.ieeeProofUrl && !viewingTeam.teamMembers?.some(m => m.ieeeProofUrl) && (
                    <div className="col-span-full text-slate-500 text-sm italic">
                      No IEEE membership proofs were uploaded by this squad.
                    </div>
                  )}
                </div>
              </div>

            </div>
            
            {/* Modal Action Footer */}
            <div className="bg-[#090c14] border-t border-slate-800 p-5 shrink-0 flex justify-end flex-wrap gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
              <button 
                onClick={() => handleStatusChange(viewingTeam._id, 'Pending')}
                className="px-6 py-2.5 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/30 rounded-xl text-xs uppercase tracking-widest font-bold transition-all"
              >
                Mark Pending
              </button>

              <button 
                onClick={() => handleStatusChange(viewingTeam._id, 'Rejected')}
                className="px-6 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 rounded-xl text-xs uppercase tracking-widest font-bold transition-all"
              >
                Reject Squad
              </button>
              
              <button 
                onClick={() => handleStatusChange(viewingTeam._id, 'Not Verified')}
                className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 rounded-xl text-xs uppercase tracking-widest font-bold transition-all"
              >
                Unverified
              </button>

              <button 
                onClick={() => handleStatusChange(viewingTeam._id, 'Shortlisted')}
                className="px-6 py-2.5 bg-fuchsia-500/10 hover:bg-fuchsia-500 text-fuchsia-400 hover:text-white border border-fuchsia-500/30 rounded-xl text-xs uppercase tracking-widest font-bold transition-all"
              >
                Shortlist Squad
              </button>

              <button 
                onClick={() => handleStatusChange(viewingTeam._id, 'Verified')}
                className="px-6 py-2.5 bg-emerald-500 text-black border border-emerald-400 rounded-xl text-xs uppercase tracking-widest font-black hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
              >
                Verify & Approve
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}