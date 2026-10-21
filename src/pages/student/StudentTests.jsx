import React from 'react';
import { useData } from '../../context/DataContext';
import { TestCard } from '../../components/TestCard';
import { StatCard } from '../../components/StatCard';
import { Award, Clock, HelpCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentTests = () => {
  const { tests, testResults } = useData();

  const totalTests = tests.length;
  const completedTests = testResults.length;
  const avgScore = testResults.length > 0
    ? Math.round(testResults.reduce((acc, curr) => acc + curr.percentage, 0) / testResults.length)
    : 0;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Online Mock Tests & Diagnostic Drills
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Take computer-based mock tests with real-time countdown timers, negative marking simulations, and automatic score cards.
        </p>
      </div>

      {/* Top Test Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Available Mock Tests"
          value={totalTests}
          subtitle="Updated this week"
          icon={HelpCircle}
          color="blue"
        />
        <StatCard
          title="Tests Completed"
          value={completedTests}
          subtitle="Past attempts logged"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Average Performance"
          value={avgScore > 0 ? `${avgScore}%` : "Not taken"}
          trend="+5% improvement"
          trendDirection="up"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Available Tests Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Available Mock Tests
          </h3>
          <span className="text-xs text-slate-400">
            {totalTests} Tests Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => {
            const pastResult = testResults.find(r => r.testId === test.id);
            return (
              <TestCard
                key={test.id}
                test={test}
                pastResult={pastResult}
              />
            );
          })}
        </div>
      </div>

      {/* Past Results Section */}
      {testResults.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Test History
            </h3>
            <Link
              to="/student/results"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View In-Depth Performance Analytics →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testResults.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {res.testTitle}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Completed on {res.date} • {res.correctAnswers} Correct, {res.wrongAnswers} Incorrect
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                    {res.score}/{res.totalMarks}
                  </span>
                  <span className="block text-[11px] font-bold text-emerald-600">
                    Grade {res.grade} ({res.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
