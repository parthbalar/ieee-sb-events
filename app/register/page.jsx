"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMember, setIsMember] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // AUTO-DISMISS ERROR TOAST AFTER 4 SECONDS
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const department = formData.get('department');

    if (department === 'SD') {
      setError('Please select a valid department from the list.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setIsLoading(false);
      return;
    }

    // Creating payload with contactNo matching the backend and database
    const payload = {
      name: formData.get('name'),
      contactNo: formData.get('phoneNumber'), 
      college: formData.get('college'),
      department: department,
      email: formData.get('email'),
      password: password,
      memberId: isMember ? formData.get('memberId') : '',
    };
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      setSuccess('Account created successfully! Redirecting to login...');
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070b14] flex flex-col justify-center items-center font-sans relative overflow-hidden selection:bg-blue-500/30">
      
      {/* ======================================================== */}
      {/* CUSTOM FLOATING TOAST NOTIFICATION                       */}
      {/* ======================================================== */}
      <div 
        className={`fixed top-6 right-6 sm:top-10 sm:right-10 z-[9999] transition-all duration-500 ease-out transform ${
          error || success ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-[120%] opacity-0 scale-95'
        }`}
      >
        {(error || success) && (
          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border backdrop-blur-xl ${
            success 
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' 
              : 'bg-red-950/40 border-red-500/30 text-red-400'
          }`}>
            {success ? (
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <p className="text-sm font-bold tracking-wide">{success || error}</p>
            
            {/* Manual Dismiss Button */}
            <button onClick={() => { setError(''); setSuccess(''); }} className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
      </div>
      {/* ======================================================== */}

      <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-900/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-900/10 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      <div className="relative z-10 w-full max-w-xl px-4 sm:px-6 py-12 my-8">
        <div 
          className={`bg-[#0a0f1c]/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-800 shadow-2xl shadow-black/50 transition-all duration-1000 ease-out transform w-full ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#131c31] border border-slate-700 mb-5 sm:mb-6 shadow-sm">
               <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#5eead4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">Create Account</h1>
            <p className="text-sm text-slate-400 font-medium">Join the RNGPIT Student Branch</p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4 sm:gap-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className={`flex flex-col gap-2 transition-all duration-700 delay-100 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <label htmlFor="name" className="text-sm font-bold text-slate-300 ml-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  placeholder="Example"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium text-sm sm:text-base"
                />
              </div>

              <div className={`flex flex-col gap-2 transition-all duration-700 delay-150 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <label htmlFor="phoneNumber" className="text-sm font-bold text-slate-300 ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  required
                  placeholder="+91 9876543210"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className={`flex flex-col gap-2 transition-all duration-700 delay-200 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <label htmlFor="college" className="text-sm font-bold text-slate-300 ml-1">College Name</label>
                <input 
                  type="text" 
                  id="college" 
                  name="college" 
                  required
                  placeholder="RNGPIT"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium text-sm sm:text-base"
                />
              </div>

              <div className={`flex flex-col gap-2 transition-all duration-700 delay-250 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <label htmlFor="department" className="text-sm font-bold text-slate-300 ml-1">Department</label>
                <select 
                  id="department" 
                  name="department"
                  required
                  defaultValue="SD"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#131c31] border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium appearance-none text-sm sm:text-base"
                >
                  <option value="SD">- Select Department -</option>
                  <option value="IT">Information Technology</option>
                  <option value="CE">Computer Engineering</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CIVIL">Civil Engineering</option>
                </select>
              </div>
            </div>

            <div className={`flex flex-col gap-2 transition-all duration-700 delay-300 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <label htmlFor="email" className="text-sm font-bold text-slate-300 ml-1">Email ID</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                placeholder="student@rngpit.ac.in"
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium text-sm sm:text-base"
              />
              <div className="flex items-start gap-2 mt-1 ml-1 px-1">
                <svg className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-[#3b82f6]">Note:</strong> Please use an active, working email address. All important event updates, certificates, and notifications will be sent here.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-1">
              <div className={`flex flex-col gap-2 transition-all duration-700 delay-350 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <label htmlFor="password" className="text-sm font-bold text-slate-300 ml-1">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium text-sm sm:text-base"
                />
              </div>

              <div className={`flex flex-col gap-2 transition-all duration-700 delay-400 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <label htmlFor="confirmPassword" className="text-sm font-bold text-slate-300 ml-1">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  required
                  placeholder="••••••••"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium text-sm sm:text-base"
                />
              </div>
            </div>

            <div className={`flex flex-col gap-4 mt-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-700/50 bg-[#070b14]/50 transition-all duration-700 delay-500 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-3">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    id="isMember" 
                    checked={isMember}
                    onChange={(e) => setIsMember(e.target.checked)}
                    className="peer w-5 h-5 rounded border-slate-600 text-[#3b82f6] focus:ring-[#3b82f6] focus:ring-offset-[#0a0f1c] bg-[#131c31] cursor-pointer appearance-none checked:bg-[#3b82f6] checked:border-[#3b82f6] transition-colors"
                  />
                  <svg className="absolute w-3.5 h-3.5 pointer-events-none text-white left-[3px] top-[3px] opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <label htmlFor="isMember" className="text-sm font-bold text-slate-300 cursor-pointer select-none">
                  I am already an IEEE Member
                </label>
              </div>
              
              <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${isMember ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <label htmlFor="memberId" className="text-sm font-bold text-slate-300 ml-1">IEEE Member ID</label>
                <input 
                  type="text" 
                  id="memberId" 
                  name="memberId"
                  required={isMember}
                  placeholder="e.g. 98765432"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium text-sm sm:text-base"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full mt-4 sm:mt-6 py-3.5 sm:py-4 px-6 bg-[#2563eb] hover:bg-blue-600 disabled:bg-blue-800 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-500 shadow-lg shadow-blue-900/20 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 delay-[600ms] text-sm sm:text-base flex justify-center items-center ${isMounted ? 'opacity-100' : 'opacity-0'}`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : 'Register Account'}
            </button>
          </form>

          <p className={`mt-6 sm:mt-8 text-center text-xs sm:text-sm font-medium text-slate-400 transition-opacity duration-1000 delay-[800ms] ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
            Already have an account?{' '}
            <Link href="/login" className="text-[#3b82f6] font-bold hover:text-white transition-colors underline-offset-4 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}