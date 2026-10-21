import React from 'react';

export const ChartCard = ({
  title,
  subtitle,
  children,
  action
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>

      <div className="w-full h-64 sm:h-72">
        {children}
      </div>
    </div>
  );
};
