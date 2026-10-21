import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import { FormInput } from '../../components/FormInput';
import { StatusBadge } from '../../components/StatusBadge';
import { HelpCircle, Plus, Clock, Award, Users, CheckCircle2 } from 'lucide-react';

export const TeacherTests = () => {
  const { tests, addMockTest, testResults, courses } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    courseId: "CRS-001",
    durationMinutes: 15,
    difficulty: "Medium",
    passingMarks: 10,
    totalMarks: 20,
    q1_text: "",
    q1_optA: "",
    q1_optB: "",
    q1_optC: "",
    q1_optD: "",
    q1_correct: 0,
    q1_explanation: ""
  });

  const handleCreateTest = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a test title.");
      return;
    }

    const courseObj = courses.find(c => c.id === formData.courseId);

    // Build sample questions array
    const sampleQuestions = [
      {
        id: 1,
        question: formData.q1_text || "What is the SI unit of magnetic flux density?",
        options: [
          formData.q1_optA || "Tesla (T)",
          formData.q1_optB || "Weber (Wb)",
          formData.q1_optC || "Henry (H)",
          formData.q1_optD || "Gauss (G)"
        ],
        correctOption: Number(formData.q1_correct) || 0,
        explanation: formData.q1_explanation || "Magnetic flux density B is measured in Tesla (T), where 1 T = 1 Wb/m^2."
      },
      {
        id: 2,
        question: "In simple harmonic motion, at what position is the kinetic energy maximum?",
        options: [
          "Mean position (equilibrium)",
          "Extreme positive amplitude",
          "Extreme negative amplitude",
          "Halfway to amplitude"
        ],
        correctOption: 0,
        explanation: "At the mean position x = 0, potential energy is zero and velocity is maximum (v = ω*A), hence KE is maximum."
      }
    ];

    addMockTest({
      title: formData.title,
      courseId: formData.courseId,
      courseName: courseObj?.title || "Physics Special Batch",
      durationMinutes: Number(formData.durationMinutes),
      difficulty: formData.difficulty,
      passingMarks: Number(formData.passingMarks),
      totalMarks: Number(formData.totalMarks),
      totalQuestions: sampleQuestions.length,
      questions: sampleQuestions
    });

    toast.success(`Mock Test "${formData.title}" published for students!`, "Test Created");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mock Test Authoring & Results Console
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Author computer-based tests, configure multiple-choice options, and inspect student score averages.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Test</span>
        </button>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test) => {
          const resultsForThisTest = testResults.filter(r => r.testId === test.id);
          const avgScore = resultsForThisTest.length > 0
            ? Math.round(resultsForThisTest.reduce((acc, curr) => acc + curr.percentage, 0) / resultsForThisTest.length)
            : 80;

          return (
            <div
              key={test.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {test.courseName}
                  </span>
                  <StatusBadge status={test.difficulty || "Medium"} size="sm" />
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {test.title}
                </h3>

                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Duration</span>
                    <strong className="text-slate-800 dark:text-slate-200">{test.durationMinutes}m</strong>
                  </div>
                  <div className="border-x border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 text-[10px] uppercase block">Questions</span>
                    <strong className="text-slate-800 dark:text-slate-200">{test.totalQuestions || test.questions?.length}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Passing</span>
                    <strong className="text-slate-800 dark:text-slate-200">{test.passingMarks}/{test.totalMarks}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Class Average: <strong className="text-blue-600 dark:text-blue-400">{avgScore}%</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Published
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Test Creation Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Author New Mock Test"
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleCreateTest} className="space-y-4">
            <FormInput
              label="Mock Test Title"
              placeholder="e.g. JEE Advanced Full Electrodynamics Drill #05"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <FormInput
                label="Target Course"
                type="select"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                options={[
                  { value: "CRS-001", label: "JEE Advanced Pinnacle Batch" },
                  { value: "CRS-003", label: "Class 12 Boards Accelerator" }
                ]}
              />

              <FormInput
                label="Duration (Mins)"
                type="number"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                required
              />

              <FormInput
                label="Difficulty Level"
                type="select"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                options={["Easy", "Medium", "Advanced"]}
              />
            </div>

            {/* Question Builder Item */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Question #1 Configuration
              </span>

              <FormInput
                label="Question Statement"
                placeholder="Enter prompt (e.g. What is the SI unit of magnetic flux density?)"
                value={formData.q1_text}
                onChange={(e) => setFormData({ ...formData, q1_text: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3 text-xs">
                <FormInput
                  label="Option A"
                  placeholder="Tesla (T)"
                  value={formData.q1_optA}
                  onChange={(e) => setFormData({ ...formData, q1_optA: e.target.value })}
                />
                <FormInput
                  label="Option B"
                  placeholder="Weber (Wb)"
                  value={formData.q1_optB}
                  onChange={(e) => setFormData({ ...formData, q1_optB: e.target.value })}
                />
                <FormInput
                  label="Option C"
                  placeholder="Henry (H)"
                  value={formData.q1_optC}
                  onChange={(e) => setFormData({ ...formData, q1_optC: e.target.value })}
                />
                <FormInput
                  label="Option D"
                  placeholder="Gauss (G)"
                  value={formData.q1_optD}
                  onChange={(e) => setFormData({ ...formData, q1_optD: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="Correct Option Index"
                  type="select"
                  value={formData.q1_correct}
                  onChange={(e) => setFormData({ ...formData, q1_correct: Number(e.target.value) })}
                  options={[
                    { value: 0, label: "Option A" },
                    { value: 1, label: "Option B" },
                    { value: 2, label: "Option C" },
                    { value: 3, label: "Option D" }
                  ]}
                />
                <FormInput
                  label="Step-by-step Solution"
                  placeholder="Formula breakdown or explanation..."
                  value={formData.q1_explanation}
                  onChange={(e) => setFormData({ ...formData, q1_explanation: e.target.value })}
                />
              </div>
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
                Save & Deploy Test
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
