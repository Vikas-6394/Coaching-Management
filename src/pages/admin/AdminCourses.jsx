import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormInput } from '../../components/FormInput';
import { StatusBadge } from '../../components/StatusBadge';
import { Layers, Plus, Edit, Trash2, Clock, BookOpen, Star, User } from 'lucide-react';

export const AdminCourses = () => {
  const { courses, addCourse, updateCourse, deleteCourse, teachers } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const initialForm = {
    title: "",
    category: "Engineering",
    tagline: "",
    description: "",
    duration: "12 Months",
    fee: 65000,
    level: "Advanced",
    instructor: "Dr. Vikramaditya Rathore",
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80"
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCourse(c);
    setFormData({
      title: c.title,
      category: c.category,
      tagline: c.tagline || "",
      description: c.description || "",
      duration: c.duration,
      fee: c.fee,
      level: c.level,
      instructor: c.instructor,
      badge: c.badge || "Bestseller",
      image: c.image
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a course title.");
      return;
    }

    if (editingCourse) {
      updateCourse(editingCourse.id, formData);
      toast.success(`Updated course "${formData.title}"!`, "Course Saved");
    } else {
      addCourse(formData);
      toast.success(`Created new course "${formData.title}"!`, "Course Created");
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!courseToDelete) return;
    deleteCourse(courseToDelete.id);
    toast.info(`Course "${courseToDelete.title}" removed.`);
    setCourseToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Course & Curriculum Catalog
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure coaching batches, tuition fees, module syllabi, and assigned lead mentors.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between overflow-hidden"
          >
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <StatusBadge status={course.badge || course.category} size="sm" />
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-slate-950/70 backdrop-blur-md text-white text-xs font-bold">
                ₹{Number(course.fee).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {course.tagline || course.description}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" /> {course.duration}
                  </span>
                  <span>{course.studentsEnrolled || 0} Enrolled</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 truncate max-w-[150px]">
                  {course.instructor}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(course)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                    title="Edit course"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCourseToDelete(course)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                    title="Delete course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Course Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingCourse ? "Edit Course Information" : "Create New Academic Course"}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Course Title"
              placeholder="e.g. JEE Advanced Pinnacle Batch"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Academic Category"
                type="select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={["Engineering", "Medical", "Board Exam", "Mathematics", "Technology", "Chemistry"]}
              />
              <FormInput
                label="Difficulty Level"
                type="select"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                options={["Beginner", "Intermediate", "Advanced", "Intensive"]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Tuition Fee (₹)"
                type="number"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: Number(e.target.value) })}
                required
              />
              <FormInput
                label="Duration"
                placeholder="e.g. 24 Months"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Lead Instructor"
                placeholder="Faculty name"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                required
              />
              <FormInput
                label="Promotional Badge"
                type="select"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                options={["Bestseller", "Top Rated", "Board Special", "Olympiad", "Trending", "AI Powered"]}
              />
            </div>

            <FormInput
              label="Description & Syllabus Highlights"
              type="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                {editingCourse ? "Save Course" : "Publish Course"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {courseToDelete && (
        <ConfirmDialog
          isOpen={!!courseToDelete}
          onClose={() => setCourseToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Academic Course"
          message={`Are you sure you want to remove "${courseToDelete.title}"? Any existing enrollments will be affected.`}
          confirmText="Delete Course"
          confirmVariant="danger"
        />
      )}
    </div>
  );
};
