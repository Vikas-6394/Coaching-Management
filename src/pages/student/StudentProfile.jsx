import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { FormInput } from '../../components/FormInput';
import { Modal } from '../../components/Modal';
import {
  User,
  Mail,
  Phone,
  MapPin,
  KeyRound,
  Shield,
  Save,
  GraduationCap
} from 'lucide-react';

export const StudentProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || "Aarav Sharma",
    email: user?.email || "student@edumanage.com",
    phone: user?.phone || "+91 98765 43210",
    batch: user?.batch || "JEE Advanced 2026",
    rollNumber: user?.rollNumber || "2026-JEE-042",
    guardianName: user?.guardianName || "Rajesh Sharma",
    guardianPhone: "+91 98765 11111",
    address: user?.address || "B-42, Vasant Vihar, New Delhi"
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    toast.success("Profile details updated and saved locally!", "Profile Saved");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    toast.success("Password changed successfully in demo session!", "Password Updated");
    setIsPasswordModalOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Student Profile & Academic Record
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your contact information, verify academic roll numbers, and update credentials.
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar & Summary Badge */}
        <div className="md:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-4 shadow-xs">
          <div className="relative inline-block">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"}
              alt={user?.name}
              className="w-24 h-24 rounded-3xl object-cover mx-auto ring-4 ring-blue-500/20 shadow-lg"
            />
          </div>

          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              {formData.name}
            </h3>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {formData.batch}
            </p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Roll No: {formData.rollNumber}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        {/* Right Column: Editable Profile Form */}
        <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-6">
            Personal & Guardian Information
          </h3>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <FormInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Mobile Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <FormInput
                label="Roll Number"
                value={formData.rollNumber}
                disabled
                hint="Assigned by academic administration"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Parent / Guardian Name"
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
              />
              <FormInput
                label="Guardian Contact"
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
              />
            </div>

            <FormInput
              label="Permanent Residential Address"
              type="textarea"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <Modal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          title="Change Demo Password"
          maxWidth="max-w-md"
        >
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Demonstration interface: Updating your password simulates local credential rotation.
            </p>

            <FormInput
              label="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <FormInput
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
            />

            <FormInput
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update Password
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
