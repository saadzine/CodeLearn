import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookOpen, Award, Clock, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CoursesContext';
import Button from '../components/ui/Button';
import Progress from '../components/ui/Progress';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ProgrammingLanguage } from '../types';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { courses } = useCourses();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
        <Button onClick={() => navigate('/login')}>Log In</Button>
      </div>
    );
  }

  // Get enrolled courses
  const enrolledCourses = currentUser.progress 
    ? Object.keys(currentUser.progress).map(slug => {
        return {
          course: courses.find(c => c.slug === slug),
          progress: currentUser.progress![slug as ProgrammingLanguage],
        };
      }).filter(item => item.course)
    : [];

  // Calculate total progress across all courses
  const calculateTotalProgress = () => {
    if (enrolledCourses.length === 0) return 0;
    
    const totalProgress = enrolledCourses.reduce((sum, item) => {
      const moduleProgress = item.progress.moduleProgress;
      const avgModuleProgress = (
        moduleProgress.beginner +
        moduleProgress.intermediate +
        moduleProgress.advanced
      ) / 3;
      return sum + avgModuleProgress;
    }, 0);
    
    return Math.round(totalProgress / enrolledCourses.length);
  };

  const totalProgress = calculateTotalProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentUser.username}!</h1>
        <p className="text-lg text-gray-600 mt-2">
          Track your progress and continue learning from where you left off.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Overall Progress</p>
                <p className="text-2xl font-bold">{totalProgress}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <Progress value={totalProgress} className="mt-4" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
                <p className="text-2xl font-bold">{enrolledCourses.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed Quizzes</p>
                <p className="text-2xl font-bold">
                  {enrolledCourses.reduce((count, item) => {
                    const quizScores = item.progress.quizScores;
                    return count + Object.values(quizScores).filter(score => score > 0).length;
                  }, 0)}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <User className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Learning Time</p>
                <p className="text-2xl font-bold">12h 30m</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* In Progress Courses */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
        
        {enrolledCourses.length > 0 ? (
          <div className="grid gap-6">
            {enrolledCourses.map(({ course, progress }) => course && (
              <Card key={course.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div 
                    className="w-full md:w-3 flex-shrink-0" 
                    style={{ backgroundColor: course.color }} 
                  />
                  <div className="flex-grow p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-gray-500 mt-1">{course.description.substring(0, 100)}...</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button 
                          onClick={() => navigate(`/courses/${course.slug}`)}
                          className="flex items-center"
                        >
                          Continue
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Beginner</span>
                          <span className="text-sm font-medium text-gray-700">{progress.moduleProgress.beginner}%</span>
                        </div>
                        <Progress value={progress.moduleProgress.beginner} size="sm" color="success" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Intermediate</span>
                          <span className="text-sm font-medium text-gray-700">{progress.moduleProgress.intermediate}%</span>
                        </div>
                        <Progress value={progress.moduleProgress.intermediate} size="sm" color="warning" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Advanced</span>
                          <span className="text-sm font-medium text-gray-700">{progress.moduleProgress.advanced}%</span>
                        </div>
                        <Progress value={progress.moduleProgress.advanced} size="sm" color="danger" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No courses in progress</h3>
            <p className="mt-1 text-gray-500">Get started by enrolling in a course.</p>
            <div className="mt-6">
              <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Courses */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended For You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses
            .filter(course => !currentUser.progress || !currentUser.progress[course.slug as ProgrammingLanguage])
            .slice(0, 3)
            .map(course => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">{course.description.substring(0, 100)}...</p>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/courses/${course.slug}`)}
                    fullWidth
                  >
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;