/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  name: string;
  startDate: string;
  gender?: string;
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  targetWeight?: number; // in kg
  xp: number; // Experience points
  level: number; // 1 to 5
  streak: number;
  lastActiveDate?: string; // YYYY-MM-DD
  activeDaysCount: number;
}

export interface Habit {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  frequency: string; // 'diario'
  completedDates: string[]; // List of YYYY-MM-DD
  category: 'water' | 'exercise' | 'nutrition' | 'rest' | 'custom';
}

export interface WorkoutLog {
  id: string;
  date: string; // YYYY-MM-DD
  routineName: string;
  durationSeconds: number;
  exercisesCompleted: number;
  caloriesBurned: number;
  intensity: 'baja' | 'media' | 'alta';
}

export interface ProgressLog {
  id: string;
  date: string; // YYYY-MM-DD
  weight: number; // kg
  chest?: number; // cm
  waist?: number; // cm
  biceps?: number; // cm
  thighs?: number; // cm
  photo?: string; // base64 or placeholder style
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon key
  category: 'habit' | 'workout' | 'streak' | 'level';
  requirementType: 'first_day' | 'streak_7' | 'streak_14' | 'streak_30' | 'first_workout' | 'weekly_goal' | 'level_elite';
  unlocked: boolean;
  unlockedDate?: string; // YYYY-MM-DD
}

export interface DailyNote {
  date: string; // YYYY-MM-DD
  note: string;
}
