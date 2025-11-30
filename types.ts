export type QuestionType = 'TWK' | 'TIU' | 'TKP';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Module {
  title: string;
  type: 'Video' | 'Bacaan' | 'Kuis';
  duration: string;
  completed: boolean;
}

export interface StudyMaterial {
  id: string;
  title: string;
  desc: string;
  color: string;
  modules: Module[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ExamState {
  active: boolean;
  finished: boolean;
  score: number;
  answered: number;
}

export type TabId = 'home' | 'learn' | 'simulation' | 'mentor' | 'profile';