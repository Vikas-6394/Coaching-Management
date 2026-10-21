import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import { ChartCard } from '../../components/ChartCard';
import { StatusBadge } from '../../components/StatusBadge';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CalendarCheck,
  CreditCard,
  Award,
  ArrowRight,
  Clock,
  Bell,
  HelpCircle,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { courses, attendance, fees, tests, testResults, announcements } = useData();
  const navigate = useNavigate();

  // Find enrolled courses for this student
  const studentCourses = courses.filter(c =>
    c.id === "CRS-001" || c.id === "CRS-003"
  );

  // Student specific attendance
  const studentAttendance = attendance.filter(a => a.studentId === "STU-001");
  const presentCount = studentAttendance.filter(a => a.status === "Present").length;
  const totalClasses = studentAttendance.length || 1;
  const attendanceRate = Math.round((presentCount / totalClasses) * 100);

  // Fee metrics
  const studentFees = fees.filter(f => f.studentId === "STU-001");
  const totalFee = 85000;
  const paidFee = studentFees
    .filter(f => f.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const pendingFee = Math.max(0, totalFee - paidFee);

  // Mock performance trend data
  const performanceData = [
    { month: "Jun", score: 68, attendance: 90 },
    { month: "Jul", score: 72, attendance: 92 },
    { month: "Aug", score: 78, attendance: 88 },
    { month: "Sep", score: 82, attendance: 95 },
    { month: "Oct", score: 86, attendance: 94 }
  ];

  const upcomingClasses = [
    { time: "09:00 AM - 11:00 AM", subject: "Advanced Physics", topic: "Rotational Dynamics & Moment of Inertia", instructor: "Dr. Rathore", room: "Lecture Hall A" },
    { time: "11:30 AM - 01:30 PM", subject: "Organic Chemistry", topic: "Carbonyl Compounds & Electrophilic Attack", instructor: "Prof. Deshpande", room: "Lab 2" },
    { time: "03:00 PM - 05:00 PM", subject: "Higher Mathematics", topic: "Definite Integrals as Limit of Sums", instructor: "Dr. Rao", room: "Hall B" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/15">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <span>{user?.batch || "JEE Advanced 2026"}</span>
              <span>•</span>
              <span>Roll: {user?.rollNumber || "2026-JEE-042"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              You are currently on track for Phase 2 test preparation. Your attendance is at {attendanceRate}% and you have 2 upcoming diagnostic tests this week.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <button
              onClick={() => navigate('/student/tests')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all hover:scale-102 flex items-center justify-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" /> Start Mock Test
            </button>
            <button
              onClick={() => navigate('/student/fees')}
              className="px-4 py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs border border-white/20 transition-all flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" /> Check Fees
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Enrolled Courses"
          value={studentCourses.length}
          subtitle="2 Active Batches"
          icon={BookOpen}
          color="blue"
          onClick={() => navigate('/student/courses')}
        />
        <StatCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          trend="+4% this month"
          trendDirection="up"
          icon={CalendarCheck}
          color="emerald"
          onClick={() => navigate('/student/attendance')}
        />
        <StatCard
          title="Pending Fees"
          value={pendingFee === 0 ? "All Paid" : `₹${pendingFee.toLocaleString('en-IN')}`}
          subtitle={pendingFee === 0 ? "No dues" : "Next due in 15 days"}
          icon={CreditCard}
          color={pendingFee === 0 ? "purple" : "amber"}
          onClick={() => navigate('/student/fees')}
        />
        <StatCard
          title="Mock Tests Taken"
          value={testResults.length}
          trend="80% avg score"
          trendDirection="up"
          icon={Award}
          color="rose"
          onClick={() => navigate('/student/results')}
        />
      </div>

      {/* Charts & Today's Schedule Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-8">
          <ChartCard
            title="Academic Performance & Attendance Trend"
            subtitle="Monthly progress across mock tests and classroom attendance"
            action={
              <Link
                to="/student/results"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Full Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="attColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis domain={[50, 100]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColor)" name="Test Score %" />
                <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#attColor)" name="Attendance %" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Today's Schedule Card */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Today's Class Schedule
              </h4>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                3 Classes
              </span>
            </div>

            <div className="space-y-3">
              {upcomingClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-900 dark:text-white">{cls.subject}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{cls.room}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 line-clamp-1">{cls.topic}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                      <Clock className="w-3 h-3" /> {cls.time}
                    </span>
                    <span>{cls.instructor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/student/attendance"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline block text-center"
            >
              View Full Attendance History →
            </Link>
          </div>
        </div>
      </div>

      {/* Announcements & Quick Actions Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Announcements */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-500" />
              <span>Important Announcements</span>
            </h4>
            <Link
              to="/student/announcements"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              All Notices ({announcements.length})
            </Link>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 2).map((a) => (
              <div
                key={a.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{a.title}</span>
                  <StatusBadge status={a.category} size="sm" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed pt-1">
                  {a.content}
                </p>
                <p className="text-[11px] text-slate-400 pt-1">
                  Posted by {a.author} on {a.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Resources Sidebar */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
          <h4 className="font-bold text-base text-slate-900 dark:text-white">
            Quick Actions
          </h4>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => navigate('/student/materials')}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200/80 dark:border-slate-700 text-left transition-colors font-semibold space-y-1"
            >
              <BookOpen className="w-4 h-4 text-blue-600 mb-1" />
              <p className="text-slate-800 dark:text-slate-200">Formula Sheets</p>
              <p className="text-[10px] text-slate-400 font-normal">PDFs & Notes</p>
            </button>

            <button
              onClick={() => navigate('/student/fees')}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200/80 dark:border-slate-700 text-left transition-colors font-semibold space-y-1"
            >
              <CreditCard className="w-4 h-4 text-purple-600 mb-1" />
              <p className="text-slate-800 dark:text-slate-200">Fee Invoices</p>
              <p className="text-[10px] text-slate-400 font-normal">Print Receipts</p>
            </button>

            <button
              onClick={() => navigate('/student/tests')}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200/80 dark:border-slate-700 text-left transition-colors font-semibold space-y-1"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600 mb-1" />
              <p className="text-slate-800 dark:text-slate-200">Mock Tests</p>
              <p className="text-[10px] text-slate-400 font-normal">Timed Drills</p>
            </button>

            <button
              onClick={() => navigate('/student/profile')}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200/80 dark:border-slate-700 text-left transition-colors font-semibold space-y-1"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-600 mb-1" />
              <p className="text-slate-800 dark:text-slate-200">My Profile</p>
              <p className="text-[10px] text-slate-400 font-normal">Edit Details</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
