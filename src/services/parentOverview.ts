import { getParentChildren } from './parentData';
import { getProgress, getQuizAttempts, type QuizAttempt } from './progress';
import type { ChildProfile, LearningProgress } from '../types/models';

export type ChildLearningSummary = {
  child: ChildProfile;
  progress: LearningProgress[];
  attempts: QuizAttempt[];
  completedLessons: number;
  averageScore: number;
};

export async function getParentOverview(parentId: string): Promise<ChildLearningSummary[]> {
  const children = await getParentChildren(parentId);
  return Promise.all(children.map(async (child) => {
    const [progress, attempts] = await Promise.all([getProgress(child.id), getQuizAttempts(child.id)]);
    const completedLessons = progress.filter((item) => item.completed).length;
    const averageScore = attempts.length ? Math.round(attempts.reduce((sum, item) => sum + (item.score / item.total) * 100, 0) / attempts.length) : 0;
    return { child, progress, attempts, completedLessons, averageScore };
  }));
}
