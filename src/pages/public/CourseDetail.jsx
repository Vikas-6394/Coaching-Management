import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/StatusBadge';
import {
  Clock,
  BookOpen,
  User,
  Star,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  PlayCircle
} from 'lucide-react';

export const CourseDetail = () => {
  const { id } = useParams();
  const { courses, enrollCourse, students } = useData();
  const toast = useToast();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === id) || courses[0];

  const student = students.find((s) => s.id === "STU-001");
  const isEnrolled = student?.enrolledCourses?.includes(course.id);

  const handleEnroll = () => {
    enrollCourse("STU-001", course.id);
    toast.success(`Enrolled in "${course.title}". Opening Student Portal!`, "Enrollment Success");
    navigate('/student/courses');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/courses" className="hover:text-blue-600 transition-colors">Courses</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-xs">{course.title}</span>
      </nav>

      {/* Main Course Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2">
            <StatusBadge status={course.badge || course.category} />
            <StatusBadge status={course.level} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {course.title}
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium pt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-500" />
              Duration: <strong className="text-slate-800 dark:text-slate-200">{course.duration}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Rating: <strong className="text-slate-800 dark:text-slate-200">{course.rating} / 5.0</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-purple-500" />
              Enrolled: <strong className="text-slate-800 dark:text-slate-200">{course.studentsEnrolled}+ Students</strong>
            </span>
          </div>

          {/* Syllabus Curriculum */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Curriculum & Syllabus Breakdown
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Comprehensive topic-wise lecture modules and practice labs
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {course.syllabus?.map((mod, mIdx) => (
                <div
                  key={mIdx}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs"
                >
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span>{mod.module}</span>
                    <span className="text-xs font-semibold text-slate-400">
                      {mod.lessons.length} Lessons
                    </span>
                  </div>
                  <div className="p-4 divide-y divide-slate-100 dark:divide-slate-800/60">
                    {mod.lessons.map((les, lIdx) => (
                      <div
                        key={lIdx}
                        className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <PlayCircle className="w-4 h-4 text-blue-500 shrink-0" />
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {les.title}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          {les.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Enrollment Card */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden p-6 space-y-6">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-44 object-cover rounded-2xl"
            />

            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Total Tuition Fee</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  ₹{Number(course.fee).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  ₹{Number(course.fee * 1.25).toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                  20% OFF
                </span>
              </div>
            </div>

            {isEnrolled ? (
              <button
                type="button"
                onClick={() => navigate('/student/courses')}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all text-center"
              >
                Go to My Courses (Enrolled)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEnroll}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-101"
              >
                Enroll Now (Instant Demo)
              </button>
            )}

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Full access to live & recorded lectures</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Periodic computer-based mock tests</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Curated formula sheets & PDF notes</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">{course.instructor}</p>
                <p className="text-slate-400">Lead Faculty Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
