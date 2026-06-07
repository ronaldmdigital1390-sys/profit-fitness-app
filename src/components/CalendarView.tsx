/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Dumbbell, Check, Calendar, 
  Flame, Sparkles, Award, Zap, Edit3, HelpCircle
} from 'lucide-react';
import { Habit, WorkoutLog, ProgressLog } from '../types';

interface CalendarViewProps {
  habits: Habit[];
  workouts: WorkoutLog[];
  logs: ProgressLog[];
  todayDateStr: string;
  onManualToggleDayWorkout: (dateStr: string) => void;
  onManualToggleDayHabits: (dateStr: string) => void;
}

export default function CalendarView({ 
  habits, 
  workouts, 
  logs, 
  todayDateStr, 
  onManualToggleDayWorkout, 
  onManualToggleDayHabits 
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(todayDateStr);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Month names
  const monthNames = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];

  // Days of week
  const daysOfWeek = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

  // Days in month
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Create dates grid
  const daysArray: (Date | null)[] = [];
  
  // Fill empty leading boxes
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }

  // Fill month days
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(new Date(year, month, i));
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Helper to format ISO Date string from Date object safely
  const getLocalDateString = (d: Date): string => {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  return (
    <div className="space-y-6 pb-24 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-mono font-bold text-[#A8E61D] uppercase tracking-widest">Planificador Mensual</span>
          <h2 className="text-2xl font-bold font-sans">Calendario de Consistencia</h2>
        </div>
        <div className="p-2 bg-[#1A1A1A] rounded-xl border border-white/5">
          <Calendar className="w-5 h-5 text-[#A8E61D]" />
        </div>
      </div>

      {/* Main calendar component */}
      <div className="p-5 bg-[#1A1A1A] border border-white/10 rounded-3xl space-y-4">
        {/* Month Selector */}
        <div className="flex justify-between items-center pb-2 border-b border-white/5">
          <button 
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#BFBFBF] hover:text-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="font-mono font-bold text-sm tracking-widest text-[#D7FF5A]">
            {monthNames[month]} {year}
          </span>

          <button 
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#BFBFBF] hover:text-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days of Week label row */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {daysOfWeek.map((day) => (
            <span key={day} className="text-[10px] font-mono tracking-widest font-bold text-[#BFBFBF]/60 uppercase">
              {day}
            </span>
          ))}
        </div>

        {/* Date boxes grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {daysArray.map((dateObj, idx) => {
            if (!dateObj) {
              return <div key={`empty-${idx}`} className="aspect-square bg-transparent rounded-lg" />;
            }

            const dateStr = getLocalDateString(dateObj);
            const isToday = dateStr === todayDateStr;
            const isSelected = dateStr === selectedDateStr;

            // Check if day has elements logged
            const hasWorkout = workouts.some(w => w.date === dateStr);
            const completedHabitsOnDay = habits.filter(h => h.completedDates.includes(dateStr)).length;
            const hasCompleteHabits = habits.length > 0 && completedHabitsOnDay === habits.length;
            const hasSomeHabits = completedHabitsOnDay > 0 && completedHabitsOnDay < habits.length;
            const hasProgressBiometrics = logs.some(l => l.date === dateStr);

            // Determine border and background based on accomplishments
            let bgClass = 'bg-[#050505]/40 hover:bg-[#050505]/80';
            let borderClass = 'border-white/5';
            let bulletColor = '';

            if (hasWorkout && hasCompleteHabits) {
              bgClass = 'bg-[#7BCB14]/20';
              borderClass = 'border-[#7BCB14] shadow-[0_0_8px_rgba(168,230,29,0.25)]';
              bulletColor = 'bg-[#A8E61D]';
            } else if (hasWorkout) {
              bgClass = 'bg-[#A8E61D]/10';
              borderClass = 'border-[#A8E61D]/40';
              bulletColor = 'bg-[#A8E61D]';
            } else if (hasCompleteHabits) {
              bgClass = 'bg-green-950/30';
              borderClass = 'border-green-600/40';
              bulletColor = 'bg-[#D7FF5A]';
            } else if (hasSomeHabits) {
              bgClass = 'bg-[#1A1A1A]';
              borderClass = 'border-white/20';
              bulletColor = 'bg-yellow-400';
            }

            if (isToday) {
              borderClass = 'border-[#D7FF5A] ring-1 ring-[#D7FF5A]/40';
            }
            if (isSelected) {
              bgClass = 'bg-white/10';
              borderClass = 'border-white';
            }

            return (
              <motion.button
                key={dateStr}
                whileTap={{ scale: 0.93 }}
                onClick={() => setSelectedDateStr(dateStr)}
                className={`aspect-square relative rounded-xl border flex flex-col items-center justify-center p-1 font-mono transition duration-150 ${bgClass} ${borderClass}`}
              >
                <span className={`text-[11px] font-bold ${isToday ? 'text-[#D7FF5A] drop-shadow-[0_0_6px_rgba(215,255,90,0.4)]' : 'text-white'}`}>
                  {dateObj.getDate()}
                </span>

                {/* Accomplishments Micro Pins */}
                <div className="absolute bottom-1 flex gap-0.5 justify-center">
                  {hasWorkout && <div className="w-1 h-1 bg-[#A8E61D] rounded-full" />}
                  {completedHabitsOnDay > 0 && <div className="w-1 h-1 bg-[#D7FF5A] rounded-full" />}
                  {hasProgressBiometrics && <div className="w-1 h-1 bg-orange-400 rounded-full" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="pt-3 border-t border-white/5 flex flex-wrap gap-x-4 gap-y-1 justify-center text-[10px] font-mono text-[#BFBFBF]/80 bg-[#050505]/20 p-2 rounded-xl">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 bg-[#A8E61D]/20 border border-[#A8E61D] rounded-full" />
            <span>Entrenado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 bg-green-950/30 border border-green-600/40 rounded-full" />
            <span>Hábitos Completos</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 bg-[#7BCB14]/20 border border-[#7BCB14] rounded-full shadow-[0_0_8px_rgba(168,230,29,0.3)]" />
            <span>Día Perfecto ✨</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-orange-400 rounded-full" />
            <span>Biometría Log</span>
          </div>
        </div>
      </div>

      {/* Date actions editor details box */}
      <div className="bg-[#1A1A1A] p-4 rounded-3xl border border-white/5 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-white/5">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-[#BFBFBF] uppercase tracking-wider">Editor Retrospectivo</span>
            <h4 className="text-sm font-bold text-white font-sans">
              Detalles del {selectedDateStr === todayDateStr ? 'Hoy' : selectedDateStr}
            </h4>
          </div>
          <span className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-md font-mono text-[#BFBFBF]">
            {selectedDateStr === todayDateStr ? 'Hoy' : 'Retrospectivo'}
          </span>
        </div>

        {/* Status indicator on selected day */}
        <div className="space-y-2 text-xs">
          {/* Workouts section status */}
          <div className="flex items-center justify-between p-2.5 bg-[#050505]/40 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#A8E61D]" />
              <div>
                <span className="text-xs font-bold text-white block">Entrenamiento del día</span>
                <span className="text-[10px] text-[#BFBFBF] block">
                  {workouts.some(w => w.date === selectedDateStr) ? '¡Rutina guardada!' : 'Sin registrar'}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => onManualToggleDayWorkout(selectedDateStr)}
              className={`px-3 py-1 font-mono text-[10px] font-bold uppercase rounded-lg border transition ${
                workouts.some(w => w.date === selectedDateStr)
                  ? 'border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  : 'border-[#A8E61D]/30 bg-[#A8E61D]/10 text-[#A8E61D] hover:bg-[#A8E61D]/20'
              }`}
            >
              {workouts.some(w => w.date === selectedDateStr) ? 'Remover' : 'Marcar Completado'}
            </button>
          </div>

          {/* Habits section status */}
          <div className="flex items-center justify-between p-2.5 bg-[#050505]/40 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#D7FF5A]" />
              <div>
                <span className="text-xs font-bold text-white block">Acondicionamiento de Hábitos</span>
                <span className="text-[10px] text-[#BFBFBF] block">
                  {habits.filter(h => h.completedDates.includes(selectedDateStr)).length} de {habits.length} listos
                </span>
              </div>
            </div>
            
            <button
              onClick={() => onManualToggleDayHabits(selectedDateStr)}
              className={`px-3 py-1 font-mono text-[10px] font-bold uppercase rounded-lg border transition ${
                habits.filter(h => h.completedDates.includes(selectedDateStr)).length === habits.length
                  ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                  : 'border-[#D7FF5A]/30 bg-[#D7FF5A]/10 text-[#D7FF5A] hover:bg-[#D7FF5A]/20'
              }`}
            >
              {habits.filter(h => h.completedDates.includes(selectedDateStr)).length === habits.length ? 'Reset Completo' : 'Completar Todos'}
            </button>
          </div>
        </div>

        <div className="flex gap-1.5 items-start text-[10px] text-[#BFBFBF]/60 bg-[#050505]/20 p-2 rounded-xl italic font-sans leading-normal">
          <Sparkles className="w-3.5 h-3.5 text-[#D7FF5A] shrink-0 mt-0.5" />
          <span>Al marcar retrospectivamente tus entrenamientos u hábitos, mantienes tus rachas vivas y sumas puntos XP de rango de forma inmediata.</span>
        </div>
      </div>
    </div>
  );
}
