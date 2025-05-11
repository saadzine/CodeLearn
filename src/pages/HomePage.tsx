import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Book, Award, Brain, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CoursesContext';
import CourseCard from '../components/course/CourseCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { courses } = useCourses();
  
  // Display only a few courses for the preview section
  const previewCourses = courses.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Master Programming Languages with Interactive Learning
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Learn Python, Java, PHP, C++, and JavaScript through hands-on exercises, quizzes, and personalized AI feedback.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50"
                  onClick={() => navigate('/courses')}
                >
                  Explore Courses
                </Button>
                {!isAuthenticated && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-blue-700"
                    onClick={() => navigate('/register')}
                  >
                    Sign Up Free
                  </Button>
                )}
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 mt-10 lg:mt-0 lg:ml-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-xl">
                <div className="relative">
                  <div className="bg-white/10 rounded-md p-4 mb-4">
                    <code className="text-sm text-blue-100 font-mono">
                      <span className="text-yellow-300">def</span> <span className="text-green-300">greet</span>(name):<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">return</span> <span className="text-orange-300">f"Hello, </span>{'{name}'}<span className="text-orange-300">! Welcome to CodeLearn."</span><br /><br />
                      <span className="text-green-300">print</span>(greet(<span className="text-orange-300">"Developer"</span>))
                    </code>
                  </div>
                  <div className="bg-white/10 rounded-md p-4 mb-4">
                    <code className="text-sm text-blue-100 font-mono">
                      <span className="text-yellow-300">function</span> <span className="text-green-300">calculateArea</span>(radius) {'{'}<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">return</span> Math.<span className="text-green-300">PI</span> * radius * radius;<br />
                      {'}'}<br /><br />
                      <span className="text-green-300">console.log</span>(<span className="text-green-300">calculateArea</span>(<span className="text-orange-300">5</span>));
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose CodeLearn?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers a unique learning experience designed to help you master programming languages effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
                <Book className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Structured Learning</h3>
              <p className="text-gray-600">
                Each course is divided into beginner, intermediate, and advanced modules for systematic progress.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full text-green-600 mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Coding</h3>
              <p className="text-gray-600">
                Practice with hands-on exercises and real-time feedback in our interactive code environment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full text-purple-600 mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Feedback</h3>
              <p className="text-gray-600">
                Receive personalized recommendations and insights from our advanced AI system.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full text-yellow-600 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Skill Certification</h3>
              <p className="text-gray-600">
                Earn certificates as you complete courses and demonstrate your programming proficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
              <p className="mt-2 text-lg text-gray-600">
                Start your journey with our most in-demand programming courses
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/courses')}
              className="flex items-center"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previewCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners who are advancing their programming skills with CodeLearn.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-700 hover:bg-blue-50"
            onClick={() => navigate(isAuthenticated ? '/courses' : '/register')}
          >
            {isAuthenticated ? 'Explore Courses' : 'Get Started For Free'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;