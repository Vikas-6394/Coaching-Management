import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Courses } from './pages/public/Courses';
import { CourseDetail } from './pages/public/CourseDetail';
import { Contact } from './pages/public/Contact';
import { Login } from './pages/public/Login';
import { NotFound } from './pages/public/NotFound';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentCourses } from './pages/student/StudentCourses';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentFees } from './pages/student/StudentFees';
import { StudentStudyMaterials } from './pages/student/StudentStudyMaterials';
import { StudentTests } from './pages/student/StudentTests';
import { StudentTestRunner } from './pages/student/StudentTestRunner';
import { StudentResults } from './pages/student/StudentResults';
import { StudentAnnouncements } from './pages/student/StudentAnnouncements';
import { StudentProfile } from './pages/student/StudentProfile';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherStudents } from './pages/teacher/TeacherStudents';
import { TeacherSchedule } from './pages/teacher/TeacherSchedule';
import { TeacherAttendance } from './pages/teacher/TeacherAttendance';
import { TeacherAssignments } from './pages/teacher/TeacherAssignments';
import { TeacherMaterials } from './pages/teacher/TeacherMaterials';
import { TeacherTests } from './pages/teacher/TeacherTests';
import { TeacherAnnouncements } from './pages/teacher/TeacherAnnouncements';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminTeachers } from './pages/admin/AdminTeachers';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminAttendance } from './pages/admin/AdminAttendance';
import { AdminFees } from './pages/admin/AdminFees';
import { AdminExams } from './pages/admin/AdminExams';
import { AdminAnnouncements } from './pages/admin/AdminAnnouncements';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Website Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:id" element={<CourseDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                </Route>

                {/* Student Dashboard Routes */}
                <Route element={<DashboardLayout />}>
                  <Route path="/student" element={<StudentDashboard />} />
                  <Route path="/student/courses" element={<StudentCourses />} />
                  <Route path="/student/attendance" element={<StudentAttendance />} />
                  <Route path="/student/fees" element={<StudentFees />} />
                  <Route path="/student/materials" element={<StudentStudyMaterials />} />
                  <Route path="/student/tests" element={<StudentTests />} />
                  <Route path="/student/tests/:id" element={<StudentTestRunner />} />
                  <Route path="/student/results" element={<StudentResults />} />
                  <Route path="/student/announcements" element={<StudentAnnouncements />} />
                  <Route path="/student/profile" element={<StudentProfile />} />
                </Route>

                {/* Teacher Dashboard Routes */}
                <Route element={<DashboardLayout />}>
                  <Route path="/teacher" element={<TeacherDashboard />} />
                  <Route path="/teacher/students" element={<TeacherStudents />} />
                  <Route path="/teacher/schedule" element={<TeacherSchedule />} />
                  <Route path="/teacher/attendance" element={<TeacherAttendance />} />
                  <Route path="/teacher/assignments" element={<TeacherAssignments />} />
                  <Route path="/teacher/materials" element={<TeacherMaterials />} />
                  <Route path="/teacher/tests" element={<TeacherTests />} />
                  <Route path="/teacher/announcements" element={<TeacherAnnouncements />} />
                </Route>

                {/* Admin Dashboard Routes */}
                <Route element={<DashboardLayout />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/students" element={<AdminStudents />} />
                  <Route path="/admin/teachers" element={<AdminTeachers />} />
                  <Route path="/admin/courses" element={<AdminCourses />} />
                  <Route path="/admin/attendance" element={<AdminAttendance />} />
                  <Route path="/admin/fees" element={<AdminFees />} />
                  <Route path="/admin/exams" element={<AdminExams />} />
                  <Route path="/admin/announcements" element={<AdminAnnouncements />} />
                </Route>

                {/* 404 Fallback */}
                <Route element={<PublicLayout />}>
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
