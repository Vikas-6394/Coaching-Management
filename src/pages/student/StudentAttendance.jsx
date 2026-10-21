import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import { ChartCard } from '../../components/ChartCard';
import { StatusBadge } from '../../components/StatusBadge';
import { DataTable } from '../../components/DataTable';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Search
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

export const StudentAttendance = () => {
  const { attendance } = useData();
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter attendance for student STU-001
  const studentRecords = attendance.filter(a => a.studentId === "STU-001");

  const totalClasses = studentRecords.length || 1;
  const presentCount = studentRecords.filter(a => a.status === "Present").length;
  const absentCount = studentRecords.filter(a => a.status === "Absent").length;
  const lateCount = studentRecords.filter(a => a.status === "Late").length;
  const attendanceRate = Math.round((presentCount / totalClasses) * 100);

  // Subject options
  const subjects = useMemo(() => {
    return Array.from(new Set(studentRecords.map(r => r.subject)));
  }, [studentRecords]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return studentRecords.filter(r => {
      const matchSubject = selectedSubject === "All" || r.subject === selectedSubject;
      const matchStart = !startDate || r.date >= startDate;
      const matchEnd = !endDate || r.date <= endDate;
      return matchSubject && matchStart && matchEnd;
    });
  }, [studentRecords, selectedSubject, startDate, endDate]);

  const monthlyAttendanceData = [
    { month: "May", present: 22, absent: 2 },
    { month: "Jun", present: 24, absent: 1 },
    { month: "Jul", present: 20, absent: 3 },
    { month: "Aug", present: 25, absent: 1 },
    { month: "Sep", present: 23, absent: 2 },
    { month: "Oct", present: 21, absent: 1 }
  ];

  const columns = [
    {
      key: "date",
      label: "Date",
      render: (val) => <span className="font-mono text-xs font-semibold">{val}</span>
    },
    {
      key: "subject",
      label: "Subject & Lecture",
      render: (val) => <strong className="text-slate-800 dark:text-slate-200">{val}</strong>
    },
    {
      key: "status",
      label: "Status",
      render: (val) => <StatusBadge status={val} size="sm" />
    },
    {
      key: "remark",
      label: "Remarks / Notes",
      render: (val) => <span className="text-xs text-slate-500">{val || "Regular"}</span>
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Attendance Analytics & Records
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review your biometric and classroom attendance record, monthly trends, and lecture logs.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Attendance"
          value={`${attendanceRate}%`}
          trend="+3% vs Batch Avg"
          trendDirection="up"
          icon={CalendarCheck}
          color="blue"
        />
        <StatCard
          title="Present Lectures"
          value={presentCount}
          subtitle={`Out of ${totalClasses} total`}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Absent / Leaves"
          value={absentCount}
          subtitle="Medical & Informed"
          icon={XCircle}
          color="rose"
        />
        <StatCard
          title="Late Check-ins"
          value={lateCount}
          subtitle="Under 15 mins"
          icon={Clock}
          color="amber"
        />
      </div>

      {/* Monthly Chart */}
      <ChartCard
        title="Monthly Classroom Attendance Trend"
        subtitle="Ratio of attended lectures vs absent sessions"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="present" fill="#2563eb" radius={[6, 6, 0, 0]} name="Present Lectures" />
            <Bar dataKey="absent" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Absent Lectures" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-600 dark:text-slate-300">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Subjects</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600 dark:text-slate-300">From:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="py-1 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600 dark:text-slate-300">To:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="py-1 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        {(selectedSubject !== "All" || startDate || endDate) && (
          <button
            onClick={() => { setSelectedSubject("All"); setStartDate(""); setEndDate(""); }}
            className="text-blue-600 hover:underline font-semibold"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Attendance History Table */}
      <DataTable
        columns={columns}
        data={filteredRecords}
        searchPlaceholder="Search by subject, remark, date..."
        itemsPerPage={6}
      />
    </div>
  );
};
