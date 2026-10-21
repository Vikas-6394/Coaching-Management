import React from 'react';

export const StatusBadge = ({ status, size = "md" }) => {
  if (!status) return null;

  const normalized = String(status).toLowerCase().trim();

  let styles = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";

  if (['paid', 'present', 'active', 'passed', 'completed', 'high yield'].includes(normalized)) {
    styles = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60";
  } else if (['pending', 'late', 'warning', 'revision', 'intermediate'].includes(normalized)) {
    styles = "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
  } else if (['overdue', 'absent', 'inactive', 'failed', 'urgent'].includes(normalized)) {
    styles = "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800/60";
  } else if (['advanced', 'bestseller', 'top rated', 'engineering', 'ai powered'].includes(normalized)) {
    styles = "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800/60";
  } else if (['medical', 'crash course', 'must read'].includes(normalized)) {
    styles = "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800/60";
  }

  const sizeClasses = size === "sm"
    ? "px-2 py-0.5 text-xs font-semibold"
    : "px-2.5 py-1 text-xs font-semibold";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-xs tracking-wide uppercase ${sizeClasses} ${styles}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
};
