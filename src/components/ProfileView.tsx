/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Calendar, Flame, Weight, Dumbbell, Settings, Sparkles, 
  Trash2, Award, ChevronRight, Ruler, AlignLeft, RefreshCw, Trophy
} from 'lucide-react';
import { UserProfile, WorkoutLog, ProgressLog } from '../types';
import { getXPForLevel, getLevelName } from '../data';

interface ProfileViewProps {
  user: UserProfile;
  workouts: WorkoutLog[];
  logs: ProgressLog[];
  onUpdateWeights: (currWeight?: number, targWeight?: number, height?: number) => void;
  onResetDatabase: () => void;
}

export default function ProfileView({ user, workouts, logs, onUpdateWeights, onResetDatabase }: ProfileViewProps) {
  const [isEditingMetrics, setIsEditingMetrics] = useState(false);
  const [currWeight, setCurrWeight] = useState(user.weight?.toString() || '');
  const [targWeight, setTargWeight] = useState(user.targetWeight?.toString() || '');
  const [heightVal, setHeightVal] = useState(user.height?.toString() || '');
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Stats calculations
  const totalWorkouts = workouts.length;
  const totalDurationMin = Math.round(workouts.reduce((acc, w) => acc + w.durationSeconds, 0) / 60);
  const totalCalories = workouts.reduce((acc, w) => acc + w.caloriesBurned, 0);

  // Level info
  const nextLevelXP = getXPForLevel(user.level);
  const levelTextName = getLevelName(user.level);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWeights(
      currWeight ? parseFloat(currWeight) : undefined,
      targWeight ? parseFloat(targWeight) : undefined,
      heightVal ? parseFloat(heightVal) : undefined
    );
    setIsEditingMetrics(false);
  };

  return (
    <div className="space-y-6 pb-24 text-white">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-mono font-bold text-[#A8E61D] uppercase tracking-widest">Ficha de Atleta</span>
          <h2 className="text-2xl font-bold font-sans">Perfil de Rendimiento</h2>
        </div>
        <div className="p-2 bg-[#1A1A1A] rounded-xl border border-white/5">
          <User className="w-5 h-5 text-[#A8E61D]" />
        </div>
      </div>

      {/* Rango / Level Banner Card */}
      <div className="p-5 bg-gradient-to-r from-[#1A1A1A] to-[#121212] rounded-3xl border border-[#A8E61D]/20 shadow-[0_4px_30px_rgba(168,230,29,0.06)] relative overflow-hidden flex items-center gap-4">
        {/* Glowing badge design */}
        <div className="relative w-16 h-16 bg-gradient-to-tr from-[#7BCB14] to-[#D7FF5A] text-black rounded-2xl flex flex-col items-center justify-center font-bold shadow-[0_0_15px_rgba(168,230,29,0.4)] shrink-0 font-sans">
          <span className="text-[9px] font-mono leading-none tracking-wider text-black/50 uppercase">ETAPA</span>
          <span className="text-2xl font-black leading-none mt-0.5">{user.level}</span>
          <div className="absolute inset-0 border border-white/20 rounded-2xl" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-[#A8E61D] uppercase">ETAPA ACTUAL</span>
            <Award className="w-3.5 h-3.5 text-[#D7FF5A]" />
          </div>
          <h3 className="text-lg font-black tracking-tight text-white font-sans uppercase mb-0.5 truncate">{user.name}</h3>
          <p className="text-xs text-[#BFBFBF]">ETAPA {user.level}: {levelTextName}</p>
        </div>
      </div>

      {/* Global Workout Metrics Statistics Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-[#1A1A1A] rounded-2xl border border-white/5 text-center flex flex-col justify-center">
          <Dumbbell className="w-4 h-4 text-[#A8E61D] mx-auto mb-1.5" />
          <span className="text-lg font-bold font-mono tracking-tight">{totalWorkouts}</span>
          <span className="text-[9px] uppercase tracking-wider text-[#BFBFBF]/60 mt-0.5">Entrenamientos</span>
        </div>
        <div className="p-3 bg-[#1A1A1A] rounded-2xl border border-white/5 text-center flex flex-col justify-center">
          <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1.5" />
          <span className="text-lg font-bold font-mono tracking-tight">{totalCalories}</span>
          <span className="text-[9px] uppercase tracking-wider text-[#BFBFBF]/60 mt-0.5">Kcal Quemadas</span>
        </div>
        <div className="p-3 bg-[#1A1A1A] rounded-2xl border border-white/5 text-center flex flex-col justify-center">
          <Trophy className="w-4 h-4 text-[#D7FF5A] mx-auto mb-1.5" />
          <span className="text-lg font-bold font-mono tracking-tight">{totalDurationMin} min</span>
          <span className="text-[9px] uppercase tracking-wider text-[#BFBFBF]/60 mt-0.5">T. Entrenado</span>
        </div>
      </div>

      {/* Biometrical Stats card */}
      <div className="p-5 bg-[#1A1A1A] border border-white/5 rounded-3xl space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-white/5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#BFBFBF]">METRICAS CORPORALES</h4>
          {!isEditingMetrics && (
            <button 
              onClick={() => setIsEditingMetrics(true)}
              className="text-[10px] font-mono text-[#A8E61D] font-bold hover:underline"
            >
              Editar Medidas
            </button>
          )}
        </div>

        {isEditingMetrics ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[8px] font-mono text-[#BFBFBF] uppercase mb-1">Peso Act. (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={currWeight}
                  onChange={(e) => setCurrWeight(e.target.value)}
                  className="w-full bg-[#050505]/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E61D]"
                />
              </div>
              <div>
                <label className="block text-[8px] font-mono text-[#BFBFBF] uppercase mb-1">Peso Meta (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={targWeight}
                  onChange={(e) => setTargWeight(e.target.value)}
                  className="w-full bg-[#050505]/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E61D]"
                />
              </div>
              <div>
                <label className="block text-[8px] font-mono text-[#BFBFBF] uppercase mb-1">Estatura (cm)</label>
                <input
                  type="number"
                  value={heightVal}
                  onChange={(e) => setHeightVal(e.target.value)}
                  className="w-full bg-[#050505]/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E61D]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                type="submit"
                className="flex-1 py-1.5 bg-[#A8E61D] text-black text-xs font-bold font-mono uppercase rounded-xl hover:bg-[#7BCB14] transition"
              >
                Guardar
              </button>
              <button 
                type="button"
                onClick={() => setIsEditingMetrics(false)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-mono uppercase rounded-xl hover:bg-white/10 text-white"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-3 gap-3 text-center py-1">
            <div className="space-y-0.5">
              <span className="text-[10px] text-[#BFBFBF]/65 font-mono block">PESO ACTUAL</span>
              <div className="flex items-center justify-center gap-1">
                <Weight className="w-3.5 h-3.5 text-[#A8E61D]" />
                <span className="text-sm font-bold font-mono">{user.weight ? `${user.weight} kg` : 'N/D'}</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-[#BFBFBF]/65 font-mono block">META PESO</span>
              <div className="flex items-center justify-center gap-1">
                <Settings className="w-3.5 h-3.5 text-[#D7FF5A]" />
                <span className="text-sm font-bold font-mono">{user.targetWeight ? `${user.targetWeight} kg` : 'N/D'}</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-[#BFBFBF]/65 font-mono block">ESTATURA</span>
              <div className="flex items-center justify-center gap-1">
                <Ruler className="w-3.5 h-3.5 text-purple-450 text-blue-400" />
                <span className="text-sm font-bold font-mono">{user.height ? `${user.height} cm` : 'N/D'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Starting date calendar info */}
      <div className="p-4 bg-[#1A1A1A] border border-white/5 rounded-2xl flex items-center justify-between text-xs text-[#BFBFBF]/85">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#A8E61D]" />
          <div>
            <span className="text-[#BFBFBF] text-[10px] uppercase font-mono block">INICIO DE ENTRENAMIENTO</span>
            <span className="font-bold text-white font-sans text-sm">{user.startDate}</span>
          </div>
        </div>

        <span className="text-xs bg-white/5 border border-white/10 p-1.5 px-3 rounded-xl font-mono text-white">
          {user.activeDaysCount} días activos
        </span>
      </div>

      {/* Danger Zone panel */}
      <div className="p-5 bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-red-500/20 rounded-3xl space-y-4">
        <div className="border-b border-red-500/10 pb-2">
          <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">DANGER ZONE / REINICIO</h4>
          <p className="text-[10px] text-[#BFBFBF]/60 leading-normal mt-1">Borra toda la información registrada de peso, hábitos anteriores, logros y marcas para comenzar de nuevo una nueva temporada limpia.</p>
        </div>

        {showConfirmReset ? (
          <div className="space-y-3">
            <p className="text-[10.5px] text-red-300 font-bold font-mono uppercase bg-red-950/20 p-2.5 rounded-xl border border-red-500/30">
              ⚠️ ¿ESTÁS ABSOLUTAMENTE SEGURO? Esta acción es irreversible y borrará el localStorage.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={onResetDatabase}
                className="flex-1 py-2 bg-red-650 text-white hover:bg-red-750 text-xs font-extrabold uppercase rounded-xl transition bg-red-650 bg-red-600"
              >
                Eliminar Todo mi Progreso
              </button>
              <button 
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 bg-neutral-800 border border-white/5 text-xs text-[#BFBFBF] rounded-xl hover:bg-neutral-750"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button 
            type="button"
            onClick={() => setShowConfirmReset(true)}
            className="w-full py-2.5 border border-red-500/30 text-red-400 text-xs font-extrabold bg-red-500/5 hover:bg-red-500/15 rounded-xl transition"
          >
            Formatear Aplicación & Base de Datos
          </button>
        )}
      </div>
    </div>
  );
}
