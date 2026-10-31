import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth, FIXED_ADMIN } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { resizeImageFile } from '../../utils/imageUtils';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  LogIn,
  UserPlus,
  KeyRound,
  Mail,
  Phone,
  User,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Lock,
  Sparkles,
  Info,
  Eye,
  EyeOff,
  ShieldAlert,
  Upload,
  Camera,
  Trash2
} from 'lucide-react';

export const Login = () => {
  const { login, register, isAuthenticated, user } = useAuth();
  const { addStudent } = useData();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Primary mode: 'login' or 'register'
  const [activeTab, setActiveTab] = useState('login');

  // Role selection for Login ('student', 'teacher', 'admin')
  const [loginRole, setLoginRole] = useState('student');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Security & Anti-Brute-Force state
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Student Registration form state
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    batch: 'JEE Advanced 2026',
    guardianName: ''
  });
  const [regError, setRegError] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Student Photo Upload State
  const [regPhoto, setRegPhoto] = useState(null);
  const [regPhotoPreview, setRegPhotoPreview] = useState('');
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const regFileInputRef = useRef(null);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingPhoto(true);
      const dataUrl = await resizeImageFile(file, 400, 400, 0.85);
      setRegPhoto(file);
      setRegPhotoPreview(dataUrl);
      setRegError('');
      toast.success("Student photograph attached successfully!", "Photo Attached");
    } catch (err) {
      toast.error(err.message || "Could not process image file.", "Photo Upload Error");
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const handleRemoveRegPhoto = () => {
    setRegPhoto(null);
    setRegPhotoPreview('');
    if (regFileInputRef.current) {
      regFileInputRef.current.value = '';
    }
    toast.info("Uploaded photograph removed. Please upload your photo to register.", "Photo Cleared");
  };

  // Lockout countdown timer effect
  useEffect(() => {
    let interval;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  // Clean form fields whenever switching to student registration to prevent browser autofill retention
  useEffect(() => {
    if (activeTab === 'register') {
      setRegData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        batch: 'JEE Advanced 2026',
        guardianName: ''
      });
      setRegError('');
      setShowRegPassword(false);
      setShowRegConfirmPassword(false);

      // Guard against delayed browser password manager autofill injections on localhost
      const timer = setTimeout(() => {
        setRegData((prev) => {
          if (prev.phone && /[a-zA-Z@]/.test(prev.phone)) {
            return { ...prev, phone: '', password: '', confirmPassword: '' };
          }
          return prev;
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // If an Admin navigates to the login page with an existing active session, auto-logout admin
  useEffect(() => {
    if (user && user.role === 'admin') {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever switching login role (Student, Teacher, Admin), wipe password and credentials completely clean
  useEffect(() => {
    setLoginPassword('');
    setLoginEmail('');
    setLoginError('');
    setShowLoginPassword(false);
    setLockoutTimer(0);
    setFailedAttempts(0);
  }, [loginRole]);

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (lockoutTimer > 0) {
      toast.error(`Security Lockout: Please wait ${lockoutTimer} seconds before retrying.`, "Access Frozen");
      return;
    }

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Please enter both ID/Email and password.");
      return;
    }

    // Input sanitization against script injection
    const cleanEmail = loginEmail.replace(/[<>]/g, '').trim();
    const cleanPassword = loginPassword.trim();

    const result = login({
      email: cleanEmail,
      password: cleanPassword,
      role: loginRole
    });

    if (result.success) {
      setFailedAttempts(0);
      toast.success(`Welcome back, ${result.user.name}!`, "Authentication Successful");
      navigate(`/${result.user.role}`);
    } else {
      const nextFailures = failedAttempts + 1;
      setFailedAttempts(nextFailures);

      if (nextFailures >= 5) {
        setLockoutTimer(45);
        const lockMsg = "Security Protection Active: 5 failed attempts detected. Access temporarily locked for 45s.";
        setLoginError(lockMsg);
        toast.error(lockMsg, "Security Alert");
      } else {
        setLoginError(`${result.error} (Attempt ${nextFailures}/5)`);
        toast.error(result.error, "Sign In Failed");
      }
    }
  };

  // Handle Student Registration (Photo Upload Mandatory)
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError('');

    if (!regPhotoPreview) {
      const photoErr = "Please upload your official passport-size photograph. Real student photo is required for ID card verification.";
      setRegError(photoErr);
      toast.error(photoErr, "Photo Required");
      return;
    }

    if (!regData.name.trim()) {
      setRegError("Please enter your full name.");
      return;
    }
    if (!regData.email.trim()) {
      setRegError("Please enter your email address.");
      return;
    }
    if (!regData.phone.trim()) {
      setRegError("Please enter your 10-digit mobile / WhatsApp number.");
      return;
    }
    if (regData.phone.trim().replace(/\D/g, '').length < 10) {
      setRegError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!regData.password || regData.password.length < 6) {
      setRegError("Password must be at least 6 characters long.");
      return;
    }
    if (regData.password !== regData.confirmPassword) {
      setRegError("Passwords do not match. Please re-check.");
      return;
    }

    const result = register({
      name: regData.name.replace(/[<>]/g, '').trim(),
      email: regData.email.replace(/[<>]/g, '').trim(),
      phone: regData.phone.replace(/[<>]/g, '').trim(),
      password: regData.password.trim(),
      role: 'student',
      batch: regData.batch,
      guardianName: regData.guardianName.replace(/[<>]/g, '').trim(),
      avatar: regPhotoPreview
    });

    if (result.success) {
      // Also sync into DataContext so student appears in Admin and Teacher lists with this real photo
      addStudent({
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phone,
        batch: result.user.batch,
        rollNumber: result.user.rollNumber,
        guardianName: result.user.guardianName,
        guardianPhone: result.user.phone,
        address: "Ayodhya Academic Campus, UP, India",
        avatar: regPhotoPreview,
        customPhotoUploaded: true,
        paidFees: 45000,
        totalFees: 90000,
        status: 'Active'
      });

      toast.success(
        `Welcome to EduManage, ${result.user.name}! Student registration complete with your verified photo.`,
        "Registration Successful"
      );
      navigate('/student');
    } else {
      setRegError(result.error);
      toast.error(result.error, "Registration Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-950 via-amber-700 to-orange-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-orange-600/25">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {activeTab === 'login' ? 'Account Sign In' : 'New Student Registration'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {activeTab === 'login'
            ? 'Sign in to your Student, Faculty, or Administrative Console.'
            : 'Enrolling as a student? Register below to immediately access study materials, tests, and courses.'}
        </p>
      </div>

      {/* Main Tab Switcher (Sign In vs Student Registration) */}
      <div className="max-w-md mx-auto p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center shadow-inner">
        <button
          type="button"
          onClick={() => { setActiveTab('login'); setLoginError(''); }}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
            activeTab === 'login'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md shadow-slate-900/5'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In</span>
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('register'); setRegError(''); }}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
            activeTab === 'register'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md shadow-slate-900/5'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Student Registration</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SIGN IN                                                            */}
      {/* ========================================================================= */}
      {activeTab === 'login' && (
        <div className="max-w-xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Role selector sub-tabs */}
          <div className="grid grid-cols-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-2 gap-1.5">
            {[
              { id: 'student', label: 'Student', icon: GraduationCap },
              { id: 'teacher', label: 'Teacher (Appointed)', icon: Briefcase },
              { id: 'admin', label: 'Admin (Locked)', icon: ShieldCheck }
            ].map((r) => {
              const Icon = r.icon;
              const isSelected = loginRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setLoginRole(r.id);
                    setLoginError('');
                    setLoginPassword('');
                    setLoginEmail('');
                    setShowLoginPassword(false);
                  }}
                  className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    isSelected
                      ? r.id === 'admin'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : r.id === 'teacher'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                        : 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-center truncate">{r.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Notice conditional on role */}
            {loginRole === 'admin' && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-200">
                <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                    Restricted Administrator Console
                  </p>
                  <p className="leading-relaxed">
                    Confidential portal reserved exclusively for the Institute Administrator. Please enter your private administrator credentials to sign in.
                  </p>
                </div>
              </div>
            )}

            {loginRole === 'teacher' && (
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-start gap-3 text-xs text-purple-900 dark:text-purple-200">
                <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-sm text-purple-800 dark:text-purple-300">
                    Appointed Faculty Portal
                  </p>
                  <p className="leading-relaxed">
                    Teacher accounts and passwords are created by the Institute Administrator (Mr. Vikas Maurya). Enter your assigned ID or email and password to sign in.
                  </p>
                </div>
              </div>
            )}

            {loginRole === 'student' && (
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-start gap-3 text-xs text-blue-900 dark:text-blue-200">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-sm">
                    Student Portal Sign In
                  </p>
                  <p className="leading-relaxed">
                    New student? You must register first before signing in.
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="ml-1 font-bold underline hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Click here for Student Registration →
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Lockout Security Warning */}
            {lockoutTimer > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 flex items-start gap-3 text-xs text-rose-800 dark:text-rose-200">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-bold block text-sm">Security Protection Active:</strong>
                  <p>
                    5 consecutive incorrect attempts detected. For the security of the portal, sign-in is frozen for{' '}
                    <strong className="font-mono text-sm underline">{lockoutTimer} seconds</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {loginError && lockoutTimer === 0 && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
                {loginRole === 'student' && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="underline font-bold text-blue-600 dark:text-blue-400 shrink-0"
                  >
                    Register Now
                  </button>
                )}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} autoComplete="off" className="space-y-4">
              {/* Anti-autofill decoy inputs to divert aggressive browser password managers */}
              <div
                style={{
                  position: 'absolute',
                  opacity: 0,
                  height: 0,
                  width: 0,
                  pointerEvents: 'none',
                  zIndex: -1,
                  overflow: 'hidden'
                }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="fake_login_username_decoy"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
                <input
                  type="password"
                  name="fake_login_password_decoy"
                  tabIndex={-1}
                  autoComplete="new-password"
                  defaultValue=""
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {loginRole === 'admin'
                    ? 'Authorized Admin Email'
                    : loginRole === 'teacher'
                    ? 'Teacher ID or Email (Assigned by Admin)'
                    : 'Registered Student Email or Roll Number'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    key={`login_ident_${loginRole}`}
                    id={`login_credential_identifier_${loginRole}`}
                    name={`login_credential_identifier_${loginRole}`}
                    autoComplete="off"
                    data-lpignore="true"
                    data-form-type="other"
                    type="text"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    disabled={lockoutTimer > 0}
                    placeholder={
                      loginRole === 'admin'
                        ? "Enter authorized admin email"
                        : loginRole === 'teacher'
                        ? "e.g. TCH-001 or teacher@edumanage.com"
                        : "student@edumanage.com"
                    }
                    className="w-full pl-10 pr-3.5 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              {/* Password Input with Visibility Eye Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {loginRole === 'teacher' ? 'Password (Given by Admin)' : 'Password'}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    key={`login_pass_${loginRole}`}
                    id={`login_credential_password_${loginRole}`}
                    name={`login_credential_password_${loginRole}`}
                    autoComplete="new-password"
                    data-lpignore="true"
                    data-form-type="other"
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={lockoutTimer > 0}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    tabIndex={-1}
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={lockoutTimer > 0}
                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all hover:scale-101 disabled:opacity-50 disabled:pointer-events-none ${
                  loginRole === 'admin'
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
                    : loginRole === 'teacher'
                    ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/25'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>
                  {lockoutTimer > 0
                    ? `Locked (${lockoutTimer}s)`
                    : loginRole === 'admin'
                    ? 'Authenticate as Institute Administrator'
                    : loginRole === 'teacher'
                    ? 'Sign In to Faculty Portal'
                    : 'Sign In to Student Portal'}
                </span>
              </button>
            </form>

            {/* Bottom help text */}
            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              {loginRole === 'student' ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  New student?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Register your student account
                  </button>
                </p>
              ) : loginRole === 'teacher' ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Faculty credentials are provided by the Admin. Contact: <strong>+916394195771</strong>
                </p>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Protected Institute Admin Console • Auto-Logout Active
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REGISTER ACCOUNT (STUDENTS ONLY)                                   */}
      {/* ========================================================================= */}
      {activeTab === 'register' && (
        <div className="max-w-2xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Header banner */}
          <div className="border-b border-amber-900/40 bg-gradient-to-r from-rose-950 via-stone-900 to-amber-950 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  New Student Admission & Registration
                </h3>
                <p className="text-xs text-amber-100 mt-0.5">
                  Complete this form to create your student account and access test series, study material, and batches.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Teacher Reservation Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
              <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-sm block">Are you a Teacher / Faculty Member?</strong>
                <p className="mt-0.5 leading-relaxed">
                  Teacher accounts cannot self-register. Teachers are appointed and issued credentials exclusively by the Institute Administrator (<strong>Mr. Vikas Maurya</strong>). Please use the{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setLoginRole('teacher');
                      setActiveTab('login');
                    }}
                    className="font-bold underline text-blue-600 dark:text-blue-400 hover:text-blue-700"
                  >
                    Teacher Sign In
                  </button>{' '}
                  tab.
                </p>
              </div>
            </div>

            {/* Error Banner */}
            {regError && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} autoComplete="off" className="space-y-4">
              {/* Anti-autofill decoy inputs for aggressive browser password managers */}
              <div
                style={{
                  position: 'absolute',
                  opacity: 0,
                  height: 0,
                  width: 0,
                  pointerEvents: 'none',
                  zIndex: -1,
                  overflow: 'hidden'
                }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="fake_browser_username_trap"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
                <input
                  type="password"
                  name="fake_browser_password_trap"
                  tabIndex={-1}
                  autoComplete="new-password"
                  defaultValue=""
                />
              </div>

              {/* Mandatory Student Photograph Upload */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-colors">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Photo Preview / Upload Placeholder */}
                  <div className="relative shrink-0">
                    {regPhotoPreview ? (
                      <div className="relative">
                        <img
                          src={regPhotoPreview}
                          alt="Student Preview"
                          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/30 shadow-md bg-white dark:bg-slate-800"
                        />
                        <span
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-white"
                          title="Verified Photograph Attached"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col items-center justify-center text-slate-400">
                        <Camera className="w-7 h-7 text-slate-400" />
                        <span className="text-[10px] font-bold mt-1 text-slate-400 uppercase tracking-wider">Photo</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls & Description */}
                  <div className="flex-1 text-center sm:text-left space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5">
                          <span>Student ID Photograph</span>
                          <span className="text-rose-500 font-extrabold">* Required</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {regPhotoPreview
                            ? "Your photo will be used on your Student ID Card & Dashboard."
                            : "Upload your real passport-size photo. Random avatars are blocked."}
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm cursor-pointer transition-transform hover:scale-102">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{regPhotoPreview ? "Change Photo" : "Upload Photo"}</span>
                          <input
                            ref={regFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </label>

                        {regPhotoPreview && (
                          <button
                            type="button"
                            onClick={handleRemoveRegPhoto}
                            className="p-1.5 rounded-xl border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Remove photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {isProcessingPhoto && (
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 animate-spin" /> Optimizing photo quality...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="reg_student_name"
                      name="reg_student_name"
                      type="text"
                      autoComplete="off"
                      data-lpignore="true"
                      data-form-type="other"
                      value={regData.name}
                      onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                      placeholder="e.g. Aman Verma"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="reg_student_email"
                      name="reg_student_email"
                      type="email"
                      autoComplete="off"
                      data-lpignore="true"
                      data-form-type="other"
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      placeholder="aman.verma@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="reg_student_phone"
                      name="reg_student_phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="off"
                      data-lpignore="true"
                      data-form-type="other"
                      maxLength={10}
                      value={regData.phone}
                      onChange={(e) => {
                        const cleanDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setRegData({ ...regData, phone: cleanDigits });
                      }}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>

                {/* Target Course / Batch */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Target Course / Batch <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={regData.batch}
                      onChange={(e) => setRegData({ ...regData, batch: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="JEE Advanced 2026">JEE Advanced Pinnacle Batch</option>
                      <option value="NEET Elite 2026">NEET Elite Medical Foundation</option>
                      <option value="Class 12 Boards 2026">Class 12 Science Board Accelerator</option>
                      <option value="Olympiad Prep">Mathematics & Science Olympiad</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Passwords with Eye Visibility Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Create Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="reg_student_create_password"
                      name="reg_student_create_password"
                      type={showRegPassword ? "text" : "password"}
                      autoComplete="new-password"
                      data-lpignore="true"
                      data-form-type="other"
                      value={regData.password}
                      onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      tabIndex={-1}
                      aria-label={showRegPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="reg_student_confirm_password"
                      name="reg_student_confirm_password"
                      type={showRegConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      data-lpignore="true"
                      data-form-type="other"
                      value={regData.confirmPassword}
                      onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                      placeholder="Repeat password"
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                      tabIndex={-1}
                      aria-label={showRegConfirmPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                    >
                      {showRegConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all hover:scale-101"
              >
                <UserPlus className="w-4 h-4" />
                <span>Complete Student Registration & Access Dashboard</span>
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Already registered as a student?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setLoginRole('student');
                    setActiveTab('login');
                  }}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign In to your Student Account
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
