import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/StatusBadge';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Users,
  Search,
  RotateCcw,
  GraduationCap
} from 'lucide-react';

export const TeacherAttendance = () => {
  const { students, courses, markAttendanceBatch } = useData();
  const toast = useToast();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  // Default to 'all' so every single student in the institute is immediately displayed
  const [courseId, setCourseId] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Attendance state: { [studentId]: "Present" | "Absent" | "Late" }
  const [attendanceMap, setAttendanceMap] = useState({});

  // Filter students based on selected course/batch and search term
  const displayedStudents = useMemo(() => {
    const seen = new Set();
    return students.filter(student => {
      if (!student?.id || seen.has(student.id)) return false;
      seen.add(student.id);

      // If "all", include every student
      const matchesCourse = courseId === "all" ||
        student.enrolledCourses?.includes(courseId) ||
        (student.batch && courses.find(c => c.id === courseId)?.title.toLowerCase().includes(student.batch.toLowerCase().split(' ')[0]));

      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term ||
        student.name?.toLowerCase().includes(term) ||
        student.rollNumber?.toLowerCase().includes(term) ||
        student.email?.toLowerCase().includes(term) ||
        student.batch?.toLowerCase().includes(term);

      return matchesCourse && matchesSearch;
    });
  }, [students, courses, courseId, searchTerm]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status) => {
    setAttendanceMap(prev => {
      const next = { ...prev };
      displayedStudents.forEach(s => {
        next[s.id] = status;
      });
      return next;
    });
    toast.info(`Marked all ${displayedStudents.length} listed students as ${status}.`);
  };

  const handleSaveAttendance = () => {
    if (displayedStudents.length === 0) {
      toast.warning("No students available to record attendance for.");
      return;
    }

    const records = displayedStudents.map(s => ({
      studentId: s.id,
      studentName: s.name,
      status: attendanceMap[s.id] || "Present",
      remark: (attendanceMap[s.id] || "Present") === "Late" ? "Late check-in" : "Classroom lecture"
    }));

    markAttendanceBatch(date, courseId, records);
    toast.success(
      `Attendance saved for ${records.length} students on ${date}! Updated in real-time.`,
      "Attendance Recorded"
    );
  };

  const presentCount = displayedStudents.filter(s => (attendanceMap[s.id] || "Present") === "Present").length;
  const absentCount = displayedStudents.filter(s => attendanceMap[s.id] === "Absent").length;
  const lateCount = displayedStudents.filter(s => attendanceMap[s.id] === "Late").length;

  const currentCourseTitle = courseId === "all"
    ? "All Students & Batches"
    : (courses.find(c => c.id === courseId)?.title || "Class Cohort");

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Classroom Roll Call & Attendance Logger
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Mark attendance for individual batches or all enrolled students across the academy.
        </p>
      </div>

      {/* Control Configuration Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            {/* Date Picker */}
            <div className="space-y-1">
              <label className="text-slate-500 block">Session Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {/* Course / Cohort Selector (Includes All Students option & dynamic courses) */}
            <div className="space-y-1">
              <label className="text-slate-500 block">Course / Batch Filter:</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              >
                <option value="all">🌟 All Students & Batches ({students.length} Total)</option>
                {courses.map((c) => {
                  const enrolledCount = students.filter(s => s.enrolledCourses?.includes(c.id)).length;
                  return (
                    <option key={c.id} value={c.id}>
                      {c.title} ({enrolledCount} Enrolled)
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Quick Bulk Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Bulk Mark:</span>
            <button
              type="button"
              onClick={() => handleMarkAll("Present")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              All Present
            </button>
            <button
              type="button"
              onClick={() => handleMarkAll("Late")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors"
            >
              All Late
            </button>
            <button
              type="button"
              onClick={() => handleMarkAll("Absent")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors"
            >
              All Absent
            </button>
          </div>
        </div>

        {/* Search Bar for Quick Filtering */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student by name, roll number, or batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Summary Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center text-xs shadow-xs">
        <div>
          <span className="text-slate-400 font-medium">Total Listed</span>
          <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">{displayedStudents.length}</p>
        </div>
        <div className="border-l border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 font-medium">Marked Present</span>
          <p className="text-lg font-extrabold text-emerald-600 mt-0.5">{presentCount}</p>
        </div>
        <div className="border-l border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 font-medium">Marked Late</span>
          <p className="text-lg font-extrabold text-amber-600 mt-0.5">{lateCount}</p>
        </div>
        <div className="border-l border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 font-medium">Marked Absent</span>
          <p className="text-lg font-extrabold text-rose-600 mt-0.5">{absentCount}</p>
        </div>
      </div>

      {/* Attendance Student Rows */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        {displayedStudents.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {displayedStudents.map((student) => {
              const currentStatus = attendanceMap[student.id] || "Present";
              return (
                <div
                  key={student.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={student.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                      alt={student.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                          {student.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {student.batch || "Regular Student"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Roll: {student.rollNumber || student.id} • Historical Rate: {student.attendanceRate || 90}%
                      </p>
                    </div>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, "Present")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentStatus === "Present"
                          ? 'bg-emerald-600 text-white shadow-xs scale-102 ring-2 ring-emerald-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      Present
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, "Late")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentStatus === "Late"
                          ? 'bg-amber-600 text-white shadow-xs scale-102 ring-2 ring-amber-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      Late
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, "Absent")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentStatus === "Absent"
                          ? 'bg-rose-600 text-white shadow-xs scale-102 ring-2 ring-rose-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <Users className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="font-bold text-slate-800 dark:text-slate-200">No students found matching current filters</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try switching your course filter to "All Students & Batches" or clearing your search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setCourseId("all");
                setSearchTerm("");
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 transition-colors"
            >
              Reset to All Students
            </button>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing {displayedStudents.length} of {students.length} students enrolled in {currentCourseTitle}
          </span>
          <button
            type="button"
            onClick={handleSaveAttendance}
            disabled={displayedStudents.length === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 hover:from-amber-700 hover:to-rose-800 text-white font-bold text-xs shadow-md shadow-orange-600/25 transition-all hover:scale-102 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
