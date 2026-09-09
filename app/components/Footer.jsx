import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="relative z-10 bg-black border-t border-white/10 text-slate-300 pt-16 pb-8 overflow-hidden">
      
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[30vw] h-[30vw] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[20vw] h-[20vw] bg-cyan-900/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & About Section */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4">
            <div className="flex flex-col items-start mb-6">
              <Link href="/" className="flex flex-col group">
                <span className="text-2xl font-black tracking-tighter text-white uppercase transition-all duration-500">
                  IEEE <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">RNGPIT</span>
                </span>
                <span className="text-[0.65rem] font-bold text-slate-500 tracking-[0.2em] uppercase mt-0.5">
                  Student Branch
                </span>
              </Link>
            </div>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed font-light pr-4">
              The premier technical ecosystem bridging the gap between academic theory and industry-grade system architecture. Advancing technology for humanity through innovation and inclusive engineering.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-slate-500 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="mailto:ieee@rngpit.ac.in" className="text-slate-500 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300">
                <Mail size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-3 lg:col-span-4 lg:pl-12">
            <h3 className="text-white font-semibold mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Branch', path: '/about' },
                { name: 'Upcoming Events', path: '/events' },
                { name: 'Executive Team', path: '/team' },
                { name: 'WIE Chapter', path: '/chapters/wie' },
                { name: 'SPS Chapter', path: '/chapters/sps' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-500 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4">
            <h3 className="text-white font-semibold mb-6 tracking-wide">Connect With Us</h3>
            <address className="not-italic text-sm text-slate-400 space-y-3 font-light leading-relaxed">
              <p className="flex items-start gap-3">
                <span className="mt-1 text-blue-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <span>
                  <strong className="block text-slate-300 font-medium mb-1">R.N.G. Patel Institute of Technology</strong>
                  Bardoli - Navsari Road, Tajpor,<br />
                  Bardoli, Gujarat 394620
                </span>
              </p>
              <p className="flex items-center gap-3 pt-2">
                <span className="text-blue-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <span>+91 99130 96458</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-blue-500">
                  <Mail size={16} strokeWidth={2} />
                </span>
                <span>ieee@rngpit.ac.in</span>
              </p>
            </address>
          </div>

        </div>

       {/* Affiliate Logos Row */}
        <div className="pt-10 border-t border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-10">
            {[
              { src: '/logo/ieee.jpg', alt: 'IEEE Logo' },
              { src: '/logo/3.jpg', alt: 'IEEE RNGPIT' },
              { src: '/logo/4.jpg', alt: 'IEEE WIE' },
              { src: '/logo/5.jpg', alt: 'IEEE SPS' },
              { src: '/logo/college-logo.jpg', alt: 'RNGPIT' },
              { src: '/logo/gujarat-section.jpg', alt: 'Gujarat Section' }
            ].map((logo, idx) => (
              <div 
                key={idx} 
                className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center relative overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 group"
              >
               
                {/* FIXED: Removed fill, added explicit width/height, removed p-2.5 */}
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={60}
                  height={60}
                  className="object-contain z-10 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>
          {/* Copyright & Credits */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 tracking-wide">
            <p>&copy; 2026 IEEE RNGPIT Student Branch. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Developed by the <span className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer">Web & Design Team</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;