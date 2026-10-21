import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  TrendingUp,
  Star,
  ShieldCheck,
  ChevronDown,
  PlayCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { CourseCard } from '../../components/CourseCard';

export const Home = () => {
  const { courses, enrollCourse } = useData();
  const toast = useToast();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(0);

  const stats = [
    { label: "Successful Alumni", value: "14,800+", change: "+18% YoY", icon: Users },
    { label: "All-India Top Ranks", value: "320+", change: "JEE & NEET", icon: Award },
    { label: "Expert Faculty Mentors", value: "48+", change: "IIT & AIIMS Alum", icon: GraduationCap },
    { label: "Average Score Growth", value: "34%", change: "In 6 Months", icon: TrendingUp }
  ];

  const features = [
    {
      title: "IIT & AIIMS Alum Faculty",
      desc: "Learn directly from subject matter authorities with over 12+ years of competitive coaching experience.",
      icon: GraduationCap,
      color: "blue"
    },
    {
      title: "Real-time Mock Test Engine",
      desc: "Simulate actual JEE Advanced & NEET test environments with negative marking, time countdowns, and instant AI analytics.",
      icon: Award,
      color: "purple"
    },
    {
      title: "Modular Study Materials",
      desc: "Curated chapter-wise mind maps, formula sheets, NCERT breakdown guides, and video solutions.",
      icon: BookOpen,
      color: "emerald"
    },
    {
      title: "Attendance & Performance Tracking",
      desc: "Instant visibility into class attendance, test scores, fee installments, and progress reports.",
      icon: ShieldCheck,
      color: "amber"
    }
  ];

  const testimonials = [
    {
      name: "Rishi Vardhan",
      rank: "AIR 84 — JEE Advanced 2025",
      course: "JEE Advanced Pinnacle Batch",
      quote: "The personalized test analytics and rigorous problem sets at EduManage gave me the competitive edge I needed to crack the top 100 in JEE Advanced.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80"
    },
    {
      name: "Tanya Sundaram",
      rank: "AIR 112 — NEET UG 2025",
      course: "NEET Elite Medical Foundation",
      quote: "Dr. Shalini's 3D biological diagrams and the continuous mock drills made NEET feel like a routine test. My score jumped from 580 to 695!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    {
      name: "Karan Johri",
      rank: "98.6% — CBSE Class 12 Boards",
      course: "Class 12 Boards Accelerator",
      quote: "EduManage kept our board preparation synchronized with engineering entrance concepts so we never had to compromise on either.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    }
  ];

  const faqs = [
    {
      q: "How does the simulated demo login work?",
      a: "EduManage is an interactive frontend demonstration. You can click 'Demo Login' and choose between Student, Teacher, or Admin roles to immediately explore the system without server setup or credentials."
    },
    {
      q: "Can I take mock tests and see results?",
      a: "Yes! In the Student Portal, go to 'Online Tests' to start a timed multiple-choice mock test. Upon submission, your score, percentage, and detailed explanations are calculated immediately."
    },
    {
      q: "Are changes saved when I add or edit students, courses, or fees?",
      a: "Yes. All modifications are synchronized directly to your browser's LocalStorage, meaning your data persists even after refreshing the page."
    },
    {
      q: "Can I download and print payment receipts?",
      a: "Yes! Under Fees Management, click 'Download Receipt' on any paid installment to open a printable invoice complete with stamp, logo, and fee breakdown."
    }
  ];

  const handleQuickEnroll = (course) => {
    enrollCourse("STU-001", course.id);
    toast.success(`Enrolled in "${course.title}"! Open Student Portal to resume learning.`, "Enrollment Successful");
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 bg-gradient-to-b from-blue-50/60 via-white to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-3.5 h-3.5" /> India's Premier Coaching Management Hub
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Shape Your Academic Future With{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  EduManage
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                An all-in-one education operating system for students, faculty, and administration. Explore top-rated courses, take real-time mock tests, track attendance, and manage fees effortlessly.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-102"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
                >
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Student & Teacher Login</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Verified Faculty
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant Mock Test Scoring
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Server Setup Required
                </span>
              </div>
            </div>

            {/* Right Column: Hero Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-2xl shadow-blue-600/20">
                <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 space-y-6">
                  {/* Floating Metric Card */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Aarav Sharma</h4>
                        <p className="text-xs text-slate-400">JEE Advanced 2026 Batch</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Rank #1
                    </span>
                  </div>

                  {/* Quick stats mini grid */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">Attendance</p>
                      <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">94%</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">Mock Test Avg</p>
                      <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-0.5">88/100</p>
                    </div>
                  </div>

                  {/* Live Upcoming Test Preview */}
                  <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-700 dark:text-blue-300">Live Mock Test Active</span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-bold text-[10px]">15m</span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Physics Mock #04: Rotational Mechanics & Waves
                    </p>
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
                    >
                      <span>Take Test Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers / Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {item.change}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {item.value}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Top Academic Programs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Popular Courses & Batches
            </h2>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <span>View All 8 Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.slice(0, 4).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={() => handleQuickEnroll(course)}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 py-16 sm:py-20 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              The EduManage Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Top Rankers Choose EduManage
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We combine structured curriculum pedagogy, individual performance tracking, and an interactive learning portal designed for competitive edge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Student Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Hear From Our High Achievers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                    {t.rank}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 sm:p-12 text-white shadow-2xl shadow-blue-500/20 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Experience EduManage?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Explore the student dashboard, take a live mock test, evaluate teacher attendance workflows, or manage institute financials as an admin in seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-extrabold text-sm shadow-lg transition-all hover:scale-102"
            >
              Access Demo Portals
            </Link>
            <Link
              to="/courses"
              className="px-6 py-3.5 rounded-2xl bg-blue-700/60 hover:bg-blue-700 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Browse Syllabus & Fees
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
