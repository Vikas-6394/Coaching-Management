import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import { FormInput } from '../../components/FormInput';
import { StatusBadge } from '../../components/StatusBadge';
import { resizeImageFile } from '../../utils/imageUtils';
import {
  Briefcase,
  Plus,
  Edit,
  Phone,
  Mail,
  Award,
  CheckCircle,
  CheckCircle2,
  KeyRound,
  Copy,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Send,
  Camera,
  Upload,
  Trash2
} from 'lucide-react';

export const AdminTeachers = () => {
  const { teachers, addTeacher, updateTeacher } = useData();
  const { appointTeacherByAdmin, updateTeacherAvatar } = useAuth();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    loginId: "",
    password: "teacher123",
    subject: "Physics",
    designation: "Senior Faculty Lead",
    experience: "10 Years",
    qualification: "M.Sc. / Ph.D.",
    bio: "",
    avatar: "",
    customPhotoUploaded: false
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
      loginId: t.loginId || t.id || t.email,
      password: t.password || "teacher123",
      subject: t.subject,
      designation: t.designation,
      experience: t.experience,
      qualification: t.qualification,
      bio: t.bio || "",
      avatar: t.avatar || "",
      customPhotoUploaded: !!t.customPhotoUploaded
    });
    setIsModalOpen(true);
  };

  const handleGeneratePassword = () => {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
    let generated = "";
    for (let i = 0; i < 8; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password: generated }));
    toast.info(`Generated new secure password: ${generated}`, "Password Generated");
  };

  // Upload teacher photo directly from the teacher card (hides the upload button once uploaded)
  const handleUploadTeacherPhoto = async (teacherId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImageFile(file, 400, 400, 0.85);
      // Update in DataContext
      updateTeacher(teacherId, {
        avatar: dataUrl,
        customPhotoUploaded: true
      });
      // Update in AuthContext (so teacher login has this avatar)
      updateTeacherAvatar(teacherId, dataUrl, true);
      toast.success("Teacher photograph uploaded successfully! The upload option is now removed.", "Photo Uploaded");
    } catch (err) {
      toast.error(err.message || "Failed to process image.", "Image Error");
    }
  };

  // Delete/Remove teacher photo directly from the teacher card
  const handleDeleteTeacherPhoto = (teacherId, teacherName) => {
    const fallbackAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(teacherName || 'Teacher')}`;
    updateTeacher(teacherId, {
      avatar: fallbackAvatar,
      customPhotoUploaded: false
    });
    updateTeacherAvatar(teacherId, fallbackAvatar, false);
    toast.success(`Photograph deleted for ${teacherName}! Upload Img option is now restored.`, "Photo Deleted");
  };

  // Select photo inside the modal
  const handleTeacherModalPhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImageFile(file, 400, 400, 0.85);
      setFormData(prev => ({
        ...prev,
        avatar: dataUrl,
        customPhotoUploaded: true
      }));
      toast.success("Teacher photograph selected!", "Photo Ready");
    } catch (err) {
      toast.error(err.message || "Failed to process image.", "Image Error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please enter teacher name and email.");
      return;
    }

    const assignedLoginId = (formData.loginId || formData.email).trim();
    const assignedPassword = (formData.password || "teacher123").trim();

    // If avatar was cleared/deleted in formData, use default placeholder and mark customPhotoUploaded as false
    const defaultPlaceholder = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name.trim())}`;
    const targetAvatar = formData.avatar ? formData.avatar : defaultPlaceholder;
    const targetCustomUploaded = !!formData.avatar;

    const teacherPayload = {
      ...formData,
      loginId: assignedLoginId,
      password: assignedPassword,
      avatar: targetAvatar,
      customPhotoUploaded: targetCustomUploaded
    };

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, teacherPayload);
      appointTeacherByAdmin({
        id: editingTeacher.id,
        loginId: assignedLoginId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: assignedPassword,
        subject: formData.subject,
        qualification: formData.qualification,
        designation: formData.designation,
        avatar: teacherPayload.avatar
      });
      toast.success(
        `Updated credentials for ${formData.name}! (ID: ${assignedLoginId} | Password: ${assignedPassword})`,
        "Faculty Credentials Updated"
      );
    } else {
      const createdTeacher = addTeacher({
        ...teacherPayload,
        assignedCourses: ["CRS-001"]
      });
      appointTeacherByAdmin({
        id: createdTeacher.id,
        loginId: assignedLoginId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: assignedPassword,
        subject: formData.subject,
        qualification: formData.qualification,
        designation: formData.designation,
        avatar: teacherPayload.avatar
      });
      toast.success(
        `Teacher appointed with custom photo! Credentials: ID: ${assignedLoginId} | Password: ${assignedPassword}`,
        "Teacher Created Successfully"
      );
    }

    setIsModalOpen(false);
  };

  const handleToggleStatus = (t) => {
    const nextStatus = t.activeStatus === "Active" ? "Inactive" : "Active";
    updateTeacher(t.id, { activeStatus: nextStatus });
    toast.info(`Updated status for ${t.name} to ${nextStatus}.`);
  };

  const copyCredentials = (t) => {
    const idToUse = t.loginId || t.email || t.id;
    const passToUse = t.password || "teacher123";
    const message = `EduManage Teacher Portal Login Credentials:\nFaculty: ${t.name}\nLogin ID / Email: ${idToUse}\nPassword: ${passToUse}\nPortal Login URL: ${window.location.origin}/login\n(Issued by Institute Administrator Mr. Vikas Maurya)`;

    navigator.clipboard.writeText(message);
    toast.success(
      `Login credentials copied for ${t.name}! You can now send this via WhatsApp or Email.`,
      "Credentials Copied"
    );
  };

  const togglePasswordVisibility = (teacherId) => {
    setShowPasswords(prev => ({
      ...prev,
      [teacherId]: !prev[teacherId]
    }));
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
            Create teacher login IDs, set passwords, and share credentials directly with instructors.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Appoint New Teacher</span>
        </button>
      </div>

      {/* Admin Notice Banner */}
      <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 flex items-start gap-3 text-xs text-blue-900 dark:text-blue-200">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="font-bold text-sm block">Admin Credential Control:</strong>
          <p className="leading-relaxed">
            Teachers cannot self-register. You (the Admin) create their ID and Password here. Only after you provide these credentials to the teacher will they be able to log in to the Faculty Portal.
          </p>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t) => {
          const isPassVisible = !!showPasswords[t.id];
          const displayPassword = t.password || "teacher123";
          const displayLoginId = t.loginId || t.email || t.id;

          return (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20 bg-slate-100 dark:bg-slate-800"
                      />
                      {t.customPhotoUploaded && (
                        <span
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-white"
                          title="Verified Photograph Attached"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {t.name}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {t.subject}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-slate-400 font-mono">{t.id}</span>
                        {/* Direct Photo Upload Option - Hides Once Uploaded */}
                        {!t.customPhotoUploaded ? (
                          <label className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[10px] font-bold transition-all cursor-pointer shadow-xs hover:scale-105">
                            <Camera className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            <span>Upload Img</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleUploadTeacherPhoto(t.id, e)}
                              className="hidden"
                            />
                          </label>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle2 className="w-3 h-3" /> Attached
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteTeacherPhoto(t.id, t.name)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-[10px] font-bold transition-all cursor-pointer hover:scale-105"
                              title="Delete this teacher's uploaded photograph"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={t.activeStatus || "Active"} size="sm" />
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{t.designation}</p>
                  <p className="text-slate-500 dark:text-slate-400">{t.qualification}</p>
                  <p className="text-[11px] text-slate-400 pt-1 font-mono">Experience: {t.experience || "10+ Years"}</p>
                </div>

                {/* Teacher Login Credentials Box (Created by Admin) */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200">
                    <span className="flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      Login Credentials
                    </span>
                    <button
                      type="button"
                      onClick={() => copyCredentials(t)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-200/70 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-[10px] font-bold hover:bg-amber-300 dark:hover:bg-amber-800 transition-colors"
                      title="Copy credentials to share with teacher"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Credentials</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] font-semibold text-amber-700/80 dark:text-amber-400/80 uppercase block">
                        Login ID / Email
                      </span>
                      <p className="font-mono text-slate-900 dark:text-white truncate font-medium mt-0.5">
                        {displayLoginId}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-amber-700/80 dark:text-amber-400/80 uppercase block">
                          Password
                        </span>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(t.id)}
                          className="text-amber-600 hover:text-amber-800 dark:text-amber-400"
                        >
                          {isPassVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>
                      </div>
                      <p className="font-mono text-slate-900 dark:text-white font-medium mt-0.5">
                        {isPassVisible ? displayPassword : '••••••••'}
                      </p>
                    </div>
                  </div>
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
                  <Edit className="w-3.5 h-3.5" /> Edit / Reset Password
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingTeacher ? `Edit Credentials & Details for ${editingTeacher.name}` : "Appoint New Teacher & Create Credentials"}
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Faculty Photograph Upload & Preview */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
              <div className="relative shrink-0">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Teacher Preview"
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30 shadow-md bg-white dark:bg-slate-800"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 flex flex-col items-center justify-center text-slate-400">
                    <Camera className="w-6 h-6" />
                    <span className="text-[9px] font-bold mt-0.5">Photo</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Faculty Photograph (Upload Image)
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {formData.avatar ? "Custom photograph attached to profile." : "Upload teacher's official photo for the portal."}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-transform hover:scale-102">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{formData.avatar ? "Change Photo" : "Upload Photo"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleTeacherModalPhotoChange}
                      className="hidden"
                    />
                  </label>
                  {formData.avatar && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, avatar: '', customPhotoUploaded: false }));
                        toast.info("Photograph removed! Click Save to apply changes.", "Photo Removed");
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
                      title="Clear and remove photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Photo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <FormInput
              label="Teacher Full Name"
              placeholder="e.g. Dr. Ramesh Gupta"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Official Email"
                type="email"
                placeholder="faculty@edumanage.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <FormInput
                label="Phone / WhatsApp"
                placeholder="+91 98000 11223"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            {/* Admin Created Credentials Section */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  Teacher Login Credentials (Created by Admin)
                </span>
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Auto-Generate
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="Teacher Login ID / Username"
                  placeholder="e.g. TCH-001 or email"
                  value={formData.loginId}
                  onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
                />
                <FormInput
                  label="Teacher Login Password"
                  placeholder="Set password (e.g. teacher123)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Teacher will use this Login ID and Password to sign in. Only when you share these credentials can the teacher log in.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Subject Allocation"
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
                {editingTeacher ? "Save & Update Credentials" : "Create Teacher & Save Credentials"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
