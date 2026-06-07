/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Habit, Achievement } from './types';

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'h1',
    name: 'Hidratación óptima (3L)',
    icon: 'Droplet',
    frequency: 'diario',
    completedDates: [],
    category: 'water'
  },
  {
    id: 'h2',
    name: 'Entrenamiento del día',
    icon: 'Dumbbell',
    frequency: 'diario',
    completedDates: [],
    category: 'exercise'
  },
  {
    id: 'h3',
    name: 'Nutrición Premium (Proteína limpia)',
    icon: 'Flame',
    frequency: 'diario',
    completedDates: [],
    category: 'nutrition'
  },
  {
    id: 'h4',
    name: 'Descanso regenerador (7-8 hs)',
    icon: 'Moon',
    frequency: 'diario',
    completedDates: [],
    category: 'rest'
  },
  {
    id: 'h5',
    name: 'Estiramiento y Movilidad',
    icon: 'Sparkles',
    frequency: 'diario',
    completedDates: [],
    category: 'custom'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'Primer Paso',
    description: 'Comienza tu viaje completando tu primer día de registro o hábito.',
    icon: 'Flag',
    category: 'habit',
    requirementType: 'first_day',
    unlocked: false
  },
  {
    id: 'a2',
    title: 'Hierro Forjado',
    description: 'Completa tu primer entrenamiento funcional en la aplicación.',
    icon: 'Dumbbell',
    category: 'workout',
    requirementType: 'first_workout',
    unlocked: false
  },
  {
    id: 'a3',
    title: 'Constancia Inicial (7 Días)',
    description: 'Mantén una racha de hábitos o registros de 7 días consecutivos.',
    icon: 'Award',
    category: 'streak',
    requirementType: 'streak_7',
    unlocked: false
  },
  {
    id: 'a4',
    title: 'Hábito de Acero (14 Días)',
    description: 'Alcanza una racha excepcional de 14 días activos consecutivos.',
    icon: 'Zap',
    category: 'streak',
    requirementType: 'streak_14',
    unlocked: false
  },
  {
    id: 'a5',
    title: 'Transformación Legendaria (30 Días)',
    description: 'Logra el máximo compromiso de 30 días seguidos liderando tu progreso.',
    icon: 'Trophy',
    category: 'streak',
    requirementType: 'streak_30',
    unlocked: false
  },
  {
    id: 'a6',
    title: 'Meta Semanal de Hábitos',
    description: 'Logra completar al menos el 80% de tus hábitos en una semana.',
    icon: 'TrendingUp',
    category: 'habit',
    requirementType: 'weekly_goal',
    unlocked: false
  },
  {
    id: 'a7',
    title: 'Elite de Profit Fitness',
    description: 'Completa etapas hasta alcanzar la Etapa 5: INTEGRAR.',
    icon: 'Crown',
    category: 'level',
    requirementType: 'level_elite',
    unlocked: false
  }
];

export interface Exercise {
  name: string;
  series: string;
  reps: string;
  rest: string;
  description: string;
}

export interface Routine {
  dayName: string;
  routineName: string;
  focus: string;
  estCalories: number;
  estDurationMinutes: number;
  exercises: Exercise[];
}

export const ROUTINES_BY_DAY: Record<number, Routine> = {
  // 0 is Sunday, 1 is Monday ...
  1: {
    dayName: 'Lunes',
    routineName: 'Empuje Brutal & Pecho',
    focus: 'Fuerza e hipertrofia de empuje: Pectorales, Hombros y Tríceps',
    estCalories: 450,
    estDurationMinutes: 45,
    exercises: [
      { name: 'Press de Banca Plano con Barra', series: '4', reps: '8-10', rest: '90s', description: 'Centrado en reclutamiento de fibras pectorales mayores.' },
      { name: 'Press Militar con Mancuernas de Pie', series: '4', reps: '10', rest: '95s', description: 'Estabilidad de zona media y hombro potente.' },
      { name: 'Aperturas Inclinadas con Mancuerna', series: '3', reps: '12', rest: '75s', description: 'Glow en porción clavicular del pectoral.' },
      { name: 'Fondos de Tríceps en Paralelas', series: '3', reps: 'Fallo - 2', rest: '75s', description: 'Grave reclutamiento de tríceps y porción inferior.' },
      { name: 'Extensiones de Tríceps en Polea Alta', series: '3', reps: '15', rest: '60s', description: 'Enfoque en cabeza larga, contracción máxima y sostenida.' }
    ]
  },
  2: {
    dayName: 'Martes',
    routineName: 'Tracción Imparable & Espalda',
    focus: 'Espalda Superior, Dorsal Ancho, Bíceps y Antebrazos',
    estCalories: 480,
    estDurationMinutes: 50,
    exercises: [
      { name: 'Dominadas Pronas o Jalón al Pecho', series: '4', reps: '8-12', rest: '90s', description: 'Fuerza vertical y amplitud de la espalda.' },
      { name: 'Remo con Barra Recta', series: '4', reps: '8', rest: '90s', description: 'Grosor de espalda media y reclutamiento de trapecios.' },
      { name: 'Pull-Over con Polea Alta (Cuerda)', series: '3', reps: '12-15', rest: '75s', description: 'Aislamiento dorsal, tensión continua extrema.' },
      { name: 'Curl de Bíceps Alterno con Mancuerna', series: '3', reps: '10-12', rest: '75s', description: 'Bíceps braquial con supinación al tope.' },
      { name: 'Martillo en Banco Inclinado', series: '3', reps: '12', rest: '60s', description: 'Braquiorradial y volumen lateral del brazo.' }
    ]
  },
  3: {
    dayName: 'Miércoles',
    routineName: 'Tren Inferior Supremo',
    focus: 'Cuádriceps, Femorales, Glúteos y Pantorrillas',
    estCalories: 550,
    estDurationMinutes: 55,
    exercises: [
      { name: 'Sentadilla Libre con Barra Back squat', series: '4', reps: '8', rest: '120s', description: 'Ejercicio rey para desarrollo masivo de tren inferior.' },
      { name: 'Prensa Atlética de Piernas 45°', series: '4', reps: '10-12', rest: '90s', description: 'Maximiza el estímulo de cuádriceps de forma segura.' },
      { name: 'Peso Muerto Rumano con Mancuernas', series: '3', reps: '10', rest: '90s', description: 'Estiramiento profundo de femorales y glúteos.' },
      { name: 'Extensiones de Cuádriceps en Máquina', series: '3', reps: '15 (Glow tempo)', rest: '60s', description: 'Bombeo de hipertrofia concentrada.' },
      { name: 'Elevación de Talones de Pie', series: '4', reps: '20', rest: '60s', description: 'Resistencia e hipertrofia del tríceps sural.' }
    ]
  },
  4: {
    dayName: 'Jueves',
    routineName: 'Potencia de Core & Cardio HIIT',
    focus: 'Abdomen, Core Profundo y Capacidad Cardiorrespiratoria',
    estCalories: 420,
    estDurationMinutes: 40,
    exercises: [
      { name: 'Plancha Abdominal con Toques de Hombro', series: '3', reps: '45s', rest: '60s', description: 'Resistencia isométrica y antirotación de core.' },
      { name: 'Rueda Abdominal o Ab Wheel Rollout', series: '3', reps: '10-12', rest: '75s', description: 'Extensión excéntrica máxima de la pared abdominal.' },
      { name: 'Elevaciones de Piernas Colgado', series: '4', reps: '12', rest: '60s', description: 'Abdomen bajo y flexores de la cadera.' },
      { name: 'Giros Rusos con Peso de Disco', series: '3', reps: '30 segs', rest: '45s', description: 'Glow en oblicuos y rotaciones controladas.' },
      { name: 'Intervalos HIIT en Cinta de Correr', series: '1', reps: '15 mins', rest: 'Cardio', description: 'Alternar 45s de sprint explosivo con 45s de caminata ligera.' }
    ]
  },
  5: {
    dayName: 'Viernes',
    routineName: 'Escultura de Hombros & Brazos',
    focus: 'Hipertrofia de Deltoides y Brazos Completos',
    estCalories: 430,
    estDurationMinutes: 45,
    exercises: [
      { name: 'Press de Hombros Sentado con Mancuernas', series: '4', reps: '10', rest: '90s', description: 'Construcción de hombros estilo bento.' },
      { name: 'Elevaciones Laterales con Cable o Polea', series: '4', reps: '15', rest: '60s', description: 'Cabeza lateral del deltoides con tensión continua.' },
      { name: 'Pájaros con Mancuernas (Arrodillado)', series: '3', reps: '15', rest: '60s', description: 'Deltoides posterior para lograr hombros tridimensionales.' },
      { name: 'Super-Set: Curl Polea + Tríceps Cuerda', series: '3', reps: '12 + 12', rest: '75s', description: 'Bombeo extremo conjunto de bíceps y tríceps.' },
      { name: 'Curl de Bíceps Concentrado', series: '3', reps: '10', rest: '60s', description: 'Cisne y pico de bíceps aislado al fallo.' }
    ]
  },
  6: {
    dayName: 'Sábado',
    routineName: 'Full-Body Acondicionamiento',
    focus: 'Rutina híbrida completa de fuerza y explosividad',
    estCalories: 520,
    estDurationMinutes: 50,
    exercises: [
      { name: 'Zancadas Dinámicas Caminando con Peso', series: '3', reps: '20 pasos', rest: '90s', description: 'Fuerza unilateral de cuádriceps e isquios.' },
      { name: 'Flexiones de Brazo con Deficit', series: '3', reps: 'Max Reps', rest: '75s', description: 'Estimulación pectoral, tríceps y serrato.' },
      { name: 'Remo Alterno con Mancuerna (Serrucho)', series: '3', reps: '12 por lado', rest: '75s', description: 'Asimetrías musculares corregidas en espalda.' },
      { name: 'Kettlebell swings explosivo', series: '3', reps: '20', rest: '60s', description: 'Bisagra de cadera explosiva y acondicionamiento.' },
      { name: 'Plancha Lateral Activa', series: '3', reps: '30s c/u', rest: '45s', description: 'Estabilización lateral cuadradolumbar.' }
    ]
  },
  0: {
    dayName: 'Domingo',
    routineName: 'Descanso Activo / Regeneración',
    focus: 'Recuperación muscular total, movilidad articular y estiramientos',
    estCalories: 150,
    estDurationMinutes: 30,
    exercises: [
      { name: 'Caminata Ligera al Aire Libre', series: '1', reps: '20 mins', rest: 'Libre', description: 'Promueve el flujo sanguíneo y recuperación activa del cuerpo.' },
      { name: 'Movilidad Completa de Cadera (90-90)', series: '3', reps: '10', rest: '30s', description: 'Libera tensión en caderas y zona lumbar.' },
      { name: 'Estiramiento del Gato - Camello (Core)', series: '3', reps: '12 ciclos', rest: '30s', description: 'Flexibilidad y descompresión de columna vertebral.' },
      { name: 'Postura del Niño (Childs Pose) Profunda', series: '2', reps: '60 segs', rest: '60s', description: 'Estiramiento relajante de hombros, espalda larga y respiración.' }
    ]
  }
};

export function getXPForLevel(lvl: number): number {
  if (lvl <= 1) return 200;
  if (lvl === 2) return 600;
  if (lvl === 3) return 1200;
  if (lvl === 4) return 2200;
  if (lvl === 5) return 3500;
  return Infinity;
}

export function getLevelName(lvl: number): string {
  switch (lvl) {
    case 1: return 'PREPARAR';
    case 2: return 'RUTINAR';
    case 3: return 'ORGANIZAR';
    case 4: return 'FORTALECER';
    case 5: return 'INTEGRAR';
    case 6: return 'TRANSFORMAR';
    default: return 'PREPARAR';
  }
}
