import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const PublicLayout = () => {
  const { user, role, logout } = useAuth();
  const toast = useToast();
  const location = useLocation();

  useEffect(() => {
    // When Admin navigates to the public site without logging out, auto-logout immediately for security
    if (user && role === 'admin' && location.pathname !== '/login') {
      logout();
      toast.info(
        "Admin Session Ended: Administrator was automatically logged out for security upon navigating to the public website.",
        "Security Auto-Logout"
      );
    }
  }, [user, role, location.pathname, logout, toast]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

