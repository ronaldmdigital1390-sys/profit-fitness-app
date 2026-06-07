/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Flame, Target, Sparkles, Award } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: (name: string, weight?: number, targetWeight?: number, height?: number, age?: number) => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete(
        name.trim() || 'Atleta Profit',
        weight ? parseFloat(weight) : undefined,
        targetWeight ? parseFloat(targetWeight) : undefined,
        height ? parseFloat(height) : undefined,
        age ? parseInt(age) : undefined
      );
    }
  };

  return (
    <div id="welcome-screen" className="relative min-h-[92vh] flex flex-col justify-between items-center text-white px-6 py-8 overflow-hidden bg-[#050505]">
      {/* Background neon glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] bg-[#A8E61D]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[350px] h-[350px] bg-[#7BCB14]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Header logo & title */}
      <div className="w-full flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-[#7BCB14] to-[#D7FF5A] p-2 rounded-xl shadow-[0_0_15px_rgba(168,230,29,0.4)]">
            <Dumbbell className="w-6 h-6 text-black" />
          </div>
          <span className="font-sans font-bold text-lg tracking-wider text-white">PROFIT <span className="text-[#A8E61D]">FITNESS</span></span>
        </div>
        <div className="text-xs font-mono text-[#BFBFBF]/60 bg-[#1A1A1A] px-3 py-1 rounded-full border border-white/10">v1.2.0</div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="welcome-info"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center items-center text-center z-10 py-8 lg:py-12"
          >
            {/* Main Visual Mascot Glow */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#A8E61D] rounded-full blur-[35px] opacity-30 animate-pulse" />
              <div className="relative border-2 border-[#A8E61D] p-6 lg:p-8 rounded-full bg-[#1A1A1A]/80 shadow-[inset_0_0_20px_rgba(168,230,29,0.2)]">
                <Flame className="w-16 h-16 lg:w-20 lg:h-20 text-[#D7FF5A]" />
              </div>
            </div>

            <h1 className="font-sans text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
              TRANSFORMA TU <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A8E61D] via-[#D7FF5A] to-[#7BCB14] font-black">
                POTENCIAL FÍSICO
              </span>
            </h1>
            <p className="font-sans text-sm md:text-base text-[#BFBFBF] max-w-[290px] leading-relaxed mb-6">
              Tu sistema personal de transformación física, hábitos premium y acondicionamiento tecnológico.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-[320px] mb-4">
              <div className="bg-[#1A1A1A] border border-white/5 rounded-xl p-3 text-left">
                <Target className="w-5 h-5 text-[#A8E61D] mb-1" />
                <h4 className="text-xs font-bold text-white">Metas Claras</h4>
                <p className="text-[10px] text-[#BFBFBF]/80">Registros exactos y pesos actualizados diariamente.</p>
              </div>
              <div className="bg-[#1A1A1A] border border-white/5 rounded-xl p-3 text-left">
                <Sparkles className="w-5 h-5 text-[#D7FF5A] mb-1" />
                <h4 className="text-xs font-bold text-white">Hábitos Pro</h4>
                <p className="text-[10px] text-[#BFBFBF]/80">Checklists de alto rendimiento diseñados para ti.</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome-form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center w-full max-w-[340px] z-10 py-4"
          >
            <div className="mb-6 text-center">
              <span className="inline-block px-3 py-1 bg-[#A8E61D]/10 text-[#A8E61D] rounded-full text-xs font-mono font-bold mb-2 border border-[#A8E61D]/20">PASO 2: PERFIL ATLETA</span>
              <h2 className="text-2xl font-bold font-sans">Cuéntanos sobre ti</h2>
              <p className="text-xs text-[#BFBFBF] mt-1">Configura tu perfil para calibrar tu progreso.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#BFBFBF] mb-1 ml-1">Tu Nombre *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ronald"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#BFBFBF]/20 focus:border-[#A8E61D] rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#BFBFBF] mb-1 ml-1">Peso actual (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ej. 78.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#BFBFBF]/20 focus:border-[#A8E61D] rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#BFBFBF] mb-1 ml-1">Peso Meta (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ej. 72.0"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#BFBFBF]/20 focus:border-[#A8E61D] rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#BFBFBF] mb-1 ml-1">Estatura (cm)</label>
                  <input
                    type="number"
                    placeholder="Ej. 178"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#BFBFBF]/20 focus:border-[#A8E61D] rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#BFBFBF] mb-1 ml-1">Edad</label>
                  <input
                    type="number"
                    placeholder="Ej. 28"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#BFBFBF]/20 focus:border-[#A8E61D] rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button to proceed */}
      <div className="w-full max-w-[340px] z-10 mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={step === 2 && !name.trim()}
          className={`w-full relative flex items-center justify-center gap-2 py-4 rounded-xl font-bold tracking-wide transition shadow-lg ${
            step === 2 && !name.trim()
              ? 'bg-[#1A1A1A] text-white/30 border border-white/5 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#A8E61D] to-[#D7FF5A] text-black shadow-[0_0_20px_rgba(168,230,29,0.35)] hover:shadow-[0_0_30px_rgba(168,230,29,0.5)]'
          }`}
        >
          <span>{step === 1 ? 'Comenzar Ahora' : 'Completar Registro'}</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <Sparkles className="w-4 h-4 ml-1" />
          </motion.div>
        </motion.button>
        <p className="text-center text-[10px] text-[#BFBFBF]/50 mt-3 font-mono">
          Al presionar aceptas que los datos se guarden en tu dispositivo actual.
        </p>
      </div>
    </div>
  );
}
