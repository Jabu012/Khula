
export enum AppView {
  DASHBOARD = 'dashboard',
  DOCUMENTS = 'documents',
  TUTORING = 'tutoring',
  EXAM_MODE = 'exam_mode',
  FLASHCARDS = 'flashcards',
  ANALYTICS = 'analytics',
  PRICING = 'pricing'
}

export interface PDFDocument {
  id: string;
  name: string;
  content: string;
  uploadDate: Date;
  summary?: string;
  topics?: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
}

export enum SubscriptionTier {
  FREE = 'Free',
  PRO = 'Pro',
  PRO_PLUS = 'Pro+',
  INSTITUTION = 'Institution'
}
