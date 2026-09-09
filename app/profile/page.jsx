"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', 
    department: 'IT',
    memberId: '',
    college: '',
    city: '',
    year: '1st Year',
    contactNo: '',
    enrollmentNo: ''
  });

  const router = useRouter();

  // Authentication check and DB data fetch
  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    
    // 1. Instantly set what we have from local storage so the UI doesn't look completely empty
    setFormData(prev => ({
      ...prev,
      name: parsedUser.name || '',
      email: parsedUser.email || '',
    }));
    
    // 2. Fetch the COMPLETE profile data directly from MongoDB
    const fetchCompleteProfile = async () => {
      try {
        const res = await fetch(`/api/user/profile?email=${parsedUser.email}`);
        
        if (res.ok) {
          const dbUser = await res.json();
          
          // Populate the form with the real database values
          setFormData(prev => ({
            ...prev,
            department: dbUser.department || 'IT',
            memberId: dbUser.memberId || '',
            college: dbUser.college || '',
            city: dbUser.city || '',
            year: dbUser.year || '1st Year',
            contactNo: dbUser.contactNo || '',
            enrollmentNo: dbUser.enrollmentNo || '',
          }));
          
          // Update localStorage with the full fresh data silently
          const fullUser = { ...parsedUser, ...dbUser };
          delete fullUser.password;
          localStorage.setItem('user', JSON.stringify(fullUser));
        }
      } catch (error) {
        console.error("Error fetching profile from database:", error);
      } finally {
        setIsLoading(false); // Stop loading spinner once data arrives
      }
    };

    fetchCompleteProfile();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // 1. Make the REAL API call to the backend
      const response = await fetch('/api/user/profile', { 
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }
      
      // 2. Update the local storage so the Navbar/UI reflects the change immediately
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const updatedUser = { ...storedUser, ...formData };
      
      delete updatedUser.password; 
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Clear the password field after successful update
      setFormData(prev => ({ ...prev, password: '' }));

      // 3. Trigger a custom event to tell the Navbar to re-render
      window.dispatchEvent(new Event('storage'));

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#070b14] flex flex-col justify-center items-center font-sans relative overflow-hidden selection:bg-blue-500/30 pt-24 pb-12">
      
      {/* Background Ambient Effects */}
      <div className="absolute top-[10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-900/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-900/10 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="mb-8 transform transition-all duration-700 translate-y-0 opacity-100 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">My Profile</h1>
          <p className="text-slate-400 font-medium">Manage your personal information and branch details.</p>
        </div>

        {/* Profile Card Container */}
        <div className="bg-[#0a0f1c]/80 backdrop-blur-xl rounded-[2rem] border border-slate-800 shadow-2xl shadow-black/50 p-6 sm:p-10 transform transition-all duration-1000 ease-out translate-y-0 opacity-100">
          
          {/* Avatar / Quick Info Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-8 border-b border-slate-800/80 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px] shadow-lg shadow-blue-900/30">
              <div className="w-full h-full rounded-full bg-[#0a0f1c] flex items-center justify-center text-2xl font-black text-white">
                {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{formData.name || 'Student'}</h2>
              <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Active Member
              </span>
            </div>
          </div>

          {/* Status Messages */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl border font-medium text-sm transition-all text-center ${
              message.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          {/* Show a mini loading state while DB data arrives */}
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <svg className="animate-spin h-8 w-8 text-[#3b82f6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-slate-300 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 rounded-xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-slate-300 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    readOnly
                    className="w-full px-5 py-3.5 rounded-xl bg-[#131c31]/50 border border-slate-700/50 text-slate-400 cursor-not-allowed font-medium"
                  />
                  <p className="text-xs text-slate-500 ml-1 mt-0.5">Email addresses cannot be changed directly.</p>
                </div>
              </div>

              {/* Row 2: Contact No & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contactNo" className="text-sm font-bold text-slate-300 ml-1">Contact No.</label>
                  <input 
                    type="tel" 
                    id="contactNo" 
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="text-sm font-bold text-slate-300 ml-1">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Surat"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium"
                  />
                </div>
              </div>

              {/* Row 3: College & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="college" className="text-sm font-bold text-slate-300 ml-1">College (Clg)</label>
                  <input 
                    type="text" 
                    id="college" 
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="RNGPIT"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="department" className="text-sm font-bold text-slate-300 ml-1">Department</label>
                  <select 
                    id="department" 
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#131c31] border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium appearance-none"
                  >
                    <option value="IT">Information Technology</option>
                    <option value="CE">Computer Engineering</option>
                    <option value="EE">Electrical Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CIVIL">Civil Engineering</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Year/Class & Enrollment No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="year" className="text-sm font-bold text-slate-300 ml-1">Year / Class</label>
                  <select 
                    id="year" 
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#131c31] border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium appearance-none"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Alumni">Alumni</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="enrollmentNo" className="text-sm font-bold text-slate-300 ml-1">Enrollment No.</label>
                  <input 
                    type="text" 
                    id="enrollmentNo" 
                    name="enrollmentNo"
                    value={formData.enrollmentNo}
                    onChange={handleChange}
                    placeholder="e.g. 210xxxxxx"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium"
                  />
                </div>
              </div>

              {/* Row 5: IEEE Member ID & Password Update */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="memberId" className="text-sm font-bold text-slate-300 ml-1">IEEE Member ID (Optional)</label>
                  <input 
                    type="text" 
                    id="memberId" 
                    name="memberId"
                    value={formData.memberId}
                    onChange={handleChange}
                    placeholder="Enter your 8-digit IEEE ID"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm font-bold text-slate-300 ml-1">New Password (Optional)</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#131c31] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6] transition-all font-medium"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-slate-800/80">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#2563eb] hover:bg-blue-600 disabled:bg-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20 hover:-translate-y-0.5 active:scale-95 flex justify-center items-center"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Saving...
                    </span>
                  ) : 'Save Changes'}
                </button>
                
                <button 
                  type="button"
                  onClick={() => router.push('/')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-bold rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </main>
  );
}