import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { StatCard } from '../../components/StatCard';
import { CalendarCheck, CheckCircle2, XCircle, Clock, Filter } from 'lucide-react';

export const AdminAttendance = () => {
  const { attendance, courses } = useData();
  const toast = useToast();

  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const totalLogs = attendance.length;
  const presentCount = attendance.filter(a => a.status === "Present").length;
  const absentCount = attendance.filter(a => a.status === "Absent").length;
  const overallRate = totalLogs > 0 ? Math.round((presentCount / totalLogs) * 100) : 92;

  const filteredLogs = useMemo(() => {
    return attendance.filter(a => {
      const matchCourse = selectedCourse === "All" || a.courseId === selectedCourse;
      const matchStatus = selectedStatus === "All" || a.status === selectedStatus;
      return matchCourse && matchStatus;
    });
  }, [attendance, selectedCourse, selectedStatus]);

  const columns = [
    {
      key: "date",
      label: "Date",
      render: (val) => <span className="font-mono text-xs font-semibold">{val}</span>
    },
    {
      key: "studentName",
      label: "Student Name",
      render: (val, row) => (
        <div>
          <strong className="text-slate-900 dark:text-white block font-bold">{val}</strong>
          <span className="text-[11px] text-slate-400 font-mono">{row.studentId}</span>
        </div>
      )
    },
    {
      key: "subject",
      label: "Subject & Lecture",
      render: (val) => <span className="text-xs font-semibold">{val}</span>
    },
    {
      key: "status",
      label: "Status",
      render: (val) => <StatusBadge status={val} size="sm" />
    },
    {
      key: "remark",
      label: "Remark",
      render: (val) => <span className="text-xs text-slate-500">{val || "Regular"}</span>
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Institute Attendance Audit & Registers
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review biometric compliance and faculty lecture attendance across all academic cohorts.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          title="Overall Attendance Rate"
          value={`${overallRate}%`}
          trend="+2% this week"
          trendDirection="up"
          icon={CalendarCheck}
          color="blue"
        />
        <StatCard
          title="Total Recorded Entries"
          value={totalLogs}
          subtitle="Biometric & classroom"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Total Absences"
          value={absentCount}
          subtitle="Leaves flagged"
          icon={XCircle}
          color="rose"
        />
        <StatCard
          title="Active Batches"
          value={courses.length}
          subtitle="Across all departments"
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Course Filter:</span>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="All">All Courses</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="All">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
          </div>
        </div>

        <span className="text-slate-400 font-medium">
          Showing {filteredLogs.length} attendance records
        </span>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredLogs}
        searchPlaceholder="Search student name, roll, remark..."
        itemsPerPage={8}
      />
    </div>
  );
};
