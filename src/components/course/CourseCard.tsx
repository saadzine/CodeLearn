import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Coffee, FileCode, Cpu, DivideIcon as LucideIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Progress from '../ui/Progress';
import { Course, CourseProgress } from '../../types';

interface CourseCardProps {
  course: Course;
  progress?: CourseProgress;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, progress }) => {
  const getIcon = (): React.ReactNode => {
    switch (course.language) {
      case 'python':
        return <Code className="h-6 w-6" style={{ color: course.color }} />;
      case 'java':
        return <Coffee className="h-6 w-6" style={{ color: course.color }} />;
      case 'php':
        return <FileCode className="h-6 w-6" style={{ color: course.color }} />;
      case 'cpp':
        return <Cpu className="h-6 w-6" style={{ color: course.color }} />;
      case 'javascript':
        return <Code className="h-6 w-6" style={{ color: course.color }} />;
      default:
        return <Code className="h-6 w-6" style={{ color: course.color }} />;
    }
  };

  // Calculate overall progress
  const calculateOverallProgress = (): number => {
    if (!progress) return 0;
    
    const moduleWeights = {
      beginner: 0.25,
      intermediate: 0.35,
      advanced: 0.4
    };
    
    return (
      progress.moduleProgress.beginner * moduleWeights.beginner +
      progress.moduleProgress.intermediate * moduleWeights.intermediate +
      progress.moduleProgress.advanced * moduleWeights.advanced
    );
  };

  const overallProgress = calculateOverallProgress();

  return (
    <Card className="h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {getIcon()}
          <CardTitle>{course.title}</CardTitle>
        </div>
        <CardDescription className="mt-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Beginner</span>
            </div>
            {progress && (
              <span className="text-xs text-gray-500">
                {progress.moduleProgress.beginner}% complete
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Intermediate</span>
            </div>
            {progress && (
              <span className="text-xs text-gray-500">
                {progress.moduleProgress.intermediate}% complete
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Advanced</span>
            </div>
            {progress && (
              <span className="text-xs text-gray-500">
                {progress.moduleProgress.advanced}% complete
              </span>
            )}
          </div>

          {progress && (
            <Progress
              value={overallProgress}
              label="Overall Progress"
              showValue={true}
              className="mt-4"
            />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link 
          to={`/courses/${course.slug}`} 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full"
        >
          {progress ? 'Continue Learning' : 'Start Learning'}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;