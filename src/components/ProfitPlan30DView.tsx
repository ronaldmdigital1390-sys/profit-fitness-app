/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Trophy, CheckCircle2, Lock, Flame, 
  Dumbbell, Sparkles, Droplet, Moon, ChevronRight,
  Award, Clock, Zap, Star, AlertCircle, Share2, Crown
} from 'lucide-react';
import { UserProfile, Habit, WorkoutLog } from '../types';
import { ROUTINES_BY_DAY } from '../data';

interface ProfitPlan30DViewProps {
  user: UserProfile;
  habits: Habit[];
  workouts: WorkoutLog[];
  todayDateStr: string;
  onClose: () => void;
  onAddXP: (points: number) => void;
  onToggleHabit: (id: string, dateStr: string) => void;
  onCompleteWorkoutOffline: (routineName: string) => void;
  completedChallengeDays: number[];
  currentChallengeDay: number;
  onCompleteDay: (dayNum: number) => void;
}

export default function ProfitPlan30DView({
  user,
  habits,
  workouts,
  todayDateStr,
  onClose,
  onAddXP,
  onToggleHabit,
  onCompleteWorkoutOffline,
  completedChallengeDays,
  currentChallengeDay,
  onCompleteDay
}: ProfitPlan30DViewProps) {
  // Local state to view details of a specific day
  const [selectedDay, setSelectedDay] = useState<number>(currentChallengeDay > 30 ? 30 : currentChallengeDay);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showDayCompleteSuccess, setShowDayCompleteSuccess] = useState<number | null>(null);

  // Sync selected day to current active challenge day if it advances
  useEffect(() => {
    if (currentChallengeDay <= 30) {
      setSelectedDay(currentChallengeDay);
    }
  }, [currentChallengeDay]);

  const totalDays = 30;
  const completedCount = completedChallengeDays.length;
  const completionPercent = Math.round((completedCount / totalDays) * 100);
  const daysRemaining = totalDays - completedCount;

  // Map challenge day (1-30) to week routine day index (1-6 for Mon-Sat, 0 for Sun)
  const getRoutineForDay = (dayNum: number) => {
    const rem = (dayNum - 1) % 7;
    const dayIndex = rem === 6 ? 0 : rem + 1;
    return ROUTINES_BY_DAY[dayIndex];
  };

  const getDayStatus = (dayNum: number) => {
    if (completedChallengeDays.includes(dayNum)) return 'completed';
    if (dayNum === currentChallengeDay) return 'progress';
    const isUnlocked = dayNum === 1 || completedChallengeDays.includes(dayNum - 1);
    if (isUnlocked) return 'available';
    return 'locked';
  };

  // Check if today's habits / workout are done for the active day
  const isHabitCompleted = (category: string) => {
    const habit = habits.find(h => h.category === category);
    return habit ? habit.completedDates.includes(todayDateStr) : false;
  };

  const isWorkoutCompletedToday = workouts.some(w => w.date === todayDateStr);

  // Core metrics for the selected day
  const selectedDayRoutine = getRoutineForDay(selectedDay);
  const isSelectedDayCompleted = completedChallengeDays.includes(selectedDay);
  const isSelectedDayActive = selectedDay === currentChallengeDay;
  const isSelectedDayUnlocked = selectedDay === 1 || completedChallengeDays.includes(selectedDay - 1);

  // Current states of the active (today's) requirements
  const reqHydrationDone = isSelectedDayCompleted || (isSelectedDayActive && isHabitCompleted('water'));
  const reqMobilityDone = isSelectedDayCompleted || (isSelectedDayActive && isHabitCompleted('exercise'));
  const reqNutritionDone = isSelectedDayCompleted || (isSelectedDayActive && isHabitCompleted('nutrition'));
  const reqWorkoutDone = isSelectedDayCompleted || (isSelectedDayActive && isWorkoutCompletedToday);

  const canCompleteActiveDay = reqHydrationDone && reqMobilityDone && reqNutritionDone && reqWorkoutDone;

  const handleToggleHabitShortcut = (category: string) => {
    if (isSelectedDayCompleted) return;
    if (!isSelectedDayActive) return;
    const habit = habits.find(h => h.category === category);
    if (habit) {
      onToggleHabit(habit.id, todayDateStr);
    }
  };

  const handleForceLogWorkout = () => {
    if (isSelectedDayCompleted) return;
    if (!isSelectedDayActive) return;
    // Call offline workouts completion logic
    onCompleteWorkoutOffline(selectedDayRoutine.routineName);
  };

  const handleFinishDayClick = () => {
    if (!canCompleteActiveDay) return;
    onCompleteDay(selectedDay);
    setShowDayCompleteSuccess(selectedDay);
    setTimeout(() => {
      setShowDayCompleteSuccess(null);
    }, 2500);
  };

  return (
    <div id="profit-30d-container" className="space-y-6 pb-24 text-white">
      {/* Header section with back button */}
      <div className="flex justify-between items-center bg-gradient-to-b from-[#1A1A1A]/40 to-[#050505]/10 p-3.5 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <button 
            id="plan-30d-back-button"
            onClick={onClose} 
            className="p-1.5 rounded-lg bg-white/5 text-[#BFBFBF] hover:text-white hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-md font-sans font-black tracking-wide text-white">PLAN PROFIT 30D</h2>
            <p className="text-[10px] text-[#BFBFBF]/70">Programa guiado de esculpido de 30 días</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#A8E61D]/15 border border-[#A8E61D]/25 px-2.5 py-1 rounded-full">
          <Star className="w-3.5 h-3.5 text-[#D7FF5A] fill-[#D7FF5A]" />
          <span className="text-[10px] font-bold text-[#A8E61D] font-mono uppercase">PREMIUM</span>
        </div>
      </div>

      {/* PROGRESO GENERAL CARD */}
      <div className="p-5 bg-gradient-to-r from-[#1A1A1A] to-[#121212] rounded-3xl border border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] bg-[#A8E61D]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-center mb-3">
          <div className="space-y-0.5">
            <span className="text-[9px] font-mono tracking-widest text-[#BFBFBF] uppercase">Rendimiento acumulado</span>
            <h3 className="text-xl font-bold font-sans text-[#A8E61D] uppercase leading-none">
              RETO COMPLETO {completionPercent}%
            </h3>
          </div>
          <span className="text-xs font-mono bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-lg text-white">
            {completedCount} / 30 días
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-white/5 rounded-full h-3 p-[2px] border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completionPercent}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#7BCB14] to-[#D7FF5A] rounded-full shadow-[0_0_8px_rgba(168,230,29,0.4)]"
            />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-[#BFBFBF]/60 pt-1">
            <span>{completedCount} Completados</span>
            <span className="text-[#A8E61D] font-bold">{daysRemaining} Restantes</span>
          </div>
        </div>

        {/* Certificate shortcut if completed */}
        {completedCount >= 30 && (
          <motion.button
            onClick={() => setShowCertificateModal(true)}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7BCB14] to-[#D7FF5A] text-black font-extrabold text-xs font-mono uppercase tracking-wider shadow-[0_0_15px_rgba(168,230,29,0.3)] flex items-center justify-center gap-1.5"
          >
            <Trophy className="w-4 h-4 text-black" />
            <span>Ver Certificado de Transformación</span>
          </motion.button>
        )}
      </div>

      {/* GRID DE LOS 30 DÍAS */}
      <div className="p-4 bg-[#121212] rounded-3xl border border-white/5 space-y-3">
        <div className="flex justify-between items-center px-0.5">
          <h4 className="text-[10px] font-mono font-bold text-[#A8E61D] uppercase tracking-widest">
            CALENDARIO DE ADIESTRAMIENTO
          </h4>
          <span className="text-[9px] font-mono text-[#BFBFBF]/40">Selecciona un día</span>
        </div>

        {/* 30 Days responsive layout grid */}
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 30 }, (_, i) => {
            const dayNum = i + 1;
            const status = getDayStatus(dayNum);
            const isSelected = selectedDay === dayNum;

            let statusColor = 'bg-white/5 border-white/5 text-[#BFBFBF]/40';
            let iconElement = null;

            if (status === 'completed') {
              statusColor = isSelected 
                ? 'bg-[#A8E61D]/10 border-[#A8E61D] text-[#A8E61D]' 
                : 'bg-[#A8E61D]/5 border-[#A8E61D]/20 text-[#A8E61D]';
              iconElement = <CheckCircle2 className="w-2.5 h-2.5 absolute top-1 right-1" />;
            } else if (status === 'progress') {
              statusColor = isSelected
                ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.2)]'
                : 'bg-[#121212] border-orange-500/40 text-orange-400';
              iconElement = (
                <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
                </span>
              );
            } else if (status === 'available') {
              statusColor = isSelected
                ? 'bg-white/10 border-[#D7FF5A]/60 text-white'
                : 'bg-[#181818] border-white/10 text-white/80';
            } else {
              statusColor = 'bg-[#050505]/40 border-white/5 text-white/20 cursor-not-allowed opacity-50';
              iconElement = <Lock className="w-2.5 h-2.5 absolute top-1 right-1 text-white/10" />;
            }

            return (
              <motion.button
                key={dayNum}
                onClick={() => status !== 'locked' && setSelectedDay(dayNum)}
                whileTap={status !== 'locked' ? { scale: 0.94 } : {}}
                className={`flex flex-col justify-center items-center py-2 relative rounded-xl border text-center transition-all min-h-[50px] ${statusColor}`}
                title={`Día ${dayNum} - ${status.toUpperCase()}`}
              >
                {iconElement}
                <span className="text-[10px] font-mono leading-none font-bold uppercase tracking-wide">D</span>
                <span className="text-sm font-black mt-0.5 font-mono leading-none">{dayNum}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* DETALLES DEL DÍA SELECCIONADO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-5 bg-gradient-to-b from-[#181818] to-[#121212] rounded-3xl border border-white/10 space-y-4 shadow-xl"
        >
          {/* Day details header */}
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div>
              <span className="text-[9px] font-mono text-[#D7FF5A] font-bold uppercase tracking-widest block">
                {isSelectedDayCompleted ? '✓ DÍA RETO COMPLETADO' : isSelectedDayActive ? '🔥 DÍA EN CURSO' : '📅 DÍA PROGRAMADO'}
              </span>
              <h3 className="text-lg font-black font-sans uppercase tracking-tight text-white mt-0.5">
                DÍA {selectedDay} del reto
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-mono tracking-widest uppercase text-[#BFBFBF]/60 block">RECOMPENSA</span>
              <span className="text-xs font-mono font-bold text-[#A8E61D] bg-[#A8E61D]/10 px-2 py-0.5 rounded-md border border-[#A8E61D]/20">+100 XP Extra</span>
            </div>
          </div>

          {/* Routine assigned detail */}
          <div className="p-3 bg-[#1A1A1A]/80 border border-white/5 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#A8E61D]/10 text-[#A8E61D]">
                <Dumbbell className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[8px] font-mono text-[#BFBFBF]/60 uppercase tracking-wider block">Entrenamiento Asignado</span>
                <h4 className="text-xs font-extrabold text-white truncate uppercase tracking-tight">
                  {selectedDayRoutine.routineName}
                </h4>
                <p className="text-[10px] text-[#A8E61D]/90 truncate leading-tight font-sans mt-0.5">
                  Foco: {selectedDayRoutine.focus}
                </p>
              </div>
            </div>
          </div>

          {/* MISIÓN DIARIA INFO BOX */}
          <div className="p-3 bg-[#050505]/60 border border-white/5 rounded-2xl text-xs space-y-1.5 lines">
            <div className="flex items-center gap-1 text-[#A8E61D] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase tracking-wider">MISIÓN DIARIA</span>
            </div>
            <p className="text-[#BFBFBF] leading-relaxed text-[11px]">
              {selectedDay === 1 ? 'Empieza tu reto Profit hoy! Despierta tus fibras musculares con la rutina de pecho e hidratación óptima.' :
               selectedDay === 30 ? '¡El último estirón! Completa hoy tus entrenamientos regeneradores y corona tus hábitos para culminar tu transformación.' :
               `Cumple los hábitos biométricos y la rutina de ${selectedDayRoutine.dayName} para ganar experiencia y mantener la simetría lumbar.`}
            </p>
          </div>

          {/* LISTA DE ACCIONES / CHECKLIST REUTILIZADO */}
          <div className="space-y-2.5">
            <h4 className="text-[9px] font-mono text-[#BFBFBF]/60 uppercase tracking-widest pl-0.5">
              REQUERIMENTOS BIOMÉTRICOS DEL DÍA
            </h4>

            {/* Req 1: Workout */}
            <div className="flex justify-between items-center p-3 rounded-xl bg-[#1A1A1A]/40 border border-white/5 hover:border-white/10 transition">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${reqWorkoutDone ? 'bg-[#A8E61D]/10 text-[#A8E61D]' : 'bg-white/5 text-[#BFBFBF]/40'}`}>
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-[11px] font-bold truncate leading-tight ${reqWorkoutDone ? 'text-white/40 line-through' : 'text-white'}`}>
                    Completar Rutina de {selectedDayRoutine.dayName}
                  </span>
                  <span className="text-[9px] text-[#BFBFBF]/50 mt-0.5 truncate uppercase font-mono">
                    {reqWorkoutDone ? 'Completado' : 'Pendiente (+50 XP)'}
                  </span>
                </div>
              </div>
              
              {!isSelectedDayCompleted && isSelectedDayActive && (
                <button
                  onClick={handleForceLogWorkout}
                  disabled={reqWorkoutDone}
                  className={`px-3 py-1 font-mono text-[9px] font-extrabold uppercase tracking-wide rounded-md transition ${
                    reqWorkoutDone 
                      ? 'bg-transparent text-[#A8E61D] border border-[#A8E61D]/20 cursor-default' 
                      : 'bg-[#A8E61D] text-black hover:bg-[#D7FF5A]'
                  }`}
                >
                  {reqWorkoutDone ? 'Realizado' : 'Entrenar'}
                </button>
              )}

              {(isSelectedDayCompleted || !isSelectedDayActive) && (
                <div className="shrink-0 p-1">
                  {reqWorkoutDone ? (
                    <span className="text-xs text-[#A8E61D]" title="Completado">✓</span>
                  ) : (
                    <span className="text-xs text-[#BFBFBF]/30" title="Pendiente">-</span>
                  )}
                </div>
              )}
            </div>

            {/* Req 2: Hydration */}
            <div className="flex justify-between items-center p-3 rounded-xl bg-[#1A1A1A]/40 border border-white/5 hover:border-white/10 transition">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${reqHydrationDone ? 'bg-[#A8E61D]/10 text-[#A8E61D]' : 'bg-white/5 text-[#BFBFBF]/40'}`}>
                  <Droplet className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-[11px] font-bold truncate leading-tight ${reqHydrationDone ? 'text-white/40 line-through' : 'text-white'}`}>
                    Completar Hidratación (3L de Agua)
                  </span>
                  <span className="text-[9px] text-[#BFBFBF]/50 mt-0.5 truncate uppercase font-mono">
                    {reqHydrationDone ? 'Completado' : 'Pendiente (+15 XP)'}
                  </span>
                </div>
              </div>

              {!isSelectedDayCompleted && isSelectedDayActive && (
                <button
                  onClick={() => handleToggleHabitShortcut('water')}
                  className={`px-3 py-1 font-mono text-[9px] font-extrabold uppercase tracking-wide rounded-md transition border ${
                    reqHydrationDone 
                      ? 'bg-[#A8E61D]/10 border-[#A8E61D]/20 text-[#A8E61D]' 
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {reqHydrationDone ? '✓ Listo' : 'Marcar'}
                </button>
              )}

              {(isSelectedDayCompleted || !isSelectedDayActive) && (
                <div className="shrink-0 p-1">
                  {reqHydrationDone ? (
                    <span className="text-xs text-[#A8E61D]" title="Completado">✓</span>
                  ) : (
                    <span className="text-xs text-[#BFBFBF]/30" title="Pendiente">-</span>
                  )}
                </div>
              )}
            </div>

            {/* Req 3: Mobility */}
            <div className="flex justify-between items-center p-3 rounded-xl bg-[#1A1A1A]/40 border border-white/5 hover:border-white/10 transition">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${reqMobilityDone ? 'bg-[#A8E61D]/10 text-[#A8E61D]' : 'bg-white/5 text-[#BFBFBF]/40'}`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-[11px] font-bold truncate leading-tight ${reqMobilityDone ? 'text-white/40 line-through' : 'text-white'}`}>
                    Completar Movilidad & Estiramientos Relajantes
                  </span>
                  <span className="text-[9px] text-[#BFBFBF]/50 mt-0.5 truncate uppercase font-mono">
                    {reqMobilityDone ? 'Completado' : 'Pendiente (+15 XP)'}
                  </span>
                </div>
              </div>

              {!isSelectedDayCompleted && isSelectedDayActive && (
                <button
                  onClick={() => handleToggleHabitShortcut('custom')}
                  className={`px-3 py-1 font-mono text-[9px] font-extrabold uppercase tracking-wide rounded-md transition border ${
                    reqMobilityDone 
                      ? 'bg-[#A8E61D]/10 border-[#A8E61D]/20 text-[#A8E61D]' 
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {reqMobilityDone ? '✓ Listo' : 'Marcar'}
                </button>
              )}

              {(isSelectedDayCompleted || !isSelectedDayActive) && (
                <div className="shrink-0 p-1">
                  {reqMobilityDone ? (
                    <span className="text-xs text-[#A8E61D]" title="Completado">✓</span>
                  ) : (
                    <span className="text-xs text-[#BFBFBF]/30" title="Pendiente">-</span>
                  )}
                </div>
              )}
            </div>

            {/* Req 4: Nutrition / Rest */}
            <div className="flex justify-between items-center p-3 rounded-xl bg-[#1A1A1A]/40 border border-white/5 hover:border-white/10 transition">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${reqNutritionDone ? 'bg-[#A8E61D]/10 text-[#A8E61D]' : 'bg-white/5 text-[#BFBFBF]/40'}`}>
                  <Flame className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-[11px] font-bold truncate leading-tight ${reqNutritionDone ? 'text-white/40 line-through' : 'text-white'}`}>
                    Completar Nutrición Premium (Proteína limpia)
                  </span>
                  <span className="text-[9px] text-[#BFBFBF]/50 mt-0.5 truncate uppercase font-mono">
                    {reqNutritionDone ? 'Completado' : 'Pendiente (+15 XP)'}
                  </span>
                </div>
              </div>

              {!isSelectedDayCompleted && isSelectedDayActive && (
                <button
                  onClick={() => handleToggleHabitShortcut('nutrition')}
                  className={`px-3 py-1 font-mono text-[9px] font-extrabold uppercase tracking-wide rounded-md transition border ${
                    reqNutritionDone 
                      ? 'bg-[#A8E61D]/10 border-[#A8E61D]/20 text-[#A8E61D]' 
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {reqNutritionDone ? '✓ Listo' : 'Marcar'}
                </button>
              )}

              {(isSelectedDayCompleted || !isSelectedDayActive) && (
                <div className="shrink-0 p-1">
                  {reqNutritionDone ? (
                    <span className="text-xs text-[#A8E61D]" title="Completado">✓</span>
                  ) : (
                    <span className="text-xs text-[#BFBFBF]/30" title="Pendiente">-</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* DAY COMPLETE BUTTON ACTION */}
          {!isSelectedDayCompleted && isSelectedDayActive && (
            <div className="pt-2">
              {canCompleteActiveDay ? (
                <motion.button
                  id="plan-30d-complete-day-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFinishDayClick}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7BCB14] to-[#D7FF5A] text-black font-extrabold text-xs font-mono uppercase tracking-widest shadow-[0_4px_15px_rgba(168,230,29,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-black fill-black" />
                  <span>COMPLETAR DÍA {selectedDay} (+100 XP)</span>
                </motion.button>
              ) : (
                <div className="w-full py-3 px-4 rounded-2xl bg-[#050505]/50 border border-white/5 text-center text-[11px] text-[#BFBFBF]/60 flex items-center justify-center gap-1.5 leading-tight">
                  <AlertCircle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>Realiza la rutina y los hábitos biométricos para finalizar el Día {selectedDay} del reto.</span>
                </div>
              )}
            </div>
          )}

          {isSelectedDayCompleted && (
            <div className="bg-[#A8E61D]/10 border border-[#A8E61D]/30 p-3.5 rounded-2xl text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A8E61D]" />
              <span className="text-xs text-[#D7FF5A] font-bold font-mono uppercase tracking-wide">¡DÍA COMPLETADO! EXCELENTE CONSISTENCIA</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* SUCCESS POPUP REBOOT IF APPLICABLE */}
      <AnimatePresence>
        {showDayCompleteSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-6 bottom-24 z-50 bg-[#050505] border border-[#A8E61D]/40 p-5 rounded-3xl text-center space-y-2 shadow-2xl filter drop-shadow-[0_0_20px_rgba(168,230,29,0.4)]"
          >
            <div className="relative inline-block">
              <Trophy className="w-12 h-12 text-[#D7FF5A] mx-auto" />
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }} 
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 opacity-10 bg-[#A8E61D] rounded-full blur" 
              />
            </div>
            <h4 className="text-sm font-sans font-black uppercase text-white mt-1">¡DÍA {showDayCompleteSuccess} COMPLETADO!</h4>
            <p className="text-[10px] text-[#BFBFBF]">Has ganado <span className="text-[#A8E61D] font-bold">+100 XP extras</span> y has avanzado el plan.</p>
            <div className="h-1 bg-gradient-to-r from-[#7BCB14] to-[#D7FF5A] rounded-full overflow-hidden w-24 mx-auto mt-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP MODAL EXTREMO DEL CERTIFICADO */}
      <AnimatePresence>
        {showCertificateModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-center items-center px-6"
          >
            {/* Mesh colors backgrounds */}
            <div className="absolute top-[10%] w-[350px] h-[350px] bg-[#A8E61D]/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-[10%] w-[350px] h-[350px] bg-[#7BCB14]/15 rounded-full blur-[100px]" />

            {/* Certificate proper */}
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="w-full max-w-sm bg-gradient-to-b from-[#181818] to-[#0A0A0A] border-4 border-[#A8E61D] rounded-3xl p-6 text-center space-y-6 relative shadow-2xl relative overflow-hidden"
            >
              {/* Ornamental geometric frames */}
              <div className="absolute top-2 inset-x-2 border border-white/5 rounded-2xl h-[97%]" />
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#A8E61D]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#A8E61D]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#A8E61D]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#A8E61D]" />

              <div className="relative space-y-5">
                <Crown className="w-12 h-12 text-[#D7FF5A] mx-auto filter drop-shadow-[0_0_12px_rgba(168,230,29,0.5)]" />
                
                <div className="space-y-1">
                  <h2 className="text-xs font-mono font-bold tracking-widest text-[#A8E61D] uppercase">CERTIFICADO OFICIAL</h2>
                  <h1 className="text-2xl font-black font-sans uppercase text-white leading-tight">PRO-FIT TRANSFORMATION</h1>
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-[#A8E61D] to-transparent w-40 mx-auto mt-2" />
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-mono tracking-wide text-[#BFBFBF]/60 text-center uppercase">OTORGADO CON DISTINCIÓN A:</p>
                  <h3 className="text-xl font-extrabold text-white uppercase font-sans tracking-tight">{user.name}</h3>
                  <p className="text-[10.5px] text-[#BFBFBF] leading-relaxed px-2">
                    Por haber completado con éxito, devoción y disciplina inquebrantables los 30 días de adiestramiento intensivo del programa **PLAN PROFIT 30D**. Logrando simetría física y hábitos de acero.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3.5 bg-white/5 border border-white/5 p-3 rounded-2xl">
                  <div className="text-center">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-[#BFBFBF]/60 block">Rango alcanzado</span>
                    <span className="text-xs font-black font-sans text-[#D7FF5A] uppercase block mt-0.5">Etapa {user.level}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-[#BFBFBF]/60 block">XP Reclutada</span>
                    <span className="text-xs font-black font-sans text-[#A8E61D] uppercase block mt-0.5">{user.xp} XP</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-3 text-[10px] uppercase font-mono text-[#BFBFBF]/50">
                  <div className="text-left">
                    <span className="block text-[8px] text-[#BFBFBF]/40">Firma autorizada</span>
                    <span className="text-white/60 italic font-serif text-[11px] font-bold block pt-1">Profit Fitness Staff</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] text-[#BFBFBF]/40">Validez del Registro</span>
                    <span className="text-white/70 font-semibold block pt-1">{todayDateStr}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex gap-3.5 w-full max-w-sm mt-6">
              <button
                onClick={() => {
                  // Simply toast simulate share
                  alert('¡Tu Certificado ha sido copiado en alta definición al portapapeles! Compártelo con orgullo en tus redes sociales.');
                }}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold font-mono text-xs uppercase rounded-xl tracking-wider border border-white/10 transition flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir</span>
              </button>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="flex-1 py-3 bg-[#A8E61D] hover:bg-[#7BCB14] text-black font-bold font-mono text-xs uppercase rounded-xl tracking-wider transition shadow-[0_0_15px_rgba(168,230,29,0.3)]"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
