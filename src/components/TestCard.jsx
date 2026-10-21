import React from 'react';
import { Clock, HelpCircle, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { useNavigate } from 'react-router-dom';

export const TestCard = ({ test, pastResult }) => {
  const navigate = useNavigate();
  const isCompleted = !!pastResult;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <StatusBadge status={test.difficulty || "Medium"} size="sm" />
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          ) : (
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              Ready to Take
            </span>
          )}
        </div>

        <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
          {test.title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {test.courseName}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 py-3 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{test.durationMinutes}m</p>
            <p className="text-[10px] text-slate-400 uppercase">Duration</p>
          </div>
          <div className="border-x border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{test.totalQuestions || test.questions?.length}</p>
            <p className="text-[10px] text-slate-400 uppercase">Questions</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <Award className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{test.totalMarks} pts</p>
            <p className="text-[10px] text-slate-400 uppercase">Total Marks</p>
          </div>
        </div>

        {/* Past Result Summary if taken */}
        {pastResult && (
          <div className="mt-3 p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-xs">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Your Last Score</p>
              <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                {pastResult.score} / {pastResult.totalMarks} ({pastResult.percentage}%)
              </p>
            </div>
            <div className="text-right">
              <span className="font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border text-blue-700 dark:text-blue-300">
                Grade: {pastResult.grade}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={() => navigate(`/student/tests/${test.id}`)}
          className={`w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl shadow-xs transition-all ${
            isCompleted
              ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:scale-101'
          }`}
        >
          <span>{isCompleted ? "Retake Mock Test" : "Start Mock Test"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
