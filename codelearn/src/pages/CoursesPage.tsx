import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useCourses } from '../contexts/CoursesContext';
import { useAuth } from '../contexts/AuthContext';
import CourseCard from '../components/course/CourseCard';
import { ProgrammingLanguage } from '../types';

const CoursesPage: React.FC = () => {
  const { courses } = useCourses();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage | 'all'>('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });

  const handleLanguageChange = (language: ProgrammingLanguage | 'all') => {
    setSelectedLanguage(language);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Courses</h1>
        <p className="text-lg text-gray-600">
          Browse our collection of programming courses and start learning today.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative flex-grow md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Language Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedLanguage === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleLanguageChange('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedLanguage === 'python'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleLanguageChange('python')}
          >
            Python
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedLanguage === 'javascript'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleLanguageChange('javascript')}
          >
            JavaScript
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedLanguage === 'java'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleLanguageChange('java')}
          >
            Java
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedLanguage === 'php'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleLanguageChange('php')}
          >
            PHP
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedLanguage === 'cpp'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleLanguageChange('cpp')}
          >
            C++
          </button>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => {
            const userProgress = currentUser?.progress?.[course.language as ProgrammingLanguage];
            return (
              <CourseCard 
                key={course.id} 
                course={course} 
                progress={userProgress}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
            <Filter className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;