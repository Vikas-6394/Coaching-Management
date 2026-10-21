import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import { FormInput } from '../../components/FormInput';
import { StatusBadge } from '../../components/StatusBadge';
import { Bell, Plus, Trash2, Calendar, User } from 'lucide-react';

export const TeacherAnnouncements = () => {
  const { announcements, addAnnouncement, deleteAnnouncement } = useData();
  const { user } = useAuth();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    priority: "Normal",
    content: ""
  });

  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please enter both title and announcement message.");
      return;
    }

    addAnnouncement({
      ...formData,
      author: user?.name || "Faculty Physics Lead"
    });

    toast.success("Announcement broadcasted to student portals!", "Notice Published");
    setIsModalOpen(false);
    setFormData({
      title: "",
      category: "General",
      priority: "Normal",
      content: ""
    });
  };

  const handleDelete = (id, title) => {
    deleteAnnouncement(id);
    toast.info(`Deleted announcement "${title}".`);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Faculty Notices & Class Broadcasts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Send immediate lecture updates, formula sheet releases, and extra class schedules to students.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Announcement</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusBadge status={item.category} size="sm" />
                  {item.priority === 'Urgent' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 border border-rose-300">
                      URGENT
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                  title="Delete notice"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Author: {item.author}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" /> {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Post Class Announcement"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleCreateNotice} className="space-y-4">
            <FormInput
              label="Notice Headline"
              placeholder="e.g. Extra Problem-Solving Class Scheduled for Friday"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Category"
                type="select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={["General", "Exam", "Holiday", "Urgent"]}
              />

              <FormInput
                label="Priority Level"
                type="select"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                options={["Normal", "Urgent"]}
              />
            </div>

            <FormInput
              label="Announcement Content"
              type="textarea"
              rows={4}
              placeholder="Provide complete details, timings, prerequisites, or room locations..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                Publish Notice
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
