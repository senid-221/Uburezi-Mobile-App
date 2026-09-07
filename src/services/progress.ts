import AsyncStorage from '@react-native-async-storage/async-storage';
import { isSupabaseConfigured, supabase } from './supabase';
import type { LearningProgress } from '../types/models';

export type QuizAttempt = {
  id: string;
  childId: string;
  lessonId: string;
  score: number;
  total: number;
  completedAt: string;
};

const PROGRESS_KEY = '@uburezi/progress';
const QUIZ_KEY = '@uburezi/quiz-attempts';

async function readProgress(): Promise<LearningProgress[]> {
  const raw = await AsyncStorage.getItem(PROGRESS_KEY);
  return raw ? JSON.parse(raw) as LearningProgress[] : [];
}

export async function getProgress(childId?: string): Promise<LearningProgress[]> {
  const local = await readProgress();
  const filtered = childId ? local.filter((item) => item.childId === childId) : local;
  if (!isSupabaseConfigured || !supabase || !childId) return filtered;
  const { data } = await supabase.from('learning_progress').select('child_id, lesson_id, progress, completed, updated_at').eq('child_id', childId);
  if (!data) return filtered;
  return data.map((item) => ({ childId: item.child_id, lessonId: item.lesson_id, progress: item.progress, completed: item.completed, updatedAt: item.updated_at }));
}

export async function saveProgress(progress: LearningProgress): Promise<void> {
  const all = await readProgress();
  const next = [...all.filter((item) => !(item.childId === progress.childId && item.lessonId === progress.lessonId)), progress];
  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  if (isSupabaseConfigured && supabase && !progress.childId.startsWith('local-')) {
    const { error } = await supabase.from('learning_progress').upsert({ child_id: progress.childId, lesson_id: progress.lessonId, progress: progress.progress, completed: progress.completed, updated_at: progress.updatedAt }, { onConflict: 'child_id,lesson_id' });
    if (error) throw error;
  }
}

export async function completeLesson(childId: string, lessonId: string): Promise<void> {
  await saveProgress({ childId, lessonId, progress: 100, completed: true, updatedAt: new Date().toISOString() });
}

export async function saveQuizAttempt(attempt: QuizAttempt): Promise<void> {
  const raw = await AsyncStorage.getItem(QUIZ_KEY);
  const all = raw ? JSON.parse(raw) as QuizAttempt[] : [];
  await AsyncStorage.setItem(QUIZ_KEY, JSON.stringify([attempt, ...all.filter((item) => item.id !== attempt.id)]));
}

export async function getQuizAttempts(childId?: string): Promise<QuizAttempt[]> {
  const raw = await AsyncStorage.getItem(QUIZ_KEY);
  const all = raw ? JSON.parse(raw) as QuizAttempt[] : [];
  return childId ? all.filter((item) => item.childId === childId) : all;
}
