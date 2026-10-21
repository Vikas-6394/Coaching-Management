import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import { Users, Eye, Phone, Mail, MapPin, Award, CalendarCheck, Shield } from 'lucide-react';

export const TeacherStudents = () => {
  const { students, courses } = useData();
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [viewStudent, setViewStudent] = useState(null);

  // Filter students assigned to teacher courses (CRS-001 or CRS-003 or all students for demo completeness)
  const assignedStudents = useMemo(() => {
    if (selectedCourse === "All") return students;
    return students.filter(s => s.enrolledCourses?.includes(selectedCourse));
  }, [students, selectedCourse]);

  const columns = [
    {
      key: "name",
      label: "Student Info",
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
      key: "performanceGrade",
      label: "Grade",
      render: (val) => (
        <span className="px-2 py-0.5 rounded-md font-bold text-xs bg-slate-100 dark:bg-slate-800 border">
          {val}
        </span>
      )
    },
    {
      key: "feeStatus",
      label: "Fee Status",
      render: (val) => <StatusBadge status={val} size="sm" />
    },
    {
      key: "actions",
      label: "Profile",
      sortable: false,
      render: (_, row) => (
        <button
          type="button"
          onClick={() => setViewStudent(row)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> View
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Assigned Student Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse and monitor students enrolled across your physics and entrance examination cohorts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500">Filter Course:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Enrolled Courses</option>
            <option value="CRS-001">JEE Advanced Pinnacle Batch</option>
            <option value="CRS-003">CBSE Class 12 Boards Accelerator</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={assignedStudents}
        searchPlaceholder="Search student by name, roll number, batch..."
        itemsPerPage={8}
      />

      {/* Student Details Modal */}
      {viewStudent && (
        <Modal
          isOpen={!!viewStudent}
          onClose={() => setViewStudent(null)}
          title={`Student Academic Card: ${viewStudent.name}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <img
                src={viewStudent.avatar}
                alt={viewStudent.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20"
              />
              <div>
                <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">{viewStudent.name}</h4>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{viewStudent.batch}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Roll No: {viewStudent.rollNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                <span className="text-slate-400">Class Attendance</span>
                <p className="text-base font-bold text-slate-900 dark:text-white">{viewStudent.attendanceRate}%</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                <span className="text-slate-400">Overall Grade</span>
                <p className="text-base font-bold text-slate-900 dark:text-white">{viewStudent.performanceGrade}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" /> {viewStudent.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" /> {viewStudent.phone}
              </p>
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" /> Guardian: <strong>{viewStudent.guardianName}</strong> ({viewStudent.guardianPhone})
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" /> {viewStudent.address}
              </p>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setViewStudent(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
