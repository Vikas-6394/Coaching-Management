import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import { FormInput } from '../../components/FormInput';
import { StatusBadge } from '../../components/StatusBadge';
import { Briefcase, Plus, Edit, Phone, Mail, Award, CheckCircle } from 'lucide-react';

export const AdminTeachers = () => {
  const { teachers, addTeacher, updateTeacher } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    subject: "Physics",
    designation: "Senior Faculty Lead",
    experience: "10 Years",
    qualification: "M.Sc. / Ph.D.",
    bio: ""
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTeacher(t);
    setFormData({
      name: t.name,
      email: t.email,
      phone: t.phone,
      subject: t.subject,
      designation: t.designation,
      experience: t.experience,
      qualification: t.qualification,
      bio: t.bio || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please enter teacher name and email.");
      return;
    }

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, formData);
      toast.success(`Updated details for ${formData.name}!`, "Faculty Updated");
    } else {
      addTeacher({
        ...formData,
        assignedCourses: ["CRS-001"]
      });
      toast.success(`Appointed ${formData.name} to academic faculty!`, "Teacher Appointed");
    }

    setIsModalOpen(false);
  };

  const handleToggleStatus = (t) => {
    const nextStatus = t.activeStatus === "Active" ? "Inactive" : "Active";
    updateTeacher(t.id, { activeStatus: nextStatus });
    toast.info(`Updated status for ${t.name} to ${nextStatus}.`);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Faculty & Instructor Administration
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Oversee teaching staff credentials, subject allocations, and active status.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Appoint New Faculty</span>
        </button>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
                  />
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {t.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {t.subject}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{t.id}</p>
                  </div>
                </div>
                <StatusBadge status={t.activeStatus || "Active"} size="sm" />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{t.designation}</p>
                <p className="text-slate-500 dark:text-slate-400">{t.qualification}</p>
                <p className="text-[11px] text-slate-400 pt-1 font-mono">Experience: {t.experience}</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {t.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {t.phone}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleToggleStatus(t)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                {t.activeStatus === "Active" ? "Set Inactive" : "Set Active"}
              </button>

              <button
                type="button"
                onClick={() => handleOpenEdit(t)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingTeacher ? "Edit Faculty Details" : "Appoint New Faculty Member"}
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Faculty Full Name"
              placeholder="e.g. Dr. Ramesh Gupta"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Email"
                type="email"
                placeholder="faculty@edumanage.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <FormInput
                label="Phone"
                placeholder="+91 98000 11223"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Subject"
                type="select"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                options={["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"]}
              />
              <FormInput
                label="Experience"
                placeholder="e.g. 12 Years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>

            <FormInput
              label="Designation / Title"
              placeholder="e.g. Senior Faculty - Organic Chemistry"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              required
            />

            <FormInput
              label="Educational Qualifications"
              placeholder="e.g. Ph.D. Applied Physics (IIT Delhi)"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
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
                {editingTeacher ? "Save Changes" : "Appoint Faculty"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
