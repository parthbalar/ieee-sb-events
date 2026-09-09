"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { createPortal } from 'react-dom';
import Link from 'next/link';

export default function RegistrationForm({ eventId, minMembers = 1, maxMembers = 1, technicalTracks = [] }) {
  const router = useRouter(); 

  const [isOpen, setIsOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ type: '', text: '' });
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  const [registrationStatus, setRegistrationStatus] = useState('Pending');
  
  const [selectedTrack, setSelectedTrack] = useState('');
  const [abstract, setAbstract] = useState('');

  const [leaderData, setLeaderData] = useState({
    name: '', email: '', contactNo: '', college: '', 
    department: 'IT', year: '1st Year', enrollmentNo: '', ieeeMemberId: ''
  });

  const [extraMembers, setExtraMembers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [leaderIeeeProofFile, setLeaderIeeeProofFile] = useState(null);

  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [paymentTransactionId, setPaymentTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const [editingMemberType, setEditingMemberType] = useState(null); 
  const [editingMemberIndex, setEditingMemberIndex] = useState(null); 
  const [editFormData, setEditFormData] = useState(null);

  const [expandedView, setExpandedView] = useState(null); 

  const nonIeeeLeaderCount = !leaderData.ieeeMemberId?.trim() ? 1 : 0;
  const nonIeeeMemberCount = extraMembers.filter(member => !member.ieeeMemberId?.trim()).length;
  const totalAmount = (nonIeeeLeaderCount + nonIeeeMemberCount) * 50;
  const requiresPayment = totalAmount > 0;

  const statusConfig = {
    'Pending': { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    'Verified': { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    'Not Verified': { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
    'Shortlisted': { color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    'Rejected': { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' }
  };
  const currentStatusUI = statusConfig[registrationStatus] || statusConfig['Pending'];

  useEffect(() => {
    if (toast.text) {
      const timer = setTimeout(() => setToast({ type: '', text: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.text]);

  useEffect(() => {
    if (isOpen || isManageModalOpen) {
      document.body.style.overflow = 'hidden';
      const style = document.createElement('style');
      style.id = 'modal-hide-nav';
      style.innerHTML = `nav, footer { display: none !important; visibility: hidden !important; }`;
      document.head.appendChild(style);
    } else {
      document.body.style.overflow = '';
      const injectedStyle = document.getElementById('modal-hide-nav');
      if (injectedStyle) injectedStyle.remove();
    }
    return () => {
      document.body.style.overflow = '';
      const injectedStyle = document.getElementById('modal-hide-nav');
      if (injectedStyle) injectedStyle.remove();
    };
  }, [isOpen, isManageModalOpen]);

  const getWordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const handleRegisterClick = () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) router.push('/login');
    else setIsOpen(true);
  };

  useEffect(() => {
    const fetchUserAndCheckRegistration = async () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setIsLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const userEmail = parsedUser.email;

        const profileRes = await fetch(`/api/user/profile?email=${userEmail}`);
        if (profileRes.ok) {
          const dbUser = await profileRes.json();
          setLeaderData(prev => ({
            ...prev,
            name: dbUser.name || '',
            email: dbUser.email || userEmail,
            contactNo: dbUser.contactNo || '',
            college: dbUser.college || '',
            department: dbUser.department || 'IT',
            year: dbUser.year || '1st Year',
            enrollmentNo: dbUser.enrollmentNo || '',
            ieeeMemberId: dbUser.ieeeMemberId || dbUser.memberId || '' 
          }));
        }

        const checkRes = await fetch(`/api/check-registration?eventId=${eventId}&email=${userEmail}`);
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          if (checkData.isRegistered) {
            setIsRegistered(true);
            setRegistrationId(checkData.registrationId);
            
            if (checkData.registrationStatus) setRegistrationStatus(checkData.registrationStatus);

            if (checkData.teamLeader) setLeaderData(checkData.teamLeader);
            if (checkData.teamMembers && Array.isArray(checkData.teamMembers)) setExtraMembers(checkData.teamMembers);
            if (checkData.teamName) setTeamName(checkData.teamName);
            if (checkData.selectedTrack) setSelectedTrack(checkData.selectedTrack);
            if (checkData.abstract) setAbstract(checkData.abstract);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data or check registration:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndCheckRegistration();
  }, [eventId]); 

  const handleLeaderChange = (e) => setLeaderData({ ...leaderData, [e.target.name]: e.target.value });
  const handleExtraMemberChange = (index, field, value) => {
    const updatedMembers = [...extraMembers];
    updatedMembers[index][field] = value;
    setExtraMembers(updatedMembers);
  };
  const addMember = () => {
    if (extraMembers.length + 1 < maxMembers) {
      setExtraMembers([...extraMembers, { name: '', email: '', contactNo: '', department: 'IT', year: '1st Year', enrollmentNo: '', ieeeMemberId: '', ieeeProofFile: null }]);
    }
  };
  const removeMember = (index) => setExtraMembers(extraMembers.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!teamName.trim()) return setToast({ type: 'error', text: 'Team Name is required.' });
    if (extraMembers.length + 1 < minMembers || extraMembers.length + 1 > maxMembers) return setToast({ type: 'error', text: `Team size must be between ${minMembers} and ${maxMembers} members.` });
    if (!selectedTrack) return setToast({ type: 'error', text: 'Please select a technical track from the options above.' });

    const wordCount = getWordCount(abstract);
    if (wordCount < 200 || wordCount > 300) return setToast({ type: 'error', text: `Abstract must be between 200 and 300 words. Current count: ${wordCount}.` });

    if (requiresPayment) {
      if (!showPaymentDetails) return setToast({ type: 'error', text: 'Please click "Pay Now" and complete the payment process.' });
      if (!paymentTransactionId.trim() || !paymentScreenshot) return setToast({ type: 'error', text: 'Payment details (Transaction ID & Screenshot) are required.' });
    }

    setIsSubmitting(true);
    setToast({ type: '', text: '' });

    const formPayload = new FormData();
    formPayload.append('eventId', eventId);
    formPayload.append('teamName', teamName);
    formPayload.append('selectedTrack', selectedTrack);
    formPayload.append('abstract', abstract);
    formPayload.append('teamLeader', JSON.stringify(leaderData));
    
    const membersWithCollege = extraMembers.map(member => {
      const { ieeeProofFile, ...restOfMemberData } = member;
      return { ...restOfMemberData, college: leaderData.college };
    });
    formPayload.append('teamMembers', JSON.stringify(membersWithCollege));

    if (leaderIeeeProofFile) formPayload.append('leaderProof', leaderIeeeProofFile);
    extraMembers.forEach((member, index) => {
      if (member.ieeeProofFile) formPayload.append(`memberProof_${index}`, member.ieeeProofFile);
    });

    if (requiresPayment) {
      formPayload.append('paymentTransactionId', paymentTransactionId);
      formPayload.append('paymentAmount', totalAmount.toString());
      if (paymentScreenshot) formPayload.append('paymentProof', paymentScreenshot);
    }

    try {
      const response = await fetch('/api/register', { method: 'POST', body: formPayload });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');

      setToast({ type: 'success', text: 'Successfully registered and saved to database!' });
      setTimeout(() => {
        setIsOpen(false); 
        setIsRegistered(true); 
        setRegistrationId(data.registrationId);
        setRegistrationStatus('Pending');
      }, 1500);
    } catch (error) {
      setToast({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditMember = (type, index = null) => {
    setEditingMemberType(type);
    setEditingMemberIndex(index);
    if (type === 'leader') setEditFormData({ ...leaderData });
    else setEditFormData({ ...extraMembers[index] });
    setToast({ type: '', text: '' });
  };

  const handleEditFormDataChange = (e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast({ type: '', text: '' });

    try {
      const response = await fetch(`/api/team/${registrationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberType: editingMemberType, 
          memberIndex: editingMemberIndex, 
          data: editFormData
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update member details');

      if (editingMemberType === 'leader') setLeaderData(editFormData);
      else {
        const updatedMembers = [...extraMembers];
        updatedMembers[editingMemberIndex] = editFormData;
        setExtraMembers(updatedMembers);
      }

      setToast({ type: 'success', text: 'Member details updated successfully!' });
      setTimeout(() => { setEditingMemberType(null); }, 1500);

    } catch (error) {
      setToast({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedView(expandedView === id ? null : id);
  };

  const inputClass = "px-5 py-3.5 rounded-xl bg-[#050810] border border-slate-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium w-full";
  const fileInputClass = "px-4 py-2.5 rounded-xl bg-[#050810] border border-dashed border-cyan-500/50 text-white focus:outline-none focus:border-cyan-500 transition-all font-medium w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-black hover:file:bg-cyan-400 cursor-pointer text-sm";
  const labelClass = "text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 ml-1 block";
  const disabledInputClass = `${inputClass} bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed focus:border-slate-800 focus:ring-0`;

  return (
    <div className="border-t border-white/10 pt-12 pb-12 flex justify-center items-start w-full relative">
      
      {/* FLOATING TOAST */}
      <div className={`fixed top-6 right-6 sm:top-10 sm:right-10 z-[9999999] transition-all duration-500 ease-out transform ${ toast.text ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-[120%] opacity-0 scale-95' }`}>
        {toast.text && (
          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border backdrop-blur-xl ${ toast.type === 'success' ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' : 'bg-red-950/40 border-red-500/30 text-red-400' }`}>
            {toast.type === 'success' ? (
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ) : (
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            )}
            <p className="text-sm font-bold tracking-wide">{toast.text}</p>
            <button onClick={() => setToast({ type: '', text: '' })} className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="py-10 flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span className="text-zinc-400 text-sm font-semibold tracking-widest uppercase">Checking Systems...</span>
        </div>
      
      ) : isRegistered ? (
        <div className="flex flex-col items-center justify-center py-12 px-8 text-center space-y-6 w-full max-w-2xl bg-gradient-to-b from-cyan-950/20 to-[#050810] border border-cyan-500/20 rounded-[2rem] backdrop-blur-md shadow-2xl">
          <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-2 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h4 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Registration Confirmed</h4>
          
          <p className="text-zinc-400 max-w-md text-base leading-relaxed">
            The profile <span className="text-cyan-400 font-semibold">{leaderData.email}</span> is actively registered and locked in as Team Leader.
          </p>

          <div className={`mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${currentStatusUI.bg} ${currentStatusUI.border} ${currentStatusUI.color} shadow-lg`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={currentStatusUI.icon} />
            </svg>
            <span className="text-sm font-black tracking-widest uppercase">Status: {registrationStatus}</span>
          </div>
          
          <button 
            onClick={() => setIsManageModalOpen(true)}
            className="mt-6 px-10 py-4 bg-cyan-600 text-black rounded-xl font-bold text-base hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:-translate-y-1 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            {registrationStatus === 'Pending' ? 'Manage Team Details' : 'View Team Details'}
          </button>
        </div>

      ) : (
        <button 
          onClick={handleRegisterClick}
          className="h-fit px-12 py-5 bg-cyan-600 text-black rounded-xl font-black text-xl hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transform hover:-translate-y-1 uppercase tracking-wider"
        >
          Secure Your Spot Now
        </button>
      )}

      {/* =================================================================== */}
      {/* 1. REGISTRATION MODAL PORTAL */}
      {/* =================================================================== */}
      {isOpen && !isRegistered && typeof document !== 'undefined'
        ? createPortal(
            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity">
              <div className="bg-[#090c14] border border-cyan-900/40 rounded-[2rem] w-full max-w-6xl h-[95vh] sm:h-[90vh] shadow-[0_0_80px_rgba(8,145,178,0.15)] flex flex-col overflow-hidden relative">
                
                <div className="bg-[#090c14] border-b border-slate-800 p-5 sm:px-8 flex justify-between items-center shrink-0 z-20 shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 items-center justify-center text-cyan-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">Event Registration</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">Required Team Members: {minMembers}-{maxMembers} Members</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-3 bg-slate-800/50 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all transform hover:rotate-90">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 bg-[#090c14]">
                  <form onSubmit={handleSubmit} className="flex flex-col h-full">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
                      
                      <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-gradient-to-br from-cyan-950/20 to-transparent border border-cyan-500/20 rounded-3xl p-6 flex flex-col h-full shadow-lg">
                          
                          <div className="mb-6 border-b border-cyan-900/30 pb-4">
                            <h4 className="text-lg font-bold text-cyan-400 flex items-center gap-2 mb-3">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                              Mission Specs
                            </h4>
                            <span className="inline-flex items-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-slate-800/80 text-slate-300 border border-slate-700">
                              IT Department
                            </span>
                          </div>

                          <div className="flex flex-col mb-6">
                            <label className={labelClass}>Team Name</label>
                            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} required placeholder="Enter your team name..." className={inputClass} />
                          </div>

                          <div className="flex flex-col mb-6">
                            <label className={labelClass}>Select Technical Track</label>
                            <div className="flex flex-col gap-2 mt-2">
                              {technicalTracks.map((track) => (
                                <button
                                  key={track.track_id}
                                  type="button"
                                  onClick={() => setSelectedTrack(track.title)}
                                  className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    selectedTrack === track.title
                                      ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)] translate-x-2'
                                      : 'bg-[#050810] text-zinc-400 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300'
                                  }`}
                                >
                                  {track.title}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col flex-1">
                            <label className={`${labelClass} flex justify-between`}>
                              <span>Project Abstract</span>
                              <span className={getWordCount(abstract) < 200 || getWordCount(abstract) > 300 ? 'text-red-400' : 'text-cyan-400'}>
                                {getWordCount(abstract)}/300
                              </span>
                            </label>
                            <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} required placeholder="Describe your project concept (200-300 words)..." className={`${inputClass} resize-none leading-relaxed mt-2 flex-1 min-h-[150px] lg:min-h-[200px]`} />
                          </div>

                        </div>
                      </div>

                      <div className="lg:col-span-8 flex flex-col gap-6">
                        
                        <div className="bg-slate-900/20 border border-slate-800 rounded-3xl p-6 shadow-md">
                          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-800/80">
                            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-sm border border-cyan-500/30">L</span>
                            <h4 className="text-lg font-bold text-white tracking-wide">Leader Profile (You)</h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col"><label className={labelClass}>Full Name</label><input type="text" name="name" value={leaderData.name} onChange={handleLeaderChange} required className={inputClass} /></div>
                            <div className="flex flex-col"><label className={labelClass}>Email Address</label><input type="email" name="email" value={leaderData.email} onChange={handleLeaderChange} required className={inputClass} /></div>
                            <div className="flex flex-col"><label className={labelClass}>Contact No</label><input type="tel" name="contactNo" value={leaderData.contactNo} onChange={handleLeaderChange} required className={inputClass} /></div>
                            <div className="flex flex-col"><label className={labelClass}>Enrollment No</label><input type="text" name="enrollmentNo" value={leaderData.enrollmentNo} onChange={handleLeaderChange} required className={inputClass} /></div>
                            
                            <div className="flex flex-col sm:col-span-2"><label className={labelClass}>College Name <span className="text-cyan-500 lowercase normal-case tracking-normal font-medium">(Applies to entire team)</span></label><input type="text" name="college" value={leaderData.college} onChange={handleLeaderChange} required className={`${inputClass} bg-cyan-950/10 border-cyan-500/30 focus:border-cyan-400`} placeholder="e.g., R.N.G. Patel Institute of Technology" /></div>
                            
                            <div className="flex flex-col"><label className={labelClass}>Department</label><input type="text" name="department" value={leaderData.department} onChange={handleLeaderChange} required className={inputClass} /></div>
                            <div className="flex flex-col"><label className={labelClass}>Year of Study</label>
                              <select name="year" value={leaderData.year} onChange={handleLeaderChange} className={`${inputClass} appearance-none cursor-pointer`}>
                                <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>PG/Scholar</option>
                              </select>
                            </div>
                            <div className="flex flex-col sm:col-span-2"><label className={labelClass}>IEEE Member ID <span className="text-zinc-500 lowercase normal-case tracking-normal font-medium">(Optional)</span></label><input type="text" name="ieeeMemberId" value={leaderData.ieeeMemberId} onChange={handleLeaderChange} className={inputClass} placeholder="Leave blank if not applicable" /></div>

                            {leaderData.ieeeMemberId && leaderData.ieeeMemberId.trim() !== '' && (
                              <div className="flex flex-col sm:col-span-2 mt-2 animate-fade-in">
                                <label className={labelClass}>IEEE Membership Proof <span className="text-cyan-500 lowercase normal-case tracking-normal font-medium">(Required since ID is provided)</span></label>
                                <input type="file" accept="image/*" onChange={(e) => setLeaderIeeeProofFile(e.target.files[0])} className={fileInputClass} required />
                              </div>
                            )}
                          </div>
                        </div>

                        {extraMembers.map((member, index) => (
                          <div key={index} className="bg-[#050810]/50 border border-slate-800 rounded-3xl p-6 relative group hover:border-slate-700 transition-colors shadow-sm">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                              <div className="flex items-center gap-4">
                                <span className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-black text-sm border border-slate-700">{index + 2}</span>
                                <h4 className="text-lg font-bold text-white tracking-wide">Team Member {index + 2}</h4>
                              </div>
                              <button type="button" onClick={() => removeMember(index)} className="text-xs font-bold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 px-4 py-2 rounded-lg transition-colors border border-red-500/20 hover:border-red-500">
                                Remove
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div className="flex flex-col"><label className={labelClass}>Full Name</label><input type="text" value={member.name} onChange={(e) => handleExtraMemberChange(index, 'name', e.target.value)} required className={inputClass} /></div>
                              <div className="flex flex-col"><label className={labelClass}>Email</label><input type="email" value={member.email} onChange={(e) => handleExtraMemberChange(index, 'email', e.target.value)} required className={inputClass} /></div>
                              <div className="flex flex-col"><label className={labelClass}>Contact No</label><input type="tel" value={member.contactNo} onChange={(e) => handleExtraMemberChange(index, 'contactNo', e.target.value)} required className={inputClass} /></div>
                              <div className="flex flex-col"><label className={labelClass}>Enrollment No</label><input type="text" value={member.enrollmentNo} onChange={(e) => handleExtraMemberChange(index, 'enrollmentNo', e.target.value)} required className={inputClass} /></div>
                              
                              <div className="flex flex-col sm:col-span-2"><label className={labelClass}>College Name <span className="text-zinc-500 lowercase normal-case tracking-normal font-medium">(Locked to Leader)</span></label><input type="text" value={leaderData.college || 'Pending...'} disabled className={`${inputClass} bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed`} /></div>

                              <div className="flex flex-col"><label className={labelClass}>Department</label><input type="text" value={member.department} onChange={(e) => handleExtraMemberChange(index, 'department', e.target.value)} required className={inputClass} /></div>
                              <div className="flex flex-col"><label className={labelClass}>Year of Study</label>
                                <select value={member.year} onChange={(e) => handleExtraMemberChange(index, 'year', e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
                                  <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>PG/Scholar</option>
                                </select>
                              </div>
                              <div className="flex flex-col sm:col-span-2"><label className={labelClass}>IEEE Member ID <span className="text-zinc-500 lowercase normal-case tracking-normal font-medium">(Optional)</span></label><input type="text" value={member.ieeeMemberId} onChange={(e) => handleExtraMemberChange(index, 'ieeeMemberId', e.target.value)} className={inputClass} placeholder="Leave blank if not applicable" /></div>
                              
                              {member.ieeeMemberId && member.ieeeMemberId.trim() !== '' && (
                                <div className="flex flex-col sm:col-span-2 mt-2 animate-fade-in">
                                  <label className={labelClass}>IEEE Membership Proof <span className="text-cyan-500 lowercase normal-case tracking-normal font-medium">(Required since ID is provided)</span></label>
                                  <input type="file" accept="image/*" onChange={(e) => handleExtraMemberChange(index, 'ieeeProofFile', e.target.files[0])} className={fileInputClass} required />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                        {extraMembers.length + 1 < maxMembers && (
                          <button 
                            type="button" 
                            onClick={addMember}
                            className="w-full py-5 border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/70 text-cyan-500/80 hover:text-cyan-300 bg-cyan-900/10 hover:bg-cyan-900/20 rounded-3xl flex items-center justify-center gap-3 transition-all duration-300 font-bold tracking-wide"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                            Add Team Member ({extraMembers.length + 1}/{maxMembers})
                          </button>
                        )}

                        {requiresPayment && (
                          <div className="bg-slate-900/20 border border-emerald-500/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(16,185,129,0.05)] mt-4 transition-all duration-500">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                              <div className="flex items-center gap-4">
                                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm border border-emerald-500/30">₹</span>
                                <h4 className="text-lg font-bold text-white tracking-wide">Payment Processing</h4>
                              </div>
                              <span className="text-emerald-400 font-black text-xl">₹{totalAmount}</span>
                            </div>
                            
                            {!showPaymentDetails ? (
                              <div className="flex flex-col items-center justify-center py-4">
                                <p className="text-sm text-slate-400 mb-5 text-center">Your team includes non-IEEE members. A registration fee of ₹50 per non-IEEE member is required.</p>
                                <button 
                                  type="button" 
                                  onClick={() => setShowPaymentDetails(true)}
                                  className="px-8 py-3.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                >
                                  Pay ₹{totalAmount} Now
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col animate-fade-in">
                                <div className="bg-black/30 rounded-2xl p-5 mb-6 border border-emerald-500/20 flex flex-col sm:flex-row items-center gap-6">
                                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center p-2 shrink-0 shadow-lg">
                                    <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3zM5 5v4h4V5zM13 3h8v8h-8zM15 5v4h4V5zM3 13h8v8H3zM5 15v4h4v-4zM18 13h3v3h-3zM13 13h3v3h-3zM13 18h3v3h-3zM15 15h3v3h-3zM18 18h3v3h-3z" /></svg>
                                  </div>
                                  <div className="flex-1 text-center sm:text-left">
                                    <p className="text-slate-300 text-sm mb-1 font-medium">Scan QR or Pay via UPI ID</p>
                                    {/* <p className="text-emerald-400 font-mono font-bold text-xl mb-3 tracking-widest bg-emerald-900/20 inline-block px-3 py-1 rounded border border-emerald-500/20">ieee.rngpit@ybl</p> */}
                                    <p className="text-xs text-cyan-400 font-mono leading-relaxed">* After completing the payment of ₹{totalAmount}, please enter the transaction ID and upload the screenshot below to verify your registration.</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                  <div className="flex flex-col">
                                    <label className={labelClass}>Transaction / Reference ID</label>
                                    <input type="text" value={paymentTransactionId} onChange={(e) => setPaymentTransactionId(e.target.value)} required className={inputClass} placeholder="e.g., 123456789012" />
                                  </div>
                                  <div className="flex flex-col">
                                    <label className={labelClass}>Upload Payment Screenshot</label>
                                    <input type="file" accept="image/*" onChange={(e) => setPaymentScreenshot(e.target.files[0])} className={fileInputClass} required />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                      
                      <div className="col-span-1 lg:col-span-12 mt-4 pt-6 border-t border-slate-800">
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full py-5 bg-cyan-600 text-black rounded-xl font-black text-xl hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none flex justify-center items-center transform hover:-translate-y-1 uppercase tracking-widest"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-3">
                              <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Submitting...
                            </span>
                          ) : 'Confirm & Submit Registration'}
                        </button>
                      </div>

                    </div>
                  </form>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}


      {/* =================================================================== */}
      {/* 2. MANAGE TEAM ROSTER MODAL PORTAL */}
      {/* =================================================================== */}
      {isManageModalOpen && typeof document !== 'undefined'
        ? createPortal(
            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity">
              <div className="bg-[#090c14] border border-cyan-900/40 rounded-[2rem] w-full max-w-4xl max-h-[90vh] shadow-[0_0_80px_rgba(8,145,178,0.15)] flex flex-col overflow-hidden relative">
                
                {/* Header */}
                <div className="bg-[#090c14] border-b border-slate-800 p-5 sm:px-8 flex justify-between items-center shrink-0 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">
                      {registrationStatus === 'Pending' ? 'Manage Team Details' : 'View Team Details'}
                    </h3>
                  </div>
                  <button 
                    onClick={() => { setIsManageModalOpen(false); setEditingMemberType(null); setExpandedView(null); }} 
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 bg-[#090c14]">
                  
                  {!editingMemberType ? (
                    // LIST VIEW (WITH EXPANDABLE DETAILS)
                    <div className="space-y-4">
                      
                      {/* --- LEADER CARD --- */}
                      <div className="bg-slate-900/40 border border-cyan-500/20 rounded-2xl transition-all duration-300 overflow-hidden">
                        <div 
                          className="flex justify-between items-center p-5 cursor-pointer hover:bg-slate-800/40"
                          onClick={() => toggleExpand('leader')}
                        >
                          <div>
                            <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-1">Team Leader</p>
                            <p className="text-white font-bold text-lg">{leaderData.name}</p>
                            <p className="text-slate-400 text-sm mt-0.5">{leaderData.email}</p>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {registrationStatus === 'Pending' && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); openEditMember('leader', null); }} 
                                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors border border-slate-700"
                              >
                                Edit
                              </button>
                            )}
                            <svg className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${expandedView === 'leader' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>

                        {/* EXPANDED LEADER DETAILS */}
                        {expandedView === 'leader' && (
                          <div className="px-5 pb-6 border-t border-slate-800/50 pt-5 bg-black/20 grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4 animate-fade-in">
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Contact No</p><p className="text-slate-300 text-sm font-medium">{leaderData.contactNo}</p></div>
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Enrollment</p><p className="text-slate-300 text-sm font-medium">{leaderData.enrollmentNo}</p></div>
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Year</p><p className="text-slate-300 text-sm font-medium">{leaderData.year}</p></div>
                            <div className="col-span-2 sm:col-span-1"><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Department</p><p className="text-slate-300 text-sm font-medium">{leaderData.department}</p></div>
                            <div className="col-span-2"><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">College</p><p className="text-slate-300 text-sm font-medium truncate" title={leaderData.college}>{leaderData.college}</p></div>
                            <div className="col-span-2 sm:col-span-3 pt-3 border-t border-slate-800/50">
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">IEEE Member ID</p>
                              <p className={`text-sm font-bold ${leaderData.ieeeMemberId ? 'text-cyan-400' : 'text-slate-500'}`}>{leaderData.ieeeMemberId || 'Not Provided'}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* --- MEMBERS CARDS --- */}
                      {extraMembers.map((member, idx) => (
                        <div key={idx} className="bg-slate-900/20 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors overflow-hidden">
                          <div 
                            className="flex justify-between items-center p-5 cursor-pointer hover:bg-slate-800/30"
                            onClick={() => toggleExpand(idx)}
                          >
                            <div>
                              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Team Member {idx + 2}</p>
                              <p className="text-white font-bold text-lg">{member.name}</p>
                              <p className="text-slate-400 text-sm mt-0.5">{member.email}</p>
                            </div>

                            <div className="flex items-center gap-4">
                              {registrationStatus === 'Pending' && (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); openEditMember('member', idx); }} 
                                  className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors border border-slate-700"
                                >
                                  Edit
                                </button>
                              )}
                              <svg className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${expandedView === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </div>

                          {/* EXPANDED MEMBER DETAILS */}
                          {expandedView === idx && (
                            <div className="px-5 pb-6 border-t border-slate-800/50 pt-5 bg-black/20 grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4 animate-fade-in">
                              <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Contact No</p><p className="text-slate-300 text-sm font-medium">{member.contactNo}</p></div>
                              <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Enrollment</p><p className="text-slate-300 text-sm font-medium">{member.enrollmentNo}</p></div>
                              <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Year</p><p className="text-slate-300 text-sm font-medium">{member.year}</p></div>
                              <div className="col-span-2 sm:col-span-1"><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Department</p><p className="text-slate-300 text-sm font-medium">{member.department}</p></div>
                              <div className="col-span-2"><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">College</p><p className="text-slate-300 text-sm font-medium truncate" title={leaderData.college}>{leaderData.college || 'Inherited from Leader'}</p></div>
                              <div className="col-span-2 sm:col-span-3 pt-3 border-t border-slate-800/50">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">IEEE Member ID</p>
                                <p className={`text-sm font-bold ${member.ieeeMemberId ? 'text-cyan-400' : 'text-slate-500'}`}>{member.ieeeMemberId || 'Not Provided'}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    // EDIT FORM VIEW
                    <form onSubmit={handleEditSubmit} className="space-y-6 animate-fade-in">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-cyan-400">
                          Editing {editingMemberType === 'leader' ? 'Leader Profile' : `Member ${editingMemberIndex + 2} Profile`}
                        </h4>
                        <button type="button" onClick={() => setEditingMemberType(null)} className="text-xs text-slate-400 hover:text-white uppercase tracking-widest font-bold border border-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-800">
                          Go Back
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col">
                          <label className={labelClass}>Full Name</label>
                          <input type="text" name="name" value={editFormData.name} onChange={handleEditFormDataChange} required className={inputClass} />
                        </div>
                        
                        {/* DISABLED EMAIL */}
                        <div className="flex flex-col">
                          <label className={labelClass}>
                            Email Address <span className="text-zinc-500 lowercase normal-case tracking-normal font-medium">(Locked)</span>
                          </label>
                          <input type="email" name="email" value={editFormData.email} disabled className={disabledInputClass} />
                        </div>
                        
                        <div className="flex flex-col">
                          <label className={labelClass}>Contact No</label>
                          <input type="tel" name="contactNo" value={editFormData.contactNo} onChange={handleEditFormDataChange} required className={inputClass} />
                        </div>
                        <div className="flex flex-col">
                          <label className={labelClass}>Enrollment No</label>
                          <input type="text" name="enrollmentNo" value={editFormData.enrollmentNo} onChange={handleEditFormDataChange} required className={inputClass} />
                        </div>
                        
                        {/* DISABLED COLLEGE (Only applies to leader in edit mode since members inherit it) */}
                        {editingMemberType === 'leader' && (
                          <div className="flex flex-col sm:col-span-2">
                            <label className={labelClass}>
                              College Name <span className="text-zinc-500 lowercase normal-case tracking-normal font-medium">(Locked)</span>
                            </label>
                            <input type="text" name="college" value={editFormData.college} disabled className={disabledInputClass} />
                          </div>
                        )}
                        
                        <div className="flex flex-col">
                          <label className={labelClass}>Department</label>
                          <input type="text" name="department" value={editFormData.department} onChange={handleEditFormDataChange} required className={inputClass} />
                        </div>
                        <div className="flex flex-col">
                          <label className={labelClass}>Year of Study</label>
                          <select name="year" value={editFormData.year} onChange={handleEditFormDataChange} className={`${inputClass} appearance-none cursor-pointer`}>
                            <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>PG/Scholar</option>
                          </select>
                        </div>

                        {/* DISABLED IEEE MEMBER ID */}
                        <div className="flex flex-col sm:col-span-2">
                          <label className={labelClass}>
                            IEEE Member ID <span className="text-zinc-500 lowercase normal-case tracking-normal font-medium">(Locked)</span>
                          </label>
                          <input type="text" name="ieeeMemberId" value={editFormData.ieeeMemberId || 'N/A'} disabled className={disabledInputClass} />
                        </div>

                      </div>

                      <div className="pt-6 border-t border-slate-800 flex justify-end gap-4 mt-6">
                        <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-cyan-600 text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50">
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}

    </div>
  );
}