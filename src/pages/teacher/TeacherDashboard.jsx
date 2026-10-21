import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import { ChartCard } from '../../components/ChartCard';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Layers,
  CalendarCheck,
  FileText,
  Clock,
  ArrowRight,
  PlusCircle,
  HelpCircle,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const TeacherDashboard = () => {
  const { user } = useAuth();
  const { students, courses, assignments, tests } = useData();
  const navigate = useNavigate();

  // Teacher TCH-001 assigned to CRS-001 and CRS-003
  const assignedCourses = courses.filter(c => ["CRS-001", "CRS-003"].includes(c.id));
  const assignedStudents = students.filter(s =>
    s.enrolledCourses?.some(cId => ["CRS-001", "CRS-003"].includes(cId))
  );

  const teacherScheduleToday = [
    { time: "09:00 AM - 11:00 AM", course: "JEE Advanced Pinnacle", topic: "Rotational Dynamics & Torque Analysis", room: "Lecture Hall A", studentsCount: 42 },
    { time: "11:30 AM - 01:00 PM", course: "Class 12 Boards Accelerator", topic: "Wave Optics: Interference & Diffraction", room: "Hall B", studentsCount: 38 },
    { time: "04:00 PM - 05:30 PM", course: "JEE Advanced Problem Clinic", topic: "Doubt Clearing Session: Mechanics", room: "Doubt Hub 1", studentsCount: 24 }
  ];

  const batchPerformanceData = [
    { batch: "JEE Adv A", avgScore: 82, attendance: 94 },
    { batch: "JEE Adv B", avgScore: 78, attendance: 91 },
    { batch: "Class 12 Sci", avgScore: 86, attendance: 96 },
    { batch: "Olympiad Drills", avgScore: 89, attendance: 88 }
  ];

  return (
    <div className="space-y-6">
      {/* Faculty Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-8 text-white shadow-xl shadow-blue-600/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              {user?.subject || "Physics"} Department Lead
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good day, {user?.name}! 🎓
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              You have 3 scheduled classroom lectures today. Today's attendance session for JEE Advanced Pinnacle Batch is ready to be logged.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <button
              onClick={() => navigate('/teacher/attendance')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all hover:scale-102 flex items-center justify-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4" /> Take Attendance
            </button>
            <button
              onClick={() => navigate('/teacher/materials')}
              className="px-4 py-2.5 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-semibold text-xs border border-white/20 transition-all flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" /> Upload Study Material
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Students"
          value={assignedStudents.length}
          subtitle="Across 2 Core Batches"
          icon={Users}
          color="blue"
          onClick={() => navigate('/teacher/students')}
        />
        <StatCard
          title="Assigned Courses"
          value={assignedCourses.length}
          subtitle="JEE Advanced & Boards"
          icon={Layers}
          color="purple"
        />
        <StatCard
          title="Today's Lectures"
          value="3 Sessions"
          subtitle="4.5 teaching hours"
          icon={Clock}
          color="emerald"
          onClick={() => navigate('/teacher/schedule')}
        />
        <StatCard
          title="Active Assignments"
          value={assignments.length}
          subtitle="56 submissions pending review"
          icon={FileText}
          color="amber"
          onClick={() => navigate('/teacher/assignments')}
        />
      </div>

      {/* Schedule & Batch Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule Card */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Today's Classroom Sessions
              </h4>
              <Link
                to="/teacher/schedule"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Full Timetable →
              </Link>
            </div>

            <div className="space-y-3">
              {teacherScheduleToday.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{item.course}</span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                      {item.room}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{item.topic}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-blue-500" /> {item.time}
                    </span>
                    <span>{item.studentsCount} Students Registered</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/teacher/attendance')}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" /> Start Roll Call Attendance
          </button>
        </div>

        {/* Batch Performance Chart */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Batch Performance & Attendance Overview"
            subtitle="Comparing test averages vs attendance across your mentoring cohorts"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={batchPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="batch" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="avgScore" fill="#2563eb" radius={[6, 6, 0, 0]} name="Avg Test Score %" />
                <Bar dataKey="attendance" fill="#10b981" radius={[6, 6, 0, 0]} name="Attendance Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Quick Access Actions Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <h4 className="font-bold text-base text-slate-900 dark:text-white">
          Faculty Tools & Shortcuts
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
          <button
            onClick={() => navigate('/teacher/attendance')}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200/80 dark:border-slate-700 text-left transition-colors space-y-1"
          >
            <CalendarCheck className="w-5 h-5 text-blue-600 mb-1" />
            <p className="text-slate-900 dark:text-white">Take Attendance</p>
            <p className="text-[10px] text-slate-400 font-normal">Present/Absent logger</p>
          </button>

          <button
            onClick={() => navigate('/teacher/assignments')}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200/80 dark:border-slate-700 text-left transition-colors space-y-1"
          >
            <FileText className="w-5 h-5 text-purple-600 mb-1" />
            <p className="text-slate-900 dark:text-white">Create Assignment</p>
            <p className="text-[10px] text-slate-400 font-normal">Homework & problem sets</p>
          </button>

          <button
            onClick={() => navigate('/teacher/materials')}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200/80 dark:border-slate-700 text-left transition-colors space-y-1"
          >
            <BookOpen className="w-5 h-5 text-emerald-600 mb-1" />
            <p className="text-slate-900 dark:text-white">Upload Notes / PDFs</p>
            <p className="text-[10px] text-slate-400 font-normal">Digital study vault</p>
          </button>

          <button
            onClick={() => navigate('/teacher/tests')}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200/80 dark:border-slate-700 text-left transition-colors space-y-1"
          >
            <HelpCircle className="w-5 h-5 text-amber-600 mb-1" />
            <p className="text-slate-900 dark:text-white">Build Mock Test</p>
            <p className="text-[10px] text-slate-400 font-normal">Questions & answers</p>
          </button>
        </div>
      </div>
    </div>
  );
};
