import React, { createContext, useContext, useState } from 'react';
import { Course, CourseProgress, ProgrammingLanguage } from '../types';
import { MOCK_COURSES } from '../data/mockData';
import { useAuth } from './AuthContext';

interface CoursesContextType {
  courses: Course[];
  getCourse: (slug: string) => Course | undefined;
  getUserProgress: (courseId: string) => CourseProgress | undefined;
  updateUserProgress: (courseId: string, progress: Partial<CourseProgress>) => void;
}

const CoursesContext = createContext<CoursesContextType>({
  courses: [],
  getCourse: () => undefined,
  getUserProgress: () => undefined,
  updateUserProgress: () => {},
});

export const useCourses = () => useContext(CoursesContext);

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses] = useState<Course[]>(MOCK_COURSES);
  const { currentUser } = useAuth();

  const getCourse = (slug: string): Course | undefined => {
    return courses.find(course => course.slug === slug);
  };

  const getUserProgress = (courseId: string): CourseProgress | undefined => {
    if (!currentUser || !currentUser.progress) return undefined;
    
    const course = courses.find(c => c.id === courseId || c.slug === courseId);
    if (!course) return undefined;
    
    return currentUser.progress[course.slug as ProgrammingLanguage];
  };

  const updateUserProgress = (courseId: string, newProgress: Partial<CourseProgress>) => {
    // In a real app, this would make an API call to update progress in the database
    console.log('Updating progress for course', courseId, newProgress);
    // Implementation would continue here
  };

  const value = {
    courses,
    getCourse,
    getUserProgress,
    updateUserProgress,
  };

  return (
    <CoursesContext.Provider value={value}>
      {children}
    </CoursesContext.Provider>
  );
};