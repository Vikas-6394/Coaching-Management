import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormInput } from '../../components/FormInput';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  CalendarCheck,
  CreditCard,
  Award
} from 'lucide-react';

export const AdminStudents = () => {
  const { students, addStudent, updateStudent, deleteStudent, courses } = useData();
  const toast = useToast();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    batch: "JEE Advanced 2026",
    rollNumber: `2026-STU-${Math.floor(100 + Math.random() * 900)}`,
    totalFees: 85000,
    paidFees: 45000,
    performanceGrade: "A",
    guardianName: "",
    guardianPhone: "",
    address: ""
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setFormData({
      ...initialForm,
      rollNumber: `2026-STU-${Math.floor(100 + Math.random() * 900)}`
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      batch: student.batch,
      rollNumber: student.rollNumber,
      totalFees: student.totalFees,
      paidFees: student.paidFees,
      performanceGrade: student.performanceGrade,
      guardianName: student.guardianName,
      guardianPhone: student.guardianPhone,
      address: student.address
    });
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in the student's name and email.");
      return;
    }

    const pending = Math.max(0, formData.totalFees - formData.paidFees);
    addStudent({
      ...formData,
      pendingAmount: pending,
      enrolledCourses: ["CRS-001"]
    });

    toast.success(`Student record for ${formData.name} added!`, "Student Enrolled");
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const pending = Math.max(0, formData.totalFees - formData.paidFees);
    updateStudent(selectedStudent.id, {
      ...formData,
      pendingAmount: pending,
      feeStatus: pending === 0 ? "Paid" : "Pending"
    });

    toast.success(`Student ${formData.name} updated successfully!`, "Record Saved");
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const handleDeleteConfirm = () => {
    if (!studentToDelete) return;
    deleteStudent(studentToDelete.id);
    toast.info(`Deleted student record for ${studentToDelete.name}.`, "Record Removed");
    setStudentToDelete(null);
  };

  const columns = [
    {
      key: "name",
      label: "Student Profile",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={val}
            className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <div>
            <strong className="text-slate-900 dark:text-white block font-bold leading-tight">{val}</strong>
            <span className="text-xs text-slate-400 font-mono">{row.rollNumber}</span>
          </div>
        </div>
      )
    },
    {
      key: "batch",
      label: "Batch",
      render: (val) => <span className="text-xs font-semibold">{val}</span>
    },
    {
      key: "attendanceRate",
      label: "Attendance",
      render: (val) => (
        <span className={`font-bold text-xs ${val >= 90 ? 'text-emerald-600' : val >= 80 ? 'text-blue-600' : 'text-amber-600'}`}>
          {val}%
        </span>
      )
    },
    {
      key: "feeStatus",
      label: "Fee Status",
      render: (val) => <StatusBadge status={val} size="sm" />
    },
    {
      key: "performanceGrade",
      label: "Grade",
      render: (val) => (
        <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-800 border">
          {val}
        </span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedStudent(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
            title="Edit record"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setStudentToDelete(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
            title="Delete student"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Management Console
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Administer admissions, tuition commitments, attendance compliance, and academic records.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-102 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={students}
        searchPlaceholder="Search student by name, email, roll number, batch..."
        itemsPerPage={8}
      />

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Enroll New Student"
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Student Full Name"
                placeholder="e.g. Priyanshu Verma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <FormInput
                label="Email Address"
                type="email"
                placeholder="p.verma@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Phone Number"
                placeholder="+91 98765 00000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <FormInput
                label="Batch / Program"
                type="select"
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                options={[
                  "JEE Advanced 2026",
                  "NEET Elite 2026",
                  "CBSE Class 12 Boards",
                  "Full Stack Web Mastery",
                  "Data Science & AI"
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Total Course Fees (₹)"
                type="number"
                value={formData.totalFees}
                onChange={(e) => setFormData({ ...formData, totalFees: Number(e.target.value) })}
                required
              />
              <FormInput
                label="Initial Paid Amount (₹)"
                type="number"
                value={formData.paidFees}
                onChange={(e) => setFormData({ ...formData, paidFees: Number(e.target.value) })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Guardian Name"
                placeholder="Parent's name"
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
              />
              <FormInput
                label="Guardian Phone"
                placeholder="+91 98000 00000"
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              >
                Enroll Student
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Student Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedStudent(null);
          }}
          title="Edit Student Record"
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Student Full Name"
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
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <FormInput
                label="Academic Grade"
                type="select"
                value={formData.performanceGrade}
                onChange={(e) => setFormData({ ...formData, performanceGrade: e.target.value })}
                options={["A+", "A", "B+", "B", "C+", "C"]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Total Course Fees (₹)"
                type="number"
                value={formData.totalFees}
                onChange={(e) => setFormData({ ...formData, totalFees: Number(e.target.value) })}
                required
              />
              <FormInput
                label="Paid Amount (₹)"
                type="number"
                value={formData.paidFees}
                onChange={(e) => setFormData({ ...formData, paidFees: Number(e.target.value) })}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Student Details Modal */}
      {selectedStudent && !isEditModalOpen && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student File: ${selectedStudent.name}`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20"
              />
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{selectedStudent.name}</h4>
                <p className="text-xs text-blue-600 font-semibold">{selectedStudent.batch}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Roll: {selectedStudent.rollNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                <span className="text-slate-400">Total Fees</span>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  ₹{Number(selectedStudent.totalFees).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                <span className="text-slate-400">Pending Amount</span>
                <p className="text-base font-bold text-amber-600">
                  ₹{Number(selectedStudent.pendingAmount || 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <p>Email: <strong className="text-slate-800 dark:text-slate-200">{selectedStudent.email}</strong></p>
              <p>Phone: <strong className="text-slate-800 dark:text-slate-200">{selectedStudent.phone}</strong></p>
              <p>Guardian: <strong className="text-slate-800 dark:text-slate-200">{selectedStudent.guardianName}</strong> ({selectedStudent.guardianPhone})</p>
              <p>Address: <strong className="text-slate-800 dark:text-slate-200">{selectedStudent.address}</strong></p>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Dialog */}
      {studentToDelete && (
        <ConfirmDialog
          isOpen={!!studentToDelete}
          onClose={() => setStudentToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Student Record"
          message={`Are you sure you want to permanently remove ${studentToDelete.name} (${studentToDelete.rollNumber})? This will delete all course enrollments and records.`}
          confirmText="Delete Student"
          confirmVariant="danger"
        />
      )}
    </div>
  );
};
