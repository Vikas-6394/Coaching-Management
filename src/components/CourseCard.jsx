import React from 'react';
import { Star, Clock, User, BookOpen, CheckCircle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { Link } from 'react-router-dom';

export const CourseCard = ({
  course,
  isEnrolled = false,
  progress = null,
  onEnroll,
  onResume
}) => {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <StatusBadge status={course.badge || course.category} size="sm" />
        </div>
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{course.rating || "4.9"}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" /> {course.duration}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-purple-500" /> {course.level}
            </span>
          </div>

          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {course.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {course.tagline || course.description}
          </p>
        </div>

        {/* Enrolled Progress (if applicable) */}
        {progress !== null && (
          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">Course Progress</span>
              <span className="text-blue-600 dark:text-blue-400">{progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
              <User className="w-3.5 h-3.5 shrink-0 text-blue-500" />
              <span className="truncate font-medium">{course.instructor}</span>
            </div>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              ₹{Number(course.fee).toLocaleString('en-IN')}
            </p>
          </div>

          {/* Action Buttons: 2-column grid to ensure Enroll Now never truncates */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/courses/${course.id}`}
              className="w-full text-center py-2 px-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              Details
            </Link>

            {isEnrolled ? (
              <button
                type="button"
                onClick={onResume}
                className="w-full py-2 px-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors whitespace-nowrap text-center"
              >
                Resume
              </button>
            ) : onEnroll ? (
              <button
                type="button"
                onClick={onEnroll}
                className="w-full py-2 px-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 hover:from-amber-700 hover:to-rose-800 text-white shadow-md shadow-orange-600/25 transition-all hover:scale-101 whitespace-nowrap text-center"
              >
                Enroll Now
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
