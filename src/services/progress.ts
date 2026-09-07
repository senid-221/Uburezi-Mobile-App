import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LearningProgress } from '../types/models';

const PROGRESS_KEY = '@uburezi/progress';
const QUIZ_KEY = '@uburezi/quiz-attempts';

export type QuizAttempt = {
  id: string;
  childId: string;
  lessonId: string;
  score: number;
  total: number;
  completedAt: string;
};

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const value = await AsyncStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function getProgress(): Promise<LearningProgress[]> {
  return readJson<LearningProgress[]>(PROGRESS_KEY, []);
}

export async function saveProgress(item: LearningProgress): Promise<void> {
  const current = await getProgress();
  const next = current.some((p) => p.childId === item.childId && p.lessonId === item.lessonId)
    ? current.map((p) => (p.childId === item.childId && p.lessonId === item.lessonId ? item : p))
    : [...current, item];
  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
}

export async function getQuizAttempts(): Promise<QuizAttempt[]> {
  return readJson<QuizAttempt[]>(QUIZ_KEY, []);
}

export async function saveQuizAttempt(attempt: QuizAttempt): Promise<void> {
  const current = await getQuizAttempts();
  await AsyncStorage.setItem(QUIZ_KEY, JSON.stringify([attempt, ...current].slice(0, 100)));
}

export async function completeLesson(childId: string, lessonId: string): Promise<void> {
  await saveProgress({
    childId,
    lessonId,
    progress: 100,
    completed: true,
    updatedAt: new Date().toISOString(),
  });
}
