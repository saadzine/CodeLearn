export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  progress?: Record<string, CourseProgress>;
}

export interface CourseProgress {
  completed: boolean;
  moduleProgress: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  quizScores: {
    beginner: number;
    intermediate: number;
    advanced: number;
    final: number;
  };
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  language: ProgrammingLanguage;
  description: string;
  icon: string;
  color: string;
  modules: {
    beginner: Module;
    intermediate: Module;
    advanced: Module;
  };
  finalQuiz: Quiz;
}

export type ProgrammingLanguage = 'python' | 'java' | 'php' | 'cpp' | 'javascript';

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: Quiz;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExamples: CodeExample[];
  exercises: Exercise[];
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  explanation: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Feedback {
  id: string;
  userId: string;
  courseId: string;
  moduleId?: string;
  quizId: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  timestamp: string;
}