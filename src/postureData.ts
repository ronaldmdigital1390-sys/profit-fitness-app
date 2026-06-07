/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PostureExercise {
  id: string;
  name: string;
  category: 'postura_alta' | 'core_funcional' | 'gluteos_despiertos' | 'flexibilidad';
  series: string;
  reps: string;
  rest: string;
  description: string;
}

export interface PostureRoutine {
  day: number; // 1, 2, 3 representing posture routine sessions
  title: string;
  focus: string;
  durationMinutes: number;
  warmup: string;
  exercises: PostureExercise[];
  cooldown: string;
}

export const POSTURE_EXERCISES: Record<string, PostureExercise> = {
  ex1: {
    id: 'ex1',
    name: 'Retracción Escapular de Pie',
    category: 'postura_alta',
    series: '3',
    reps: '12',
    rest: '30s',
    description: 'De pie, brazos a los lados, pulgares apuntando hacia atrás. Junta los omóplatos como si quisieras agarrar un lápiz entre ellos. Mantén por 3 segundos y suelta lentamente.'
  },
  ex2: {
    id: 'ex2',
    name: 'Superman al Suelo',
    category: 'postura_alta',
    series: '3',
    reps: '10',
    rest: '45s',
    description: 'Boca abajo, brazos extendidos al frente, piernas estiradas. Eleva al mismo tiempo brazos, pecho y piernas pocos centímetros del suelo. Aprieta glúteos y mantén por 2 segundos antes de bajar controlado.'
  },
  ex3: {
    id: 'ex3',
    name: 'Aperturas con Banda Elástica',
    category: 'postura_alta',
    series: '3',
    reps: '12',
    rest: '30s',
    description: 'De pie, banda al frente con manos al ancho de hombros. Abre los brazos hacia los lados manteniéndolos rectos y tensionando la banda.'
  },
  ex4: {
    id: 'ex4',
    name: 'Y-T-W en el Suelo',
    category: 'postura_alta',
    series: '3',
    reps: '8 por letra',
    rest: '45s',
    description: 'Boca abajo, eleva los brazos del suelo formando una "Y" (2 seg de retención), luego en "T" (brazos a los lados) y finalmente en "W" (codos flexionados).'
  },
  ex5: {
    id: 'ex5',
    name: 'Estiramiento del Cuello Lateral',
    category: 'postura_alta',
    series: '3 por lado',
    reps: '30s holding',
    rest: 'Sin descanso',
    description: 'Sentada o sentado, lleva la oreja al hombro del mismo lado con la ayuda de la mano. Mantén 30 segundos respirando profundo. Cambia de lado.'
  },
  ex6: {
    id: 'ex6',
    name: 'Dead Bug (Bicho Muerto)',
    category: 'core_funcional',
    series: '3',
    reps: '10 por lado',
    rest: '45s',
    description: 'Acuéstate boca arriba, brazos al techo, piernas dobladas en 95 grados. Estira el brazo derecho hacia atrás mientras estiras la pierna izquierda hacia adelante sin tocar el suelo. Vuelve al centro y cambia.'
  },
  ex7: {
    id: 'ex7',
    name: 'Bird-Dog (Perro Pájaro)',
    category: 'core_funcional',
    series: '3',
    reps: '10 por lado',
    rest: '45s',
    description: 'En 4 apoyos, estira al mismo tiempo brazo derecho al frente y pierna izquierda hacia atrás. Mantén por 3 segundos, regresa controlado y alterna del otro lado.'
  },
  ex8: {
    id: 'ex8',
    name: 'Plancha Lateral',
    category: 'core_funcional',
    series: '3 por lado',
    reps: '20-30s hold',
    rest: '30s',
    description: 'De lado, apoya el antebrazo en el suelo y eleva la cadera formando una línea recta de talón a hombro. Mantén la postura alineada.'
  },
  ex9: {
    id: 'ex9',
    name: 'Hollow Hold',
    category: 'core_funcional',
    series: '3',
    reps: '20s hold',
    rest: '45s',
    description: 'Boca arriba, brazos extendidos, piernas elevadas pocos centímetros del suelo formando una "U" suave. Clave: mantén la zona lumbar pegada al suelo en todo momento.'
  },
  ex10: {
    id: 'ex10',
    name: 'Paloff Press con Banda',
    category: 'core_funcional',
    series: '3',
    reps: '10 por lado',
    rest: '45s',
    description: 'Banda amarrada a la altura del pecho. Da un paso lateral para tensar la banda. Estira los brazos al frente evitando rotar el torso contra la resistencia.'
  },
  ex11: {
    id: 'ex11',
    name: 'Puente de Glúteos',
    category: 'gluteos_despiertos',
    series: '3',
    reps: '15',
    rest: '45s',
    description: 'Boca arriba, rodillas dobladas, pies firmes. Eleva la cadera apretando glúteos hasta linear hombros a rodillas. Sostén 2 segundos arriba antes de bajar.'
  },
  ex12: {
    id: 'ex12',
    name: 'Clam Shell (Almeja)',
    category: 'gluteos_despiertos',
    series: '3',
    reps: '15 por lado',
    rest: '30s',
    description: 'De lado, rodillas a 90 grados, pies juntos. Abre la rodilla superior como una almeja sin rotar la pelvis. Usa banda si es posible.'
  },
  ex13: {
    id: 'ex13',
    name: 'Monster Walk con Banda',
    category: 'gluteos_despiertos',
    series: '3',
    reps: '10 pasos c/ lado',
    rest: '45s',
    description: 'Banda por encima de rodillas o tobillos. En media sentadilla, da 10 pasos laterales hacia la derecha y luego 10 pasos hacia la izquierda.'
  },
  ex14: {
    id: 'ex14',
    name: 'Patada de Glúteo en 4 Apoyos',
    category: 'gluteos_despiertos',
    series: '3',
    reps: '15 por pierna',
    rest: '30s',
    description: 'En 4 apoyos, eleva una pierna manteniendo la rodilla a 90 grados. Lleva el talón hacia el techo apretando glúteo arriba.'
  },
  ex15: {
    id: 'ex15',
    name: 'Sentadilla Sumo con Resistencia',
    category: 'gluteos_despiertos',
    series: '3',
    reps: '15',
    rest: '60s',
    description: 'Pies más anchos que hombros, puntas hacia afuera. Banda por encima de rodillas para resistir. Baja en sentadilla profunda abriendo rodillas.'
  },
  ex16: {
    id: 'ex16',
    name: 'Apertura de Cadera con Rodilla al Suelo',
    category: 'flexibilidad',
    series: '3 por lado',
    reps: '30s holding',
    rest: 'Sin desc',
    description: 'Zancada, rodilla trasera apoyada en suelo. Empuja cadera adelante para estirar el psoas de la pierna trasera.'
  },
  ex17: {
    id: 'ex17',
    name: 'Estiramiento Gato-Vaca',
    category: 'flexibilidad',
    series: '2',
    reps: '10 ciclos',
    rest: '30s',
    description: 'En 4 apoyos, inhala mientras arqueas la columna hacia abajo mirando al techo (vaca), exhala curvanado hacia arriba metiendo la cabeza (gato).'
  },
  ex18: {
    id: 'ex18',
    name: 'Estiramiento de Pecho en Puerta',
    category: 'flexibilidad',
    series: '3',
    reps: '30s hold',
    rest: 'Sin desc',
    description: 'De pie en puerta, brazos abiertos apoyados a la altura de hombros, da un paso al frente sintiendo estiramiento en pectorales.'
  },
  ex19: {
    id: 'ex19',
    name: 'Estiramiento Isquiotibiales Sentado',
    category: 'flexibilidad',
    series: '3',
    reps: '30s hold',
    rest: 'Sin desc',
    description: 'Sentado en el suelo, una pierna estirada, otra doblada hacia dentro. Flexiona cadera al frente manteniendo espalda recta.'
  },
  ex20: {
    id: 'ex20',
    name: 'Postura del Niño',
    category: 'flexibilidad',
    series: '2',
    reps: '1 minuto',
    rest: '30s',
    description: 'De rodillas, siéntate sobre talones, inclínate extendiendo brazos al frente contra el suelo. Respira hondo desatando tensión lumbar.'
  }
};

export const POSTURE_ROUTINES: PostureRoutine[] = [
  {
    day: 1,
    title: 'Postura Alta + Flexibilidad',
    focus: 'Ideal para lunes o días de entrenamiento de tren superior',
    durationMinutes: 25,
    warmup: '5 mins de movilidad articular general',
    exercises: [
      POSTURE_EXERCISES.ex1,
      POSTURE_EXERCISES.ex2,
      POSTURE_EXERCISES.ex3,
      POSTURE_EXERCISES.ex16,
      POSTURE_EXERCISES.ex17,
      POSTURE_EXERCISES.ex18
    ],
    cooldown: 'Postura del Niño (ex20) x 1 min'
  },
  {
    day: 2,
    title: 'Core + Glúteos Despiertos',
    focus: 'Ideal para miércoles o días de piernas. Activa la faja abdominal',
    durationMinutes: 25,
    warmup: '5 mins de activación general con minubanda',
    exercises: [
      POSTURE_EXERCISES.ex6,
      POSTURE_EXERCISES.ex7,
      POSTURE_EXERCISES.ex11,
      POSTURE_EXERCISES.ex12,
      POSTURE_EXERCISES.ex13,
      POSTURE_EXERCISES.ex15
    ],
    cooldown: 'Estiramientos rápidos de psoas y femoral (ex16, ex19)'
  },
  {
    day: 3,
    title: 'Refuerzo Postural Total',
    focus: 'Sesión integral más larga, ideal para el fin de semana o sábado',
    durationMinutes: 25,
    warmup: '5 mins activación articular hombros y caderas',
    exercises: [
      POSTURE_EXERCISES.ex4,
      POSTURE_EXERCISES.ex5,
      POSTURE_EXERCISES.ex8,
      POSTURE_EXERCISES.ex9,
      POSTURE_EXERCISES.ex10,
      POSTURE_EXERCISES.ex14,
      POSTURE_EXERCISES.ex17
    ],
    cooldown: 'Estiramiento global de pecho, isquio y niño (ex18, ex19, ex20)'
  }
];

export interface PostureTestResult {
  date: string;
  wallScoreCount: number; // 0-5
  mirrorChecks: {
    earAligned: boolean;
    shoulderAligned: boolean;
    hipAligned: boolean;
    kneeAligned: boolean;
    ankleAligned: boolean;
  };
  classification: 'excelente' | 'buena' | 'compensada';
}

export interface ErgonomicsState {
  screenHeight: boolean;
  screenDistance: boolean;
  screenWidth: boolean;
  chairFeet: boolean;
  chairKnees: boolean;
  chairBack: boolean;
  elbowAngle: boolean;
  wristFlat: boolean;
  mouseClose: boolean;
  lightingClean: boolean;
  glareFree: boolean;
}

export const INITIAL_ERGO_STATE: ErgonomicsState = {
  screenHeight: false,
  screenDistance: false,
  screenWidth: false,
  chairFeet: false,
  chairKnees: false,
  chairBack: false,
  elbowAngle: false,
  wristFlat: false,
  mouseClose: false,
  lightingClean: false,
  glareFree: false
};
