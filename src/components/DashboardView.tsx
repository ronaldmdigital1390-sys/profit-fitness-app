/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Flame, Zap, Award, Target, ChevronRight, 
  Dumbbell, CheckCircle2, Calendar, User, Sparkles, TrendingUp,
  Camera, Lock, CheckCircle, Clock, Play, Pause, RotateCcw, AlertTriangle, HelpCircle
} from 'lucide-react';
import { UserProfile, Habit, Achievement, WorkoutLog } from '../types';
import { getXPForLevel, getLevelName } from '../data';

// Active break intervals for page 15 content matching
interface BreakInterval {
  title: string;
  desc: string;
  duration: number; // seconds
}

const BREAK_INTERVALS: BreakInterval[] = [
  {
    title: 'Retracción Escapular 👐',
    desc: 'De pie o en silla, junta firmemente los omóplatos como sujetando un lápiz en tu espalda. Sostén 3s y relaja pulgares atrás.',
    duration: 30
  },
  {
    title: 'Rotación de Hombros 🔄',
    desc: 'Realiza giros amplios y lentos con tus hombros de adelante hacia atrás. Libera la presión del trapecio superior.',
    duration: 30
  },
  {
    title: 'Estiramiento de Cuello Lateral 💆‍♀️',
    desc: 'Lleva la oreja al hombro del mismo lado con ayuda suave de tu mano. Mantén 15s cada costado respirando hondo.',
    duration: 30
  },
  {
    title: 'Marcha en el Lugar 🏃‍♂️',
    desc: 'Ponte de pie. Sube alternamente las rodillas al abdomen a paso constante para bombear flujo sanguíneo a tus piernas.',
    duration: 30
  },
  {
    title: 'Respiración Diafragmática 🌬️',
    desc: 'Mano al vientre. Inhala inflando el abdomen profundamente en 4s, sostén 2s, y exhala lento vaciando en 6s.',
    duration: 30
  },
  {
    title: 'Re-postura y Pared 🧘',
    desc: 'Alíneate de pie contra la pared. Siente los 5 puntos de apoyo (pies, glúteo, omóplatos, cabeza, lumbar) y resetéate.',
    duration: 30
  }
];

interface DashboardViewProps {
  user: UserProfile;
  habits: Habit[];
  achievements: Achievement[];
  workouts: WorkoutLog[];
  onNavigate: (tab: 'inicio' | 'entrenamientos' | 'progreso' | 'logros' | 'perfil') => void;
  todayDateStr: string;
  onBonusXP?: (amount: number) => void;
  completedChallengeDays: number[];
  onOpenPlan30D: () => void;
}

export default function DashboardView({ 
  user, habits, achievements, workouts, onNavigate, todayDateStr, onBonusXP,
  completedChallengeDays = [], onOpenPlan30D
}: DashboardViewProps) {
  
  // Active break states
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [breakTime, setBreakTime] = useState(180); // 3 mins total
  const [breakIsPaused, setBreakIsPaused] = useState(false);

  // Interval index calculator
  const activeIntervalIdx = Math.max(0, 5 - Math.floor((breakTime - 1) / 30));
  const activeInterval = BREAK_INTERVALS[activeIntervalIdx];
  const activeIntervalProgress = 30 - ((breakTime - 1) % 30);

  // Active break timer ticker
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreakActive && !breakIsPaused) {
      timer = setInterval(() => {
        setBreakTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsBreakActive(false);
            if (onBonusXP) {
              onBonusXP(15); // +15 XP for desk compliance break
            }
            return 180;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isBreakActive, breakIsPaused, onBonusXP]);

  const handleStartBreak = () => {
    setBreakTime(180);
    setBreakIsPaused(false);
    setIsBreakActive(true);
  };

  const handleCancelBreak = () => {
    setIsBreakActive(false);
    setBreakTime(180);
  };

  // Habit completion percent today
  const completedTodayCount = habits.filter(h => h.completedDates.includes(todayDateStr)).length;
  const habitsPercent = habits.length > 0 ? Math.round((completedTodayCount / habits.length) * 100) : 0;

  // Unlocked achievements
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  // XP Progress representation
  const nextLevelXP = getXPForLevel(user.level);
  const prevLevelXP = user.level > 1 ? getXPForLevel(user.level - 1) : 0;
  const currentLevelXPMax = nextLevelXP - prevLevelXP;
  const currentXPPercent = Math.min(
    100,
    Math.round(((user.xp - prevLevelXP) / (currentLevelXPMax || 1)) * 100)
  );

  // Latest workout today
  const hasWorkoutToday = workouts.some(w => w.date === todayDateStr);
  
  // Total exercises & total hours format
  const workoutsTotalTime = workouts.reduce((acc, w) => acc + w.durationSeconds, 0);
  const formattedWorkoutsHours = (workoutsTotalTime / 3600).toFixed(1);

  return (
    <div className="space-y-6 pb-24 text-white">
      {/* Header section with welcome, date, streak */}
      <div className="flex justify-between items-center bg-gradient-to-b from-[#1A1A1A]/50 to-[#050505]/10 p-4 rounded-2xl border border-white/5">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold text-[#A8E61D] uppercase tracking-widest">NIVEL {user.level}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D7FF5A]" />
          </div>
          <h2 className="text-xl font-bold font-sans mt-0.5">Hola, {user.name} 👋</h2>
          <p className="text-xs text-[#BFBFBF]/80">¡Tu cuerpo es un templo, esculpamos hoy!</p>
        </div>

        {/* Streak & Active Days Pill */}
        <div className="flex gap-2.5">
          <div className="flex flex-col items-center bg-[#1A1A1A] border border-white/5 px-3 py-1.5 rounded-xl min-w-[55px]">
            <Flame className="w-5 h-5 text-[#A8E61D] fill-[#A8E61D]/10" />
            <span className="text-xs font-mono font-bold mt-0.5">{user.streak} d</span>
            <span className="text-[8px] uppercase tracking-wider text-[#BFBFBF]/60">Racha</span>
          </div>
          <div className="flex flex-col items-center bg-[#1A1A1A] border border-white/5 px-3 py-1.5 rounded-xl min-w-[55px]">
            <Calendar className="w-5 h-5 text-[#D7FF5A]" />
            <span className="text-xs font-mono font-bold mt-0.5">{user.activeDaysCount}</span>
            <span className="text-[8px] uppercase tracking-wider text-[#BFBFBF]/60">Activo</span>
          </div>
        </div>
      </div>

      {/* Progress & Levelling circular/bar tracker */}
      <div className="p-5 bg-gradient-to-r from-[#1A1A1A] to-[#121212] rounded-3xl border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#A8E61D]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex justify-between items-center mb-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#BFBFBF]">ETAPA ACTUAL</span>
            <h3 className="font-black text-[#A8E61D] text-lg font-sans tracking-tight uppercase leading-none">
              ETAPA {user.level}
            </h3>
            <h4 className="font-bold text-white text-md font-sans tracking-wide uppercase">
              {getLevelName(user.level)}
            </h4>
          </div>
          <span className="text-xs font-mono bg-[#A8E61D]/10 text-[#D7FF5A] border border-[#A8E61D]/20 px-2.5 py-1 rounded-full">{user.xp} XP</span>
        </div>

        {/* Level Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-[#BFBFBF] px-0.5">
            <span>Progreso Etapa ({prevLevelXP} XP)</span>
            <span>{currentXPPercent}%</span>
            <span>{user.level < 6 ? `Sig: ETAPA ${user.level + 1}` : 'PRO-FIT COMPLETO'} ({nextLevelXP === Infinity ? 'MAX' : `${nextLevelXP} XP`})</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-3 p-[2px] border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${currentXPPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#7BCB14] to-[#D7FF5A] rounded-full shadow-[0_0_10px_rgba(168,230,29,0.5)]"
            />
          </div>
          <p className="text-[10px] text-[#BFBFBF]/60 leading-tight text-right italic font-sans pt-1">
            Gana 15 XP por hábito, 50 XP por rutina y 30 XP por avances corporales.
          </p>
        </div>
      </div>

      {/* PROGRESO DEL SISTEMA PRO-FIT */}
      <div className="p-5 bg-[#121212] rounded-3xl border border-white/5 space-y-3.5 shadow-md">
        <h4 className="text-xs font-mono font-bold text-[#A8E61D] uppercase tracking-widest pl-0.5">
          PROGRESO DEL SISTEMA PRO-FIT
        </h4>
        
        {/* Stages list display */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full text-center">
          {stageNames().map((stage, idx) => {
            const stageNum = idx + 1;
            const isCurrent = user.level === stageNum;
            const isPassed = user.level > stageNum;
            
            return (
              <div 
                key={stage}
                className={`p-2.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between items-center min-h-[75px] ${
                  isCurrent 
                    ? 'bg-[#A8E61D]/10 border-[#A8E61D] text-[#A8E61D] shadow-[0_0_15px_rgba(168,230,29,0.25)]' 
                    : isPassed 
                      ? 'bg-[#181818]/60 border-[#A8E61D]/25 text-[#A8E61D]/80' 
                      : 'bg-[#121212] border-white/5 text-[#BFBFBF]/30'
                }`}
              >
                <div className="text-[8px] font-mono tracking-widest text-[#BFBFBF]/50 mb-1">
                  ETAPA {stageNum}
                </div>
                
                <div className="text-[10px] font-extrabold tracking-tight break-all leading-tight uppercase font-sans">
                  {stage}
                </div>
                
                <div className="mt-1.5 flex items-center justify-center">
                  {isCurrent ? (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8E61D] opacity-75 animate-duration-1000"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A8E61D]"></span>
                    </span>
                  ) : isPassed ? (
                    <CheckCircle className="w-3.5 h-3.5 text-[#A8E61D] filter drop-shadow-[0_0_2px_rgba(168,230,29,0.3)]" />
                  ) : (
                    <Lock className="w-3 h-3 text-[#BFBFBF]/20" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PAUSAS ACTIVAS TIMER - PRACTICAL DESK TOOL */}
      <div className="p-5 bg-gradient-to-r from-[#1A1A1A] to-[#121212] rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-[#A8E61D]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
              Pausa Activa (Cada 60 Min)
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-md">3 Mins</span>
        </div>

        <h3 className="text-lg font-bold font-sans tracking-tight text-white mb-1">Evita el Sedentarismo Laboral</h3>
        <p className="text-xs text-[#BFBFBF]/80 mb-4 leading-relaxed">
          Ningún entrenamiento compensará 8 horas de mala postura continua. Activa tu mente y cadenas musculares ahora.
        </p>

        {!isBreakActive ? (
          <button
            onClick={handleStartBreak}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-extrabold text-black font-mono uppercase text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] flex items-center justify-center gap-1.5"
          >
            <Clock className="w-4 h-4 text-black" />
            <span>Iniciar Pausa Corporal (+15 XP)</span>
          </button>
        ) : (
          <div className="bg-[#050505]/60 hover:bg-[#050505]/80 p-4 rounded-2xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-orange-400 font-bold uppercase tracking-wider">EJECUTANDO PAUSA ACTIVA</span>
              <span className="font-extrabold text-[#A8E61D] bg-white/5 px-2 py-0.5 rounded text-sm">
                {Math.floor(breakTime / 60)}:{(breakTime % 60).toString().padStart(2, '0')}
              </span>
            </div>

            {/* Step info block */}
            <div className="p-3 bg-[#1A1A1A] border-l-4 border-orange-500 rounded-r-xl rounded-l-md space-y-1">
              <span className="text-[9px] font-mono tracking-wider font-extrabold text-orange-400 uppercase leading-none block">
                Paso {activeIntervalIdx + 1} de 6: {activeInterval.title}
              </span>
              <p className="text-xs text-[#BFBFBF] leading-normal">{activeInterval.desc}</p>
            </div>

            {/* Individual step progress line */}
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden p-[1px]">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                style={{ width: `${(activeIntervalProgress / 30) * 100}%` }}
              />
            </div>

            {/* Trigger actions */}
            <div className="flex gap-2.5">
              <button 
                onClick={() => setBreakIsPaused(!breakIsPaused)}
                className="flex-1 py-2 text-center border border-white/10 rounded-xl text-xs font-bold bg-white/5 text-white hover:bg-white/10 transition"
              >
                {breakIsPaused ? 'Reanudar' : 'Pausar'}
              </button>
              <button 
                onClick={handleCancelBreak}
                className="py-2 px-5 text-center bg-red-600 hover:bg-red-700 rounded-xl text-xs font-bold text-white transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Daily Habits Completion Gauge card */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          onClick={() => onNavigate('entrenamientos')}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer p-4 rounded-3xl bg-[#1A1A1A] border border-white/5 flex flex-col justify-between hover:border-[#A8E61D]/30 transition group min-h-[140px]"
        >
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-xl bg-[#A8E61D]/10 text-[#A8E61D] group-hover:bg-[#A8E61D] group-hover:text-black transition">
              <Dumbbell className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-mono uppercase bg-white/5 text-[#BFBFBF] px-2 py-0.5 rounded-md">Hoy</span>
          </div>
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#BFBFBF] mb-0.5">RUTINA DIARIA</h4>
            <span className="text-sm font-bold block truncate max-w-[130px] text-white">
              {hasWorkoutToday ? '¡Ya entrenado!' : 'Sin iniciar'}
            </span>
            <div className="flex items-center text-[10px] text-[#A8E61D] mt-1.5 font-bold">
              <span>Ir a entrenar</span>
              <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          onClick={() => onNavigate('inicio')} // remains in home
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-3xl bg-[#1A1A1A] border border-white/5 flex flex-col justify-between hover:border-[#D7FF5A]/30 transition group min-h-[140px]"
        >
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-xl bg-[#D7FF5A]/10 text-[#D7FF5A] group-hover:bg-[#D7FF5A] group-hover:text-black transition">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#D7FF5A] font-bold">{habitsPercent}%</span>
          </div>
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#BFBFBF] mb-0.5">HABITOS REGISTRADOS</h4>
            <span className="text-sm font-bold block text-white">
              {completedTodayCount} de {habits.length} listos
            </span>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 self-end overflow-hidden">
              <div 
                className="h-full bg-[#D7FF5A]" 
                style={{ width: `${habitsPercent}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* TARJETA PLAN PROFIT 30D INICIO */}
      <motion.div 
        id="dashboard-plan-profit-30d-card"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onOpenPlan30D}
        className="cursor-pointer p-5 bg-gradient-to-br from-[#1C1C1C] to-[#0D0D0D] border-2 border-[#A8E61D]/50 hover:border-[#A8E61D] rounded-3xl transition relative overflow-hidden shadow-xl shadow-black/40 group mb-2"
      >
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#A8E61D]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#A8E61D]/15 transition-all" />
        
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-[#A8E61D]/15 text-[#A8E61D]">
              <Trophy className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#D7FF5A] uppercase bg-[#A8E61D]/10 px-2 py-0.5 rounded-md border border-[#A8E61D]/20">RETO PREMIUM</span>
              <h3 className="text-base font-black font-sans text-white leading-none mt-1">PLAN PROFIT 30D</h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#A8E61D]/10 text-[#A8E61D] font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#A8E61D]/20">
            <span>{completedChallengeDays.length}/30D</span>
          </div>
        </div>

        <p className="text-xs text-[#BFBFBF]/90 mt-3.5 leading-relaxed">
          Programa guiado de transformación física de 30 días. Incrementa tu XP diariamente completando tus rutinas y hábitos sincrónicamente.
        </p>

        <div className="mt-4 flex items-center justify-between">
          {completedChallengeDays.length > 0 ? (
            <div className="flex items-center gap-1">
              <div className="w-16 bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-[#A8E61D]" style={{ width: `${Math.round((completedChallengeDays.length / 30) * 100)}%` }} />
              </div>
              <span className="text-[9px] font-mono text-[#A8E61D]/90 font-black">{Math.round((completedChallengeDays.length / 30) * 100)}% Completado</span>
            </div>
          ) : (
            <span className="text-[10px] font-mono text-[#BFBFBF]/40 uppercase tracking-widest">Inicia en el Día 1</span>
          )}

          <div className="flex items-center text-xs text-[#A8E61D] font-bold group-hover:translate-x-1.5 transition-transform duration-300">
            <span>Iniciar Reto</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </div>
        </div>
      </motion.div>

      {/* MI TRANSFORMACIÓN & CERTIFICADO PROFIT */}
      <div className="grid grid-cols-2 gap-4">
        {/* MI TRANSFORMACIÓN */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="p-4.5 rounded-3xl bg-[#1A1A1A] border border-white/5 hover:border-[#A8E61D]/30 transition flex flex-col justify-between min-h-[150px] shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-xl bg-[#A8E61D]/10 text-[#A8E61D]">
              <Camera className="w-5.5 h-5.5" />
            </div>
          </div>
          <div className="mt-2 space-y-2.5">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">MI TRANSFORMACIÓN</h4>
              <p className="text-[10px] text-[#BFBFBF]/75 leading-tight mt-0.5">Registra tu cambio físico semana a semana.</p>
            </div>
            <button 
              onClick={() => onNavigate('progreso')}
              className="w-full py-1.5 bg-[#A8E61D] text-black text-[10.5px] font-bold font-mono tracking-wider uppercase rounded-xl hover:bg-[#D7FF5A] transition shadow-[0_0_10px_rgba(168,230,29,0.2)]"
            >
              Actualizar progreso
            </button>
          </div>
        </motion.div>

        {/* CERTIFICADO PROFIT */}
        {completedChallengeDays.length >= 30 ? (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenPlan30D}
            className="p-4.5 rounded-3xl bg-gradient-to-br from-[#121212] to-[#1A1A1A] border-2 border-[#A8E61D] cursor-pointer flex flex-col justify-between min-h-[150px] shadow-[0_0_15px_rgba(168,230,29,0.3)] relative overflow-hidden group"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 pointer-events-none text-[#A8E61D] group-hover:scale-110 transition-transform">
              <Trophy className="w-24 h-24" />
            </div>

            <div className="flex justify-between items-start">
              <div className="p-2 rounded-xl bg-[#A8E61D]/10 text-[#A8E61D]">
                <Trophy className="w-5.5 h-5.5" />
              </div>
              <div className="flex items-center gap-1 bg-[#A8E61D]/20 px-2 py-0.5 rounded-md border border-[#A8E61D]/30">
                <Sparkles className="w-3 h-3 text-[#A8E61D]" />
                <span className="text-[8px] font-mono uppercase text-[#A8E61D] font-bold">Disponible</span>
              </div>
            </div>

            <div className="mt-2 text-left">
              <h4 className="text-xs font-black uppercase tracking-wider text-white">CERTIFICADO PROFIT</h4>
              <p className="text-[10px] text-[#A8E61D] font-bold leading-tight mt-0.5">Transformación completada</p>
              <p className="text-[9px] text-[#BFBFBF]/80 leading-none mt-0.1">Reto 30D completado</p>
              
              <div className="w-full mt-2.5 p-1 bg-[#A8E61D] rounded-xl text-center shadow-[0_0_8px_rgba(168,230,29,0.2)]">
                <span className="text-[9px] font-mono text-black font-extrabold uppercase">Certificado disponible</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="p-4.5 rounded-3xl bg-[#121212] border border-white/5 flex flex-col justify-between min-h-[150px] shadow-lg relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-12 pointer-events-none">
              <Trophy className="w-24 h-24 text-white" />
            </div>

            <div className="flex justify-between items-start">
              <div className="p-2 rounded-xl bg-white/5 text-[#BFBFBF]/30">
                <Trophy className="w-5.5 h-5.5" />
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                <Lock className="w-3 h-3 text-[#BFBFBF]/40" />
                <span className="text-[8px] font-mono uppercase text-[#BFBFBF]/40">Bloqueado</span>
              </div>
            </div>

            <div className="mt-2 text-left">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#BFBFBF]/60">CERTIFICADO PROFIT</h4>
              <p className="text-[10px] text-[#BFBFBF]/40 leading-tight mt-0.5">Disponible al completar tu proceso.</p>
              
              <div className="w-full mt-2.5 p-1 bg-white/5 border border-white/5 rounded-xl text-center">
                <span className="text-[9px] font-mono text-[#BFBFBF]/35 uppercase">Reclamo Desactivado</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Secciones rápidas grid */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider ml-1">MÓDULOS DE ACCESO BIOMÉTRICO</h3>
          <span className="text-[10px] font-mono text-[#BFBFBF]/40">Tap-to-go</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Quick Item 1: Progreso */}
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('progreso')}
            className="flex items-center gap-3 p-3 bg-[#1A1A1A] hover:bg-[#222] border border-white/5 rounded-2xl text-left transition"
          >
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Progreso Bio</span>
              <span className="text-[9px] text-[#BFBFBF] block">Peso, fotos & notas</span>
            </div>
          </motion.button>

          {/* Quick Item 2: Logros */}
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('logros')}
            className="flex items-center gap-3 p-3 bg-[#1A1A1A] hover:bg-[#222] border border-white/5 rounded-2xl text-left transition"
          >
            <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Logros Profit</span>
              <span className="text-[9px] text-[#BFBFBF] block">{unlockedCount} / {achievements.length} insignias</span>
            </div>
          </motion.button>

          {/* Quick Item 3: Calendario */}
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              onNavigate('progreso');
            }}
            className="flex items-center gap-3 p-3 bg-[#1A1A1A] hover:bg-[#222] border border-white/5 rounded-2xl text-left transition"
          >
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Calendario</span>
              <span className="text-[9px] text-[#BFBFBF] block">Registro de rachas</span>
            </div>
          </motion.button>

          {/* Quick Item 4: Perfil */}
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('perfil')}
            className="flex items-center gap-3 p-3 bg-[#1A1A1A] hover:bg-[#222] border border-white/5 rounded-2xl text-left transition"
          >
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Perfil Atleta</span>
              <span className="text-[9px] text-[#BFBFBF] block">Estadísticas y rango</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Motivation Banner */}
      <div className="relative p-5 bg-[#1A1A1A] border-l-4 border-[#A8E61D] rounded-r-2xl rounded-l-md overflow-hidden">
        <div className="absolute top-10 right-2 opacity-5 pointer-events-none">
          <Trophy className="w-24 h-24 text-white" />
        </div>
        <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-[#A8E61D] mb-1">PRO TIP DE RENDIMIENTO</h4>
        <p className="text-xs text-[#BFBFBF] leading-relaxed">
          "La consistencia vence al talento desganado todos los días de la semana. Completa hoy tu entrenamiento del día y tu checklist de hidratación para forjar un hábito de acero."
        </p>
      </div>
    </div>
  );
}

function stageNames() {
  return ['PREPARAR', 'RUTINAR', 'ORGANIZAR', 'FORTALECER', 'INTEGRAR', 'TRANSFORMAR'];
}
