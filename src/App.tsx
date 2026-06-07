/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Dumbbell, TrendingUp, Award, User, Calendar, 
  Flame, Sparkles, CheckSquare, Trophy, CheckCircle2,
  Smartphone, Download, X
} from 'lucide-react';

import { UserProfile, Habit, WorkoutLog, ProgressLog, Achievement } from './types';
import { INITIAL_HABITS, INITIAL_ACHIEVEMENTS, ROUTINES_BY_DAY, getXPForLevel, getLevelName } from './data';

import WelcomeScreen from './components/WelcomeScreen';
import DashboardView from './components/DashboardView';
import WorkoutView from './components/WorkoutView';
import HabitsView from './components/HabitsView';
import ProgressView from './components/ProgressView';
import CalendarView from './components/CalendarView';
import AchievementsView from './components/AchievementsView';
import ProfileView from './components/ProfileView';
import ProfitPlan30DView from './components/ProfitPlan30DView';

export default function App() {
  // Current local Date representation
  const todayDateStr = new Date().toISOString().split('T')[0];

  // Core synchronized states
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('profit_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('profit_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  const [workouts, setWorkouts] = useState<WorkoutLog[]>(() => {
    const saved = localStorage.getItem('profit_workouts');
    return saved ? JSON.parse(saved) : [];
  });

  const [logs, setLogs] = useState<ProgressLog[]>(() => {
    const saved = localStorage.getItem('profit_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('profit_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [activeTab, setActiveTab] = useState<'inicio' | 'entrenamientos' | 'progreso' | 'logros' | 'perfil'>('inicio');
  const [levelUpOverlay, setLevelUpOverlay] = useState<number | null>(null);

  // PLAN PROFIT 30D States
  const [completedChallengeDays, setCompletedChallengeDays] = useState<number[]>(() => {
    const saved = localStorage.getItem('profit_30d_completed');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentChallengeDay, setCurrentChallengeDay] = useState<number>(() => {
    const saved = localStorage.getItem('profit_30d_active_day');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [showProfitPlan30D, setShowProfitPlan30D] = useState<boolean>(false);

  // PWA Installation state and event handlers
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);
  const [showIOSInstallBanner, setShowIOSInstallBanner] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent original browser pop-up prompt
      e.preventDefault();
      // Store event
      setDeferredPrompt(e);
      // Display current install trigger bar
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if running as a standalone app already
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (navigator as any).standalone === true;

    // Detect if running on an Apple mobile environment
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isIOSDevice && !isStandalone) {
      const closedSessionBanner = sessionStorage.getItem('profit_ios_banner_dismissed') === 'true';
      if (!closedSessionBanner) {
        setShowIOSInstallBanner(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    
    // Trigger standard browser UI installation prompt
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log('[PROFIT FITNESS PWA] User prompt decision:', outcome);

    // Clear saved prompt response
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleDismissIOSInstall = () => {
    setShowIOSInstallBanner(false);
    sessionStorage.setItem('profit_ios_banner_dismissed', 'true');
  };

  // Sync to localStorage on state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('profit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('profit_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('profit_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('profit_workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('profit_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('profit_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('profit_30d_completed', JSON.stringify(completedChallengeDays));
  }, [completedChallengeDays]);

  useEffect(() => {
    localStorage.setItem('profit_30d_active_day', currentChallengeDay.toString());
  }, [currentChallengeDay]);

  const handleCompleteChallengeDay = (dayNum: number) => {
    if (completedChallengeDays.includes(dayNum)) return;

    setCompletedChallengeDays((prev) => {
      const updated = [...prev, dayNum];
      return updated;
    });

    addXP(100); // Grand +100 XP bonus!

    setCurrentChallengeDay((prev) => {
      const nextDay = dayNum + 1;
      return nextDay > 30 ? 31 : nextDay;
    });
  };

  const handleCompletePlanWorkout = (routineName: string) => {
    const newLog: WorkoutLog = {
      id: `workout-${Date.now()}`,
      date: todayDateStr,
      routineName: routineName + ' (Plan Profit 30D)',
      durationSeconds: 2700, // 45 min
      exercisesCompleted: 5,
      caloriesBurned: 450,
      intensity: 'media'
    };

    setWorkouts((prev) => [...prev, newLog]);
    addXP(50); // standard +50 XP
    handleActiveDaysUpdate();
  };

  // Check achievements & level ups whenever state updates
  useEffect(() => {
    if (!user) return;

    let updatedAchievements = [...achievements];
    let changed = false;

    // 1. "Primer Paso" (first_day) -> unlocked if active
    const badgeFirstDay = updatedAchievements.find(a => a.id === 'a1');
    if (badgeFirstDay && !badgeFirstDay.unlocked) {
      badgeFirstDay.unlocked = true;
      badgeFirstDay.unlockedDate = todayDateStr;
      changed = true;
    }

    // 2. "Hierro Forjado" (first_workout) -> unlocked if workouts count >= 1
    const badgeFirstWorkout = updatedAchievements.find(a => a.id === 'a2');
    if (badgeFirstWorkout && !badgeFirstWorkout.unlocked && workouts.length >= 1) {
      badgeFirstWorkout.unlocked = true;
      badgeFirstWorkout.unlockedDate = todayDateStr;
      changed = true;
    }

    // 3. "Constancia Inicial" (streak_7) -> unlocked if streak >= 7
    const badgeStreak7 = updatedAchievements.find(a => a.id === 'a3');
    if (badgeStreak7 && !badgeStreak7.unlocked && user.streak >= 7) {
      badgeStreak7.unlocked = true;
      badgeStreak7.unlockedDate = todayDateStr;
      changed = true;
    }

    // 4. "Hábito de Acero" (streak_14) -> unlocked if streak >= 14
    const badgeStreak14 = updatedAchievements.find(a => a.id === 'a4');
    if (badgeStreak14 && !badgeStreak14.unlocked && user.streak >= 14) {
      badgeStreak14.unlocked = true;
      badgeStreak14.unlockedDate = todayDateStr;
      changed = true;
    }

    // 5. "Transformación Legendaria" (streak_30) -> unlocked if streak >= 30
    const badgeStreak30 = updatedAchievements.find(a => a.id === 'a5');
    if (badgeStreak30 && !badgeStreak30.unlocked && user.streak >= 30) {
      badgeStreak30.unlocked = true;
      badgeStreak30.unlockedDate = todayDateStr;
      changed = true;
    }

    // 6. "Meta Semanal de Hábitos" -> completed at least 80% on any day
    const badgeWeekly = updatedAchievements.find(a => a.id === 'a6');
    if (badgeWeekly && !badgeWeekly.unlocked) {
      // check if any day has 80%+ habits logged
      const datesLogged = Array.from(new Set(habits.flatMap(h => h.completedDates)));
      const hasMetWeekly = datesLogged.some(d => {
        const complCount = habits.filter(h => h.completedDates.includes(d)).length;
        const percent = habits.length > 0 ? (complCount / habits.length) * 100 : 0;
        return percent >= 80;
      });

      if (hasMetWeekly) {
        badgeWeekly.unlocked = true;
        badgeWeekly.unlockedDate = todayDateStr;
        changed = true;
      }
    }

    // 7. "Elite de Profit Fitness" -> reached Level 5
    const badgeElite = updatedAchievements.find(a => a.id === 'a7');
    if (badgeElite && !badgeElite.unlocked && user.level >= 5) {
      badgeElite.unlocked = true;
      badgeElite.unlockedDate = todayDateStr;
      changed = true;
    }

    if (changed) {
      setAchievements(updatedAchievements);
    }
  }, [user?.streak, user?.activeDaysCount, workouts.length, habits, achievements, user?.level]);

  // Handle XP Gains and levels calculations
  const addXP = (points: number) => {
    if (!user) return;

    setUser((prevUser) => {
      if (!prevUser) return null;
      const newXP = prevUser.xp + points;
      let newLevel = prevUser.level;

      // Recalculate level
      if (newXP >= 3501) {
        newLevel = 6;
      } else if (newXP >= 2201) {
        newLevel = 5;
      } else if (newXP >= 1201) {
        newLevel = 4;
      } else if (newXP >= 601) {
        newLevel = 3;
      } else if (newXP >= 201) {
        newLevel = 2;
      } else {
        newLevel = 1;
      }

      if (newLevel > prevUser.level) {
        setLevelUpOverlay(newLevel);
      }

      return {
        ...prevUser,
        xp: newXP,
        level: newLevel
      };
    });
  };

  const handleWelcomeComplete = (name: string, weight?: number, targetWeight?: number, height?: number, age?: number) => {
    const newUser: UserProfile = {
      name,
      startDate: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      weight,
      targetWeight,
      height,
      age,
      xp: 100, // starting gift XP
      level: 1,
      streak: 1,
      activeDaysCount: 1,
      lastActiveDate: todayDateStr
    };

    setUser(newUser);
  };

  // Habit toggles
  const handleToggleHabit = (id: string, dateStr: string) => {
    setHabits((prevHabits) => {
      return prevHabits.map((habit) => {
        if (habit.id === id) {
          const isCompleted = habit.completedDates.includes(dateStr);
          let newDates = [...habit.completedDates];

          if (isCompleted) {
            newDates = newDates.filter(d => d !== dateStr);
          } else {
            newDates.push(dateStr);
            addXP(15); // +15 XP for habit completion!
          }

          return { ...habit, completedDates: newDates };
        }
        return habit;
      });
    });

    handleActiveDaysUpdate();
  };

  // Manual fast checklist toggle for calendar retrospective
  const handleManualToggleDayHabits = (dateStr: string) => {
    const allHabitsAreDoneOnDay = habits.every(h => h.completedDates.includes(dateStr));

    setHabits((prevHabits) => {
      return prevHabits.map((habit) => {
        const contains = habit.completedDates.includes(dateStr);
        let newDates = [...habit.completedDates];

        if (allHabitsAreDoneOnDay) {
          newDates = newDates.filter(d => d !== dateStr);
        } else if (!contains) {
          newDates.push(dateStr);
        }

        return { ...habit, completedDates: newDates };
      });
    });

    if (!allHabitsAreDoneOnDay) {
      addXP(40); // extra reward retrospective
    }
    handleActiveDaysUpdate();
  };

  const handleManualToggleDayWorkout = (dateStr: string) => {
    const hasWorkout = workouts.some(w => w.date === dateStr);

    if (hasWorkout) {
      setWorkouts(prev => prev.filter(w => w.date !== dateStr));
    } else {
      const newMockWorkout: WorkoutLog = {
        id: `m-${Date.now()}`,
        date: dateStr,
        routineName: 'Entrenamiento Completado (Manual)',
        durationSeconds: 2700, // 45 min
        exercisesCompleted: 5,
        caloriesBurned: 400,
        intensity: 'media'
      };
      setWorkouts(prev => [...prev, newMockWorkout]);
      addXP(50); // +50 XP
    }

    handleActiveDaysUpdate();
  };

  const handleActiveDaysUpdate = () => {
    if (!user) return;

    setUser((prev) => {
      if (!prev) return null;
      if (prev.lastActiveDate === todayDateStr) return prev;

      // check if missed a day to maintain streak
      let newStreak = prev.streak;
      const lastActive = prev.lastActiveDate ? new Date(prev.lastActiveDate) : null;
      const today = new Date(todayDateStr);

      if (lastActive) {
        const diffTime = Math.abs(today.getTime() - lastActive.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 1) {
          // maintain or increase
          newStreak = prev.streak + 1;
        } else {
          // streak broken
          newStreak = 1;
        }
      }

      return {
        ...prev,
        lastActiveDate: todayDateStr,
        activeDaysCount: prev.activeDaysCount + 1,
        streak: newStreak
      };
    });
  };

  // Add Habit handler
  const handleAddHabit = (name: string, category: 'water' | 'exercise' | 'nutrition' | 'rest' | 'custom') => {
    const newHab: Habit = {
      id: `custom-${Date.now()}`,
      name,
      icon: category === 'water' ? 'Droplet' : category === 'exercise' ? 'Dumbbell' : category === 'nutrition' ? 'Flame' : category === 'rest' ? 'Moon' : 'Sparkles',
      frequency: 'diario',
      completedDates: [],
      category
    };

    setHabits((prev) => [...prev, newHab]);
    addXP(10); // small XP bonus
  };

  // Delete Habit handler
  const handleDeleteHabit = (id: string) => {
    setHabits((prev) => prev.filter(h => h.id !== id));
  };

  // Completing active workout
  const handleCompleteWorkout = (durationSeconds: number, exercisesCompleted: number, calories: number) => {
    const newLog: WorkoutLog = {
      id: `workout-${Date.now()}`,
      date: todayDateStr,
      routineName: getTodaysRoutine().routineName,
      durationSeconds,
      exercisesCompleted,
      caloriesBurned: calories,
      intensity: 'media'
    };

    setWorkouts((prev) => [...prev, newLog]);
    addXP(50); // +50 XP for daily workout!
    handleActiveDaysUpdate();
  };

  const handleAddProgressLog = (logData: Omit<ProgressLog, 'id'>) => {
    const newProgress: ProgressLog = {
      id: `progress-${Date.now()}`,
      ...logData
    };

    setLogs((prev) => [...prev, newProgress]);

    // Also update current metrics inside the general profile
    setUser((prevUser) => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        weight: logData.weight
      };
    });

    addXP(30); // +30 XP for tracking progress
    handleActiveDaysUpdate();
  };

  const handleDeleteProgressLog = (id: string) => {
    setLogs((prev) => prev.filter(l => l.id !== id));
  };

  const handleUpdateProfileMetrics = (currWeight?: number, targWeight?: number, height?: number) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        weight: currWeight !== undefined ? currWeight : prev.weight,
        targetWeight: targWeight !== undefined ? targWeight : prev.targetWeight,
        height: height !== undefined ? height : prev.height
      };
    });
    addXP(15);
  };

  const handleResetDatabase = () => {
    // Wipe local records
    localStorage.clear();
    setUser(null);
    setHabits(INITIAL_HABITS);
    setWorkouts([]);
    setLogs([]);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setCompletedChallengeDays([]);
    setCurrentChallengeDay(1);
    setShowProfitPlan30D(false);
    setActiveTab('inicio');
  };

  // Routine of the day loader based on current day of week (es local representation)
  const getTodaysRoutine = () => {
    const day = new Date().getDay(); // 0-6
    return ROUTINES_BY_DAY[day] || ROUTINES_BY_DAY[1];
  };

  const todaysRoutine = getTodaysRoutine();
  
  // check if workout is complete today
  const todayWorkoutDetails = workouts.find(w => w.date === todayDateStr);

  return (
    <div id="profit-fitness-container" className="min-h-screen bg-[#050505] font-sans antialiased flex flex-col items-center justify-start py-0 md:py-6 relative px-0">
      {/* Absolute high premium mesh circles */}
      <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-[#A8E61D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-[#7BCB14]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Frame wrapper simulating phone viewport or centering on screen */}
      <div id="main-app-viewport" className="w-full max-w-[430px] min-h-screen md:min-h-[92vh] md:rounded-3xl bg-[#050505]/90 md:border md:border-white/10 md:shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden relative backdrop-blur-md mx-auto box-border">
        
        {/* Core screens navigator based on Profile login status */}
        {!user ? (
          <WelcomeScreen onComplete={handleWelcomeComplete} />
        ) : (
          <div className="flex-1 flex flex-col min-h-full">
            {/* Top header app branding bar */}
            <div className="px-6 py-4 border-b border-white/5 bg-[#1A1A1A]/30 flex justify-between items-center z-10">
              <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveTab('inicio')}>
                <Dumbbell className="w-5 h-5 text-[#A8E61D] drop-shadow-[0_0_8px_rgba(168,230,29,0.3)]" />
                <span className="text-sm font-sans font-black tracking-wider text-white">PROFIT <span className="text-[#A8E61D]">FITNESS</span></span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#BFBFBF]/60 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">XP: {user.xp}</span>
                <span className="font-mono text-xs font-bold text-[#A8E61D]" title="Streak racha">🔥 {user.streak} D</span>
              </div>
            </div>

            {/* Scrollable View Containment */}
            <div className="flex-1 overflow-y-auto px-6 pt-5" style={{ scrollbarWidth: 'none' }}>
              
              {/* PWA Standard Install Prompt (Android & Desktop) */}
              {showInstallBanner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-5 p-4 rounded-3xl bg-gradient-to-br from-[#1C1C1C] to-[#0D0D0D] border-2 border-[#A8E61D]/50 shadow-xl overflow-hidden relative group"
                >
                  <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[#A8E61D]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#A8E61D]/15 text-[#A8E61D]">
                        <Smartphone className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold tracking-widest text-[#D7FF5A] uppercase bg-[#A8E61D]/10 px-2 py-0.5 rounded-md border border-[#A8E61D]/20">MÓVIL Y ESCRITORIO</span>
                        <h4 className="text-sm font-black font-sans text-white leading-tight mt-1">PROFIT FITNESS INSTALABLE</h4>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowInstallBanner(false)}
                      className="p-1 rounded-full bg-white/5 text-[#BFBFBF]/60 hover:text-white transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#BFBFBF]/80 mt-2.5 leading-relaxed">
                    Instala la app en tu pantalla de inicio para un acceso rápido premium, widgets nativos, cero barras del navegador y óptimo rendimiento.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleInstallApp}
                      className="w-full sm:w-auto bg-[#A8E61D] hover:bg-[#D7FF5A] text-black text-xs font-mono font-extrabold uppercase tracking-widest px-5 py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(168,230,29,0.3)] hover:shadow-[0_4px_20px_rgba(168,230,29,0.5)] cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>INSTALAR APP</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* iOS Manual Installation Guide (iPhone/iPad Safari) */}
              {showIOSInstallBanner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-5 p-4 rounded-3xl bg-gradient-to-br from-[#121212] to-[#1A1A1A] border border-white/10 shadow-xl overflow-hidden relative"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#A8E61D]/10 text-[#A8E61D]">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold tracking-widest text-[#A8E61D]/90 uppercase bg-[#A8E61D]/10 px-2 py-0.5 rounded-md">IPHONE / IPAD</span>
                        <h4 className="text-sm font-black font-sans text-white leading-tight mt-1">SISTEMA PRO-FIT IOS</h4>
                      </div>
                    </div>
                    <button 
                      onClick={handleDismissIOSInstall}
                      className="p-1 rounded-full bg-white/5 text-[#BFBFBF]/60 hover:text-white transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-xs text-[#BFBFBF]/80 mt-2.5 leading-relaxed">
                    Disfruta de la experiencia de Profit Fitness en iOS siguiendo estos sencillos pasos:
                  </p>
                  
                  <div className="mt-3 bg-black/40 p-3 rounded-2xl border border-white/5 text-[11px] text-[#BFBFBF] space-y-2 leading-relaxed">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[#A8E61D]/90 font-mono font-bold">1.</span>
                      <span>Abre en el navegador <strong>Safari</strong> de tu iPhone.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-[#A8E61D]/90 font-mono font-bold">2.</span>
                      <span>Toca el botón de compartir <strong>"Compartir" (Compartir 📤)</strong> abajo en la barra.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-[#A8E61D]/90 font-mono font-bold">3.</span>
                      <span>Selecciona <strong>"Agregar a Inicio"</strong> o <strong>"Add to Home Screen"</strong>.</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTab === 'inicio' && (
                    <div className="space-y-6">
                      {showProfitPlan30D ? (
                        <ProfitPlan30DView 
                          user={user}
                          habits={habits}
                          workouts={workouts}
                          todayDateStr={todayDateStr}
                          onClose={() => setShowProfitPlan30D(false)}
                          onAddXP={(points) => addXP(points)}
                          onToggleHabit={handleToggleHabit}
                          onCompleteWorkoutOffline={handleCompletePlanWorkout}
                          completedChallengeDays={completedChallengeDays}
                          currentChallengeDay={currentChallengeDay}
                          onCompleteDay={handleCompleteChallengeDay}
                        />
                      ) : (
                        <>
                          <DashboardView 
                            user={user} 
                            habits={habits} 
                            achievements={achievements} 
                            workouts={workouts}
                            onNavigate={(target) => {
                              setShowProfitPlan30D(false);
                              setActiveTab(target);
                            }}
                            todayDateStr={todayDateStr}
                            onBonusXP={(amt) => addXP(amt)}
                            completedChallengeDays={completedChallengeDays}
                            onOpenPlan30D={() => setShowProfitPlan30D(true)}
                          />

                          {/* Embed the habits list directly on home scroll as a dashboard element */}
                          <HabitsView 
                            habits={habits}
                            onToggleHabit={handleToggleHabit}
                            onAddHabit={handleAddHabit}
                            onDeleteHabit={handleDeleteHabit}
                            todayDateStr={todayDateStr}
                          />
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === 'entrenamientos' && (
                    <WorkoutView 
                      routine={todaysRoutine}
                      onCompleteWorkout={handleCompleteWorkout}
                      todayCompletedWorkout={todayWorkoutDetails ? { 
                        exercisesCompleted: todayWorkoutDetails.exercisesCompleted, 
                        durationSeconds: todayWorkoutDetails.durationSeconds 
                      } : undefined}
                    />
                  )}

                  {activeTab === 'progreso' && (
                    <div className="space-y-6">
                      <ProgressView 
                        logs={logs}
                        onAddLog={handleAddProgressLog}
                        onDeleteLog={handleDeleteProgressLog}
                        todayDateStr={todayDateStr}
                        onBonusXP={(amt) => addXP(amt)}
                      />

                      {/* Embed calendar retrospective view directly on the progress domains */}
                      <CalendarView 
                        habits={habits}
                        workouts={workouts}
                        logs={logs}
                        todayDateStr={todayDateStr}
                        onManualToggleDayWorkout={handleManualToggleDayWorkout}
                        onManualToggleDayHabits={handleManualToggleDayHabits}
                      />
                    </div>
                  )}

                  {activeTab === 'logros' && (
                    <AchievementsView 
                      achievements={achievements} 
                      userStreak={user.streak}
                    />
                  )}

                  {activeTab === 'perfil' && (
                    <ProfileView 
                      user={user}
                      workouts={workouts}
                      logs={logs}
                      onUpdateWeights={handleUpdateProfileMetrics}
                      onResetDatabase={handleResetDatabase}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sticky Bottom Navigation Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-[#050505]/95 border-t border-white/10 px-4 py-2 flex justify-between items-center z-20 backdrop-blur-lg">
              <button 
                onClick={() => {
                  setShowProfitPlan30D(false);
                  setActiveTab('inicio');
                }}
                className={`flex flex-col items-center justify-center py-2 flex-1 relative ${
                  activeTab === 'inicio' ? 'text-[#A8E61D]' : 'text-[#BFBFBF]/60 hover:text-white'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[9px] font-sans font-bold mt-1 tracking-wider uppercase">Inicio</span>
                {activeTab === 'inicio' && (
                  <motion.div layoutId="navGlow" className="absolute bottom-0 w-8 h-1 bg-[#A8E61D] rounded-full" />
                )}
              </button>

              <button 
                onClick={() => {
                  setShowProfitPlan30D(false);
                  setActiveTab('entrenamientos');
                }}
                className={`flex flex-col items-center justify-center py-2 flex-1 relative ${
                  activeTab === 'entrenamientos' ? 'text-[#A8E61D]' : 'text-[#BFBFBF]/60 hover:text-white'
                }`}
              >
                <Dumbbell className="w-5 h-5" />
                <span className="text-[9px] font-sans font-bold mt-1 tracking-wider uppercase">Entrenar</span>
                {activeTab === 'entrenamientos' && (
                  <motion.div layoutId="navGlow" className="absolute bottom-0 w-8 h-1 bg-[#A8E61D] rounded-full" />
                )}
              </button>

              <button 
                onClick={() => {
                  setShowProfitPlan30D(false);
                  setActiveTab('progreso');
                }}
                className={`flex flex-col items-center justify-center py-2 flex-1 relative ${
                  activeTab === 'progreso' ? 'text-[#A8E61D]' : 'text-[#BFBFBF]/60 hover:text-white'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="text-[9px] font-sans font-bold mt-1 tracking-wider uppercase">Progreso</span>
                {activeTab === 'progreso' && (
                  <motion.div layoutId="navGlow" className="absolute bottom-0 w-8 h-1 bg-[#A8E61D] rounded-full" />
                )}
              </button>

              <button 
                onClick={() => {
                  setShowProfitPlan30D(false);
                  setActiveTab('logros');
                }}
                className={`flex flex-col items-center justify-center py-2 flex-1 relative ${
                  activeTab === 'logros' ? 'text-[#A8E61D]' : 'text-[#BFBFBF]/60 hover:text-white'
                }`}
              >
                <Award className="w-5 h-5" />
                <span className="text-[9px] font-sans font-bold mt-1 tracking-wider uppercase">Logros</span>
                {activeTab === 'logros' && (
                  <motion.div layoutId="navGlow" className="absolute bottom-0 w-8 h-1 bg-[#A8E61D] rounded-full" />
                )}
              </button>

              <button 
                onClick={() => {
                  setShowProfitPlan30D(false);
                  setActiveTab('perfil');
                }}
                className={`flex flex-col items-center justify-center py-2 flex-1 relative ${
                  activeTab === 'perfil' ? 'text-[#A8E61D]' : 'text-[#BFBFBF]/60 hover:text-white'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-[9px] font-sans font-bold mt-1 tracking-wider uppercase">Perfil</span>
                {activeTab === 'perfil' && (
                  <motion.div layoutId="navGlow" className="absolute bottom-0 w-8 h-1 bg-[#A8E61D] rounded-full" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Level Up premium alert overlay */}
        <AnimatePresence>
          {levelUpOverlay && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-[#050505]/95 flex flex-col justify-center items-center text-center p-6"
            >
              <div className="absolute top-[20%] w-[300px] h-[300px] bg-[#A8E61D]/20 rounded-full blur-[80px]" />
              
              <div className="relative mb-6">
                <Trophy className="w-20 h-20 text-[#D7FF5A] mx-auto filter drop-shadow-[0_0_20px_rgba(168,230,29,0.5)]" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 opacity-20 bg-[#A8E61D] rounded-full blur" 
                />
              </div>

              <span className="text-xs font-mono font-bold tracking-widest text-[#A8E61D] uppercase">¡NUEVA ETAPA ALCANZADA!</span>
              <h1 className="text-3xl font-black font-sans uppercase text-white mt-1">ETAPA {levelUpOverlay}</h1>
              <h2 className="text-xl font-bold font-sans text-[#D7FF5A] tracking-wider uppercase mt-1">{getLevelName(levelUpOverlay || 1)}</h2>
              
              <p className="text-xs text-[#BFBFBF] max-w-[2700] mx-auto mt-4 leading-relaxed">
                Has esculpido tu potencial de forma incansable. Sigue entrenando y registrando hábitos para seguir escalando las etapas del Sistema PRO-FIT.
              </p>

              <button 
                onClick={() => setLevelUpOverlay(null)}
                className="mt-8 px-8 py-3 bg-[#A8E61D] hover:bg-[#7BCB14] text-black text-xs font-bold uppercase rounded-xl tracking-wider transition shadow-[0_0_15px_rgba(168,230,29,0.4)]"
              >
                Volver al Entrenamiento
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
