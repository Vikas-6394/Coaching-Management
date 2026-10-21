import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, GraduationCap } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
        <GraduationCap className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-4xl sm:text-6xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
          404
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          The academic portal or page you are looking for has been relocated, renamed, or does not exist.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-102"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 font-bold text-sm transition-all"
        >
          <span>Portals Login</span>
        </Link>
      </div>
    </div>
  );
};
