"use client"; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileChaptersOpen, setIsMobileChaptersOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for logged-in user when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle logout by clearing storage and redirecting
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsMobileMenuOpen(false);
    router.push('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { 
      name: 'Chapters', 
      subLinks: [
        { name: 'SPS', path: '/chapters/sps' },
        { name: 'WIE', path: '/chapters/wie' }
      ] 
    },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled || isMobileMenuOpen
          ? 'py-3 bg-[#030712]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-20">
        
        {/* Animated Logo Section */}
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col group relative">
          <span className="text-xl font-black tracking-tighter text-white uppercase transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300">
            IEEE Student Branch
          </span>
          <span className="text-[0.65rem] font-bold text-blue-500 tracking-[0.2em] uppercase mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
            R.N.G. Patel Institute of Technology
          </span>
        </Link>

        {/* Desktop Navigation Links (Center) */}
        <div className="hidden lg:flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            // Handle Dropdown for Chapters (Desktop)
            if (link.subLinks) {
              const isActive = link.subLinks.some(sub => pathname === sub.path);
              return (
                <div key={link.name} className="relative group px-1">
                  <div
                    className={`cursor-default relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                      isActive ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    <svg className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-[#0f1423]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 flex flex-col gap-1">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                            pathname === sub.path 
                              ? 'bg-blue-600/20 text-blue-400' 
                              : 'text-slate-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // Handle Standard Links (Desktop)
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full group ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                <div 
                  className={`absolute inset-0 rounded-full bg-white/10 scale-50 opacity-0 transition-all duration-300 ease-out 
                  group-hover:scale-100 group-hover:opacity-100 ${isActive ? 'scale-100 opacity-100 bg-white/10' : ''}`}
                ></div>
              </Link>
            );
          })}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden lg:flex items-center space-x-6">
          {user ? (
            <>
              <span className="text-sm font-medium text-slate-300">
                Hi, <span className="font-bold text-white">{user.name.split(' ')[0]}</span>
              </span>
              <Link 
                href={user.role === 'admin' ? '/admin' : '/profile'} 
                className="group relative text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300"
              >
                {user.role === 'admin' ? 'Dashboard' : 'Profile'}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
              </Link>
              <button 
                onClick={handleLogout}
                className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900 group transform hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#DC2626_50%,#000000_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#F87171_50%,#000000_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0B0F19] px-6 py-1 text-sm font-semibold text-red-50 backdrop-blur-3xl transition-colors group-hover:bg-slate-900/90">
                  Logout
                </span>
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="group relative text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300"
              >
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
              </Link>
              <Link href="/register">
                <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 group transform hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#2563EB_50%,#000000_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#60A5FA_50%,#000000_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0B0F19] px-6 py-1 text-sm font-semibold text-blue-50 backdrop-blur-3xl transition-colors group-hover:bg-slate-900/90">
                    Register Now
                  </span>
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden relative z-20 p-2 text-slate-300 hover:text-white focus:outline-none transition-transform duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-[#050914]/95 backdrop-blur-3xl border-b border-white/10 transition-all duration-500 overflow-hidden origin-top ${
          isMobileMenuOpen ? 'max-h-[85vh] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          {navLinks.map((link) => {
            if (link.subLinks) {
              return (
                <div key={link.name} className="flex flex-col">
                  <button 
                    onClick={() => setIsMobileChaptersOpen(!isMobileChaptersOpen)}
                    className="flex items-center justify-between py-3 text-lg font-medium text-slate-300 hover:text-white border-b border-white/5 transition-colors"
                  >
                    <span>{link.name}</span>
                    <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileChaptersOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* Mobile SubLinks Accordion */}
                  <div className={`flex flex-col pl-4 space-y-2 overflow-hidden transition-all duration-300 ${isMobileChaptersOpen ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {link.subLinks.map((sub) => (
                      <Link 
                        key={sub.name} 
                        href={sub.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`py-2 text-base font-medium ${pathname === sub.path ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-3 text-lg font-medium border-b border-white/5 transition-colors ${
                  pathname === link.path ? 'text-blue-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile Auth Section */}
          <div className="pt-6 pb-2 flex flex-col gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Signed in as</p>
                    <p className="font-bold text-white leading-tight">{user.name}</p>
                  </div>
                </div>
                
                <Link 
                  href={user.role === 'admin' ? '/admin' : '/profile'} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  {user.role === 'admin' ? 'Dashboard' : 'My Profile'}
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="w-full py-3 text-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium hover:bg-red-500/20 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-center rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-center rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Events', path: '/events' },
//     { name: 'Team', path: '/team' },
//     {
//       name: 'Chapters',
//       path: '#', // Changed to # to prevent actual navigation if clicked
//       subLinks: [
//         { name: 'SPS (Signal Processing)', path: '/chapters/sps' },
//         { name: 'WIE (Women in Engineering)', path: '/chapters/wie' },
//       ],
//     },
//     { name: 'Contact', path: '/contact' },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
//         isScrolled
//           ? 'py-3 bg-[#030712]/70 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
//           : 'py-5 bg-transparent border-b border-transparent'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
//         {/* Animated Logo Section */}
//         <Link href="/" className="flex flex-col group relative z-10">
//           <span className="text-xl font-black tracking-tighter text-white uppercase transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300">
//             IEEE Student Branch
//           </span>
//           <span className="text-[0.65rem] font-bold text-blue-500 tracking-[0.2em] uppercase mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
//             R.N.G. Patel Institute of Technology
//           </span>
//         </Link>

//         {/* Desktop Navigation Links (Center) */}
//         <div className="hidden lg:flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.path || (link.subLinks && link.subLinks.some(sub => pathname === sub.path));
            
//             // Handle links with Dropdowns
//             if (link.subLinks) {
//               return (
//                 <div key={link.name} className="relative group px-1">
//                   {/* Parent trigger (Not a Next/Link to prevent 404 navigation) */}
//                   <div
//                     className={`cursor-default relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
//                       isActive ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
//                     }`}
//                   >
//                     <span>{link.name}</span>
//                     <svg className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>

//                   {/* Dropdown Menu */}
//                   <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
//                     <div className="bg-[#0f1423]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 flex flex-col gap-1">
//                       {link.subLinks.map((subLink) => (
//                         <Link
//                           key={subLink.name}
//                           href={subLink.path}
//                           className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
//                             pathname === subLink.path 
//                               ? 'bg-blue-600/20 text-blue-400' 
//                               : 'text-slate-300 hover:bg-white/10 hover:text-white'
//                           }`}
//                         >
//                           {subLink.name}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               );
//             }

//             // Standard Link (No Dropdown)
//             return (
//               <Link
//                 key={link.name}
//                 href={link.path}
//                 className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full group ${
//                   isActive ? 'text-white' : 'text-slate-400 hover:text-white'
//                 }`}
//               >
//                 <span className="relative z-10">{link.name}</span>
                
//                 <div 
//                   className={`absolute inset-0 rounded-full bg-white/10 scale-50 opacity-0 transition-all duration-300 ease-out 
//                   group-hover:scale-100 group-hover:opacity-100 ${isActive ? 'scale-100 opacity-100 bg-white/10' : ''}`}
//                 ></div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* Auth Section */}
//         <div className="hidden md:flex items-center space-x-6">
//           <Link 
//             href="/login" 
//             className="group relative text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300"
//           >
//             Login
//             <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
//           </Link>

//           <Link href="/register">
//             <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 group transform hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
//               <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#2563EB_50%,#000000_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#60A5FA_50%,#000000_100%)]" />
//               <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0B0F19] px-6 py-1 text-sm font-semibold text-blue-50 backdrop-blur-3xl transition-colors group-hover:bg-slate-900/90">
//                 Register Now
//                 <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                 </svg>
//               </span>
//             </button>
//           </Link>
//         </div>

//       </div>
//     </nav>
//   );
// }