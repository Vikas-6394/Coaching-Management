import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address.", "Invalid Email");
      return;
    }
    toast.success("Thank you for subscribing to EduManage Academic Updates!", "Subscribed");
    setEmail("");
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Edu<span className="text-blue-600 dark:text-blue-400">Manage</span>
              </span>
            </Link>

            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Empowering ambitious learners across India with premier classroom instruction, comprehensive mock test engines, and performance analytics for competitive entrance exams.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>EduManage Tower, Sector 62, Noida, NCR, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+91 1800-200-9944 (Toll-Free Mon–Sat 9AM–7PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>admissions@edumanage.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Academic Programs
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">JEE Advanced Pinnacle</Link></li>
              <li><Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">NEET Elite Foundation</Link></li>
              <li><Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Class 12 Boards Accelerator</Link></li>
              <li><Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Full Stack Web Boot Camp</Link></li>
              <li><Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mathematics Olympiad</Link></li>
            </ul>
          </div>

          {/* Demo Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Portals (Frontend Demo)
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/student" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Student Dashboard</Link></li>
              <li><Link to="/teacher" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Teacher Portal</Link></li>
              <li><Link to="/admin" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Admin Console</Link></li>
              <li><Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Role Switcher & Login</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Our Institute</Link></li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Stay Informed
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Get exam calendar notifications, mock test alerts, and syllabus revisions.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} EduManage Coaching Management System. Frontend Portfolio Project.</p>
          <div className="flex items-center gap-1">
            <span>Built with modern React.js, Tailwind CSS & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
