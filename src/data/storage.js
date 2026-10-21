import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_COURSES,
  INITIAL_ATTENDANCE,
  INITIAL_FEES,
  INITIAL_TESTS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ASSIGNMENTS
} from './initialData';

const STORAGE_KEYS = {
  STUDENTS: 'edumanage_students_v1',
  TEACHERS: 'edumanage_teachers_v1',
  COURSES: 'edumanage_courses_v1',
  ATTENDANCE: 'edumanage_attendance_v1',
  FEES: 'edumanage_fees_v1',
  TESTS: 'edumanage_tests_v1',
  STUDY_MATERIALS: 'edumanage_materials_v1',
  ANNOUNCEMENTS: 'edumanage_announcements_v1',
  ASSIGNMENTS: 'edumanage_assignments_v1',
  AUTH: 'edumanage_auth_v1',
  THEME: 'edumanage_theme_v1'
};

export const getStoredItem = (key, defaultData) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(item);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return defaultData;
  }
};

export const setStoredItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
};

export const initializeStorage = () => {
  getStoredItem(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  getStoredItem(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS);
  getStoredItem(STORAGE_KEYS.COURSES, INITIAL_COURSES);
  getStoredItem(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  getStoredItem(STORAGE_KEYS.FEES, INITIAL_FEES);
  getStoredItem(STORAGE_KEYS.TESTS, INITIAL_TESTS);
  getStoredItem(STORAGE_KEYS.STUDY_MATERIALS, INITIAL_STUDY_MATERIALS);
  getStoredItem(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  getStoredItem(STORAGE_KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS);
};

export const resetToDefaults = () => {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(INITIAL_TEACHERS));
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(INITIAL_ATTENDANCE));
  localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(INITIAL_FEES));
  localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(INITIAL_TESTS));
  localStorage.setItem(STORAGE_KEYS.STUDY_MATERIALS, JSON.stringify(INITIAL_STUDY_MATERIALS));
  localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
};

export { STORAGE_KEYS };
