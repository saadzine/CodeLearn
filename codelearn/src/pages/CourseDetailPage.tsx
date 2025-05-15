import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, Check, ChevronRight, ArrowRight, DivideIcon as LucideIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Progress from '../components/ui/Progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { useCourses } from '../contexts/CoursesContext';
import { useAuth } from '../contexts/AuthContext';

const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getCourse, getUserProgress } = useCourses();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  const course = slug ? getCourse(slug) : undefined;
  const progress = slug ? getUserProgress(slug) : undefined;
  
  useEffect(() => {
    if (!course) {
      navigate('/courses');
    }
  }, [course, navigate]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // In a real app, this would make an API call to enroll the user
    navigate(`/courses/${slug}/learn/beginner`);
  };

  const handleContinueLearning = () => {
    if (!progress) {
      navigate(`/courses/${slug}/learn/beginner`);
      return;
    }
    
    // Determine which module to continue
    if (progress.moduleProgress.beginner < 100) {
      navigate(`/courses/${slug}/learn/beginner`);
    } else if (progress.moduleProgress.intermediate < 100) {
      navigate(`/courses/${slug}/learn/intermediate`);
    } else {
      navigate(`/courses/${slug}/learn/advanced`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <div>
          <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            <span style={{ color: course.color }}>●</span>
            <span className="ml-2">{course.language.toUpperCase()}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">{course.description}</p>
          
          {progress && (
            <div className="mt-6">
              <Progress 
                value={(
                  progress.moduleProgress.beginner + 
                  progress.moduleProgress.intermediate + 
                  progress.moduleProgress.advanced
                ) / 3}
                label="Overall Progress"
                showValue
                size="lg"
              />
            </div>
          )}
        </div>
        
        <div className="mt-6 md:mt-0">
          {isAuthenticated && progress ? (
            <Button 
              size="lg" 
              onClick={handleContinueLearning}
              className="flex items-center"
            >
              Continue Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button 
              size="lg" 
              onClick={handleEnroll}
              className="flex items-center"
            >
              Enroll Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div>
        <div className="flex flex-col md:flex-row border-b border-gray-200 mb-8">
          <button
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === 'beginner'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('beginner')}
          >
            Beginner
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === 'intermediate'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('intermediate')}
          >
            Intermediate
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === 'advanced'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced
          </button>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {course.modules[activeTab].title}
          </h2>
          <p className="text-gray-600 mb-8">
            {course.modules[activeTab].description}
          </p>

          <div className="space-y-4">
            {/* Will be populated with lessons in a real app */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                          {progress && progress.moduleProgress[activeTab] > (index + 1) * 20 ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {activeTab === 'beginner' && `Introduction to ${course.title} Basics`}
                          {activeTab === 'intermediate' && `Intermediate ${course.title} Concepts`}
                          {activeTab === 'advanced' && `Advanced ${course.title} Techniques`}
                          {' '}
                          {index + 1}
                        </h3>
                        <p className="text-gray-500">
                          Estimated time: 30 minutes
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/courses/${slug}/learn/${activeTab}/${index + 1}`)}
                        className="flex items-center"
                      >
                        {progress && progress.moduleProgress[activeTab] > (index + 1) * 20 ? 'Review' : 'Start'}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Final Assessment</h2>
          <Card className="bg-blue-50 border border-blue-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {course.finalQuiz.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {course.finalQuiz.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">Passing score: {course.finalQuiz.passingScore}%</span>
                    <span>Questions: {course.finalQuiz.questions.length || 'TBD'}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button
                    onClick={() => navigate(`/courses/${slug}/quiz/final`)}
                    className="flex items-center"
                    disabled={!progress || (
                      progress.moduleProgress.beginner < 100 ||
                      progress.moduleProgress.intermediate < 100 ||
                      progress.moduleProgress.advanced < 100
                    )}
                  >
                    Take Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;