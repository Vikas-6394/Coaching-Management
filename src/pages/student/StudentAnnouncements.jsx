import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/StatusBadge';
import { Bell, Calendar, User, CheckCircle2, Filter } from 'lucide-react';

export const StudentAnnouncements = () => {
  const { announcements, toggleAnnouncementRead } = useData();
  const toast = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Exam", "Holiday", "General"];

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return announcements;
    return announcements.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [announcements, selectedCategory]);

  const handleToggleRead = (a) => {
    toggleAnnouncementRead(a.id);
    if (!a.isRead) {
      toast.info(`Marked "${a.title}" as read.`);
    } else {
      toast.info(`Marked "${a.title}" as unread.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Institute Notices & Announcements
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Stay updated with exam circulars, lecture reschedule notices, and academic bulletins.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-start sm:self-auto text-xs font-semibold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-3xl border transition-all duration-300 ${
              item.isRead
                ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
                : 'bg-blue-50/40 dark:bg-slate-900 border-blue-200 dark:border-blue-900/60 shadow-xs ring-1 ring-blue-500/10'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <StatusBadge status={item.category} size="sm" />
                {item.priority === 'Urgent' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-600 border border-rose-300 dark:border-rose-800">
                    URGENT ACTION
                  </span>
                )}
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-blue-600" title="Unread Notice" />
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" /> {item.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {item.author}
                </span>
              </div>
            </div>

            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mt-3">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {item.content}
            </p>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleToggleRead(item)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${item.isRead ? 'text-emerald-500' : 'text-slate-400'}`} />
                <span>{item.isRead ? "Mark as Unread" : "Mark as Read"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
