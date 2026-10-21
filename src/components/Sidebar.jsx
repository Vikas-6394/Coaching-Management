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
  RotateCcw,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { user, role, logout, loginAsRole } = useAuth();
  const { resetAllData } = useData();
  const toast = useToast();
  const navigate = useNavigate();

  const handleResetData = () => {
    if (window.confirm("Reset all demo data back to default initial state?")) {
      resetAllData();
      toast.info("Demo data reset to factory default state.", "Data Reset");
    }
  };

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

  const handleRoleSwitch = (newRole) => {
    loginAsRole(newRole);
    navigate(`/${newRole}`);
    toast.info(`Switched to ${newRole.toUpperCase()} demo view`);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

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
        <div className="h-18 px-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 shrink-0">
          <NavLink to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
              <GraduationCap className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight">
                  Edu<span className="text-blue-600 dark:text-blue-400">Manage</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {role} portal
                </span>
              </div>
            )}
          </NavLink>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Role Switcher Pill Bar (if not collapsed) */}
        {!isCollapsed && (
          <div className="p-3 mx-3 my-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
              Switch Demo Role
            </p>
            <div className="grid grid-cols-3 gap-1">
              {['student', 'teacher', 'admin'].map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleSwitch(r)}
                  className={`py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                    role === r
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
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
            onClick={handleResetData}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Reset sample data back to factory defaults"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Reset Demo Data</span>}
          </button>

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
