import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { DashboardHeader } from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const DashboardLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // 1. Authentication Check
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role-Based Route Protection (Prevents Unauthorized URL-Hacking)
  const currentPath = location.pathname;

  if (currentPath.startsWith('/admin') && user.role !== 'admin') {
    return <Navigate to={`/${user.role}`} replace />;
  }
  if (currentPath.startsWith('/teacher') && user.role !== 'teacher') {
    return <Navigate to={`/${user.role}`} replace />;
  }
  if (currentPath.startsWith('/student') && user.role !== 'student') {
    return <Navigate to={`/${user.role}`} replace />;
  }

  // 3. 5-Minute Inactivity Auto-Logout for Admin & Faculty/Teacher
  useEffect(() => {
    if (user.role !== 'admin' && user.role !== 'teacher') return;

    // 5 minutes in milliseconds = 300,000 ms
    const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
    let timerId;

    const handleAutoLogout = () => {
      logout();
      const roleTitle = user.role === 'admin' ? 'Admin' : 'Faculty / Teacher';
      toast.error(
        `${roleTitle} Session Expired: You were automatically logged out after 5 minutes of inactivity for security.`,
        "Security Auto-Logout"
      );
      navigate('/login');
    };

    const resetInactivityTimer = () => {
      clearTimeout(timerId);
      timerId = setTimeout(handleAutoLogout, INACTIVITY_TIMEOUT_MS);
    };

    // User activity events that reset the 5-minute countdown
    const activityEvents = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
      'click'
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer, { passive: true });
    });

    // Also watch tab visibility
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetInactivityTimer();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial timer start
    resetInactivityTimer();

    return () => {
      clearTimeout(timerId);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user.role, logout, navigate, toast]);

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <DashboardHeader
          onMobileMenuToggle={() => setIsMobileOpen((prev) => !prev)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
