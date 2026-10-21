import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  Award,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentCourses = () => {
  const { courses, toggleLessonComplete } = useData();
  const toast = useToast();
  const [selectedCourseForLessons, setSelectedCourseForLessons] = useState(null);

  // Student is enrolled in CRS-001 and CRS-003 by default (or any newly enrolled)
  const enrolledCourses = courses.filter(c =>
    ["CRS-001", "CRS-003"].includes(c.id) || (c.studentsEnrolled && c.studentsEnrolled > 150)
  );

  const calculateProgress = (course) => {
    let total = 0;
    let completed = 0;
    course.syllabus?.forEach(mod => {
      mod.lessons?.forEach(les => {
        total++;
        if (les.completed) completed++;
      });
    });
    return total > 0 ? Math.round((completed / total) * 100) : 45;
  };

  const handleLessonToggle = (courseId, moduleIdx, lessonIdx, lessonTitle, isNowComplete) => {
    toggleLessonComplete(courseId, moduleIdx, lessonIdx);
    if (!isNowComplete) {
      toast.success(`Completed lesson: "${lessonTitle}"!`, "Lesson Progress Saved");
    } else {
      toast.info(`Marked "${lessonTitle}" as incomplete.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Enrolled Courses
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track syllabus coverage, complete module exercises, and access video lectures.
          </p>
        </div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse More Batches</span>
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enrolledCourses.map((course) => {
          const progress = calculateProgress(course);
          return (
            <div
              key={course.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge status={course.badge || course.category} size="sm" />
                        <span className="text-xs text-slate-400 font-medium">Batch #{course.id}</span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Mentor: <span className="font-semibold text-slate-700 dark:text-slate-300">{course.instructor}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Curriculum Progress</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{progress}% Completed</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Quick Lesson Preview list */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Next Up In Syllabus:
                  </p>
                  <div className="space-y-1.5">
                    {course.syllabus?.[0]?.lessons?.slice(0, 3).map((les, lIdx) => (
                      <div
                        key={lIdx}
                        onClick={() => handleLessonToggle(course.id, 0, lIdx, les.title, les.completed)}
                        className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 hover:bg-blue-50/60 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={!!les.completed}
                            onChange={() => {}} // handled by parent onClick
                            className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                          />
                          <span className={`font-medium ${les.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                            {les.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">{les.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCourseForLessons(course)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  View Full Syllabus
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCourseForLessons(course)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-102"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Resume Learning</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Syllabus Modal */}
      {selectedCourseForLessons && (
        <Modal
          isOpen={!!selectedCourseForLessons}
          onClose={() => setSelectedCourseForLessons(null)}
          title={`Syllabus & Lessons: ${selectedCourseForLessons.title}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
              <span>Click any lesson checkbox to mark it completed:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {calculateProgress(selectedCourseForLessons)}% Done
              </span>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {selectedCourseForLessons.syllabus?.map((mod, mIdx) => (
                <div
                  key={mIdx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-4 space-y-3"
                >
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {mod.module}
                  </h4>
                  <div className="space-y-2">
                    {mod.lessons?.map((les, lIdx) => (
                      <label
                        key={lIdx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs cursor-pointer hover:border-blue-400 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={!!les.completed}
                            onChange={() =>
                              handleLessonToggle(selectedCourseForLessons.id, mIdx, lIdx, les.title, les.completed)
                            }
                            className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                          />
                          <span className={`font-medium ${les.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                            {les.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {les.duration}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedCourseForLessons(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
