import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { StatusBadge } from '../../components/StatusBadge';
import confetti from 'canvas-confetti';
import {
  Clock,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  BookOpen,
  ChevronRight
} from 'lucide-react';

export const StudentTestRunner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tests, saveTestResult } = useData();
  const toast = useToast();

  const test = tests.find((t) => t.id === id) || tests[0];

  // Questions and state
  const questions = test?.questions || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: selectedOptionIndex }
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [resultSummary, setResultSummary] = useState(null);

  // Countdown timer in seconds
  const [timeLeft, setTimeLeft] = useState((test?.durationMinutes || 15) * 60);

  useEffect(() => {
    if (isTestSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestSubmitted]);

  // Format time MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId, optionIndex) => {
    if (isTestSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleClearAnswer = (questionId) => {
    if (isTestSubmitted) return;
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const handleSubmitTest = (autoSubmitted = false) => {
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    const marksPerQuestion = Math.round(test.totalMarks / questions.length) || 4;

    questions.forEach((q) => {
      const selected = answers[q.id];
      if (selected !== undefined) {
        if (selected === q.correctOption) {
          score += marksPerQuestion;
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const percentage = Math.round((score / test.totalMarks) * 100);
    let grade = "C";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B+";
    else if (percentage >= 60) grade = "B";

    const passed = score >= (test.passingMarks || 10);

    const summary = {
      testId: test.id,
      testTitle: test.title,
      studentId: "STU-001",
      score,
      totalMarks: test.totalMarks,
      percentage,
      grade,
      status: passed ? "Passed" : "Failed",
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      totalQuestions: questions.length,
      unanswered: questions.length - (correctCount + wrongCount)
    };

    saveTestResult(summary);
    setResultSummary(summary);
    setIsTestSubmitted(true);
    setIsSubmitModalOpen(false);

    if (passed) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log("Confetti triggered");
      }
      toast.success(
        `Congratulations! You passed with ${score}/${test.totalMarks} (${percentage}% - Grade ${grade}).`,
        "Test Submitted"
      );
    } else {
      toast.warning(
        `Test finished. Score: ${score}/${test.totalMarks} (${percentage}%). Review explanations below!`,
        "Test Completed"
      );
    }
  };

  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Test Control Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            {test.courseName}
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {test.title}
          </h2>
        </div>

        {!isTestSubmitted && (
          <div className="flex items-center gap-4 shrink-0">
            {/* Live Countdown Timer */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-extrabold text-sm sm:text-base ${
                timeLeft < 120
                  ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/60 dark:border-rose-800 animate-pulse'
                  : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102"
            >
              Finish & Submit
            </button>
          </div>
        )}
      </div>

      {/* Main Runner Body or Result Summary */}
      {!isTestSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Viewer (Left 8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-400">
                Marks: +{Math.round(test.totalMarks / questions.length)} / 0
              </span>
            </div>

            {/* Question Text */}
            <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentQ?.question}
            </p>

            {/* Multiple Choice Options */}
            <div className="space-y-3 pt-2">
              {currentQ?.options?.map((opt, optIdx) => {
                const isSelected = answers[currentQ.id] === optIdx;
                const optionLetters = ["A", "B", "C", "D"];
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`p-4 rounded-2xl border text-sm flex items-center gap-3.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 text-blue-950 dark:text-blue-100 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {optionLetters[optIdx]}
                    </span>
                    <span className="font-medium leading-relaxed">{opt}</span>
                  </div>
                );
              })}
            </div>

            {/* Navigation and Clear Controls */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </button>
                <button
                  type="button"
                  onClick={() => handleClearAnswer(currentQ.id)}
                  disabled={answers[currentQ.id] === undefined}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 transition-colors"
                >
                  Clear Selection
                </button>
              </div>

              <div className="flex items-center gap-2">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex((i) => Math.min(questions.length - 1, i + 1))}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                  >
                    <span>Review & Submit</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Palette (Right 4 Cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Question Navigator
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = answers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900'
                        : ''
                    } ${
                      isAnswered
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-blue-600" /> Answered
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-700" /> Unanswered
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {questions.length - answeredCount}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-bold text-xs transition-colors"
              >
                Submit Test Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Detailed Score Card & Explanations */
        <div className="space-y-8 animate-in fade-in-50 duration-500">
          {/* Result Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Diagnostic Result Report
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {test.title}
                </h3>
              </div>
              <StatusBadge status={resultSummary?.status} size="lg" />
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60">
                <p className="text-xs text-slate-400 font-semibold">Total Score</p>
                <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {resultSummary?.score} / {resultSummary?.totalMarks}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-100 dark:border-purple-900/60">
                <p className="text-xs text-slate-400 font-semibold">Percentage</p>
                <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
                  {resultSummary?.percentage}%
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60">
                <p className="text-xs text-slate-400 font-semibold">Correct Answers</p>
                <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {resultSummary?.correctAnswers} / {resultSummary?.totalQuestions}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/60">
                <p className="text-xs text-slate-400 font-semibold">Incorrect / Skipped</p>
                <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
                  {resultSummary?.wrongAnswers + resultSummary?.unanswered}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setIsTestSubmitted(false);
                  setCurrentQuestionIndex(0);
                  setTimeLeft((test?.durationMinutes || 15) * 60);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Test
              </button>

              <button
                type="button"
                onClick={() => navigate('/student/results')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>View Results Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Solutions & Explanations Review */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Detailed Question Review & Explanations
            </h4>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const selected = answers[q.id];
                const isCorrect = selected === q.correctOption;
                const wasAttempted = selected !== undefined;

                return (
                  <div
                    key={q.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-400">
                        Question #{idx + 1}
                      </span>
                      {wasAttempted ? (
                        isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                          Skipped
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      {q.options?.map((opt, oIdx) => {
                        const isChosen = selected === oIdx;
                        const isRight = q.correctOption === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl border flex items-center justify-between ${
                              isRight
                                ? 'border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-semibold'
                                : isChosen
                                ? 'border-rose-400 bg-rose-50/60 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 line-through'
                                : 'border-slate-100 dark:border-slate-800 text-slate-500'
                            }`}
                          >
                            <span>{opt}</span>
                            {isRight && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                            {isChosen && !isRight && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-blue-600 dark:text-blue-400 block mb-0.5 font-bold">
                          Step-by-step Conceptual Solution:
                        </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={() => handleSubmitTest(false)}
        title="Submit Mock Examination"
        message={`You have answered ${answeredCount} out of ${questions.length} questions. Are you ready to submit your test? Your score will be calculated immediately.`}
        confirmText="Confirm & Calculate Score"
        confirmVariant="primary"
      />
    </div>
  );
};
