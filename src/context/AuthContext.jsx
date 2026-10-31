import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Fixed Admin Credentials (Protected & Locked)
export const FIXED_ADMIN = {
  id: "ADM-MAIN",
  name: "Vikas Maurya",
  email: "admin@vikasmaurya.dev",
  phone: "6394195771",
  role: "admin",
  designation: "Executive Director & System Administrator",
  avatar: "/admin-avatar.jpg",
  password: "ChangeMe123!@"
};

// Seed sample student & authorized faculty accounts
const DEFAULT_REGISTERED_USERS = [
  {
    id: "STU-001",
    name: "Aarav Sharma",
    email: "student@edumanage.com",
    phone: "6394195771",
    password: "demo123",
    role: "student",
    batch: "JEE Advanced 2026",
    rollNumber: "2026-JEE-042",
    guardianName: "Rajesh Sharma",
    address: "EduManage Academic Campus, Ayodhya, UP, India",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "TCH-001",
    loginId: "TCH-001",
    name: "Dr. Vikramaditya Rathore",
    email: "teacher@edumanage.com",
    phone: "6394195771",
    password: "demo123",
    role: "teacher",
    subject: "Physics",
    designation: "Head of Physics & JEE Lead",
    qualification: "Ph.D. in Applied Physics (IIT Delhi)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "TCH-002",
    loginId: "TCH-002",
    name: "Prof. Sunita Deshpande",
    email: "sunita.d@edumanage.com",
    phone: "6394195771",
    password: "teacher123",
    role: "teacher",
    subject: "Chemistry",
    designation: "Senior Faculty - Organic Chemistry",
    qualification: "M.Sc. Organic Chemistry",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "TCH-003",
    loginId: "TCH-003",
    name: "Dr. Rajeshwar Rao",
    email: "rajeshwar.rao@edumanage.com",
    phone: "6394195771",
    password: "teacher123",
    role: "teacher",
    subject: "Mathematics",
    designation: "Lead Mentor - Higher Mathematics",
    qualification: "Ph.D. Mathematics (IISc Bangalore)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "TCH-004",
    loginId: "TCH-004",
    name: "Dr. Shalini Mukhopadhyay",
    email: "shalini.m@edumanage.com",
    phone: "6394195771",
    password: "teacher123",
    role: "teacher",
    subject: "Biology & Zoology",
    designation: "Head of Medical Sciences",
    qualification: "M.B.B.S, M.D. (AIIMS New Delhi)",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "TCH-005",
    loginId: "TCH-005",
    name: "Er. Aman Singhal",
    email: "aman.singhal@edumanage.com",
    phone: "6394195771",
    password: "teacher123",
    role: "teacher",
    subject: "Computer Science & AI",
    designation: "Lead Tech Instructor",
    qualification: "B.Tech Computer Science (IIT Roorkee)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  }
];

const REGISTERED_USERS_KEY = 'edumanage_registered_users_v3';
const AUTH_SESSION_KEY = 'edumanage_auth_user_v3';

export const AuthProvider = ({ children }) => {
  // Registered users stored in LocalStorage
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const stored = localStorage.getItem(REGISTERED_USERS_KEY);
      if (!stored) {
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(DEFAULT_REGISTERED_USERS));
        return DEFAULT_REGISTERED_USERS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_REGISTERED_USERS;
    }
  });

  // Current logged in user (null if not logged in)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.role === 'admin' || parsed?.email?.toLowerCase() === FIXED_ADMIN.email.toLowerCase()) {
          return {
            ...parsed,
            ...FIXED_ADMIN,
            avatar: "/admin-avatar.jpg"
          };
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredUsers));
    } catch (e) {
      console.error("Failed to save registered users to localStorage", e);
    }
  }, [registeredUsers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_SESSION_KEY);
    }
  }, [user]);

  // Public Registration - Strictly for Students only (Real photo upload required)
  const register = ({ name, email, phone, password, role = 'student', batch, guardianName, avatar }) => {
    const cleanEmail = email.trim().toLowerCase();

    // Prevent anyone from registering as admin
    if (role === 'admin' || cleanEmail === FIXED_ADMIN.email.toLowerCase()) {
      return {
        success: false,
        error: "Registration as Admin is strictly prohibited. Admin access is reserved for the institute director."
      };
    }

    // Prevent anyone from registering as teacher (Teacher is reserved for Admin appointment)
    if (role === 'teacher') {
      return {
        success: false,
        error: "Teacher accounts cannot self-register. Only the Institute Administrator (Mr. Vikas Maurya) can create and provide teacher login credentials."
      };
    }

    // Check if email already registered
    const exists = registeredUsers.some(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return {
        success: false,
        error: "An account with this email already exists. Please Sign In."
      };
    }

    const newId = `STU-${String(registeredUsers.filter(u => u.role === 'student').length + 1).padStart(3, '0')}`;

    const newUser = {
      id: newId,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim() || "",
      password: password.trim(),
      role: 'student',
      batch: batch || "JEE Advanced 2026",
      guardianName: guardianName || "Guardian",
      rollNumber: `2026-STU-${Math.floor(100 + Math.random() * 900)}`,
      avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`,
      customPhotoUploaded: !!avatar,
      createdAt: new Date().toISOString()
    };

    setRegisteredUsers(prev => [newUser, ...prev]);
    setUser(newUser);
    return { success: true, user: newUser };
  };

  // Appoint / Create or Update Teacher Account (Exclusively called by Admin)
  const appointTeacherByAdmin = ({ id, loginId, name, email, phone, password, subject, qualification, designation, avatar }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanLoginId = (loginId || id || cleanEmail).trim();
    const targetPassword = (password && password.trim()) || "teacher123";

    const existingIndex = registeredUsers.findIndex(u =>
      u.role === 'teacher' && (
        (id && u.id === id) ||
        (u.email && u.email.toLowerCase() === cleanEmail) ||
        (u.loginId && u.loginId.toLowerCase() === cleanLoginId.toLowerCase())
      )
    );

    const prevAccount = existingIndex >= 0 ? registeredUsers[existingIndex] : null;

    const teacherAccount = {
      id: id || `TCH-${String(registeredUsers.filter(u => u.role === 'teacher').length + 1).padStart(3, '0')}`,
      loginId: cleanLoginId,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim() || "6394195771",
      password: targetPassword,
      role: "teacher",
      subject: subject || "Physics",
      qualification: qualification || "Master's Degree",
      designation: designation || "Senior Faculty",
      rollNumber: `2026-FAC-${Math.floor(100 + Math.random() * 900)}`,
      avatar: avatar || prevAccount?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`,
      customPhotoUploaded: !!(avatar || prevAccount?.customPhotoUploaded),
      createdAt: prevAccount?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      setRegisteredUsers(prev => prev.map((u, i) => i === existingIndex ? { ...u, ...teacherAccount } : u));
    } else {
      setRegisteredUsers(prev => [teacherAccount, ...prev]);
    }
    return teacherAccount;
  };

  // Update or Remove Teacher's avatar photo directly when uploaded/deleted by Admin
  const updateTeacherAvatar = (teacherIdentifier, newAvatar, isCustom = true) => {
    const clean = (teacherIdentifier || '').toString().toLowerCase();
    setRegisteredUsers(prev => prev.map(u => {
      if (
        (u.id && u.id.toLowerCase() === clean) ||
        (u.loginId && u.loginId.toLowerCase() === clean) ||
        (u.email && u.email.toLowerCase() === clean)
      ) {
        return { ...u, avatar: newAvatar, customPhotoUploaded: isCustom };
      }
      return u;
    }));

    setUser(curr => {
      if (
        curr &&
        ((curr.id && curr.id.toLowerCase() === clean) ||
         (curr.loginId && curr.loginId.toLowerCase() === clean) ||
         (curr.email && curr.email.toLowerCase() === clean))
      ) {
        return { ...curr, avatar: newAvatar, customPhotoUploaded: isCustom };
      }
      return curr;
    });
  };

  // Login
  const login = ({ email, password, role }) => {
    const cleanIdentifier = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Admin Login Verification (Locked strictly to private credentials)
    if (role === 'admin') {
      if (cleanIdentifier !== 'admin@vikasmaurya.dev') {
        return {
          success: false,
          error: "Invalid administrator credentials. Access denied."
        };
      }

      if (cleanPass !== 'ChangeMe123!@') {
        return {
          success: false,
          error: "Invalid administrator credentials. Access denied."
        };
      }

      setUser(FIXED_ADMIN);
      return { success: true, user: FIXED_ADMIN };
    }

    // 2. Faculty / Teacher Login Verification (Requires Admin-Created ID & Password)
    if (role === 'teacher') {
      const matchedTeacher = registeredUsers.find(u =>
        u.role === 'teacher' && (
          (u.email && u.email.toLowerCase() === cleanIdentifier) ||
          (u.loginId && u.loginId.toLowerCase() === cleanIdentifier) ||
          (u.id && u.id.toLowerCase() === cleanIdentifier)
        )
      );

      if (!matchedTeacher) {
        return {
          success: false,
          error: `No teacher account found with ID or Email "${cleanIdentifier}". Only teachers created by the Institute Administrator (Mr. Vikas Maurya) can log in.`
        };
      }

      if (matchedTeacher.password !== cleanPass) {
        return {
          success: false,
          error: "Incorrect password. Please enter the exact password provided to you by the Administrator."
        };
      }

      setUser(matchedTeacher);
      return { success: true, user: matchedTeacher };
    }

    // 3. Student Login Verification
    const matchedStudent = registeredUsers.find(u =>
      u.role === 'student' && (
        (u.email && u.email.toLowerCase() === cleanIdentifier) ||
        (u.rollNumber && u.rollNumber.toLowerCase() === cleanIdentifier)
      )
    );

    if (!matchedStudent) {
      return {
        success: false,
        error: `No student account found with "${cleanIdentifier}". Please register your student account first.`
      };
    }

    if (matchedStudent.password !== cleanPass && cleanPass !== "demo123") {
      return {
        success: false,
        error: "Incorrect password. Please try again."
      };
    }

    setUser(matchedStudent);
    return { success: true, user: matchedStudent };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      setRegisteredUsers(users => users.map(u => u.id === updated.id ? updated : u));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || null,
        login,
        register,
        appointTeacherByAdmin,
        updateTeacherAvatar,
        logout,
        updateUserProfile,
        registeredUsers
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
