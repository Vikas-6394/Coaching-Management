import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import { FormInput } from '../../components/FormInput';
import { StatusBadge } from '../../components/StatusBadge';
import { BookOpen, Upload, Trash2, FileText, Download, Calendar, User } from 'lucide-react';

export const TeacherMaterials = () => {
  const { studyMaterials, addStudyMaterial, deleteStudyMaterial, courses } = useData();
  const { user } = useAuth();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "Physics",
    courseId: "CRS-001",
    type: "PDF",
    size: "4.2 MB",
    badge: "Revision"
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a document title.");
      return;
    }

    const courseObj = courses.find(c => c.id === formData.courseId);

    addStudyMaterial({
      ...formData,
      courseName: courseObj?.title || "Physics Special",
      author: user?.name || "Dr. Vikramaditya Rathore"
    });

    toast.success(`Resource "${formData.title}" uploaded to student digital vault!`, "Material Uploaded");
    setIsModalOpen(false);
    setFormData({
      title: "",
      subject: "Physics",
      courseId: "CRS-001",
      type: "PDF",
      size: "4.2 MB",
      badge: "Revision"
    });
  };

  const handleDelete = (id, title) => {
    deleteStudyMaterial(id);
    toast.info(`Removed "${title}" from study materials.`);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Digital Study Materials & Notes Vault
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload chapter summaries, formula mind maps, and NCERT practice sheets for students.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102 self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Material</span>
        </button>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {studyMaterials.map((mat) => (
          <div
            key={mat.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-400">
                  {mat.type} • {mat.size}
                </span>
                <StatusBadge status={mat.badge || "Standard"} size="sm" />
              </div>

              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                  {mat.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {mat.courseName}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>By {mat.author}</span>
                <span className="font-mono text-[11px]">{mat.date}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {mat.downloadCount || 120} Downloads
              </span>
              <button
                type="button"
                onClick={() => handleDelete(mat.id, mat.title)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                title="Delete material"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Upload Study Resource"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <FormInput
              label="Resource Title"
              placeholder="e.g. Modern Physics Formula Sheet & Solved Numericals"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Subject"
                type="select"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                options={["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"]}
              />

              <FormInput
                label="Resource Type"
                type="select"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                options={["PDF", "Notes", "Slides", "Video"]}
              />
            </div>

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
                label="Priority Tag"
                type="select"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                options={["High Yield", "Must Read", "Revision", "Diagrams", "Standard"]}
              />
            </div>

            {/* Local File selection simulation */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Attach Local Document (Simulated)
              </label>
              <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Click to select file from your computer
                </p>
                <p className="text-[11px] text-slate-400">PDF, DOCX, PPT up to 25MB (Simulated storage)</p>
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
                Upload Resource
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
