import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = {
  student: {
    id: "STU-001",
    name: "Aarav Sharma",
    email: "student@edumanage.com",
    role: "student",
    studentId: "STU-001",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43210",
    batch: "JEE Advanced 2026",
    rollNumber: "2026-JEE-042",
    guardianName: "Rajesh Sharma",
    address: "B-42, Vasant Vihar, New Delhi"
  },
  teacher: {
    id: "TCH-001",
    name: "Dr. Vikramaditya Rathore",
    email: "teacher@edumanage.com",
    role: "teacher",
    teacherId: "TCH-001",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98110 99881",
    subject: "Physics",
    designation: "Head of Physics & JEE Lead"
  },
  admin: {
    id: "ADM-001",
    name: "Director Rajesh Khurana",
    email: "admin@edumanage.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98100 00112",
    designation: "Executive Director & Institute Head"
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('edumanage_auth_user');
      return saved ? JSON.parse(saved) : DEMO_USERS.student; // default to student for immediate exploratory review
    } catch {
      return DEMO_USERS.student;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('edumanage_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edumanage_auth_user');
    }
  }, [user]);

  const loginAsRole = (role) => {
    if (DEMO_USERS[role]) {
      setUser(DEMO_USERS[role]);
      return true;
    }
    return false;
  };

  const loginWithCredentials = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail.includes('teacher') || cleanEmail.includes('rathore')) {
      setUser(DEMO_USERS.teacher);
      return { success: true, role: 'teacher' };
    } else if (cleanEmail.includes('admin') || cleanEmail.includes('director')) {
      setUser(DEMO_USERS.admin);
      return { success: true, role: 'admin' };
    } else {
      // Default to student
      setUser(DEMO_USERS.student);
      return { success: true, role: 'student' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updatedFields) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || null,
        loginAsRole,
        loginWithCredentials,
        logout,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
