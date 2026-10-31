import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  CreditCard,
  FileText,
  HelpCircle,
  BarChart2,
  Bell,
  User,
  Users,
  Briefcase,
  Layers,
  Calendar,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { user, role, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const navConfig = {
    student: [
      { label: "Dashboard", to: "/student", icon: LayoutDashboard },
      { label: "My Courses", to: "/student/courses", icon: BookOpen },
      { label: "Attendance", to: "/student/attendance", icon: CalendarCheck },
      { label: "Fees Management", to: "/student/fees", icon: CreditCard },
      { label: "Study Materials", to: "/student/materials", icon: FileText },
      { label: "Online Tests", to: "/student/tests", icon: HelpCircle },
      { label: "Results & Analytics", to: "/student/results", icon: BarChart2 },
      { label: "Announcements", to: "/student/announcements", icon: Bell },
      { label: "My Profile", to: "/student/profile", icon: User }
    ],
    teacher: [
      { label: "Dashboard", to: "/teacher", icon: LayoutDashboard },
      { label: "Assigned Students", to: "/teacher/students", icon: Users },
      { label: "Class Timetable", to: "/teacher/schedule", icon: Calendar },
      { label: "Take Attendance", to: "/teacher/attendance", icon: CalendarCheck },
      { label: "Assignments", to: "/teacher/assignments", icon: FileText },
      { label: "Study Materials", to: "/teacher/materials", icon: BookOpen },
      { label: "Mock Tests", to: "/teacher/tests", icon: HelpCircle },
      { label: "Announcements", to: "/teacher/announcements", icon: Bell }
    ],
    admin: [
      { label: "Admin Console", to: "/admin", icon: LayoutDashboard },
      { label: "Students", to: "/admin/students", icon: Users },
      { label: "Teachers", to: "/admin/teachers", icon: Briefcase },
      { label: "Courses", to: "/admin/courses", icon: Layers },
      { label: "Attendance", to: "/admin/attendance", icon: CalendarCheck },
      { label: "Fees & Invoices", to: "/admin/fees", icon: CreditCard },
      { label: "Exams & Tests", to: "/admin/exams", icon: HelpCircle },
      { label: "Announcements", to: "/admin/announcements", icon: Bell }
    ]
  };

  const links = navConfig[role] || navConfig.student;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div
          className={`h-18 flex items-center border-b border-slate-100 dark:border-slate-800 shrink-0 transition-all ${
            isCollapsed ? 'justify-center px-0' : 'justify-between px-5'
          }`}
        >
          <NavLink
            to={`/${role}`}
            className={`flex items-center gap-3 overflow-hidden ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="EduManage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-950 via-amber-700 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-600/25">
              <GraduationCap className="w-6 h-6 shrink-0" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight truncate">
                  Edu<span className="text-orange-600 dark:text-orange-400">Manage</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                  {role} portal
                </span>
              </div>
            )}
          </NavLink>
        </div>

        {/* Floating Expand/Collapse Button on Sidebar Border */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3.5 top-5.5 z-50 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 shadow-md items-center justify-center transition-all hover:scale-110 cursor-pointer"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Logged in User Profile Card */}
        {!isCollapsed && user && (
          <div className="p-3 mx-3 my-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || 'User')}`}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20 shrink-0 bg-slate-100 dark:bg-slate-700"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {user.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`inline-block text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                    role === 'admin'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : role === 'teacher'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                  }`}
                >
                  {role}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  {user.rollNumber || user.email}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Centered Avatar in Collapsed State */}
        {isCollapsed && user && (
          <div className="my-2 flex justify-center shrink-0" title={`${user.name} (${role})`}>
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || 'User')}`}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20 bg-slate-100 dark:bg-slate-700 shadow-xs"
            />
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === `/${role}`}
                onClick={() => {
                  if (setIsMobileOpen) setIsMobileOpen(false);
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`
                }
                title={isCollapsed ? link.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0 group-hover:scale-105 transition-transform" />
                {!isCollapsed && <span className="truncate">{link.label}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Utility Controls */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/login');
              toast.info("Logged out of demo session.");
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Log out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
