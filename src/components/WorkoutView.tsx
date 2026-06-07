/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, RotateCcw, Check, ChevronRight, Dumbbell, 
  Flame, Clock, ChevronDown, CheckCircle, FlameKindling, Info, Sparkles,
  Target, Lightbulb, AlertTriangle, Award, List
} from 'lucide-react';
import { Routine, Exercise } from '../data';
import { POSTURE_ROUTINES } from '../postureData';
import { EXERCISE_GUIDE } from '../exerciseGuide';

interface WorkoutViewProps {
  routine: Routine;
  onCompleteWorkout: (durationSeconds: number, exercisesCompleted: number, calories: number, customName?: string) => void;
  todayCompletedWorkout?: { exercisesCompleted: number; durationSeconds: number };
}

export default function WorkoutView({ routine, onCompleteWorkout, todayCompletedWorkout }: WorkoutViewProps) {
  const [workoutMode, setWorkoutMode] = useState<'fuerza' | 'postura'>('fuerza');
  const [selectedPostureDay, setSelectedPostureDay] = useState<number>(1);
  
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0); // seconds
  const [checkedExercises, setCheckedExercises] = useState<Record<number, boolean>>({});
  const [viewingExerciseIndex, setViewingExerciseIndex] = useState<number | null>(null);

  const increment = useRef<NodeJS.Timeout | null>(null);

  // Map the selected posture routine to the core Routine interface structure
  const currentPostureRoutine = POSTURE_ROUTINES.find(r => r.day === selectedPostureDay) || POSTURE_ROUTINES[0];

  const activeRoutine: Routine = workoutMode === 'fuerza' ? routine : {
    dayName: `Postura`,
    routineName: currentPostureRoutine.title,
    focus: currentPostureRoutine.focus,
    estCalories: 140,
    estDurationMinutes: currentPostureRoutine.durationMinutes,
    exercises: currentPostureRoutine.exercises.map(ex => ({
      name: ex.name,
      series: ex.series,
      reps: ex.reps,
      rest: ex.rest,
      description: ex.description
    }))
  };

  // Handle active timer
  useEffect(() => {
    if (isActive && !isPaused) {
      increment.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (increment.current) clearInterval(increment.current);
    }

    return () => {
      if (increment.current) clearInterval(increment.current);
    };
  }, [isActive, isPaused]);

  const handleStartWorkout = () => {
    setIsActive(true);
    setIsPaused(false);
    setTime(0);
    setCheckedExercises({});
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleResetTimer = () => {
    setTime(0);
  };

  const handleToggleExercise = (index: number) => {
    setCheckedExercises((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const completedCount = Object.values(checkedExercises).filter(Boolean).length;

  const handleFinishWorkout = () => {
    if (increment.current) clearInterval(increment.current);
    const calculatedCalories = workoutMode === 'fuerza' 
      ? Math.round((time / 60) * 9.5) 
      : Math.round((time / 60) * 5.6); // lower burn rate for posture
    
    // Save with the actual routine name
    onCompleteWorkout(time, completedCount, calculatedCalories, activeRoutine.routineName);
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
    setCheckedExercises({});
  };

  // Helper to format time
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-24 text-white">
      {/* Title & Banner */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-mono font-bold text-[#A8E61D] uppercase tracking-widest">Acondicionamiento Diario</span>
          <h2 className="text-2xl font-bold font-sans">Entrenamiento</h2>
        </div>
        <div className="p-2 bg-[#1A1A1A] rounded-xl border border-white/5">
          <Dumbbell className="w-5 h-5 text-[#A8E61D]" />
        </div>
      </div>

      {todayCompletedWorkout && !isActive && (
        <div className="p-4 bg-[#7BCB14]/10 border border-[#A8E61D]/30 rounded-2xl flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-[#A8E61D] shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">¡Entrenamiento de hoy completado!</h4>
            <p className="text-xs text-[#BFBFBF]">
              Registraste {todayCompletedWorkout.exercisesCompleted} ejercicios en {Math.round(todayCompletedWorkout.durationSeconds / 60)} min. +50 XP sumados.
            </p>
          </div>
        </div>
      )}

      {/* Mode Switcher Segments - Only when not actively training */}
      {!isActive && (
        <div className="flex bg-[#121212] p-1 rounded-2xl border border-white/5 w-full">
          <button
            onClick={() => setWorkoutMode('fuerza')}
            className={`flex-1 py-2.5 rounded-xl text-center text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 ${
              workoutMode === 'fuerza'
                ? 'bg-[#A8E61D] text-black shadow-md'
                : 'text-[#BFBFBF]/60 hover:text-white'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Fuerza Diaria</span>
          </button>
          <button
            onClick={() => setWorkoutMode('postura')}
            className={`flex-1 py-2.5 rounded-xl text-center text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 ${
              workoutMode === 'postura'
                ? 'bg-[#A8E61D] text-black shadow-md'
                : 'text-[#BFBFBF]/60 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Postura Perfecta</span>
          </button>
        </div>
      )}

      {/* Session chooser for Posture mode */}
      {workoutMode === 'postura' && !isActive && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 bg-[#121212] p-1.5 rounded-2xl border border-white/5 font-mono">
            {[1, 2, 3].map((dayNum) => {
              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedPostureDay(dayNum)}
                  className={`py-2 rounded-xl text-center transition flex flex-col items-center justify-center ${
                    selectedPostureDay === dayNum
                      ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                      : 'text-[#BFBFBF]/40 hover:text-[#BFBFBF]/80'
                  }`}
                >
                  <span className="text-[8px] font-mono uppercase tracking-widest">Día {dayNum}</span>
                  <span className="text-[10px] font-bold font-sans mt-0.5 truncate max-w-[85px]">
                    {dayNum === 1 ? 'Alta' : dayNum === 2 ? 'Core' : 'Total'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Routine Cards Summary */}
      <div className="p-5 bg-gradient-to-r from-[#1A1A1A] to-[#121212] rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-[#7BCB14]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#A8E61D] bg-[#A8E61D]/10 px-2.5 py-0.5 rounded-full border border-[#A8E61D]/20">
            {workoutMode === 'fuerza' ? `${routine.dayName} F.A.` : `Sesión ${selectedPostureDay}`}
          </span>
          <span className="text-xs text-[#BFBFBF]">
            {workoutMode === 'fuerza' ? 'Enfoque de Fuerza de Hoy' : 'Enfoque de Postura'}
          </span>
        </div>

        <h3 className="text-xl font-bold font-sans tracking-tight mb-1 text-[#D7FF5A]">{activeRoutine.routineName}</h3>
        <p className="text-xs text-[#BFBFBF]/80 mb-4">{activeRoutine.focus}</p>

        {/* Warmup notes for posture mode */}
        {workoutMode === 'postura' && (
          <div className="mb-4 bg-[#050505]/50 border border-white/5 rounded-2xl p-3 flex gap-2 items-start text-xs text-[#BFBFBF]/90">
            <Info className="w-4 h-4 text-[#A8E61D] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block uppercase text-[10px] tracking-wider font-mono">Calentamiento Recomendado:</span>
              <span>{currentPostureRoutine.warmup}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-sm font-mono">
          <div className="flex items-center gap-2 bg-[#050505]/40 p-2.5 rounded-xl border border-white/5">
            <Clock className="w-4 h-4 text-[#A8E61D]" />
            <div>
              <span className="text-[9px] text-[#BFBFBF] block leading-none uppercase">Est. Duración</span>
              <span className="font-bold text-xs">{activeRoutine.estDurationMinutes} mins</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#050505]/40 p-2.5 rounded-xl border border-white/5">
            <Flame className="w-4 h-4 text-[#D7FF5A]" />
            <div>
              <span className="text-[9px] text-[#BFBFBF] block leading-none uppercase">Quemado Prom.</span>
              <span className="font-bold text-xs">~{activeRoutine.estCalories} Kcal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main interactive state machine */}
      {!isActive ? (
        <div className="text-center py-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartWorkout}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#A8E61D] to-[#7BCB14] text-black font-extrabold tracking-wide uppercase shadow-[0_0_20px_rgba(168,230,29,0.3)] hover:shadow-[0_0_35px_rgba(168,230,29,0.5)] transition flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-black" />
            Comenzar {workoutMode === 'fuerza' ? 'Entrenamiento' : 'Rutina Postura'}
          </motion.button>
          <p className="text-[10px] text-[#BFBFBF]/40 font-mono mt-2 uppercase">
            Iniciará el cronómetro oficial y habilitará el checklist biométrico.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Timer Dashboard */}
          <div className="p-4 bg-[#1A1A1A] border-2 border-[#A8E61D]/30 rounded-3xl flex flex-col items-center">
            <span className="text-[10px] font-mono tracking-widest text-[#BFBFBF] mb-1 uppercase">TIEMPO TRANSCURRIDO</span>
            <div className="text-4xl lg:text-5xl font-mono font-bold text-[#A8E61D] mb-4 tracking-tighter drop-shadow-[0_0_15px_rgba(168,230,29,0.3)]">
              {formatTime(time)}
            </div>

            {/* Timer Actions */}
            <div className="flex gap-4">
              <button 
                onClick={handleTogglePause}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition flex items-center justify-center min-w-[50px]"
              >
                {isPaused ? <Play className="w-5 h-5 fill-white text-white" /> : <Pause className="w-5 h-5" />}
              </button>
              <button 
                onClick={handleResetTimer}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-[#BFBFBF] transition flex items-center justify-center min-w-[50px]"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={handleFinishWorkout}
                className="px-5 bg-red-650 hover:bg-red-750 text-white rounded-full font-bold text-sm tracking-wide transition flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Terminar
              </button>
            </div>

            {/* Checklist progress */}
            <div className="w-full mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-xs font-mono text-[#BFBFBF]">
              <span>Ejercicios Completados:</span>
              <span className="text-white font-bold bg-white/5 px-2 py-0.5 rounded-md">
                {completedCount} de {activeRoutine.exercises.length}
              </span>
            </div>
          </div>

          {/* List of current exercises */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-[#BFBFBF] ml-1">EJERCICIOS DE LA RUTINA</h3>
            
            {activeRoutine.exercises.map((exercise, index) => {
              const isChecked = !!checkedExercises[index];
              const isViewingDetails = viewingExerciseIndex === index;
              
              // Resolve detailed biomechanical metrics with an elegant fallback if custom
              const guide = EXERCISE_GUIDE[exercise.name] || {
                description: exercise.description || 'Patrón técnico biomecánico integrado.',
                muscles: ['General / Core'],
                steps: ['Estabiliza la postura corporal y activa la faja abdominal.', 'Controla con tempo lento tanto la bajada como la contracción máxima.', 'Descansa el tiempo estipulado entre cada serie de repeticiones.'],
                tips: ['Mantén la columna neutra y la respiración fluida.'],
                mistakes: ['Evitar rebotar o usar inercia excesiva para compensar cargas.'],
                benefit: 'Aumento de masa muscular, densidad e integridad articular.'
              };

              return (
                <div 
                  key={index} 
                  className={`bg-[#1A1A1A] rounded-2xl border transition ${
                    isChecked ? 'border-[#A8E61D]/50 bg-[#7BCB14]/5' : 'border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between p-4 gap-3">
                    {/* Checkbox trigger */}
                    <button 
                      onClick={() => handleToggleExercise(index)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition shrink-0 ${
                        isChecked 
                           ? 'bg-[#A8E61D] border-[#A8E61D] text-black' 
                           : 'border-white/20 hover:border-[#A8E61D]/60'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3px]" />}
                    </button>

                    {/* Meta values */}
                    <div className="flex-1 min-w-0 pointer-events-auto cursor-pointer" onClick={() => setViewingExerciseIndex(isViewingDetails ? null : index)}>
                      <h4 className={`text-sm font-bold truncate transition ${isChecked ? 'text-white/60 line-through' : 'text-white'}`}>
                        {exercise.name}
                      </h4>
                      <div className="flex gap-2 text-xs font-mono text-[#BFBFBF] mt-0.5">
                        <span>{exercise.series} Series</span>
                        <span>•</span>
                        <span>{exercise.reps} Reps</span>
                        <span>•</span>
                        <span className="text-[#A8E61D]/90">Rest: {exercise.rest}</span>
                      </div>
                    </div>

                    {/* View Details Collapse */}
                    <button 
                      onClick={() => setViewingExerciseIndex(isViewingDetails ? null : index)}
                      className="p-1 rounded-lg text-[#BFBFBF] hover:text-white"
                    >
                      <ChevronDown className={`w-4 h-4 transform transition ${isViewingDetails ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isViewingDetails && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-white/5 bg-[#050505]/50 rounded-b-2xl"
                      >
                        <div className="p-4 space-y-4 text-xs text-[#BFBFBF]">
                          {/* Descripción y Músculos */}
                          <div className="space-y-2">
                            <p className="text-white leading-relaxed text-[11px]">{guide.description}</p>
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[9px] font-mono font-bold text-[#A8E61D] uppercase">Músculos:</span>
                              {guide.muscles.map((muscle, mi) => (
                                <span key={mi} className="px-2 py-0.5 rounded bg-[#A8E61D]/10 text-[#D7FF5A] text-[9px] font-mono border border-[#A8E61D]/20 leading-none">
                                  {muscle}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Beneficio Principal */}
                          <div className="flex items-center gap-2.5 bg-[#7BCB14]/5 border border-[#A8E61D]/15 rounded-xl px-3 py-2">
                            <Award className="w-4 h-4 text-[#A8E61D] shrink-0" />
                            <div>
                              <span className="text-[8px] font-mono text-[#BFBFBF] uppercase tracking-wider block">Beneficio Principal</span>
                              <span className="text-[11px] text-[#D7FF5A] font-bold">{guide.benefit}</span>
                            </div>
                          </div>

                          {/* Instrucciones paso a paso */}
                          <div className="bg-[#121212]/95 border border-white/5 p-3 rounded-xl space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                              <List className="w-3.5 h-3.5 text-[#A8E61D]" /> Ejecución Técnica
                            </span>
                            <ol className="space-y-1.5 text-[#BFBFBF]">
                              {guide.steps.map((step, si) => (
                                <li key={si} className="flex gap-2 items-start text-[11px] leading-relaxed">
                                  <span className="text-[#A8E61D] font-mono font-bold text-[10px] bg-[#A8E61D]/10 px-1 py-0.2 rounded shrink-0 min-w-[16px] text-center">{si + 1}</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Tips y Errores comunes */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                            <div className="bg-[#1A1A1A]/90 border border-white/5 rounded-xl p-3 space-y-1.5">
                              <span className="text-[10px] font-mono font-bold text-[#D7FF5A] uppercase tracking-wider flex items-center gap-1.5">
                                <Lightbulb className="w-3.5 h-3.5 text-[#D7FF5A]" /> Consejos clave
                              </span>
                              <ul className="space-y-1 text-[#BFBFBF]">
                                {guide.tips.map((tip, ti) => (
                                  <li key={ti} className="flex gap-1.5 items-start text-[10.5px] leading-relaxed">
                                    <span className="text-[#D7FF5A] shrink-0 font-bold">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-[#1A1A1A]/90 border border-white/5 rounded-xl p-3 space-y-1.5">
                              <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Errores comunes
                              </span>
                              <ul className="space-y-1 text-[#BFBFBF]">
                                {guide.mistakes.map((mistake, mi) => (
                                  <li key={mi} className="flex gap-1.5 items-start text-[10.5px] leading-relaxed">
                                    <span className="text-red-400 shrink-0 font-bold">•</span>
                                    <span>{mistake}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Cooldown note in active session */}
          <div className="p-4 bg-[#121212] border border-white/5 rounded-3xl space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#A8E61D] font-bold">FASE DE CIERRE (COOLDOWN)</span>
            <p className="text-xs text-[#BFBFBF] leading-normal">{workoutMode === 'fuerza' ? 'Estiramientos ligeros post-ejercicios.' : currentPostureRoutine.cooldown}</p>
          </div>
        </div>
      )}
    </div>
  );
}
