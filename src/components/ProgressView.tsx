/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Calendar, Scale, Camera, FileText, ChevronRight, 
  Trash2, TrendingDown, RefreshCcw, Sparkles, CheckCircle,
  HelpCircle, Monitor, Check, User, Info, ArrowRight, ShieldCheck, AlertTriangle
} from 'lucide-react';
import { ProgressLog } from '../types';
import { INITIAL_ERGO_STATE, ErgonomicsState, PostureTestResult } from '../postureData';

interface ProgressViewProps {
  logs: ProgressLog[];
  onAddLog: (log: Omit<ProgressLog, 'id'>) => void;
  onDeleteLog: (id: string) => void;
  todayDateStr: string;
  onBonusXP?: (amount: number) => void; // Support for awarding XP dynamically!
}

export default function ProgressView({ logs, onAddLog, onDeleteLog, todayDateStr, onBonusXP }: ProgressViewProps) {
  // Tabs for sub-modules
  const [subTab, setSubTab] = useState<'biometria' | 'evaluacion' | 'ergonomia'>('biometria');

  // ---- MODULE 1: BIOMETRÍA ----
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [biceps, setBiceps] = useState('');
  const [thighs, setThighs] = useState('');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isAddingMetric, setIsAddingMetric] = useState(false);
  
  // ---- MODULE 2: TEST POSTURA ----
  const [wall_pies, setWallPies] = useState(false);
  const [wall_gluteos, setWallGluteos] = useState(false);
  const [wall_omoplatos, setWallOmoplatos] = useState(false);
  const [wall_cabeza, setWallCabeza] = useState(false);
  const [wall_lumbar, setWallLumbar] = useState(false);

  const [mirror_oreja, setMirrorOreja] = useState(false);
  const [mirror_hombro, setMirrorHombro] = useState(false);
  const [mirror_cadera, setMirrorCadera] = useState(false);
  const [mirror_rodilla, setMirrorRodilla] = useState(false);
  const [mirror_tobillo, setMirrorTobillo] = useState(false);

  const [testResult, setTestResult] = useState<PostureTestResult | null>(null);

  // Load / Save posture test history
  const [postureHistory, setPostureHistory] = useState<PostureTestResult[]>(() => {
    const saved = localStorage.getItem('profit_posture_test_results');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('profit_posture_test_results', JSON.stringify(postureHistory));
  }, [postureHistory]);

  // ---- MODULE 3: SETUP ERGONÓMICO ----
  const [ergoChecks, setErgoChecks] = useState<ErgonomicsState>(() => {
    const saved = localStorage.getItem('profit_ergo_checks');
    return saved ? JSON.parse(saved) : INITIAL_ERGO_STATE;
  });

  useEffect(() => {
    localStorage.setItem('profit_ergo_checks', JSON.stringify(ergoChecks));
  }, [ergoChecks]);

  // Sort logs
  const sortedLogsForChart = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  const sortedLogsForList = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitMetric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;

    onAddLog({
      date: todayDateStr,
      weight: parseFloat(weight),
      chest: chest ? parseFloat(chest) : undefined,
      waist: waist ? parseFloat(waist) : undefined,
      biceps: biceps ? parseFloat(biceps) : undefined,
      thighs: thighs ? parseFloat(thighs) : undefined,
      photo: photo || undefined,
      notes: notes.trim() || undefined
    });

    setWeight('');
    setChest('');
    setWaist('');
    setBiceps('');
    setThighs('');
    setNotes('');
    setPhoto(null);
    setIsAddingMetric(false);
  };

  // Score Posture Test
  const handleScorePostureTest = () => {
    const wallCount = [wall_pies, wall_gluteos, wall_omoplatos, wall_cabeza, wall_lumbar].filter(Boolean).length;
    
    let classification: 'excelente' | 'buena' | 'compensada' = 'compensada';
    if (wallCount === 5) classification = 'excelente';
    else if (wallCount >= 3) classification = 'buena';

    const newResult: PostureTestResult = {
      date: todayDateStr,
      wallScoreCount: wallCount,
      mirrorChecks: {
        earAligned: mirror_oreja,
        shoulderAligned: mirror_hombro,
        hipAligned: mirror_cadera,
        kneeAligned: mirror_rodilla,
        ankleAligned: mirror_tobillo
      },
      classification
    };

    setPostureHistory(prev => [newResult, ...prev]);
    setTestResult(newResult);

    // Call bonus XP if provided
    if (onBonusXP) {
      onBonusXP(30); // 30 XP reward for completing posture test!
    }
  };

  // Ergo checklists toggle helper
  const handleToggleErgo = (key: keyof ErgonomicsState) => {
    const updated = {
      ...ergoChecks,
      [key]: !ergoChecks[key]
    };
    setErgoChecks(updated);

    // Minor reward for each change to keep high dopamine loop
    if (onBonusXP && !ergoChecks[key]) {
      onBonusXP(2);
    }
  };

  // Ergo points calculations
  const totalErgoChecks = Object.values(ergoChecks).filter(Boolean).length;
  const isErgoSafe = totalErgoChecks >= 7;

  // Render original weight chart
  const renderChart = () => {
    if (sortedLogsForChart.length < 2) {
      return (
        <div className="h-44 flex flex-col justify-center items-center bg-[#050505]/40 rounded-2xl border border-white/5 p-4 text-center">
          <TrendingDown className="w-8 h-8 text-[#BFBFBF]/40 mb-2" />
          <p className="text-xs text-[#BFBFBF]">Registra al menos 2 medidas en diferentes fechas para contrastar tus avances en el gráfico.</p>
        </div>
      );
    }

    const weights = sortedLogsForChart.map(l => l.weight);
    const minWeight = Math.min(...weights) - 1;
    const maxWeight = Math.max(...weights) + 1;
    const range = maxWeight - minWeight || 1;

    const width = 340;
    const height = 140;
    const paddingLeft = 32;
    const paddingTop = 15;
    const paddingBottom = 20;
    const paddingRight = 10;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    const points = sortedLogsForChart.map((log, index) => {
      const x = paddingLeft + (chartWidth * index) / (sortedLogsForChart.length - 1);
      const y = paddingTop + chartHeight - (chartHeight * (log.weight - minWeight)) / range;
      return { x, y, log, index };
    });

    let dPath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      dPath += ` L ${points[i].x} ${points[i].y}`;
    }

    const dAreaPath = `${dPath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

    return (
      <div className="bg-[#050505]/60 hover:bg-[#050505]/80 p-4 rounded-3xl border border-white/10 transition">
        <h4 className="text-xs font-mono text-[#A8E61D] font-bold uppercase tracking-widest mb-3 flex items-center justify-between">
          <span>CURVA DE EVOLUCIÓN PESO (KG)</span>
          <span className="text-[#BFBFBF]/50 text-[10px]">Total logs: {sortedLogsForChart.length}</span>
        </h4>
        <div className="relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A8E61D" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#A8E61D" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {[0, 0.5, 1].map((val, idx) => {
              const yValue = paddingTop + chartHeight * val;
              const weightVal = (maxWeight - val * range).toFixed(1);
              return (
                <g key={idx} className="opacity-20">
                  <line 
                    x1={paddingLeft} 
                    y1={yValue} 
                    x2={width - paddingRight} 
                    y2={yValue} 
                    stroke="#FFFFFF" 
                    strokeDasharray="4 4" 
                    strokeWidth="1"
                  />
                  <text 
                    x={paddingLeft - 6} 
                    y={yValue + 3} 
                    fill="#FFFFFF" 
                    fontSize="8" 
                    fontFamily="monospace" 
                    textAnchor="end"
                  >
                    {weightVal}
                  </text>
                </g>
              );
            })}

            <path d={dAreaPath} fill="url(#chartGlow)" />

            <path 
              d={dPath} 
              fill="none" 
              stroke="#A8E61D" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              strokeLinejoin="round" 
              className="drop-shadow-[0_0_8px_rgba(168,230,29,0.5)]"
            />

            {points.map((pt, i) => (
              <g key={i}>
                <circle 
                  cx={pt.x} 
                  cy={pt.y} 
                  r="5" 
                  fill="#050505" 
                  stroke="#D7FF5A" 
                  strokeWidth="2.5" 
                />
                <text 
                  x={pt.x} 
                  y={pt.y - 8} 
                  fill="#FFFFFF" 
                  fontSize="7" 
                  fontFamily="monospace" 
                  fontWeight="bold" 
                  textAnchor="middle"
                >
                  {pt.log.weight}
                </text>
                <text 
                  x={pt.x} 
                  y={height - 6} 
                  fill="#BFBFBF" 
                  fontSize="7" 
                  fontFamily="monospace" 
                  opacity="0.75" 
                  textAnchor="middle"
                >
                  {pt.log.date.substring(5)}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-24 text-white">
      {/* Target Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-mono font-bold text-[#A8E61D] uppercase tracking-widest">Biometría & Evolución</span>
          <h2 className="text-2xl font-bold font-sans">Registro de Progreso</h2>
        </div>
        
        {subTab === 'biometria' && (
          <button 
            onClick={() => setIsAddingMetric(!isAddingMetric)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition ${
              isAddingMetric 
                ? 'border-[#D7FF5A] bg-[#D7FF5A] text-black' 
                : 'border-[#A8E61D]/30 bg-white/5 text-[#A8E61D] hover:bg-white/10'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Medidas</span>
          </button>
        )}
      </div>

      {/* Segment switcher with 3 tabs inside Progreso screen */}
      <div className="flex bg-[#121212] p-1 rounded-2xl border border-white/5 w-full text-xs font-mono font-bold">
        <button
          onClick={() => setSubTab('biometria')}
          className={`flex-1 py-2 rounded-xl text-center transition ${
            subTab === 'biometria' ? 'bg-white/10 text-[#A8E61D]' : 'text-[#BFBFBF]/40 hover:text-white/80'
          }`}
        >
          Biometría
        </button>
        <button
          onClick={() => setSubTab('evaluacion')}
          className={`flex-1 py-2 rounded-xl text-center transition ${
            subTab === 'evaluacion' ? 'bg-white/10 text-[#A8E61D]' : 'text-[#BFBFBF]/40 hover:text-white/80'
          }`}
        >
          Test Postura
        </button>
        <button
          onClick={() => setSubTab('ergonomia')}
          className={`flex-1 py-2 rounded-xl text-center transition ${
            subTab === 'ergonomia' ? 'bg-white/10 text-[#A8E61D]' : 'text-[#BFBFBF]/40 hover:text-white/80'
          }`}
        >
          Setup Ergonómico
        </button>
      </div>

      {/* ---- SUB TAB 1: BIOMETRÍA ---- */}
      {subTab === 'biometria' && (
        <div className="space-y-6">
          {renderChart()}

          {/* Form collapse panel */}
          <AnimatePresence>
            {isAddingMetric && (
              <motion.form 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleSubmitMetric}
                className="p-5 bg-[#1A1A1A] border border-white/10 rounded-3xl space-y-4 overflow-hidden"
              >
                <div className="flex justify-between items-center pb-2 border-b border-white/5 font-mono">
                  <span className="text-xs font-bold text-[#D7FF5A] uppercase">REGISTRO DE HOY: {todayDateStr}</span>
                  <Scale className="w-4 h-4 text-[#A8E61D]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#BFBFBF] mb-1">Peso (kg) *</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="Ej. 78.4"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#A8E61D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#BFBFBF] mb-1">Cintura (cm)</label>
                    <input
                      type="number"
                      placeholder="Ej. 84"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#A8E61D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-[#BFBFBF] mb-1">Pecho (cm)</label>
                    <input
                      type="number"
                      placeholder="Ej. 102"
                      value={chest}
                      onChange={(e) => setChest(e.target.value)}
                      className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-2.5 py-2 text-xs outline-none focus:border-[#A8E61D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-[#BFBFBF] mb-1">Bíceps (cm)</label>
                    <input
                      type="number"
                      placeholder="Ej. 36"
                      value={biceps}
                      onChange={(e) => setBiceps(e.target.value)}
                      className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-2.5 py-2 text-xs outline-none focus:border-[#A8E61D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-[#BFBFBF] mb-1">Muslo (cm)</label>
                    <input
                      type="number"
                      placeholder="Ej. 58"
                      value={thighs}
                      onChange={(e) => setThighs(e.target.value)}
                      className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-2.5 py-2 text-xs outline-none focus:border-[#A8E61D]"
                    />
                  </div>
                </div>

                {/* Real photo upload trigger */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase text-[#BFBFBF] mb-1">FOTO DE PROGRESO</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="file-progress-photo"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label 
                      htmlFor="file-progress-photo"
                      className="flex items-center gap-2 cursor-pointer bg-[#050505]/50 hover:bg-[#050505]/80 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono font-bold text-[#A8E61D] transition shrink-0"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Subir Foto</span>
                    </label>

                    {photo ? (
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        <img src={photo} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <button 
                          type="button" 
                          onClick={() => setPhoto(null)} 
                          className="absolute inset-x-0 bottom-0 bg-red-600/80 text-[8px] py-0.5 text-center text-white cursor-pointer font-bold leading-none bg-red-650"
                        >
                          Borr
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-[#BFBFBF]/50 italic font-mono truncate">Ningún archivo cargado...</span>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#BFBFBF] mb-1">Notas Personales & Estado Anímico</label>
                  <textarea
                    placeholder="Ej. Me sentí super fuerte hoy, bajando carbos..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none resize-none focus:border-[#A8E61D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#A8E61D] hover:bg-[#7BCB14] text-black font-bold uppercase text-xs rounded-xl shadow-lg transition"
                >
                  Registrar Evolución (+30 XP)
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Photograph comparison grid */}
          {logs.some(l => l.photo) && (
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-[#BFBFBF]/80 uppercase tracking-widest ml-1">MIS FOTOGRAFÍAS DE EVOLUCIÓN</h3>
              <div className="grid grid-cols-3 gap-2">
                {sortedLogsForList.filter(l => l.photo).map((log) => (
                  <div key={log.id} className="relative aspect-square bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden group">
                    <img src={log.photo} alt={`Progreso ${log.date}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-x-0 bottom-0 bg-[#050505]/80 p-1.5 text-center transition">
                      <span className="text-[9px] font-mono font-bold text-[#A8E61D] block">{log.date}</span>
                      <span className="text-[8px] text-[#BFBFBF] font-mono block">{log.weight} kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History list entries */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono font-bold text-[#BFBFBF]/80 uppercase tracking-widest ml-1">HISTORIAL BIOMÉTRICO</h3>
            {sortedLogsForList.length === 0 ? (
              <div className="text-center bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
                <Scale className="w-8 h-8 text-[#A8E61D]/20 mx-auto mb-2" />
                <p className="text-xs text-[#BFBFBF]">No has registrado tu peso todavía. Empieza ahora.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedLogsForList.map((log) => (
                  <div 
                    key={log.id}
                    className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/5 flex flex-col justify-between hover:border-white/10 transition"
                  >
                    <div className="flex justify-between items-start pb-2 border-b border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#A8E61D]" />
                        <span className="text-xs font-mono font-bold tracking-tight text-[#D7FF5A]">{log.date}</span>
                      </div>
                      
                      <button 
                        onClick={() => onDeleteLog(log.id)}
                        className="p-1 text-white/30 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2 py-3 text-center">
                      <div className="bg-[#050505]/40 p-1.5 rounded-lg border border-white/5">
                        <span className="text-[8px] text-[#BFBFBF] font-mono uppercase block leading-none mb-1">Peso</span>
                        <span className="text-xs font-bold font-mono text-[#A8E61D]">{log.weight} kg</span>
                      </div>
                      <div className="bg-[#050505]/40 p-1.5 rounded-lg border border-white/5">
                        <span className="text-[8px] text-[#BFBFBF] font-mono uppercase block leading-none mb-1">Cintura</span>
                        <span className="text-xs font-bold font-mono text-white">{log.waist ? `${log.waist}cm` : '--'}</span>
                      </div>
                      <div className="bg-[#050505]/40 p-1.5 rounded-lg border border-white/5">
                        <span className="text-[8px] text-[#BFBFBF] font-mono uppercase block leading-none mb-1">Pecho</span>
                        <span className="text-xs font-bold font-mono text-white">{log.chest ? `${log.chest}cm` : '--'}</span>
                      </div>
                      <div className="bg-[#050505]/40 p-1.5 rounded-lg border border-white/5">
                        <span className="text-[8px] text-[#BFBFBF] font-mono uppercase block leading-none mb-1">Bíceps</span>
                        <span className="text-xs font-bold font-mono text-white">{log.biceps ? `${log.biceps}cm` : '--'}</span>
                      </div>
                    </div>

                    {log.notes && (
                      <div className="bg-[#050505]/20 p-2.5 rounded-xl border border-white/5 text-[11px] leading-relaxed text-[#BFBFBF] flex gap-1.5 items-start mt-1">
                        <FileText className="w-3.5 h-3.5 text-[#D7FF5A] shrink-0 mt-0.5" />
                        <span>{log.notes}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---- SUB TAB 2: DIAGNÓSTICO POSTURAL ---- */}
      {subTab === 'evaluacion' && (
        <div className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-[#1A1A1A] to-[#121212] rounded-3xl border border-white/10 space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A8E61D] bg-[#A8E61D]/10 px-2.5 py-0.5 rounded-full border border-[#A8E61D]/20 inline-block">
              Análisis Biomecánico
            </span>
            <h3 className="text-xl font-bold font-sans tracking-tight text-[#D7FF5A]">Test Corporal Interactivo</h3>
            <p className="text-xs text-[#BFBFBF]/80 leading-relaxed">
              Mide objetivamente el estado y simetría de tus cadenas musculares. Repite cada 14 días para registrar avances visuales.
            </p>
          </div>

          {/* Test 1: Test de Pared */}
          <div className="p-4 bg-[#1A1A1A] rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 flex items-center justify-center bg-[#A8E61D] text-black font-mono font-bold text-[10px] rounded-full">1</span>
              <h4 className="text-sm font-bold font-sans text-white">TEST DE PARED (30 Segundos)</h4>
            </div>
            <p className="text-xs text-[#BFBFBF] leading-relaxed">
              Ponte de pie con la espalda y los talones contra una pared recta (talones, glúteos, omóplatos y cabeza en contacto) y marca las zonas que apoyas cómodamente:
            </p>

            <div className="space-y-2 pt-2">
              {[
                { label: 'Pies: ¿Los talones tocan cómodamente?', checked: wall_pies, set: setWallPies },
                { label: 'Glúteos: ¿Tocan la pared sin esfuerzo?', checked: wall_gluteos, set: setWallGluteos },
                { label: 'Omóplatos: ¿Tocan de forma natural (sin forzar)?', checked: wall_omoplatos, set: setWallOmoplatos },
                { label: 'Cabeza: ¿Toca la pared sin levantar el mentón?', checked: wall_cabeza, set: setWallCabeza },
                { label: 'Lumbar: ¿El hueco lumbar cabe solo una mano (adecuado)?', checked: wall_lumbar, set: setWallLumbar }
              ].map((item, idx) => (
                <label key={idx} className="flex gap-3 items-center bg-[#050505]/40 p-3 rounded-xl border border-white/5 cursor-pointer hover:border-white/10 transition">
                  <input 
                    type="checkbox" 
                    checked={item.checked} 
                    onChange={() => item.set(!item.checked)}
                    className="w-4.5 h-4.5 accent-[#A8E61D] rounded cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-[#BFBFBF] selection:bg-transparent">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Test 2: Test del Espejo Lateral */}
          <div className="p-4 bg-[#1A1A1A] rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 flex items-center justify-center bg-[#A8E61D] text-black font-mono font-bold text-[10px] rounded-full">2</span>
              <h4 className="text-sm font-bold font-sans text-white">TEST DEL ESPEJO LATERAL</h4>
            </div>
            <p className="text-xs text-[#BFBFBF] leading-relaxed">
              De perfil frente al espejo. Imagina una línea vertical perfecta desde el tobillo. Selecciona los puntos de alineamiento rectos:
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
              {[
                { label: 'Oreja alineada', checked: mirror_oreja, set: setMirrorOreja },
                { label: 'Hombro alineado', checked: mirror_hombro, set: setMirrorHombro },
                { label: 'Cadera alineada', checked: mirror_cadera, set: setMirrorCadera },
                { label: 'Rodilla alineada', checked: mirror_rodilla, set: setMirrorRodilla },
                { label: 'Tobillo alineado', checked: mirror_tobillo, set: setMirrorTobillo }
              ].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => item.set(!item.checked)}
                  type="button"
                  className={`p-2.5 rounded-xl border text-left transition duration-75 flex items-center justify-between ${
                    item.checked 
                      ? 'border-[#A8E61D] bg-[#A8E61D]/10 text-white' 
                      : 'border-white/5 bg-[#050505]/20 text-[#BFBFBF]/60 hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.checked ? <Check className="w-3.5 h-3.5 text-[#A8E61D]" /> : <div className="w-3.5 h-3.5 border border-white/20 rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          {/* Evaluar trigger */}
          <div className="pt-2 text-center">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleScorePostureTest}
              className="w-full py-4 bg-gradient-to-r from-[#A8E61D] to-[#7BCB14] rounded-2xl text-black font-extrabold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black text-black" />
              Guardar Evaluación Postural (+30 XP)
            </motion.button>
          </div>

          {/* Result panel */}
          <AnimatePresence>
            {testResult && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 bg-gradient-to-br from-[#1E2912] to-[#121212] border-2 border-[#A8E61D]/40 rounded-3xl space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono uppercase bg-[#A8E61D]/20 text-[#A8E61D] px-2.5 py-0.5 rounded-full border border-[#A8E61D]/20">
                      DIAGNÓSTICO OBTENIDO
                    </span>
                    <h4 className="text-lg font-bold font-sans text-white mt-1 uppercase">
                      {testResult.classification === 'excelente' && 'Postura Excelente 🟢'}
                      {testResult.classification === 'buena' && 'Postura Buena 🟡'}
                      {testResult.classification === 'compensada' && 'Postura Compensada 🔴'}
                    </h4>
                  </div>
                  <span className="text-3xl font-mono font-bold text-[#A8E61D]">{testResult.wallScoreCount}/5</span>
                </div>

                <div className="text-xs text-[#BFBFBF] leading-relaxed space-y-2">
                  {testResult.classification === 'excelente' && (
                    <p>¡Buenísimo! Tienes una alineación muscular y articular de élite. Cumples el 100% de los apoyos. Solo requieres de entrenamiento reactivo para sostenerla.</p>
                  )}
                  {testResult.classification === 'buena' && (
                    <p>Muy buen estado inicial, pero tienes ligeras compensaciones. Las zonas no marcadas indican retracciones sutiles en espalda alta o cadena posterior. Incorporar sesiones semanales de <strong>Postura Perfecta</strong> evitará futuras rigideces mecánicas.</p>
                  )}
                  {testResult.classification === 'compensada' && (
                    <p>Se observan tensiones elevadas y acortamiento anterior. Las posturas sentadas de 8 horas están bloqueando tus glúteos y adelantando tu cabeza. Es prioritario que comiences la rutina de 3 días y programes <strong>Pausas Activas</strong> horarias.</p>
                  )}
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] font-mono text-[#BFBFBF]">
                  <span>Guardado en historial de progreso</span>
                  <button 
                    onClick={() => setTestResult(null)}
                    className="text-[#A8E61D] underline hover:text-[#D7FF5A]"
                  >
                    Entendido
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Past Evaluations list */}
          {postureHistory.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#BFBFBF]/60 uppercase tracking-widest ml-1">HISTORIAL DE EVALUACIONES</h3>
              <div className="space-y-2">
                {postureHistory.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-[#1A1A1A] border border-white/5 px-4 py-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        item.classification === 'excelente' ? 'bg-emerald-500' : item.classification === 'buena' ? 'bg-amber-400' : 'bg-rose-500'
                      }`} />
                      <div>
                        <span className="text-xs font-bold text-white uppercase block leading-none">
                          {item.classification === 'excelente' ? 'Excelente' : item.classification === 'buena' ? 'Buena' : 'Compensada'}
                        </span>
                        <span className="text-[9px] text-[#BFBFBF]/60 font-mono mt-0.5 block">{item.date}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#A8E61D] bg-[#A8E61D]/10 px-2.5 py-0.5 rounded-xl border border-[#A8E61D]/20">
                      Score: {item.wallScoreCount}/5
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---- SUB TAB 3: SETUP ERGONÓMICO ---- */}
      {subTab === 'ergonomia' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#121212] border border-white/10 rounded-3xl relative overflow-hidden space-y-2">
            <div className="absolute -right-4 -bottom-4 text-[#A8E61D]/5 rotate-12 pointer-events-none">
              <Monitor className="w-24 h-24" />
            </div>

            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-mono text-[#A8E61D] bg-[#A8E61D]/10 px-2 py-0.5 rounded-md border border-[#A8E61D]/20 font-bold">
                Ergonomía de Soporte
              </span>
              <span className="text-sm font-mono font-bold text-white">{totalErgoChecks} / 11 completos</span>
            </div>
            
            <h3 className="text-xl font-bold font-sans tracking-tight text-[#D7FF5A]">Workspace Setup</h3>
            <p className="text-xs text-[#BFBFBF]/80 leading-relaxed">
              Mapea la ergonomía de tu puesto de trabajo. Pasar de 8 a 12 horas en malas posturas genera daños irreparables que ningún entrenamiento puede compensar por completo.
            </p>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span>ESTADO DEL ENTORNO:</span>
                <span className={`font-bold uppercase px-3 py-1 rounded-full text-[9px] tracking-wider ${
                  isErgoSafe 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {isErgoSafe ? 'Apto (Seguro)' : 'Mala Ergonomía (>4 rigideces)'}
                </span>
              </div>
            </div>
          </div>

          {/* Structured checklist cards */}
          <div className="space-y-4">
            {/* 1. Pantalla */}
            <div className="p-4 bg-[#1A1A1A] border border-white/5 rounded-3xl space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#A8E61D] font-bold block mb-1">PANTALLA</span>
              <div className="space-y-2.5">
                {[
                  { label: 'La parte superior está exactamente a la altura de tus ojos.', key: 'screenHeight' },
                  { label: 'Distancia entre ojos y pantalla es de un brazo extendido (50-70 cm).', key: 'screenDistance' },
                  { label: 'Ubicación perpendicular a las ventanas (evitando reflejos o sombras duras).', key: 'screenWidth' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleErgo(item.key as keyof ErgonomicsState)}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-900 transition selection:bg-transparent"
                  >
                    <div className={`w-4.5 h-4.5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      ergoChecks[item.key as keyof ErgonomicsState] 
                        ? 'bg-[#A8E61D] border-[#A8E61D] text-black' 
                        : 'border-white/20'
                    }`}>
                      {ergoChecks[item.key as keyof ErgonomicsState] && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    </div>
                    <span className="text-xs text-[#BFBFBF]/90 leading-relaxed">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Silla */}
            <div className="p-4 bg-[#1A1A1A] border border-white/5 rounded-3xl space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#A8E61D] font-bold block mb-1">SILLA</span>
              <div className="space-y-2.5">
                {[
                  { label: 'La altura permite apoyar los pies completamente firmes en el suelo.', key: 'chairFeet' },
                  { label: 'Las rodillas descansan a 90° (caderas al nivel o sutilmente más altas).', key: 'chairKnees' },
                  { label: 'El respaldo soporta tu lumbar superior/inferior de forma natural.', key: 'chairBack' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleErgo(item.key as keyof ErgonomicsState)}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-900 transition selection:bg-transparent"
                  >
                    <div className={`w-4.5 h-4.5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      ergoChecks[item.key as keyof ErgonomicsState] 
                        ? 'bg-[#A8E61D] border-[#A8E61D] text-black' 
                        : 'border-white/20'
                    }`}>
                      {ergoChecks[item.key as keyof ErgonomicsState] && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    </div>
                    <span className="text-xs text-[#BFBFBF]/90 leading-relaxed">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Teclado y Mouse */}
            <div className="p-4 bg-[#1A1A1A] border border-white/5 rounded-3xl space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#A8E61D] font-bold block mb-1">TECLADO Y MOUSE</span>
              <div className="space-y-2.5">
                {[
                  { label: 'Los codos descansan relajados a 90° (o sutilmente más abiertos).', key: 'elbowAngle' },
                  { label: 'Las muñecas permanecen rectas, sin doblarse arriba ni abajo.', key: 'wristFlat' },
                  { label: 'El mouse descansa cercano y a la misma altura del teclado.', key: 'mouseClose' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleErgo(item.key as keyof ErgonomicsState)}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-900 transition selection:bg-transparent"
                  >
                    <div className={`w-4.5 h-4.5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      ergoChecks[item.key as keyof ErgonomicsState] 
                        ? 'bg-[#A8E61D] border-[#A8E61D] text-black' 
                        : 'border-white/20'
                    }`}>
                      {ergoChecks[item.key as keyof ErgonomicsState] && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    </div>
                    <span className="text-xs text-[#BFBFBF]/90 leading-relaxed">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Iluminación */}
            <div className="p-4 bg-[#1A1A1A] border border-white/5 rounded-3xl space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#A8E61D] font-bold block mb-1">ILUMINACIÓN & CONFORT</span>
              <div className="space-y-2.5">
                {[
                  { label: 'Luz natural predominante u oscilación suave detrás de la pantalla.', key: 'lightingClean' },
                  { label: 'Puestos sin reflejos indeseados directamente sobre el monitor.', key: 'glareFree' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleErgo(item.key as keyof ErgonomicsState)}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-900 transition selection:bg-transparent"
                  >
                    <div className={`w-4.5 h-4.5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      ergoChecks[item.key as keyof ErgonomicsState] 
                        ? 'bg-[#A8E61D] border-[#A8E61D] text-black' 
                        : 'border-white/20'
                    }`}>
                      {ergoChecks[item.key as keyof ErgonomicsState] && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    </div>
                    <span className="text-xs text-[#BFBFBF]/90 leading-relaxed">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* High premium info card reminding critical message from ebook */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block leading-none">NOTA ERGONÓMICA CLAVE</span>
              <p className="text-[11px] leading-relaxed text-[#BFBFBF]">
                Si no cumples al menos 7 puntos de esta checklist, recuerda: ningún ejercicio logrará neutralizar completamente e impedir el letargo y la mala postura provocados por 8 horas diarias de mala ergonomía laboral. ¡Optimiza tu ambiente!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
