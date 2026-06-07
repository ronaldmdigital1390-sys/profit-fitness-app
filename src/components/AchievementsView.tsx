/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, Award, Zap, Flag, Dumbbell, TrendingUp, Crown, 
  Check, Lock, Sparkles, CheckSquare, CalendarDays
} from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsViewProps {
  achievements: Achievement[];
  userStreak: number;
}

const BADGE_ICONS: Record<string, any> = {
  Flag: Flag,
  Dumbbell: Dumbbell,
  Award: Award,
  Zap: Zap,
  Trophy: Trophy,
  TrendingUp: TrendingUp,
  Crown: Crown
};

export default function AchievementsView({ achievements, userStreak }: AchievementsViewProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const lockedCount = achievements.length - unlockedCount;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="space-y-6 pb-24 text-white">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-mono font-bold text-[#A8E61D] uppercase tracking-widest">Insignias & Logros</span>
          <h2 className="text-2xl font-bold font-sans">Trofeos Profit</h2>
        </div>
        <div className="p-2 bg-[#1A1A1A] rounded-xl border border-white/5">
          <Trophy className="w-5 h-5 text-[#A8E61D]" />
        </div>
      </div>

      {/* Progress Card Summary */}
      <div className="p-5 bg-gradient-to-r from-[#1A1A1A] to-[#121212] rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#A8E61D]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#BFBFBF] uppercase">RECONOCIMIENTO AL RENDIMIENTO</span>
            <h3 className="text-lg font-bold font-sans text-white">Medallas Desbloqueadas</h3>
          </div>
          <span className="text-2xl font-mono font-bold text-[#A8E61D]">{unlockedCount} / {achievements.length}</span>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-[#050505]/40 h-2.5 rounded-full p-[1px] border border-white/10 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-[#7BCB14] to-[#D7FF5A] rounded-full shadow-[0_0_8px_rgba(168,230,29,0.4)]"
            />
          </div>
          <p className="text-[10px] text-[#BFBFBF]/80 flex justify-between font-mono">
            <span>Rendimiento general completado:</span>
            <span className="text-[#A8E61D] font-bold">{progressPercent}%</span>
          </p>
        </div>
      </div>

      {/* Grid displays */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-mono font-bold text-[#BFBFBF] uppercase tracking-widest">GALERÍA DE MEDALLAS</h3>
          {userStreak > 0 && (
            <div className="flex items-center gap-1 bg-[#A8E61D]/10 border border-[#A8E61D]/20 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#D7FF5A]">
              <Zap className="w-3.5 h-3.5 fill-[#D7FF5A]/15 text-[#D7FF5A]" />
              <span>Racha: {userStreak} días</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {achievements.map((badge) => {
            const IconComponent = BADGE_ICONS[badge.icon] || Trophy;
            const isUnlocked = badge.unlocked;

            return (
              <div 
                key={badge.id}
                className={`relative flex items-center gap-4 p-4 rounded-2.5xl border transition overflow-hidden group ${
                  isUnlocked 
                    ? 'bg-[#1A1A1A] border-[#A8E61D]/40 shadow-[0_4px_20px_rgba(168,230,29,0.04)] hover:bg-[#202020]' 
                    : 'bg-[#1A1A1A]/40 border-white/5 opacity-55 hover:bg-[#1A1A1A]/60'
                }`}
              >
                {/* Background flare if unlocked */}
                {isUnlocked && (
                  <div className="absolute top-[-30%] left-[-10%] w-[100px] h-[100px] bg-[#A8E61D]/10 rounded-full blur-[30px] pointer-events-none transition group-hover:bg-[#A8E61D]/15" />
                )}

                {/* Left side Badge circle */}
                <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition ${
                  isUnlocked 
                    ? 'bg-gradient-to-tr from-[#7BCB14]/20 to-[#D7FF5A]/20 border-[#A8E61D] text-[#D7FF5A] shadow-[0_0_15px_rgba(168,230,29,0.25)]' 
                    : 'bg-[#050505]/40 border-white/10 text-white/30'
                }`}>
                  <IconComponent className="w-7 h-7" />
                  
                  {isUnlocked ? (
                    <div className="absolute bottom-[-4px] right-[-4px] bg-[#7BCB14] text-black rounded-full p-0.5 border border-black shadow">
                      <Check className="w-2.5 h-2.5 stroke-[4px]" />
                    </div>
                  ) : (
                    <div className="absolute bottom-[-4px] right-[-4px] bg-neutral-850 text-white/40 rounded-full p-0.5 border border-white/5 bg-neutral-800">
                      <Lock className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                {/* Right side Metadata text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-bold truncate transition ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                      {badge.title}
                    </h4>
                    {isUnlocked && badge.unlockedDate && (
                      <span className="text-[8px] font-mono text-[#A8E61D] px-2 py-0.5 bg-[#A8E61D]/10 border border-[#A8E61D]/20 rounded-md">
                        {badge.unlockedDate}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-1 transition leading-normal ${isUnlocked ? 'text-[#BFBFBF]' : 'text-[#BFBFBF]/40'}`}>
                    {badge.description}
                  </p>

                  {/* Progressive bar indicator for lock status */}
                  {!isUnlocked && badge.requirementType.startsWith('streak_') && (
                    <div className="mt-2.5 space-y-1">
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#BFBFBF]/20" 
                          style={{ 
                            width: `${Math.min(
                              100, 
                              (userStreak / parseInt(badge.requirementType.split('_')[1])) * 100
                            )}%` 
                          }}
                        />
                      </div>
                      <span className="text-[9px] font-mono text-[#BFBFBF]/40">
                        Progreso: {userStreak} / {badge.requirementType.split('_')[1]} días racha
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
