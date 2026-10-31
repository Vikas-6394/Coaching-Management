import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import { ChartCard } from '../../components/ChartCard';
import { StatusBadge } from '../../components/StatusBadge';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Layers,
  CreditCard,
  CalendarCheck,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Award,
  CheckCircle2,
  Clock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { students, teachers, courses, fees, attendance } = useData();
  const navigate = useNavigate();

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalCourses = courses.length;

  const totalFeesCollected = fees
    .filter(f => f.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalFeesPending = fees
    .filter(f => f.status !== "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const monthlyFinancialData = [
    { month: "May", collected: 450000, pending: 120000 },
    { month: "Jun", collected: 620000, pending: 150000 },
    { month: "Jul", collected: 890000, pending: 180000 },
    { month: "Aug", collected: 1100000, pending: 210000 },
    { month: "Sep", collected: 1350000, pending: 190000 },
    { month: "Oct", collected: 1650000, pending: 140000 }
  ];

  const recentActivities = [
    { type: "fee", text: "Fee payment of ₹45,000 recorded for Aarav Sharma", time: "10 mins ago", icon: CreditCard, color: "emerald" },
    { type: "student", text: "New admission: Zoya Khan enrolled in NEET Elite Medical", time: "1 hour ago", icon: Users, color: "blue" },
    { type: "test", text: "Mock Test #04 published by Dr. Vikramaditya Rathore", time: "3 hours ago", icon: Award, color: "purple" },
    { type: "attendance", text: "Biometric roll call finalized for JEE Advanced Pinnacle", time: "5 hours ago", icon: CalendarCheck, color: "amber" }
  ];

  return (
    <div className="space-y-6">
      {/* Admin Title Header with Executive Director Showcase */}
      <div className="rounded-3xl bg-gradient-to-r from-stone-950 via-rose-950 to-stone-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-rose-900/40">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Admin Photo with Online Status Indicator */}
            <div className="relative shrink-0">
              <img
                src={user?.avatar || "/admin-avatar.jpg"}
                alt={user?.name || "Vikas Maurya"}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-amber-500/40 shadow-2xl bg-stone-900"
              />
              <span
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 ring-2 ring-stone-900 flex items-center justify-center text-white"
                title="System Director - Online & Authenticated"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                  Executive Administration Console
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-semibold border border-rose-500/30">
                  Director: {user?.name || "Vikas Maurya"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Institute Operations & Financial Health 🏛️
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                Welcome, <span className="text-white font-bold">{user?.name || "Mr. Vikas Maurya"}</span> ({user?.designation || "Executive Director & System Administrator"}). Monitoring {totalStudents} active students, {totalTeachers} faculty members, and ₹{(totalFeesCollected / 100000).toFixed(2)} Lakhs in collections.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <button
              onClick={() => navigate('/admin/students')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 hover:from-amber-700 hover:to-rose-800 text-white font-bold text-xs shadow-md shadow-orange-600/25 transition-all hover:scale-102 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Users className="w-4 h-4" /> Manage Students
            </button>
            <button
              onClick={() => navigate('/admin/fees')}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs border border-stone-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" /> Financial Invoices
            </button>
          </div>
        </div>
      </div>

      {/* Top 5 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          trend="+12 this month"
          trendDirection="up"
          icon={Users}
          color="blue"
          onClick={() => navigate('/admin/students')}
        />
        <StatCard
          title="Faculty Mentors"
          value={totalTeachers}
          subtitle="All Active"
          icon={Briefcase}
          color="purple"
          onClick={() => navigate('/admin/teachers')}
        />
        <StatCard
          title="Active Batches"
          value={totalCourses}
          subtitle="Engineering & Medical"
          icon={Layers}
          color="emerald"
          onClick={() => navigate('/admin/courses')}
        />
        <StatCard
          title="Fees Collected"
          value={`₹${(totalFeesCollected / 1000).toFixed(0)}k`}
          trend="82% collection rate"
          trendDirection="up"
          icon={CreditCard}
          color="emerald"
          onClick={() => navigate('/admin/fees')}
        />
        <StatCard
          title="Pending Dues"
          value={`₹${(totalFeesPending / 1000).toFixed(0)}k`}
          subtitle="Under installment terms"
          icon={Clock}
          color="amber"
          onClick={() => navigate('/admin/fees')}
        />
      </div>

      {/* Main Charts & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Financial Flow Area Chart */}
        <div className="lg:col-span-8">
          <ChartCard
            title="Institute Revenue & Fee Realization Trend"
            subtitle="Monthly collection volume vs outstanding installment commitments (in ₹)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyFinancialData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="pendFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `₹${v / 1000}k`}
                />
                <Tooltip
                  formatter={(val) => `₹${Number(val).toLocaleString('en-IN')}`}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="collected" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colFlow)" name="Fee Collected" />
                <Area type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#pendFlow)" name="Pending Dues" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Recent Activities Timeline */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Recent Institute Activities
              </h4>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                Live Feed
              </span>
            </div>

            <div className="space-y-3.5">
              {recentActivities.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        {act.text}
                      </p>
                      <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                        {act.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              to="/admin/attendance"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Audit Institute Attendance Logs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
