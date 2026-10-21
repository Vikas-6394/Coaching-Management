import React from 'react';

export const LoadingSkeleton = ({ type = "card", count = 3 }) => {
  if (type === "table") {
    return (
      <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 space-y-4 animate-pulse">
        <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl w-full" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-slate-100 dark:bg-slate-800/60 rounded-lg w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 animate-pulse"
        >
          <div className="flex justify-between items-center">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-24" />
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-36" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-48 pt-2" />
        </div>
      ))}
    </div>
  );
};
