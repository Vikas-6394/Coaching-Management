import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import { FormInput } from '../../components/FormInput';
import { StatusBadge } from '../../components/StatusBadge';
import { DataTable } from '../../components/DataTable';
import { HelpCircle, Plus, Award, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';

export const AdminExams = () => {
  const { tests, addMockTest, testResults, courses } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    courseId: "CRS-001",
    durationMinutes: 15,
    difficulty: "Advanced",
    totalMarks: 20,
    passingMarks: 10,
    questionText: "",
    optA: "",
    optB: "",
    optC: "",
    optD: "",
    correct: 0,
    explanation: ""
  });

  const handleCreateTest = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please provide an examination title.");
      return;
    }

    const courseObj = courses.find(c => c.id === formData.courseId);

    const questions = [
      {
        id: 1,
        question: formData.questionText || "What is the dimensional formula of universal gravitational constant G?",
        options: [
          formData.optA || "[M^-1 L^3 T^-2]",
          formData.optB || "[M^1 L^2 T^-2]",
          formData.optC || "[M^-1 L^2 T^-1]",
          formData.optD || "[M^0 L^3 T^-2]"
        ],
        correctOption: Number(formData.correct) || 0,
        explanation: formData.explanation || "From F = G*(m1*m2)/r^2, G = F*r^2 / m^2 = [M L T^-2] * [L^2] / [M^2] = [M^-1 L^3 T^-2]."
      }
    ];

    addMockTest({
      title: formData.title,
      courseId: formData.courseId,
      courseName: courseObj?.title || "Engineering Entrance Batch",
      durationMinutes: Number(formData.durationMinutes),
      difficulty: formData.difficulty,
      totalMarks: Number(formData.totalMarks),
      passingMarks: Number(formData.passingMarks),
      totalQuestions: questions.length,
      questions
    });

    toast.success(`Exam "${formData.title}" published for batch!`, "Exam Scheduled");
    setIsModalOpen(false);
  };

  const resultColumns = [
    {
      key: "date",
      label: "Date",
      render: (val) => <span className="font-mono text-xs">{val}</span>
    },
    {
      key: "testTitle",
      label: "Exam Title",
      render: (val) => <strong className="text-slate-900 dark:text-white font-bold">{val}</strong>
    },
    {
      key: "studentId",
      label: "Student ID",
      render: (val) => <span className="font-mono text-xs font-semibold">{val}</span>
    },
    {
      key: "score",
      label: "Score",
      render: (val, row) => <span className="font-bold text-blue-600">{val} / {row.totalMarks}</span>
    },
    {
      key: "percentage",
      label: "Percentage",
      render: (val) => <span className="font-bold">{val}%</span>
    },
    {
      key: "status",
      label: "Status",
      render: (val) => <StatusBadge status={val} size="sm" />
    }
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Examination & Test Series Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Schedule institute mock tests, author MCQ question banks, and analyze student test scores.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Exam</span>
        </button>
      </div>

      {/* Tests Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Active Test Series Catalog ({tests.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tests.map((test) => (
            <div
              key={test.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {test.courseName}
                  </span>
                  <StatusBadge status={test.difficulty || "Advanced"} size="sm" />
                </div>

                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {test.title}
                </h4>

                <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center text-xs font-semibold">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Time</span>
                    {test.durationMinutes}m
                  </div>
                  <div className="border-x border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 text-[10px] uppercase block">Marks</span>
                    {test.totalMarks}
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Pass</span>
                    {test.passingMarks}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{test.questions?.length || 5} Questions Configured</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Deployed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Test Submissions Table */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Student Examination Submissions & Scorecards
        </h3>
        <DataTable
          columns={resultColumns}
          data={testResults}
          searchPlaceholder="Search student, test title, status..."
          itemsPerPage={5}
        />
      </div>

      {/* Create Exam Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Schedule New Examination"
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleCreateTest} className="space-y-4">
            <FormInput
              label="Exam Title"
              placeholder="e.g. All-India Grand Rank Booster Mock #01"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Target Batch"
                type="select"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                options={courses.map(c => ({ value: c.id, label: c.title }))}
              />

              <FormInput
                label="Duration (Minutes)"
                type="number"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Total Marks"
                type="number"
                value={formData.totalMarks}
                onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                required
              />

              <FormInput
                label="Passing Marks"
                type="number"
                value={formData.passingMarks}
                onChange={(e) => setFormData({ ...formData, passingMarks: Number(e.target.value) })}
                required
              />
            </div>

            <FormInput
              label="Sample MCQ Question Statement"
              placeholder="Enter question text..."
              value={formData.questionText}
              onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-3 text-xs">
              <FormInput
                label="Option A"
                placeholder="Option A text"
                value={formData.optA}
                onChange={(e) => setFormData({ ...formData, optA: e.target.value })}
              />
              <FormInput
                label="Option B"
                placeholder="Option B text"
                value={formData.optB}
                onChange={(e) => setFormData({ ...formData, optB: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              >
                Deploy Exam
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
