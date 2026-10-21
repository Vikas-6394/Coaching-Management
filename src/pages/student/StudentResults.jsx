import React from 'react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import { ChartCard } from '../../components/ChartCard';
import { StatusBadge } from '../../components/StatusBadge';
import { DataTable } from '../../components/DataTable';
import { Award, TrendingUp, CheckCircle2, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const StudentResults = () => {
  const { testResults } = useData();

  const totalAttempts = testResults.length;
  const bestScore = testResults.length > 0
    ? Math.max(...testResults.map(r => r.percentage))
    : 0;

  const averageScore = testResults.length > 0
    ? Math.round(testResults.reduce((acc, curr) => acc + curr.percentage, 0) / testResults.length)
    : 0;

  const subjectPerformanceData = [
    { subject: "Physics", avg: 84, target: 90 },
    { subject: "Chemistry", avg: 78, target: 85 },
    { subject: "Mathematics", avg: 88, target: 90 },
    { subject: "Biology", avg: 92, target: 95 }
  ];

  const columns = [
    {
      key: "date",
      label: "Exam Date",
      render: (val) => <span className="font-mono text-xs font-semibold">{val}</span>
    },
    {
      key: "testTitle",
      label: "Mock Test Title",
      render: (val) => <strong className="text-slate-800 dark:text-slate-200">{val}</strong>
    },
    {
      key: "score",
      label: "Raw Score",
      render: (val, row) => (
        <span className="font-bold text-blue-600 dark:text-blue-400">
          {val} / {row.totalMarks}
        </span>
      )
    },
    {
      key: "percentage",
      label: "Percentage",
      render: (val) => <span className="font-bold">{val}%</span>
    },
    {
      key: "grade",
      label: "Grade",
      render: (val) => (
        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {val}
        </span>
      )
    },
    {
      key: "status",
      label: "Result Status",
      render: (val) => <StatusBadge status={val} size="sm" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Performance & Test Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Detailed breakdown of completed entrance mock tests, percentile ranks, and subject mastery.
          </p>
        </div>
        <Link
          to="/student/tests"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs self-start sm:self-auto"
        >
          <span>Take Another Test</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Tests Completed"
          value={totalAttempts}
          subtitle="Diagnostic drills logged"
          icon={CheckCircle2}
          color="blue"
        />
        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          trend="+8% from initial mock"
          trendDirection="up"
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard
          title="Best Performance"
          value={`${bestScore}%`}
          subtitle="Grade A+ in Physics"
          icon={Award}
          color="purple"
        />
      </div>

      {/* Subject Performance Chart */}
      <ChartCard
        title="Subject-wise Diagnostic Performance"
        subtitle="Current test average score vs target threshold for JEE/NEET qualification"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={subjectPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis domain={[50, 100]} stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="avg" fill="#2563eb" radius={[6, 6, 0, 0]} name="Your Avg Score %" />
            <Bar dataKey="target" fill="#a855f7" radius={[6, 6, 0, 0]} name="Target Cutoff %" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Recent Results Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          All Test Result Logs
        </h3>
        <DataTable
          columns={columns}
          data={testResults}
          searchPlaceholder="Search by test name, date, grade..."
          itemsPerPage={5}
        />
      </div>
    </div>
  );
};
