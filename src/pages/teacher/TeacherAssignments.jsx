import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import { FormInput } from '../../components/FormInput';
import { FileText, Plus, Calendar, CheckCircle2, Users, Clock } from 'lucide-react';

export const TeacherAssignments = () => {
  const { assignments, addAssignment, courses } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    courseId: "CRS-001",
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    totalMarks: 50,
    description: ""
  });

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter an assignment title.");
      return;
    }

    const courseObj = courses.find(c => c.id === formData.courseId);

    addAssignment({
      ...formData,
      courseName: courseObj?.title || "Physics Special Batch"
    });

    toast.success(`Assignment "${formData.title}" published to student portal!`, "Assignment Created");
    setIsModalOpen(false);
    setFormData({
      title: "",
      courseId: "CRS-001",
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      totalMarks: 50,
      description: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Assignments & Homework Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Publish problem sets, track student submissions, and set scoring benchmarks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((asg) => {
          const submissionRate = Math.round((asg.submittedCount / (asg.totalStudents || 35)) * 100);
          return (
            <div
              key={asg.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {asg.courseName}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border">
                    {asg.totalMarks} Marks
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {asg.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {asg.description}
                </p>

                {/* Submission progress */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Student Submissions</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {asg.submittedCount} / {asg.totalStudents || 35} ({submissionRate}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${submissionRate}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" /> Due: {asg.dueDate}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Published
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Assignment Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Student Assignment"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <FormInput
              label="Assignment Title"
              placeholder="e.g. Kinematics & Relative Velocity Problem Set"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
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
                label="Submission Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>

            <FormInput
              label="Total Marks"
              type="number"
              value={formData.totalMarks}
              onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
              required
            />

            <FormInput
              label="Instructions & Problem List"
              type="textarea"
              rows={3}
              placeholder="Specify question numbers, reference textbooks, or upload instructions..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

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
                Publish Assignment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
