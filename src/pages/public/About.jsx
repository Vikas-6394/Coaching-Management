import React from 'react';
import { Target, Compass, Award, GraduationCap, CheckCircle, Star, Users } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const About = () => {
  const { teachers } = useData();

  const milestones = [
    { year: "2014", title: "Foundation in New Delhi", desc: "Started with a cohort of 35 engineering aspirants and 3 veteran IITian educators." },
    { year: "2018", title: "All-India Top 50 Rank", desc: "Celebrated our first national top-50 rank in JEE Advanced with 88% overall qualification." },
    { year: "2021", title: "Hybrid Learning & Test Vault", desc: "Launched nationwide digital mock testing platform with computer-based test analytics." },
    { year: "2026", title: "14,800+ Alumni & 5 Campuses", desc: "Expanded across NCR and Northern India with dedicated medical & engineering wings." }
  ];

  return (
    <div className="space-y-16 sm:space-y-20 py-8 sm:py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          About EduManage Institute
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-3xl mx-auto">
          Pioneering Excellence in Competitive Entrance Coaching
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Founded with a mission to demystify complex engineering and medical entrance syllabi, EduManage delivers world-class pedagogy and real-time performance diagnostics.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              To provide every ambitious student with structured conceptual clarity, high-yield problem solving heuristics, and an encouraging ecosystem that converts academic potential into top-tier entrance ranks.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              To be India's benchmark coaching institution where innovative pedagogical engineering and transparent performance analytics nurture tomorrow's leading engineers, scientists, and healthcare leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              The 3-Tier Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How We Ensure Consistent Top Ranks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <span className="w-8 h-8 rounded-full bg-rose-900 text-white flex items-center justify-center text-xs font-extrabold shadow-sm">
                01
              </span>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">First-Principles Clarity</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                We avoid rote formulas. Every derivation and reaction mechanism is derived from fundamental axioms with real physical intuition.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <span className="w-8 h-8 rounded-full bg-orange-700 text-white flex items-center justify-center text-xs font-extrabold shadow-sm">
                02
              </span>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Tiered Problem Sheets</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Level 1 (Concept Verification), Level 2 (Previous Year Tough Questions), and Level 3 (Multi-concept Olympiad challenges).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-extrabold">
                03
              </span>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Diagnostic Error Analysis</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                After every test, students receive pinpoint accuracy breakdown identifying negative marks, slow questions, and formula gaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            World-Class Mentors
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meet Our Distinguished Faculty
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20 shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {t.subject} • {t.designation}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Exp: {t.experience}
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1.5 leading-relaxed">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    {t.qualification}
                  </p>
                  <p>{t.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Institute Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Our Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Milestones of Academic Triumph
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2"
            >
              <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                {m.year}
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{m.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
