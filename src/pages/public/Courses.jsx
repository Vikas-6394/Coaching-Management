import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { CourseCard } from '../../components/CourseCard';
import { SearchFilter } from '../../components/SearchFilter';
import { BookOpen } from 'lucide-react';

export const Courses = () => {
  const { courses, enrollCourse, students } = useData();
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = useMemo(() => {
    return Array.from(new Set(courses.map(c => c.category))).sort();
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || c.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "All" ||
        c.level.toLowerCase().includes(selectedLevel.toLowerCase());

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchTerm, selectedCategory, selectedLevel]);

  const handleEnroll = (course) => {
    if (!isAuthenticated) {
      toast.warning(
        `Please log in or register as a student to enroll in "${course.title}".`,
        "Login Required"
      );
      navigate('/login', { state: { returnTo: `/courses/${course.id}` } });
      return;
    }

    if (user?.role !== 'student') {
      toast.info(
        `You are currently logged in with a ${user?.role === 'admin' ? 'Director / Admin' : 'Faculty'} account. Please switch to a Student account to enroll in courses.`,
        "Student Account Required"
      );
      return;
    }

    enrollCourse(user.id, course.id);
    toast.success(
      `Successfully enrolled in "${course.title}"! Opening your Student Portal now.`,
      "Enrollment Successful"
    );
    navigate('/student/courses');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Academic Offerings
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Our Courses & Batches
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          From intensive 2-year IIT-JEE & NEET programs to focused board exam mastery.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          placeholder="Search by course title, instructor, or subject..."
          totalCount={courses.length}
          filteredCount={filteredCourses.length}
        />

        {/* Level Quick Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="font-semibold text-slate-400 mr-1">Level:</span>
          {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                selectedLevel === lvl
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            const currentStudent = user?.role === 'student' ? students?.find((s) => s.id === user.id) : null;
            const isEnrolled = !!currentStudent?.enrolledCourses?.includes(course.id);
            return (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={isEnrolled}
                onEnroll={() => handleEnroll(course)}
                onResume={() => navigate('/student/courses')}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-800 dark:text-slate-200">No courses match your filter criteria</h4>
          <p className="text-xs text-slate-500">Try adjusting your search terms or clearing category filters.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSelectedLevel("All");
            }}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
