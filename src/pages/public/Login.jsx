import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  LogIn,
  KeyRound,
  Mail,
  AlertCircle
} from 'lucide-react';

export const Login = () => {
  const { loginAsRole, loginWithCredentials } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("student@edumanage.com");
  const [password, setPassword] = useState("demo123");

  const demoRoles = [
    {
      role: "student",
      title: "Student Portal",
      name: "Aarav Sharma",
      email: "student@edumanage.com",
      desc: "Courses, Mock Tests, Attendance, Fees & Results",
      icon: GraduationCap,
      color: "blue"
    },
    {
      role: "teacher",
      title: "Faculty Portal",
      name: "Dr. Vikramaditya Rathore",
      email: "teacher@edumanage.com",
      desc: "Mark Attendance, Schedule, Upload Notes & Tests",
      icon: Briefcase,
      color: "purple"
    },
    {
      role: "admin",
      title: "Admin Console",
      name: "Director Rajesh Khurana",
      email: "admin@edumanage.com",
      desc: "Full Institute CRUD, Finance, Batch & System Oversight",
      icon: ShieldCheck,
      color: "emerald"
    }
  ];

  const handleRoleQuickSelect = (roleKey) => {
    loginAsRole(roleKey);
    toast.success(`Signed in as ${roleKey.toUpperCase()} demo user!`, "Demo Access Granted");
    navigate(`/${roleKey}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a demo email address.");
      return;
    }
    const result = loginWithCredentials(email, password);
    toast.success(`Signed in as ${result.role.toUpperCase()} demo user!`, "Demo Access Granted");
    navigate(`/${result.role}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Demo Portal Access
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Select a demo persona below for immediate 1-click access, or log in with simulated credentials.
        </p>
      </div>

      {/* Simulated Auth Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-800 dark:text-amber-200">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block">Portfolio Demonstration Notice:</strong>
          This is a client-side frontend demonstration with simulated authentication. No passwords or sensitive data are transmitted to any server. State is stored locally in your browser.
        </div>
      </div>

      {/* 3 Quick Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {demoRoles.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.role}
              onClick={() => handleRoleQuickSelect(item.role)}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>1-Click Launch</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Credentials Form */}
      <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Or Enter Credentials
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Demo Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@edumanage.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Demo Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          {/* Quick email presets */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 flex-wrap pt-1">
            <span>Autofill:</span>
            <button
              type="button"
              onClick={() => { setEmail("student@edumanage.com"); setPassword("demo123"); }}
              className="text-blue-600 hover:underline"
            >
              student@
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => { setEmail("teacher@edumanage.com"); setPassword("demo123"); }}
              className="text-blue-600 hover:underline"
            >
              teacher@
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => { setEmail("admin@edumanage.com"); setPassword("demo123"); }}
              className="text-blue-600 hover:underline"
            >
              admin@
            </button>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-101"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Dashboard</span>
          </button>
        </form>
      </div>
    </div>
  );
};
