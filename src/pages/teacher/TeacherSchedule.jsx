import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, BookOpen } from 'lucide-react';

export const TeacherSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const timetable = {
    Monday: [
      { time: "09:00 AM - 11:00 AM", course: "JEE Advanced Pinnacle", topic: "Rotational Dynamics & Torque Analysis", room: "Lecture Hall A", batch: "Batch A1", students: 42 },
      { time: "11:30 AM - 01:00 PM", course: "Class 12 Boards Accelerator", topic: "Wave Optics: Interference & Huygens Principle", room: "Hall B", batch: "Board Batch B", students: 38 },
      { time: "04:00 PM - 05:30 PM", course: "JEE Advanced Problem Clinic", topic: "Doubt Clearing Session: Mechanics", room: "Doubt Hub 1", batch: "Remedial Cohort", students: 24 }
    ],
    Tuesday: [
      { time: "10:00 AM - 12:00 PM", course: "JEE Advanced Pinnacle", topic: "Center of Mass & Collision Mechanics", room: "Lecture Hall A", batch: "Batch A1", students: 42 },
      { time: "02:00 PM - 03:30 PM", course: "Olympiad Advanced Drills", topic: "Rigid Body Kinematics in 3D", room: "Seminar Room 3", batch: "Olympiad Team", students: 16 }
    ],
    Wednesday: [
      { time: "09:00 AM - 11:00 AM", course: "Class 12 Boards Accelerator", topic: "Electromagnetic Induction & Faraday's Laws", room: "Hall B", batch: "Board Batch B", students: 38 },
      { time: "11:30 AM - 01:00 PM", course: "JEE Advanced Pinnacle", topic: "Angular Momentum Conservation", room: "Lecture Hall A", batch: "Batch A1", students: 42 }
    ],
    Thursday: [
      { time: "10:00 AM - 12:00 PM", course: "JEE Advanced Pinnacle", topic: "Rolling Motion Without Slipping", room: "Lecture Hall A", batch: "Batch A1", students: 42 },
      { time: "03:00 PM - 04:30 PM", course: "Faculty Curriculum Committee", topic: "Mock Test Syllabus Review & Setting", room: "Conference Room", batch: "Academic Staff", students: 8 }
    ],
    Friday: [
      { time: "09:00 AM - 11:00 AM", course: "Class 12 Boards Accelerator", topic: "Alternating Current Circuits & LCR Resonators", room: "Hall B", batch: "Board Batch B", students: 38 },
      { time: "02:00 PM - 04:00 PM", course: "JEE Advanced Pinnacle", topic: "Advanced Numerical Problem Workshop", room: "Lecture Hall A", batch: "Batch A1", students: 42 }
    ],
    Saturday: [
      { time: "10:00 AM - 01:00 PM", course: "Weekly Grand Mock Examination", topic: "JEE Advanced Paper 1 Supervision", room: "Main Exam Hall", batch: "All JEE Batches", students: 120 }
    ]
  };

  const scheduleForDay = timetable[selectedDay] || [];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Faculty Teaching Timetable
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Weekly classroom schedule, laboratory demos, and doubt clearing sessions.
        </p>
      </div>

      {/* Day Picker Pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDay === day
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Cards for Day */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          {selectedDay}'s Scheduled Lectures ({scheduleForDay.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {scheduleForDay.map((session, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" /> {session.time}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {session.room}
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {session.course}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {session.topic}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                  <Users className="w-3.5 h-3.5" /> {session.batch}
                </span>
                <span>{session.students} Enrolled</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
