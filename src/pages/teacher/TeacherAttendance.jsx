import React, { useState } from 'react';
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
  RotateCcw
} from 'lucide-react';

export const TeacherAttendance = () => {
  const { students, courses, markAttendanceBatch } = useData();
  const toast = useToast();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [courseId, setCourseId] = useState("CRS-001");

  // Get enrolled students for this course
  const courseStudents = students.filter(s =>
    s.enrolledCourses?.includes(courseId)
  );

  // Attendance state: { [studentId]: "Present" | "Absent" | "Late" }
  const [attendanceMap, setAttendanceMap] = useState(() => {
    const map = {};
    students.forEach(s => {
      map[s.id] = "Present"; // default all to present
    });
    return map;
  });

  const handleStatusChange = (studentId, status) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status) => {
    setAttendanceMap(prev => {
      const next = { ...prev };
      courseStudents.forEach(s => {
        next[s.id] = status;
      });
      return next;
    });
    toast.info(`Marked all ${courseStudents.length} students as ${status}.`);
  };

  const handleSaveAttendance = () => {
    const records = courseStudents.map(s => ({
      studentId: s.id,
      studentName: s.name,
      status: attendanceMap[s.id] || "Present",
      remark: attendanceMap[s.id] === "Late" ? "Late check-in" : "Classroom lecture"
    }));

    markAttendanceBatch(date, courseId, records);
    toast.success(
      `Attendance saved for ${records.length} students on ${date}! Synchronized to database.`,
      "Attendance Recorded"
    );
  };

  const presentCount = courseStudents.filter(s => (attendanceMap[s.id] || "Present") === "Present").length;
  const absentCount = courseStudents.filter(s => attendanceMap[s.id] === "Absent").length;
  const lateCount = courseStudents.filter(s => attendanceMap[s.id] === "Late").length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Classroom Roll Call & Attendance Logger
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Select class date and course, then toggle student attendance states and commit to records.
        </p>
      </div>

      {/* Control Configuration Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <div className="space-y-1">
            <label className="text-slate-500 block">Class Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-500 block">Course / Cohort:</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 cursor-pointer"
            >
              <option value="CRS-001">JEE Advanced Pinnacle Batch</option>
              <option value="CRS-003">CBSE Class 12 Boards Accelerator</option>
            </select>
          </div>
        </div>

        {/* Quick Bulk Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-1">Bulk Mark:</span>
          <button
            type="button"
            onClick={() => handleMarkAll("Present")}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
          >
            All Present
          </button>
          <button
            type="button"
            onClick={() => handleMarkAll("Absent")}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100"
          >
            All Absent
          </button>
        </div>
      </div>

      {/* Summary Ribbon */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center text-xs">
        <div>
          <span className="text-slate-400">Marked Present</span>
          <p className="text-lg font-extrabold text-emerald-600 mt-0.5">{presentCount}</p>
        </div>
        <div className="border-x border-slate-200 dark:border-slate-800">
          <span className="text-slate-400">Marked Absent</span>
          <p className="text-lg font-extrabold text-rose-600 mt-0.5">{absentCount}</p>
        </div>
        <div>
          <span className="text-slate-400">Marked Late</span>
          <p className="text-lg font-extrabold text-amber-600 mt-0.5">{lateCount}</p>
        </div>
      </div>

      {/* Attendance Student Rows */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {courseStudents.map((student) => {
            const currentStatus = attendanceMap[student.id] || "Present";
            return (
              <div
                key={student.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                      {student.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Roll No: {student.rollNumber} • Rate: {student.attendanceRate}%
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
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Present
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(student.id, "Late")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      currentStatus === "Late"
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Late
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(student.id, "Absent")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      currentStatus === "Absent"
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Save Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {courseStudents.length} students enrolled in {courses.find(c => c.id === courseId)?.title}
          </span>
          <button
            type="button"
            onClick={handleSaveAttendance}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance Batch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
