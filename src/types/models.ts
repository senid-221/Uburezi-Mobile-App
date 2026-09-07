export type LearningLevel = 'early' | 'young' | 'kids' | 'teens';

export type ParentAccount = {
  id: string;
  name: string;
  email: string;
};

export type ChildProfile = {
  id: string;
  parentId: string;
  name: string;
  birthYear: number;
  level: LearningLevel;
  avatar: string;
  createdAt: string;
};

export type LearningProgress = {
  childId: string;
  lessonId: string;
  progress: number;
  completed: boolean;
  updatedAt: string;
};
