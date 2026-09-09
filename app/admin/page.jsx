"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as xlsx from 'xlsx';

export default function AdminDashboard() {
  // ---> NEW: Added 'events' back to state to populate the dropdown
  const [data, setData] = useState({ users: [], registrations: [], events: [] });
  const [activeTab, setActiveTab] = useState('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Event Filter State
  const [selectedEvent, setSelectedEvent] = useState('All');
  
  const router = useRouter();

  // 1. Verify Admin Role
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'admin') {
      router.push('/'); 
      return;
    }

    setIsAuthorized(true);
  }, [router]);

  // 2. Fetch Consolidated Data
  useEffect(() => {
    if (!isAuthorized) return;

    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard/data');
        const result = await response.json();
        
        if (result.success) {
          setData({
            users: result.users || [],
            registrations: result.registrations || [],
            events: result.events || [] // <--- Fetching actual events from DB
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthorized]);

  const { users, registrations, events } = data;

  // --- DYNAMIC FILTERING LOGIC ---
  
  // Helper to safely get the event title from a registration
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

  // Filter registrations based on selected event
  const filteredRegistrations = selectedEvent === 'All' 
    ? registrations 
    : registrations.filter(r => getRegEventTitle(r) === selectedEvent);

  // Calculate Sub-Lists based on the Filtered Data
  const pendingRegistrations = filteredRegistrations.filter(r => r.registrationStatus === 'Pending' || !r.registrationStatus);
  const financialRecords = filteredRegistrations.filter(r => r.paymentAmount > 0);

  // Calculate Quick Stats for the Selected Event
  const totalTeams = filteredRegistrations.length;
  const totalPayments = filteredRegistrations.reduce((sum, reg) => sum + (Number(reg.paymentAmount) || 0), 0);
  const totalStudents = filteredRegistrations.reduce((sum, reg) => {
    const membersCount = reg.teamMembers && Array.isArray(reg.teamMembers) ? reg.teamMembers.length : 0;
    return sum + 1 + membersCount; // 1 Leader + X Members
  }, 0);

  // 3. Export to Excel Logic (Respects the filter)
  const handleExport = () => {
    const workbook = xlsx.utils.book_new();

    // Format Registrations Data
    const formattedRegistrations = filteredRegistrations.map(reg => ({
      'Team Name': reg.teamName || reg.fullName,
      'Event Name': getRegEventTitle(reg),
      'Leader Name': reg.teamLeader?.name || 'N/A',
      'Team Size': (reg.teamMembers?.length || 0) + 1,
      'Status': reg.registrationStatus || 'Pending',
      'Payment Amount': reg.paymentAmount || 0,
      'Registration Date': new Date(reg.createdAt).toLocaleDateString()
    }));
    const registrationsSheet = xlsx.utils.json_to_sheet(formattedRegistrations);

    // Format Financials Data
    const formattedFinancials = financialRecords.map(reg => ({
      'Team Name': reg.teamName || reg.fullName,
      'Transaction ID': reg.paymentTransactionId || 'N/A',
      'Amount': `₹${reg.paymentAmount}`,
      'Verification Status': reg.registrationStatus || 'Pending',
      'Date Submitted': new Date(reg.createdAt).toLocaleDateString()
    }));
    const financialsSheet = xlsx.utils.json_to_sheet(formattedFinancials);

    // Format Users Data (Always exports all users)
    const formattedUsers = users.map(user => ({
      Name: user.name,
      Department: user.department,
      Email: user.email,
      'IEEE ID': user.memberId || 'N/A',
      Role: user.role ? user.role.toUpperCase() : 'STUDENT',
      'Join Date': new Date(user.createdAt).toLocaleDateString()
    }));
    const usersSheet = xlsx.utils.json_to_sheet(formattedUsers);

    // Append sheets to the workbook
    xlsx.utils.book_append_sheet(workbook, registrationsSheet, "Event Registrations");
    xlsx.utils.book_append_sheet(workbook, financialsSheet, "Financial Records");
    if (selectedEvent === 'All') {
      xlsx.utils.book_append_sheet(workbook, usersSheet, "All Branch Members");
    }

    // Trigger download with dynamic name
    const fileName = `RNGPIT_${selectedEvent === 'All' ? 'All_Events' : selectedEvent.replace(/[^a-zA-Z0-9]/g, '_')}_Data.xlsx`;
    xlsx.writeFile(workbook, fileName);
  };

  if (!isAuthorized || isLoading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b14] font-sans relative overflow-hidden selection:bg-cyan-500/30 pt-24 pb-12 px-4 sm:px-6">
      
      {/* Background Ambient Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header & Action Buttons */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-slate-400 font-medium">Manage verifications, track financials, and review event data.</p>
            
            {/* UPDATED: Master Event Filter from Database */}
            <div className="mt-6 flex items-center bg-[#0a0f1c] border border-cyan-900/50 rounded-xl px-4 py-2 w-fit shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest mr-3">Filter Dashboard By:</span>
              <select 
                value={selectedEvent} 
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="bg-transparent text-white font-black text-sm outline-none border-none cursor-pointer appearance-none min-w-[200px]"
              >
                {uniqueEvents.map((evt, idx) => (
                  <option key={idx} value={evt} className="bg-slate-900 text-white">{evt}</option>
                ))}
              </select>
              <svg className="w-4 h-4 text-cyan-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link 
              href="/admin/manage-teams"
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-black rounded-xl transition-all duration-300 shadow-lg shadow-cyan-900/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Manage Teams
            </Link>

            <button 
              onClick={handleExport}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export {selectedEvent === 'All' ? 'All' : 'Event'} Data
            </button>
          </div>
        </div>

        {/* --- DYNAMIC Quick Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><svg className="w-16 h-16 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg></div>
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Teams Registered</h3>
            <p className="text-4xl font-black text-white">{totalTeams}</p>
          </div>
          <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path></svg></div>
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Total Students</h3>
            <p className="text-4xl font-black text-blue-400">{totalStudents}</p>
          </div>
          <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><svg className="w-16 h-16 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Fees Received</h3>
            <p className="text-4xl font-black text-emerald-400">₹{totalPayments.toLocaleString()}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 bg-[#131c31] p-1.5 rounded-2xl border border-slate-800 w-fit shadow-md">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'pending' ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/20' : 'text-amber-400/70 hover:text-amber-400 hover:bg-amber-950/30'}`}
          >
            Action Required
            {pendingRegistrations.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">{pendingRegistrations.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'registrations' ? 'bg-cyan-600 text-black shadow-lg shadow-cyan-900/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Team Registrations
          </button>
          <button
            onClick={() => setActiveTab('financials')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'financials' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-emerald-400/70 hover:text-emerald-400 hover:bg-emerald-950/30'}`}
          >
            Financial Records
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            All Branch Members
          </button>
        </div>

        {/* Data Tables Container */}
        <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* === ACTION REQUIRED (PENDING) TAB === */}
              {activeTab === 'pending' && (
                <>
                  <thead>
                    <tr className="bg-amber-900/20 border-b border-slate-700/80">
                      <th className="px-6 py-4 text-xs font-bold text-amber-500 uppercase tracking-wider">Team Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-amber-500 uppercase tracking-wider">Event Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-amber-500 uppercase tracking-wider">Date Submitted</th>
                      <th className="px-6 py-4 text-xs font-bold text-amber-500 uppercase tracking-wider text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {pendingRegistrations.map((reg) => (
                      <tr key={reg._id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-200">{reg.teamName || reg.fullName}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">{getRegEventTitle(reg)}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">{new Date(reg.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <Link href="/admin/manage-teams" className="text-xs font-bold px-4 py-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500 hover:text-black transition-colors">
                            Review Now &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {/* === FINANCIAL RECORDS TAB === */}
              {activeTab === 'financials' && (
                <>
                  <thead>
                    <tr className="bg-emerald-900/20 border-b border-slate-700/80">
                      <th className="px-6 py-4 text-xs font-bold text-emerald-500 uppercase tracking-wider">Team Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-emerald-500 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-emerald-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-xs font-bold text-emerald-500 uppercase tracking-wider">Verification Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {financialRecords.map((reg) => (
                      <tr key={reg._id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-200">{reg.teamName || reg.fullName}</td>
                        <td className="px-6 py-4 text-sm text-slate-400 font-mono tracking-wider">{reg.paymentTransactionId || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm font-bold text-emerald-400 bg-emerald-500/5">₹{reg.paymentAmount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            reg.registrationStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            reg.registrationStatus === 'Shortlisted' ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30' :
                            reg.registrationStatus === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                            reg.registrationStatus === 'Not Verified' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                            'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}>
                            {reg.registrationStatus || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {/* === ALL REGISTRATIONS TAB === */}
              {activeTab === 'registrations' && (
                <>
                  <thead>
                    <tr className="bg-slate-800/40 border-b border-slate-700/80">
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider">Team Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider">Registered Event</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider">Team Size</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredRegistrations.map((reg) => (
                      <tr key={reg._id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-200">
                          {reg.teamName || reg.fullName}
                          <div className="text-xs text-slate-500 font-normal mt-0.5">Leader: {reg.teamLeader?.name || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">
                          {getRegEventTitle(reg)}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">
                          {(reg.teamMembers?.length || 0) + 1} Members
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            reg.registrationStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            reg.registrationStatus === 'Shortlisted' ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30' :
                            reg.registrationStatus === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                            reg.registrationStatus === 'Not Verified' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                            'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}>
                            {reg.registrationStatus || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {/* === USERS DIRECTORY TAB === */}
              {activeTab === 'users' && (
                <>
                  <thead>
                    <tr className="bg-slate-800/40 border-b border-slate-700/80">
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider">Member Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider">IEEE ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold text-xs border border-blue-500/20">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-slate-200">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">{user.department}</td>
                        <td className="px-6 py-4">
                          {user.memberId ? (
                            <span className="text-blue-400 text-sm font-medium">{user.memberId}</span>
                          ) : (
                            <span className="text-slate-600 text-sm">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {user.role === 'admin' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">Admin</span>
                          ) : (
                            <span className="text-slate-500 text-sm capitalize">{user.role}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

            </table>

            {/* Empty State Fallbacks */}
            {activeTab === 'pending' && pendingRegistrations.length === 0 && <div className="p-12 text-center text-emerald-500 font-bold">You're all caught up! No pending verifications for this event.</div>}
            {activeTab === 'financials' && financialRecords.length === 0 && <div className="p-12 text-center text-slate-500">No payment records found for this event.</div>}
            {activeTab === 'users' && users.length === 0 && <div className="p-12 text-center text-slate-500">No branch members found.</div>}
            {activeTab === 'registrations' && filteredRegistrations.length === 0 && <div className="p-12 text-center text-slate-500">No registrations found for this event.</div>}
            
          </div>
        </div>

      </div>
    </main>
  );
}