import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_COURSES,
  INITIAL_ATTENDANCE,
  INITIAL_FEES,
  INITIAL_TESTS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ASSIGNMENTS
} from '../data/initialData';
import { getStoredItem, setStoredItem, STORAGE_KEYS, resetToDefaults } from '../data/storage';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const deduplicateById = (items) => {
    if (!Array.isArray(items)) return items;
    const seen = new Set();
    return items.filter(item => {
      if (!item || !item.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const [students, setStudents] = useState(() => deduplicateById(getStoredItem(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS)));
  const [teachers, setTeachers] = useState(() => deduplicateById(getStoredItem(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS)));
  const [courses, setCourses] = useState(() => deduplicateById(getStoredItem(STORAGE_KEYS.COURSES, INITIAL_COURSES)));
  const [attendance, setAttendance] = useState(() => deduplicateById(getStoredItem(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE)));
  const [fees, setFees] = useState(() => deduplicateById(getStoredItem(STORAGE_KEYS.FEES, INITIAL_FEES)));
  const [tests, setTests] = useState(() => deduplicateById(getStoredItem(STORAGE_KEYS.TESTS, INITIAL_TESTS)));
  const [studyMaterials, setStudyMaterials] = useState(() => deduplicateById(getStoredItem(STORAGE_KEYS.STUDY_MATERIALS, INITIAL_STUDY_MATERIALS)));
  const [announcements, setAnnouncements] = useState(() => deduplicateById(getStoredItem(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS)));
  const [assignments, setAssignments] = useState(() => deduplicateById(getStoredItem(STORAGE_KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS)));

  // Student test attempts & results storage
  const [testResults, setTestResults] = useState(() => {
    return getStoredItem('edumanage_test_results_v1', [
      {
        id: "RES-001",
        testId: "TST-001",
        testTitle: "JEE Advanced Full Physics Mock #04",
        studentId: "STU-001",
        score: 16,
        totalMarks: 20,
        percentage: 80,
        grade: "A",
        date: "2026-10-18",
        status: "Passed",
        correctAnswers: 4,
        wrongAnswers: 1,
        totalQuestions: 5
      }
    ]);
  });

  // Sync state to LocalStorage
  useEffect(() => { setStoredItem(STORAGE_KEYS.STUDENTS, students); }, [students]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.TEACHERS, teachers); }, [teachers]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.COURSES, courses); }, [courses]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.ATTENDANCE, attendance); }, [attendance]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.FEES, fees); }, [fees]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.TESTS, tests); }, [tests]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.STUDY_MATERIALS, studyMaterials); }, [studyMaterials]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.ANNOUNCEMENTS, announcements); }, [announcements]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.ASSIGNMENTS, assignments); }, [assignments]);
  useEffect(() => { setStoredItem('edumanage_test_results_v1', testResults); }, [testResults]);

  // Student CRUD
  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: studentData.id || `STU-${String(students.length + 1).padStart(3, '0')}`,
      admissionDate: new Date().toISOString().split('T')[0],
      attendanceRate: 100,
      feeStatus: studentData.paidFees >= studentData.totalFees ? 'Paid' : 'Pending',
      status: 'Active',
      avatar: studentData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(studentData.name)}`,
      customPhotoUploaded: !!studentData.avatar
    };
    setStudents(prev => [newStudent, ...prev]);
    return newStudent;
  };

  const updateStudent = (id, updatedFields) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  // Teacher CRUD
  const addTeacher = (teacherData) => {
    const newTeacher = {
      ...teacherData,
      id: teacherData.id || `TCH-${String(teachers.length + 1).padStart(3, '0')}`,
      activeStatus: 'Active',
      avatar: teacherData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(teacherData.name)}`,
      customPhotoUploaded: !!teacherData.customPhotoUploaded || (!!teacherData.avatar && !teacherData.avatar.includes('dicebear'))
    };
    setTeachers(prev => [newTeacher, ...prev]);
    return newTeacher;
  };

  const updateTeacher = (id, updatedFields) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTeacher = (id) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  // Course CRUD
  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: `CRS-${String(courses.length + 1).padStart(3, '0')}`,
      rating: 5.0,
      studentsEnrolled: 0,
      syllabus: courseData.syllabus || [
        {
          module: "Module 1: Orientation & Foundations",
          lessons: [
            { title: "Course Introduction & Setup", duration: "45m", completed: false },
            { title: "Foundational Principles", duration: "1h 30m", completed: false }
          ]
        }
      ]
    };
    setCourses(prev => [newCourse, ...prev]);
    return newCourse;
  };

  const updateCourse = (id, updatedFields) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const toggleLessonComplete = (courseId, moduleIndex, lessonIndex) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const updatedSyllabus = c.syllabus.map((m, mIdx) => {
        if (mIdx !== moduleIndex) return m;
        const updatedLessons = m.lessons.map((les, lIdx) => {
          if (lIdx !== lessonIndex) return les;
          return { ...les, completed: !les.completed };
        });
        return { ...m, lessons: updatedLessons };
      });
      return { ...c, syllabus: updatedSyllabus };
    }));
  };

  const enrollCourse = (studentId, courseId) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      if (s.enrolledCourses?.includes(courseId)) return s;
      return {
        ...s,
        enrolledCourses: [...(s.enrolledCourses || []), courseId]
      };
    }));
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      return { ...c, studentsEnrolled: (c.studentsEnrolled || 0) + 1 };
    }));
  };

  // Attendance
  const markAttendanceBatch = (date, courseId, records) => {
    // records is an array of { studentId, studentName, status, remark }
    const subjectTitle = courseId === "all"
      ? "All Batches Combined Roll Call"
      : (courses.find(c => c.id === courseId)?.title || "Classroom Lecture");

    const newRecords = records.map((r, idx) => ({
      id: `ATT-${Date.now()}-${idx}`,
      date,
      courseId,
      subject: subjectTitle,
      studentId: r.studentId,
      studentName: r.studentName,
      status: r.status,
      remark: r.remark || "Regular"
    }));

    setAttendance(prev => {
      // Filter out existing for the same student on the same date & course to avoid duplicates
      const filtered = prev.filter(p => !(p.date === date && p.courseId === courseId && records.some(r => r.studentId === p.studentId)));
      return [...newRecords, ...filtered];
    });

    // Dynamically update student attendance rates so dashboards and profile pages reflect real-time attendance
    setStudents(prev => prev.map(s => {
      const rec = records.find(r => r.studentId === s.id);
      if (!rec) return s;
      const currentRate = s.attendanceRate ?? 90;
      let newRate = currentRate;
      if (rec.status === "Present") {
        newRate = Math.min(100, currentRate + 1);
      } else if (rec.status === "Absent") {
        newRate = Math.max(40, currentRate - 2);
      }
      return { ...s, attendanceRate: newRate };
    }));
  };

  // Fees
  const recordFeePayment = (feeId, paymentDetails = {}) => {
    setFees(prev => prev.map(f => {
      if (f.id !== feeId) return f;
      const paidDate = new Date().toISOString().split('T')[0];
      const receiptNumber = `EDM-REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const transactionId = `TXN${Math.floor(100000000 + Math.random() * 900000000)}`;
      return {
        ...f,
        status: "Paid",
        paidDate,
        paymentMode: paymentDetails.paymentMode || "Online / UPI (Demo)",
        receiptNumber,
        transactionId
      };
    }));

    // Update student's paidFees and pendingAmount
    const targetFee = fees.find(f => f.id === feeId);
    if (targetFee) {
      setStudents(prev => prev.map(s => {
        if (s.id !== targetFee.studentId) return s;
        const newPaid = (s.paidFees || 0) + targetFee.amount;
        const newPending = Math.max(0, (s.totalFees || 0) - newPaid);
        return {
          ...s,
          paidFees: newPaid,
          pendingAmount: newPending,
          feeStatus: newPending === 0 ? 'Paid' : 'Pending'
        };
      }));
    }
  };

  // Mock Tests & Test Results
  const addMockTest = (testData) => {
    const newTest = {
      ...testData,
      id: `TST-${String(tests.length + 1).padStart(3, '0')}`,
      status: 'Available'
    };
    setTests(prev => [newTest, ...prev]);
    return newTest;
  };

  const saveTestResult = (resultData) => {
    const newResult = {
      ...resultData,
      id: `RES-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setTestResults(prev => [newResult, ...prev]);
    return newResult;
  };

  // Study Materials
  const addStudyMaterial = (materialData) => {
    const newMaterial = {
      ...materialData,
      id: `MAT-${String(studyMaterials.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      downloadCount: 0
    };
    setStudyMaterials(prev => [newMaterial, ...prev]);
    return newMaterial;
  };

  const deleteStudyMaterial = (id) => {
    setStudyMaterials(prev => prev.filter(m => m.id !== id));
  };

  // Announcements
  const addAnnouncement = (announcementData) => {
    const newAnnouncement = {
      ...announcementData,
      id: `ANC-${String(announcements.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      isRead: false
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    return newAnnouncement;
  };

  const toggleAnnouncementRead = (id) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, isRead: !a.isRead } : a));
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // Assignments
  const addAssignment = (assignmentData) => {
    const newAssignment = {
      ...assignmentData,
      id: `ASG-${String(assignments.length + 1).padStart(3, '0')}`,
      submittedCount: 0,
      totalStudents: 35
    };
    setAssignments(prev => [newAssignment, ...prev]);
    return newAssignment;
  };

  // Reset demo state
  const resetAllData = () => {
    resetToDefaults();
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setCourses(INITIAL_COURSES);
    setAttendance(INITIAL_ATTENDANCE);
    setFees(INITIAL_FEES);
    setTests(INITIAL_TESTS);
    setStudyMaterials(INITIAL_STUDY_MATERIALS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setTestResults([]);
  };

  return (
    <DataContext.Provider
      value={{
        students,
        teachers,
        courses,
        attendance,
        fees,
        tests,
        studyMaterials,
        announcements,
        assignments,
        testResults,
        // Methods
        addStudent,
        updateStudent,
        deleteStudent,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addCourse,
        updateCourse,
        deleteCourse,
        toggleLessonComplete,
        enrollCourse,
        markAttendanceBatch,
        recordFeePayment,
        addMockTest,
        saveTestResult,
        addStudyMaterial,
        deleteStudyMaterial,
        addAnnouncement,
        toggleAnnouncementRead,
        deleteAnnouncement,
        addAssignment,
        resetAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
