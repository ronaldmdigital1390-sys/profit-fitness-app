/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, Plus, Trash2, Droplet, Dumbbell, Flame, Moon, Sparkles, 
  Smile, Apple, Trophy, Brain, PlusCircle, CheckCircle2 
} from 'lucide-react';
import { Habit } from '../types';

interface HabitsViewProps {
  habits: Habit[];
  onToggleHabit: (id: string, dateStr: string) => void;
  onAddHabit: (name: string, category: 'water' | 'exercise' | 'nutrition' | 'rest' | 'custom') => void;
  onDeleteHabit: (id: string) => void;
  todayDateStr: string;
}

const CATEGORY_ICONS: Record<string, any> = {
  water: Droplet,
  exercise: Dumbbell,
  nutrition: Flame,
  rest: Moon,
  custom: Sparkles
};

const CATEGORY_COLORS: Record<string, string> = {
  water: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  exercise: 'text-[#A8E61D] bg-[#A8E61D]/10 border-[#A8E61D]/20',
  nutrition: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  rest: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  custom: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
};

export default function HabitsView({ habits, onToggleHabit, onAddHabit, onDeleteHabit, todayDateStr }: HabitsViewProps) {
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState<'water' | 'exercise' | 'nutrition' | 'rest' | 'custom'>('custom');
  const [isAdding, setIsAdding] = useState(false);

  // Today compliance percent
  const completedTodayCount = habits.filter(h => h.completedDates.includes(todayDateStr)).length;
  const habitsPercent = habits.length > 0 ? Math.round((completedTodayCount / habits.length) * 100) : 0;

  // Let's calculate percentage completion for the last 7 days including today
  // Days of the week offset
  const getPastDateStr = (daysAgo: number): string => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };

  const weeklyStreakDays = Array.from({ length: 7 }, (_, i) => {
    const dateStr = getPastDateStr(6 - i); // oldest to newest (today is 6 - 6 = 0)
    const dateObj = new Date(dateStr);
    const label = dateObj.toLocaleDateString('es-ES', { weekday: 'narrow' }).toUpperCase();
    
    // completed count on that specific day
    const completedOnDay = habits.filter(h => h.completedDates.includes(dateStr)).length;
    const pct = habits.length > 0 ? Math.round((completedOnDay / habits.length) * 100) : 0;

    return {
      dateStr,
      label,
      percent: pct,
      completed: completedOnDay,
      total: habits.length
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    onAddHabit(newHabitName.trim(), newHabitCategory);
    setNewHabitName('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 pb-24 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-mono font-bold text-[#A8E61D] uppercase tracking-widest">Ritual de Disciplina</span>
          <h2 className="text-2xl font-bold font-sans">Hábitos Inteligentes</h2>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition ${
            isAdding 
              ? 'border-[#D7FF5A] bg-[#D7FF5A] text-black' 
              : 'border-[#A8E61D]/30 bg-white/5 text-[#A8E61D] hover:bg-white/10'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir</span>
        </button>
      </div>

      {/* Progress today banner */}
      <div className="p-5 bg-gradient-to-r from-[#1A1A1A] to-[#121212] rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-[#A8E61D]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#BFBFBF] uppercase">RENDIMIENTO DIARIO</span>
            <h3 className="text-lg font-bold font-sans">Evolución de Hábitos</h3>
          </div>
          <span className="text-2xl font-mono font-bold text-[#A8E61D]">{habitsPercent}%</span>
        </div>

        <div className="w-full bg-white/5 h-2 rounded-full mb-4 p-[1px] border border-white/10 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#7BCB14] to-[#D7FF5A] rounded-full transition-all duration-500"
            style={{ width: `${habitsPercent}%` }}
          />
        </div>
        
        {/* Weekly Progress visual list */}
        <div className="pt-3 border-t border-white/5">
          <span className="text-[10px] font-mono tracking-widest text-[#BFBFBF] uppercase block mb-3">Progreso Semanal</span>
          <div className="grid grid-cols-7 gap-2">
            {weeklyStreakDays.map((day, i) => {
              const isToday = day.dateStr === todayDateStr;
              return (
                <div key={i} className="flex flex-col items-center">
                  <span className={`text-[10px] font-mono mb-1 ${isToday ? 'text-[#D7FF5A] font-bold' : 'text-[#BFBFBF]/60'}`}>
                    {day.label}
                  </span>
                  <div className="relative w-full aspect-square bg-[#050505]/40 border border-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                    {/* Fill bar representing percentage */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-[#A8E61D]/20 transition-all duration-300"
                      style={{ height: `${day.percent}%` }}
                    />
                    <span className="text-[10px] font-mono font-bold z-10 text-[#A8E61D]">
                      {day.completed}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Habit collapse panel */}
      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSubmit}
            className="p-4 bg-[#1A1A1A] border border-white/10 rounded-2xl space-y-4 overflow-hidden"
          >
            <h4 className="text-xs font-mono font-bold text-[#D7FF5A] uppercase tracking-wider">Añadir Nuevo Hábito</h4>
            <div className="space-y-2">
              <input
                type="text"
                required
                placeholder="Ej. Tomar creatina, 30 min lectura..."
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#A8E61D]"
              />
            </div>
            
            {/* Category chooser */}
            <div>
              <span className="text-[10px] font-mono uppercase text-[#BFBFBF] block mb-2">Categoría del Hábito</span>
              <div className="grid grid-cols-5 gap-2">
                {(['water', 'exercise', 'nutrition', 'rest', 'custom'] as const).map((cat) => {
                  const CatIcon = CATEGORY_ICONS[cat];
                  const isSelected = newHabitCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewHabitCategory(cat)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] transition capitalize ${
                        isSelected 
                          ? 'border-[#A8E61D] bg-[#A8E61D]/10 text-[#D7FF5A]' 
                          : 'border-white/5 hover:border-white/10 text-[#BFBFBF]'
                      }`}
                    >
                      <CatIcon className="w-4 h-4 mb-1" />
                      <span>{cat === 'water' ? 'Agua' : cat === 'exercise' ? 'Entr' : cat === 'nutrition' ? 'Nutr' : cat === 'rest' ? 'Sueño' : 'Otro'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#A8E61D] hover:bg-[#7BCB14] text-black font-bold uppercase text-xs rounded-xl transition duration-150"
            >
              Registrar Hábito
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Habits list */}
      <div className="space-y-3">
        <h3 className="text-sm font-mono font-bold text-[#BFBFBF]/80 uppercase tracking-widest ml-1">MIS HÁBITOS DE RENDIMIENTO</h3>
        
        {habits.length === 0 ? (
          <div className="text-center bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
            <CheckCircle2 className="w-8 h-8 text-[#A8E61D]/30 mx-auto mb-2" />
            <p className="text-xs text-[#BFBFBF]">Sin hábitos activos creados. Añade uno arriba.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {habits.map((habit) => {
              const IconComp = CATEGORY_ICONS[habit.category] || Sparkles;
              const isCompletedToday = habit.completedDates.includes(todayDateStr);
              const colorClasses = CATEGORY_COLORS[habit.category] || 'text-[#BFBFBF]';

              return (
                <div 
                  key={habit.id}
                  className={`flex items-center gap-4 bg-[#1A1A1A] p-3 rounded-2xl transition border ${
                    isCompletedToday ? 'border-[#7BCB14]/45 bg-[#7BCB14]/5' : 'border-white/5'
                  }`}
                >
                  {/* Circular Checkbox */}
                  <button 
                    onClick={() => onToggleHabit(habit.id, todayDateStr)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition shrink-0 ${
                      isCompletedToday 
                        ? 'bg-[#7BCB14] border-[#7BCB14] text-black shadow-[0_0_8px_rgba(123,203,20,0.5)]' 
                        : 'border-white/20 hover:border-[#A8E61D]/50'
                    }`}
                  >
                    {isCompletedToday && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  </button>

                  {/* Icon Indicator */}
                  <div className={`p-2 rounded-xl border ${colorClasses}`}>
                    <IconComp className="w-4 h-4 shrink-0" />
                  </div>

                  {/* Title & Stats */}
                  <div className="flex-1 min-w-0" onClick={() => onToggleHabit(habit.id, todayDateStr)}>
                    <h4 className={`text-sm font-bold truncate transition ${
                      isCompletedToday ? 'text-white/60 line-through font-medium' : 'text-white'
                    }`}>
                      {habit.name}
                    </h4>
                    <span className="text-[10px] text-[#BFBFBF]/60 font-mono">
                      {habit.completedDates.length} veces completado
                    </span>
                  </div>

                  {/* Detach button if custom */}
                  {habit.id !== 'h1' && habit.id !== 'h2' && habit.id !== 'h3' && (
                    <button 
                      onClick={() => onDeleteHabit(habit.id)}
                      className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-neutral-800 transition"
                      title="Eliminar hábito"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
