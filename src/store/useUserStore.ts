import { create } from 'zustand';
import type { MockUser } from '@/types';
import { mockUsers as mockUsersData } from '@/data/mockUsers';

interface UserStore {
  currentUser: MockUser;
  mockUsers: MockUser[];
  totalPredictions: number;
  correctPredictions: number;
  points: number;
  achievements: string[];
  updateStats: (predictions: { total: number; correct: number }) => void;
}

const defaultUser: MockUser = {
  id: 'current',
  name: '我',
  avatar: '🙋',
  totalPoints: 0,
  correctPredictions: 0,
  totalPredictions: 0,
  achievements: [],
};

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: defaultUser,
  mockUsers: mockUsersData,
  totalPredictions: 0,
  correctPredictions: 0,
  points: 0,
  achievements: [],

  updateStats: (predictions) => {
    const points = predictions.correct * 25;
    const achievements: string[] = [];

    if (predictions.total >= 1) {
      achievements.push('初出茅庐');
    }
    if (predictions.correct >= 10) {
      achievements.push('预言家');
    }
    if (predictions.correct >= 5) {
      achievements.push('数据达人');
    }
    if (predictions.total >= 30) {
      achievements.push('铁杆球迷');
    }

    const updatedUser: MockUser = {
      ...get().currentUser,
      totalPoints: points,
      correctPredictions: predictions.correct,
      totalPredictions: predictions.total,
      achievements,
    };

    set({
      currentUser: updatedUser,
      totalPredictions: predictions.total,
      correctPredictions: predictions.correct,
      points,
      achievements,
    });
  },
}));
