/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExerciseGuide {
  description: string;
  muscles: string[];
  steps: string[];
  tips: string[];
  mistakes: string[];
  benefit: string;
}

export const EXERCISE_GUIDE: Record<string, ExerciseGuide> = {
  // --- FUERZA: LUNES ---
  'Press de Banca Plano con Barra': {
    description: 'Ejercicio multiarticular primario de empuje horizontal para sobrecargar el pectoral mayor.',
    muscles: ['Pectoral Mayor', 'Deltoides Anterior', 'Tríceps Braquial'],
    steps: [
      'Acuéstate en el banco manteniendo los pies planos y empujando contra el suelo.',
      'Sujeta la barra con un agarre ligeramente más ancho que los hombros.',
      'Retrae los omóplatos firmemente contra el banco antes de sacar la barra.',
      'Baja la barra de forma controlada hasta la porción media del pecho (esternón).',
      'Empuja la barra de regreso verticalmente extendiendo los codos con fuerza.'
    ],
    tips: [
      'Mantén los codos doblados aproximadamente a 45 o 60 grados con respecto al torso.',
      'Aplica "leg drive" empujando los pies contra el suelo para estabilizar la pelvis.'
    ],
    mistakes: [
      'Despegar la espalda alta o los hombros del banco al empujar.',
      'Rebotar la barra en el esternón para ganar impulso.'
    ],
    benefit: 'Aumento progresivo de la densidad del torso y fuerza de empuje absoluto.'
  },
  'Press Militar con Mancuernas de Pie': {
    description: 'Empuje vertical puro que requiere una co-contracción del core para proteger la columna y levantar peso libre.',
    muscles: ['Deltoides Medio y Anterior', 'Tríceps', 'Serrato Anterior', 'Core Profundo'],
    steps: [
      'Ponte de pie con los pies al ancho de hombros y las rodillas ligeramente desbloqueadas.',
      'Coloca las mancuernas a la altura de las clavículas, con las palmas orientadas hacia el frente.',
      'Aprieta con fuerza los glúteos y el abdomen para estabilizar el tronco.',
      'Empuja las mancuernas verticalmente hacia el techo hasta extender los brazos completamente.',
      'Regresa lentamente controlando la caída libre del peso hasta la posición de inicio.'
    ],
    tips: [
      'No dejes que los codos se abran excesivamente hacia los lados; mantenlos ligeramente hacia el frente.',
      'Mira fijo hacia adelante para mantener las cervicales neutras y un plano de empuje correcto.'
    ],
    mistakes: [
      'Arquear excesivamente la zona lumbar para reclutar fibras del pectoral superior.',
      'Hacer un empuje de piernas o rebote (Push Press) si no está planificado.'
    ],
    benefit: 'Sinergia de fuerza de hombros tridimensional con alta demanda de estabilidad de columna.'
  },
  'Aperturas Inclinadas con Mancuerna': {
    description: 'Aislamiento pectoral plano en banco inclinado (30-45 grados) para enfatizar la porción clavicular del pecho.',
    muscles: ['Pectoral Mayor (Porción Clavicular Superior)', 'Deltoides Anterior'],
    steps: [
      'Acuéstate en banco inclinado con mancuernas extendidas sobre el pecho y palmas enfrentadas.',
      'Abre los brazos lentamente describiendo un arco amplio y controlado.',
      'Mantén una flexión constante de 10-15 grados en los codos durante todo el recorrido.',
      'Baja hasta sentir un estiramiento profundo en las fibras del pecho alto.',
      'Vuelve al inicio apretando conscientemente los pectorales sin chocar las mancuernas.'
    ],
    tips: [
      'Imagina que estás abrazando un árbol ancho para mantener el recorrido angular perfecto.',
      'No aumentes la inclinación de la banca a más de 45 grados para evitar el exceso de trabajo del hombro anterior.'
    ],
    mistakes: [
      'Convertir el movimiento en un press cerrado (doblando demasiado los codos).',
      'Bajar excesivamente arriesgando la cápsula anterior del hombro.'
    ],
    benefit: 'Estiramiento fascial profundo de fibras pectorales superiores y corrección de hombros colapsados.'
  },
  'Fondos de Tríceps en Paralelas': {
    description: 'Ejercicio de empuje de peso corporal masivo con máxima estimulación muscular.',
    muscles: ['Tríceps Braquial', 'Pectoral Mayor', 'Deltoides Anterior'],
    steps: [
      'Sujétate de las barras paralelas con los brazos totalmente estirados.',
      'Cruza los pies y mantén el torso ligeramente inclinado si buscas activar pectoral, o vertical para aislar tríceps.',
      'Inhala y baja doblando los codos hasta que los hombros queden por debajo de los codos (90°).',
      'Empuja con fuerza exhalando hasta regresar al bloqueo de codos.'
    ],
    tips: [
      'Mantén los hombros bien deprimidos (lejos de las orejas) durante todo el movimiento.',
      'Si el recorrido completo duele en hombros, reduce el rango temporalmente.'
    ],
    mistakes: [
      'Dejar que los hombros colapsen hacia adelante (hombros adelantados).',
      'Realizar movimientos rápidos o con patada de piernas.'
    ],
    benefit: 'Desarrollo de fuerza funcional e hipertrofia extrema en la cadena posterior empujadora.'
  },
  'Extensiones de Tríceps en Polea Alta': {
    description: 'Aislamiento puro para la cabeza lateral y medial del tríceps utilizando poleas para mantener tensión constante.',
    muscles: ['Tríceps Braquial (Cabeza Lateral y Medial)'],
    steps: [
      'Colócate frente a la polea, sujeta la barra o soga con las palmas hacia el suelo.',
      'Mantén los codos pegados a los costados del cuerpo y el pecho sutilmente erguido.',
      'Extiende los brazos hacia abajo empujando el accesorio hasta bloquear los codos.',
      'Al final del movimiento, aprieta los tríceps por 1 segundo.',
      'Regresa despacio permitiendo que las manos suban controlado hasta la altura del pecho.'
    ],
    tips: [
      'Los hombros y codos deben estar estacionarios; el antebrazo es el único segmento móvil.',
      'Inclina levemente la cadera al frente para evitar que el cable roce la cara.'
    ],
    mistakes: [
      'Separar los codos de los costados del torso durante el press.',
      'Girar los hombros hacia adentro levantando los trapecios.'
    ],
    benefit: 'Saturación metabólica dirigida sin fatiga sistémica del sistema nervioso central.'
  },

  // --- FUERZA: MARTES ---
  'Dominadas Pronas o Jalón al Pecho': {
    description: 'Patrón de tracción vertical rey para construir amplitud escapular y espalda ancha.',
    muscles: ['Dorsal Ancho', 'Redondo Mayor', 'Trapecios Inferiores', 'Bíceps Braquial'],
    steps: [
      'Sujeta la barra de dominadas con agarre prono (palmas al frente) más abierto que el ancho de hombros.',
      'Inicia la tracción deprimiendo las escápulas (bajando los hombros).',
      'Tira de tu cuerpo hacia arriba llevando el pecho directo a la barra (no solo la barbilla).',
      'Mantén los codos apuntando hacia abajo y sutilmente hacia adelante.',
      'Desciende con un recorrido largo y controlado estirando los dorsales por completo.'
    ],
    tips: [
      'Activa la retracción escapular previo a flexionar los brazos.',
      'Si haces jalón al pecho, mantén una inclinación de 15° hacia atrás para aislar el plano muscular.'
    ],
    mistakes: [
      'Encoger los hombros y colapsar el pecho (reduciendo la activación de espalda).',
      'Hacer balanceos excesivos (kipping) sin dominar la fuerza estricta.'
    ],
    benefit: 'Mejora postural inmediata contrarrestando la cifosis y abriendo el espacio subacromial.'
  },
  'Remo con Barra Recta': {
    description: 'Movimiento fundamental de tracción horizontal para aumentar el grosor de los trapecios mediales e inferiores.',
    muscles: ['Trapecios Medios/Inferiores', 'Dorsal Ancho', 'Romboides', 'Deltoides Posterior'],
    steps: [
      'Sujeta una barra con agarre prono pasándose los hombros.',
      'Flexiona levemente rodillas y dobla el torso a unos 45° manteniendo la columna totalmente recta.',
      'Inicia el jalón guiando los codos hacia atrás junto a los costados del cuerpo.',
      'Lleva la barra a la porción alta del abdomen contrayendo la espalda alta.',
      'Estira por completo los brazos regresando el peso sin encorvar la columna.'
    ],
    tips: [
      'Mantén el peso centrado sobre los pies; visualiza que tus manos son simples ganchos.',
      'Bloquea la musculatura lumbar y el abdomen antes de mover el peso.'
    ],
    mistakes: [
      'Encorvar la espalda baja (hiperflexión lumbar), arriesgando hernias discales.',
      'Usar rebote con las piernas para forzar el levantamiento de peso de forma balística.'
    ],
    benefit: 'Estabilización erguida del raquis y fortalecimiento de erectores espinales profundos.'
  },
  'Pull-Over con Polea Alta (Cuerda)': {
    description: 'Movimiento de aislamiento dorsal puro sin reclutar el bíceps braquial.',
    muscles: ['Dorsal Ancho', 'Redondo Mayor', 'Tríceps (Cabeza Larga)', 'Serrato Anterior'],
    steps: [
      'Sujeta la cuerda y da dos pasos atrás inclinando el torso unos 30° con brazos rectos.',
      'Manteniendo los codos casi fijos (levemente desbloqueados), tira de la cuerda hacia tus muslos.',
      'Conduce el movimiento impulsando desde el codo, no desde la muñeca.',
      'Contrae fuertemente los dorsales cerca de las piernas abriendo el pecho.',
      'Retorna permitiendo que la polea suba con un tempo de control.'
    ],
    tips: [
      'Contrae el abdomen para evitar hiperlordosis lumbar al estirar los brazos.',
      'Abre las manos hacia afuera en la parte inferior para forzar más tensión interna.'
    ],
    mistakes: [
      'Doblar los codos en cada fase convirtiendo el ejercicio en un press de tríceps.',
      'Utilizar inercia de cabeza o balancear el torso alto.'
    ],
    benefit: 'Tensión dorsal sostenida que promueve la elongación torácica y reduce el dolor de hombros.'
  },
  'Curl de Bíceps Alterno con Mancuerna': {
    description: 'Flexión de codo con rotación (supinación) progresiva para el máximo desarrollo del bíceps.',
    muscles: ['Bíceps Braquial', 'Braquial Anterior', 'Braquiorradial'],
    steps: [
      'Ponte de pie con mancuernas a los lados de los muslos, con agarre neutro.',
      'Eleva un brazo flexionando el codo y rota la palma hacia arriba cuando pases los 90 grados.',
      'Asegúrate de exprimir el bíceps arriba medio segundo.',
      'Baja de forma inversa lenta hasta que el brazo se estire completamente.',
      'Alterna con el brazo opuesto realizando movimientos limpios.'
    ],
    tips: [
      'Mantén los codos pegados fijos a las costillas en vez de adelantarlos al subir.',
      'Trabaja en un rango completo de movimiento para reclutar mayor masa muscular.'
    ],
    mistakes: [
      'Mecer el cuerpo entero o balancear el torso (cheating) con carga desmedida.',
      'No estirar el codo por completo en cada repetición.'
    ],
    benefit: 'Mejora la estabilidad del tendón del bíceps en su porción larga humeral.'
  },
  'Martillo en Banco Inclinado': {
    description: 'Flexión de bíceps con agarre neutro recostado para aislar el braquiorradial y braquial profundo bajo mayor estiramiento.',
    muscles: ['Braquial Anterior', 'Braquiorradial (Antebrazo)', 'Bíceps (Cabeza Corta)'],
    steps: [
      'Acuéstate en banco inclinado a unos 60 grados manteniendo los hombros relajados caídos hacia atrás.',
      'Toma las mancuernas de manera neutra (las palmas se miran una a la otra).',
      'Flexiona los codos al unísono manteniendo la alineación neutra de muñecas.',
      'Sube con fuerza reteniendo la contracción arriba.',
      'Baja muy lento peleando contra la gravedad en el estiramiento.'
    ],
    tips: [
      'Mantén los brazos apuntando recto al suelo (no los dejes pivotar hacia adelante durante el jalón).',
      'No flexiones las muñecas con fuerza para compensar; consérvalas firmes.'
    ],
    mistakes: [
      'Dejar caer el peso en picada sin fase excéntrica del movimiento.',
      'Usar inercia oscilante.'
    ],
    benefit: 'Aumento del volumen lateral del brazo y fortalecimiento del agarre funcional.'
  },

  // --- FUERZA: MIÉRCOLES ---
  'Sentadilla Libre con Barra Back squat': {
    description: 'El ejercicio patrón rey para el desarrollo estructural completo de la pierna y robustez ósea.',
    muscles: ['Cuádriceps', 'Glúteo Mayor', 'Femorales', 'Erectores Espinales', 'Núcleo Central'],
    steps: [
      'Apoya la barra sobre los trapecios (no en el cuello), saca la barra dando un paso atrás.',
      'Separa pies al ancho de hombros con puntas sutilmente apuntando hacia fuera (15-30°).',
      'Inhala, empuja la cadera hacia atrás y abajo como sentándote en una silla baja.',
      'Baja guardando la espalda recta hasta romper la paralela o lo máximo que permita tu movilidad.',
      'Sube empujando desde los talones con fuerza sin juntar las rodillas.'
    ],
    tips: [
      'Mantén las rodillas alineadas en la misma dirección que apuntan las puntas de tus pies.',
      'Mantén el pecho levantado y la mirada en un punto neutro oblicuamente al suelo.'
    ],
    mistakes: [
      'Valgo de rodilla (caída interna de las rodillas al subir), lo que daña el menisco.',
      'Levantar los talones del suelo centrando las presiones en los dedos de los pies.'
    ],
    benefit: 'Resistencia estructural robusta, balance de hormona natural y máxima quema calórica.'
  },
  'Prensa Atlética de Piernas 45°': {
    description: 'Desarrollo masivo unilateral o bilateral de las piernas eliminando la carga axial sobre la columna.',
    muscles: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    steps: [
      'Acuéstate en la prensa apoyando la espalda baja firme contra el respaldo ergonómico.',
      'Ubica los pies en la plataforma al ancho del pecho.',
      'Quita los frenos y desciende el peso doblando rodillas a 90 grados.',
      'No permitas que tu pelvis se despegue del asiento inferior.',
      'Empuja la plataforma hacia arriba extendiendo rodillas sin llegar a hiperextenderlas bruscamente.'
    ],
    tips: [
      'Coloca los pies un poco más abajo si buscas prioridad en cuádriceps, o más arriba para glúteos e isquios.',
      'Guarda la respiración activa (maniobra de Valsalva) para mayor empuje y estabilidad.'
    ],
    mistakes: [
      'Trabar las rodillas bruscamente en el tope de la extensión (hiperextensión de rótula).',
      'Hacer recorridos mínimos de 10 centímetros cargando peso desproporcionado.'
    ],
    benefit: 'Permite sobrecargar las piernas con un riesgo mínimo para la columna vertebral.'
  },
  'Peso Muerto Rumano con Mancuernas': {
    description: 'Bisagra de cadera pura enfocada en estiramiento excéntrico de femorales y glúteos profundos.',
    muscles: ['Isquiotibiales (Bíceps Femoral)', 'Glúteo Mayor', 'Erectores Espinales'],
    steps: [
      'Sostén las mancuernas al frente de los muslos de pie con rodillas levemente flexionadas.',
      'Inicia empujando la cadera hacia atrás como si quisieras tocar la pared trasera con tus glúteos.',
      'Baja deslizando las mancuernas pegadas a tus piernas hasta pasar las rodillas.',
      'Mantén la columna neutral (espalda recta, sin encorvar la parte lumbar).',
      'Contrae glúteos e isquios empujando la cadera al frente hasta la postura de inicio.'
    ],
    tips: [
      'Las rodillas son de soporte pasivo, no se flexionan más conforme desciendes.',
      'Concéntrate en la bisagra de cadera; la cadera viaja en horizontal hacia atrás, no en vertical.'
    ],
    mistakes: [
      'Doblar el torso superior (cifosis dorsal extrema) perdiendo el control lumbar del raquis.',
      'Llevar las mancuernas separadas de las piernas cargando la espalda baja de tensión.'
    ],
    benefit: 'Sujeción de columna impecable y fortalecimiento del elástico de la cadena posterior.'
  },
  'Extensiones de Cuádriceps en Máquina': {
    description: 'Aislamiento terminal de cuádriceps que enfatiza el recto anterior mediante tensión dirigida.',
    muscles: ['Cuádriceps (Énfasis en Bíceps Femoral y Recto Femoral Anterior)'],
    steps: [
      'Ajusta la máquina para que las rodillas queden en el eje de rotación y el rodillo sobre los tobillos.',
      'Sostén los mangos laterales con firmeza pegando los glúteos al asiento.',
      'Extiende las piernas totalmente contrayendo los muslos arriba por 1-2 segundos.',
      'Desciende de forma guiada resistiendo el peso con control biométrico.'
    ],
    tips: [
      'No dejes que el peso golpee los topes al bajar para retener la tensión del músculo.',
      'Apunta con los dedos de los pies sutilmente hacia arriba.'
    ],
    mistakes: [
      'Utilizar un impulso impulsivo despegando la cadera del sillón.',
      'Ajustar mal el rodillo del tobillo provocando cargas lesivas sobre la rótula.'
    ],
    benefit: 'Máxima irrigación y congestión sarcoplasmática antes o después del entrenamiento pesado.'
  },
  'Elevación de Talones de Pie': {
    description: 'Fortalecimiento e hipertrofia dirigida al gastrocnemio mediante rango completo de flexión plantar.',
    muscles: ['Gastrocnemio (Gemelos)', 'Sóleo'],
    steps: [
      'Coloca las puntas de los pies al borde de un escalón o plataforma.',
      'Baja los talones lentamente buscando un estiramiento profundo del talón de Aquiles por 1-2s.',
      'Eleva el cuerpo presionando con las puntas de los pies hacia arriba verticalmente.',
      'Sostén la contracción en el pico más alto por un segundo antes de bajar de nuevo.'
    ],
    tips: [
      'Mantén las rodillas estiradas pero no trabadas rígidamente.',
      'Evita los rebotes elásticos si quieres forzar al gemelo a hacer todo el trabajo.'
    ],
    mistakes: [
      'Hacer pequeños rebotes rápidos descuidando la fase excéntrica lenta.',
      'Uso excesivo de carga que acorta el rango útil.'
    ],
    benefit: 'Mejora del retorno circulatorio venoso e incremento del salto y estabilidad plantar.'
  },

  // --- FUERZA: JUEVES ---
  'Plancha Abdominal con Toques de Hombro': {
    description: 'Estabilización del core con desestabilización intermintente de apoyos para retar la resistencia del recto.',
    muscles: ['Transverso Abdominal', 'Recto Mayor', 'Oblicuo Interno/Externo', 'Deltoides anterior'],
    steps: [
      'Colócate en posición de flexión (brazos estirados) con pies sutilmente más anchos de lo normal.',
      'Mantén el cuerpo rígido desde la cabeza hasta los talones con la retroversión pélvica.',
      'Lentamente levanta la mano derecha y tócala contra tu hombro izquierdo.',
      'Vuelve la mano y levanta la mano izquierda tocando el hombro derecho de forma asincrónica.',
      'Reduce al mínimo cualquier movimiento o balanceo rotativo de la cadera.'
    ],
    tips: [
      'Imagina un vaso con agua en tu espalda baja: realiza el toque sin derramar una sola gota.',
      'Mantén glúteos apretados al máximo para aplastar la cadera contra el suelo.'
    ],
    mistakes: [
      'Dejar caer la cadera hacia abajo hiperextendiendo la lumbar.',
      'Rotar bruscamente la pelvis cada vez que levantes una mano.'
    ],
    benefit: 'Estabilidad de columna anti-rotación crucial para blindar y eliminar dolores lumbares.'
  },
  'Rueda Abdominal o Ab Wheel Rollout': {
    description: 'Extensión excéntrica abdominal avanzada que desafía la fuerza anti-extensión del core.',
    muscles: ['Recto Abdominal', 'Serrato Mayor', 'Dorsal Ancho', 'Core Profundo'],
    steps: [
      'Arrodíllate apoyando las rodillas sobre una colchoneta suave y toma firmemente los mangos del disco.',
      'Aprieta los abdominales arqueando sutilmente la columna superior (cifosis protectora manual).',
      'Rueda la rueda hacia adelante controlando que la cadera baje junto a tus hombros.',
      'Busca desplazar la rueda tan lejos como tu fuerza de abdomen te permita sin arquear la lumbar abajo.',
      'Tira de la rueda de regreso usando los abdominales para recuperar la vertical.'
    ],
    tips: [
      'La clave es no dejar que los glúteos se desprendan hacia atrás de tus caderas antes.',
      'Si molesta la zona lumbar, acorta el rango utilizando una pared como tope freno.'
    ],
    mistakes: [
      'Arquear la espalda lumbar convirtiendo la fuerza en una extensión lesiva del raquis.',
      'Tirar usando puramente los flexores de la cadera con el culo hacia atrás.'
    ],
    benefit: 'Fuerza abdominal de transferencia atlética masiva y compactación de la faja pélvica.'
  },
  'Elevaciones de Piernas Colgado': {
    description: 'Fortalecimiento de la porción inferior del recto abdominal luchando contra el peso suspendido.',
    muscles: ['Recto Abdominal Inferior', 'Flexores de Hip (Psoas)', 'Fuerza de Agarre'],
    steps: [
      'Cuélgate de una barra fija con agarre prono y los brazos totalmente estirados.',
      'Mantén el cuerpo estático evitando balancear las piernas o el torso.',
      'Eleva las piernas rectas (o flexionando rodillas si es muy duro) hasta la altura de tu cadera.',
      'Exhala en la máxima contracción abdominal alto.',
      'Desciende las piernas despacio controlando la inercia del movimiento.'
    ],
    tips: [
      'No solo muevas las piernas, busca enrollar la pelvis hacia tu pecho superior.',
      'Mantén los hombros activos (alejados de las orejas) jalando levemente hacia el suelo.'
    ],
    mistakes: [
      'Hacer balanceos balísticos hacia adelante y atrás para subir las piernas.',
      'No usar fuerza abdominal cayendo controlado.'
    ],
    benefit: 'Descompresión de columna junto a desarrollo de gran fuerza de agarre con potencia de abdomen.'
  },
  'Giros Rusos con Peso de Disco': {
    description: 'Trabajo dinámico rotatorio de core para incidir de lleno en las fibras de los oblicuos.',
    muscles: ['Oblicuos Internacionales y Externos', 'Recto Abdominal', 'Erectores Espinales'],
    steps: [
      'Siéntate en el suelo con rodillas dobladas, eleva los pies levemente si tienes balance intermedio.',
      'Inclina tu torso hacia atrás unos 45 grados creando una forma de "V" en el abdomen.',
      'Sostén el disco o pesa con ambas manos frente al abdomen.',
      'Gira el torso lentamente hacia un costado llevando la pesa casi a tocar el suelo.',
      'Regresa al centro y rota hacia el costado inverso repitiendo de manera rítmica.'
    ],
    tips: [
      'Gira los hombros enteros, no muevas solo los brazos de lado a lado.',
      'Mantén la mirada sobre la pesa para conservar la alineación cervical.'
    ],
    mistakes: [
      'Encorvar violentamente la columna lumbar mientras se produce la rotación rápida.',
      'Mantener la respiración bloqueada.'
    ],
    benefit: 'Coordinación balística torácica y robustez oblicua rotatoria antilesión.'
  },
  'Intervalos HIIT en Cinta de Correr': {
    description: 'Acondicionamiento vascular de alta intensidad que promueve la quema de lípidos post-ejercicio.',
    muscles: ['Sistema Cardiovascular', 'Cuádriceps', 'Isquiotibiales', 'Gastrocnemio'],
    steps: [
      'Camina o trota despacio por unos minutos para elevar tu pulso de manera progresiva.',
      'Incrementa la velocidad de la cinta a tu máximo nivel de sprint transitorio por 45 segundos.',
      'Corre con zancada limpia utilizando potencia de pie.',
      'Terminado el sprint, baja a una caminata muy ligera de recuperación por 45 segundos.',
      'Completa los ciclos sucesivos durante 15 minutos.'
    ],
    tips: [
      'No te aferres rígidamente a los apoyos laterales durante el sprint.',
      'Utiliza calzado amortiguado idóneo.'
    ],
    mistakes: [
      'Exceder la velocidad máxima con pérdida total de control biomecánico.',
      'Omitir la fase de enfriamiento progresivo final.'
    ],
    benefit: 'Aumento de capacidad pulmonar, optimización de mitocondrias y aceleración del metabolismo.'
  },

  // --- FUERZA: VIERNES ---
  'Press de Hombros Sentado con Mancuernas': {
    description: 'Ejercicio de sobrecarga superior para hombros, en el cual el banco provee estabilidad de espalda.',
    muscles: ['Deltoides Anterior', 'Deltoides Lateral', 'Tríceps Braquial', 'Serrato Mayor'],
    steps: [
      'Siéntate en una banca con respaldo alto (80-90°) levantando las mancuernas a los hombros.',
      'Mantén los pies firmemente apoyados en el suelo y la cabeza recta.',
      'Empuja las mancuernas simultáneamente hacia arriba siguiendo una trayectoria convergente.',
      'Bloquea los hombros, no los codos bruscamente, arriba.',
      'Baja controladamente los codos hasta que alcancen el nivel paralelo del suelo.'
    ],
    tips: [
      'Ubica los codos sutilmente rotados hacia adentro para evitar la fricción en el manguito rotador.',
      'Mantén la pelvis pegada al espaldar trasero en el esfuerzo del empuje.'
    ],
    mistakes: [
      'Saturar la zona lumbar despegando los glúteos del sillón.',
      'Chocar las mancuernas arriba ruidosamente perdiendo la tensión del deltoides.'
    ],
    benefit: 'Alineación de fuerza vertical segura para construir hombros robustos y simétricos.'
  },
  'Elevaciones Laterales con Cable o Polea': {
    description: 'Aislamiento puro de la cabeza lateral del hombro con tensión mecánica continua.',
    muscles: ['Deltoides Lateral'],
    steps: [
      'Párate de lado a la polea baja, sujeta el mango con la mano contraria al cable.',
      'Lleva el cable por detrás u horizontalmente frente a tu cuerpo.',
      'Eleva el brazo extendido lateralmente con un arco amplio hasta que quede al nivel de tu oreja/hombro.',
      'Baja con lentitud absoluta resistiendo el tirón centrífugo del cable.',
      'Mantén una muy leve flexión en el codo para mitigar la presión articular.'
    ],
    tips: [
      'Apunta con el codo hacia el techo y sutilmente hacia atrás para aislar la cabeza lateral pura.',
      'Utiliza un peso que permita anular por completo los balanceos asistidos de espalda.'
    ],
    mistakes: [
      'Utilizar impulsos con la cadera doblando el torso lateral.',
      'Subir el hombro entero (acción excesiva del trapecio superior por debilidad anterior).'
    ],
    benefit: 'Deltoides laterales cargados de tensión en todo el rango articular aumentando la anchura del torso.'
  },
  'Pájaros con Mancuernas (Arrodillado)': {
    description: 'Trabajo focalizado en la cabeza posterior del deltoides, corrigiendo desbalances de hombros adelantados por sedentarismo.',
    muscles: ['Deltoides Posterior', 'Trapecios Medios/Inferiores', 'Romboides'],
    steps: [
      'Arrodíllate e inclina el torso plano al frente casi rozando el suelo, manteniendo espalda neutra.',
      'Sostén mancuernas debajo del pecho inclinadas paralelamente.',
      'Eleva los brazos hacia los costados enfocando la contracción en la espalda alta superior trasera.',
      'Asegúrate de dirigir el empuje con los codos traseros.',
      'Desciende despacio sintiendo el peso.'
    ],
    tips: [
      'No juntes excesivamente las escápulas si quieres que el deltoides posterior realice todo el esfuerzo.',
      'Apunta con los pulgares sutilmente orientados hacia abajo.'
    ],
    mistakes: [
      'Balancear excesivamente la columna perdiendo la tensión de aislamiento.',
      'Doblar y estirar los codos consecutivamente.'
    ],
    benefit: 'Sujeción de las cabezas óseas retrasadas del plano rotatorio del hombro.'
  },
  'Super-Set: Curl Polea + Tríceps Cuerda': {
    description: 'Rutina de bombeo sin descanso combinado para inundar de sangre ambos planos del brazo.',
    muscles: ['Bíceps Braquial', 'Tríceps (Porción Lateral y Larga)'],
    steps: [
      'Realiza 12 repeticiones de Curl con Barra o Polea Baja enfocándote en la flexión del bíceps.',
      'Inmediatamente pasa al cable superior con accesorio de cuerda.',
      'Realiza 12 extensiones rápidas de tríceps exprimiendo las porciones traseras abajo.',
      'Descansa las series planificadas secuencialmente.'
    ],
    tips: [
      'Busca no relajar el cuerpo en la transición reduciendo el retraso metabólico.'
    ],
    mistakes: [
      'Mover en demasía los codos hacia adelante y atrás durante las superseries.'
    ],
    benefit: 'Aumento del flujo capilar y bombeo extremo liberando metabolitos reconstructores.'
  },
  'Curl de Bíceps Concentrado': {
    description: 'Aislamiento máximo sentados buscando evitar la intervención de cualquier estabilizador.',
    muscles: ['Bíceps Braquial (Cabeza Corta y Pico delbíceps)'],
    steps: [
      'Siéntate en un banco, inclina el torso apoyando el codo contra la cara interna de tu muslo del mismo lado.',
      'Estira el brazo sosteniendo la mancuerna vertical.',
      'Flexiona el codo jalando la mancuerna hacia tu cara manteniendo el codo fijado al muslo.',
      'Aprieta con potencia el bíceps arriba medio segundo.',
      'Desciende lentamente conservando el control.'
    ],
    tips: [
      'No utilices el hombro ni la pierna para arrastrar la pesa arriba.',
      'Mantén la tensión continua sin relajar abajo completamente.'
    ],
    mistakes: [
      'Despegar el codo de la parte interna del muslo buscando impulso asistido.'
    ],
    benefit: 'Modelado terminal de la altura concéntrica máxima del bíceps.'
  },

  // --- FUERZA: SÁBADO ---
  'Zancadas Dinámicas Caminando con Peso': {
    description: 'Patrón de empuje unilateral dinámico para fuerza, estabilidad lateral pélvica y coordinación.',
    muscles: ['Cuádriceps', 'Glúteo Mayor', 'Femorales', 'Aductores', 'Estabilizadores Core'],
    steps: [
      'Sostén dos mancuernas a los lados y da un paso amplio hacia el frente.',
      'Desciende de forma vertical doblando ambas rodillas hasta que la rodilla trasera casi toque el suelo.',
      'Asegúrate de que la rodilla delantera no supere en exceso los dedos del pie si buscas enfocar cuádriceps.',
      'Empuja con fuerza desde el talón delantero para levantarte y dar el siguiente paso fluido con la otra pierna.',
      'Completa los pasos continuos estirándote firme.'
    ],
    tips: [
      'Mantén el torso erguido o apenas inclinado al frente para mayor estímulo del glúteo anterior.',
      'Mantén la mirada al frente para un correcto balance dinámico de apoyo.'
    ],
    mistakes: [
      'Dejar que la rodilla en flexión sufra valgo colapsando hacia adentro de tu eje corporal.',
      'Apoyar los pies en línea recta exacta (lo que sabotea el equilibrio lateral); pisa al ancho de cadera.'
    ],
    benefit: 'Sinergia de empuje unilateral idónea para igualar desbalances de fuerza entre piernas.'
  },
  'Flexiones de Brazo con Deficit': {
    description: 'Flexoextensiones de hombro y codo con rango aumentado usando elevaciones en las palmas.',
    muscles: ['Pectoral Mayor', 'Deltoides Anterior', 'Tríceps', 'Serrato Anterior'],
    steps: [
      'Coloca dos discos, step o mancuernas paralelas en el suelo bajo tus manos.',
      'Ubícate en plancha perfecta manteniendo abdomen y glúteos contraídos en línea recta.',
      'Desciende el pecho lentamente superando la línea de tus manos gracias al desnivel de los apoyos.',
      'Inhala sintiendo un estiramiento pectoral aumentado.',
      'Empuja con fuerza hasta regresar al tope extendiendo codos con furia.'
    ],
    tips: [
      'Colapsa los codos a 45 grados de tu torso para proteger el manguito rotador.',
      'Bloquea con fuerza abdominal la lumbar para que no "cuelgue" la cadera al flexionar.'
    ],
    mistakes: [
      'Dejar caer la cadera hacia abajo arruinando la tensión integrada del core central.',
      'Tener las manos excesivamente separadas arriesgando la salud cervical.'
    ],
    benefit: 'Mayor reclutamiento de porciones profundas del pectoral e inducción del estiramiento muscular activo.'
  },
  'Remo Alterno con Mancuerna (Serrucho)': {
    description: 'Tracción horizontal asincrónica profunda para equilibrar las asimetrías lumbares de torsión.',
    muscles: ['Dorsal Ancho', 'Redondo Mayor', 'Romboides', 'Bíceps'],
    steps: [
      'Apoya una mano y rodilla sobre un banco plano, descansa el torso paralelo al suelo.',
      'Sostiene la mancuerna con el brazo contrario extendido verticalmente.',
      'Jala la mancuerna orientando el recorrido del codo en ángulo diagonal hacia tu bolsillo o cadera posterior.',
      'Exprime con dureza las escápulas y la porción lateral dorsal arriba.',
      'Desciende lentamente hasta el estiramiento suspendido.'
    ],
    tips: [
      'Mantén la espalda recta en paralelo exacto al suelo sin rotar exageradamente el torso al jalar.',
      'Visualiza que empujas la mancuerna con el codo para desconectar la tensión del bíceps.'
    ],
    mistakes: [
      'Jalar la polea o mancuerna vertical directamente al pecho (trabajando trapecio superior de más).'
    ],
    benefit: 'Aislamiento dorsal unilateral excepcional con descarga lumbar segura.'
  },
  'Kettlebell swings explosivo': {
    description: 'Bisagra de cadera balística para crear potencia en glúteos y resistencia cardiometabólica integrada.',
    muscles: ['Glúteo Mayor', 'Femorales', 'Core', 'Erectores Espinales', 'Hombros'],
    steps: [
      'Párate con pies más anchos que tus hombros y la pesa rusa a una corta distancia al frente tuyo.',
      'Flexiona la cadera (bisagra) con espalda recta, sujeta la kettlebell jalándola con fuerza entre las piernas.',
      'Empuja la cadera velozmente adelante contrayendo glúteos y empujando el suelo con pies.',
      'La inercia de la pelvis elevará la pesa al nivel del pecho (no utilices los brazos para alzar el peso).',
      'Deja caer la pesa balanceada y repite encadenado.'
    ],
    tips: [
      'Es un tirón horizontal explosivo (bisagra de cadera), no una sentadilla vertical.',
      'Exhala ruidosamente en cada contracción del glúteo al frente.'
    ],
    mistakes: [
      'Flexionar las rodillas en demasía convirtiendo el péndulo en una sentadilla lenta.',
      'Arquear la espalda lumbar arriba para ganar mayor altura.'
    ],
    benefit: 'Desarrollo de potencia posterior, optimización atlética y acondicionamiento aeróbico pesado.'
  },
  'Plancha Lateral Activa': {
    description: 'Trabajo isométrico lateral para estabilizar la cadera y el plano antiesgince lumbar.',
    muscles: ['Oblicuos', 'Transverso Abdominal', 'Glúteo Medio (Soporte Cadera)'],
    steps: [
      'Acuéstate de costado, apoya tu codo o mano justo debajo de la línea del hombro.',
      'Eleva la pelvis del suelo formando una rampa recta de talones a cabeza.',
      'Mantén el pecho al frente sin colapsar el hombro contraído.',
      'Sostén el abdomen compacto por el tiempo predeterminado.',
      'Cambia de costado secuencialmente.'
    ],
    tips: [
      'Empuja con fuerza el codo contra el suelo para alejar el cuello de la articulación del hombro.'
    ],
    mistakes: [
      'Dejar que la cadera caiga al piso o se rote hacia adelante.'
    ],
    benefit: 'Estabilización de fuerzas asimétricas laterales pélvicas reduciendo la debilidad.'
  },

  // --- FUERZA: DOMINGO ---
  'Caminata Ligera al Aire Libre': {
    description: 'Baja intensidad de movimiento (LISS) idóneo para activar el sistema parasimpático y acelerar el drenaje linfático.',
    muscles: ['Sistema Muscular Completo', 'Salud Cardiovascular'],
    steps: [
      'Camina a paso rítmico y constante, preferentemente en entornos verdes y naturales.',
      'Mantén una postura erguida y respira exclusivamente de forma nasal profunda.',
      'Disfruta la caminata por 20 a 30 minutos sin prisas ni sobreesfuerzos.'
    ],
    tips: [
      'Usa este tiempo para desconectar de pantallas y propiciar regeneración celular.'
    ],
    mistakes: [
      'Caminar encorvado mirando fijamente el celular todo el trayecto.'
    ],
    benefit: 'Promueve el flujo de oxígeno muscular y la eliminación de metabolitos acumulados.'
  },
  'Movilidad Completa de Cadera (90-90)': {
    description: 'Estiramiento dinámico articular enfocado en rotadores de cadera para aliviar dolor bajo de espalda.',
    muscles: ['Rotadores Internos y Externos de la Cadera', 'Glúteo Medio', 'Psoas'],
    steps: [
      'Siéntate en el suelo con una pierna doblada al frente a 90° y la otra hacia atrás a 90°.',
      'Mantén el torso erguido intentando pegar ambos glúteos firmes en el piso.',
      'Inclina levemente el pecho hacia el muslo delantero para estirar el glúteo.',
      'Pivota de forma dinámica girando sobre los talones para cambiar la posición al otro lado.'
    ],
    tips: [
      'Realiza las transiciones con suavidad absoluta, usando respiración abdominal.',
      'Si no puedes sentarte sin colapsar, apoya las manos detrás de tu cadera.'
    ],
    mistakes: [
      'Hacer transiciones bruscas sintiendo pinchazos en rodillas.'
    ],
    benefit: 'Descompresión rotacional de la articulación coxofemoral y alivio lumbar.'
  },
  'Estiramiento del Gato - Camello (Core)': {
    description: 'Movilidad segmentaria espinal dinámica para lubricar discos vertebrales.',
    muscles: ['Serrato', 'Erectores Espinales', 'Estructura Articular Vertebral'],
    steps: [
      'Posiciónate en cuatro apoyos (manos debajo de hombros, rodillas bajo caderas).',
      'Inhala arqueando la columna baja, levantando el mentón y dirigiendo la cadera al cielo (Vaca).',
      'Exhala arqueando la espalda hacia arriba, metiendo el mentón al pecho y empujando la pared (Gato).',
      'Asegúrate de mover cada vértebra una a la vez.'
    ],
    tips: [
      'No fuerces los rangos si sientes rigidez; muévete con fluidez pacífica.'
    ],
    mistakes: [
      'Hacer movimientos rápidos descuidando la sincronía respiratoria.'
    ],
    benefit: 'Alivio del estrés mecánico sobre toda la extensión del raquis vertebral.'
  },
  'Postura del Niño (Childs Pose) Profunda': {
    description: 'Estiramiento y descompresión axial global pasiva.',
    muscles: ['Dorsales', 'Erectores', 'Glúteos', 'Cintura Escapular'],
    steps: [
      'Arrodíllate sobre la colchoneta, abre las rodillas y junta los dedos de los pies.',
      'Empuja tus glúteos hacia atrás hasta apoyarlos cómodamente sobre los talones.',
      'Extiende bien los brazos al frente sobre el piso y apoya la frente sobre la colchoneta.',
      'Respira lentamente sintiendo cómo se expanden los pulmones contra la espalda baja.'
    ],
    tips: [
      'Camina sutilmente con las yemas de los dedos al frente para estirar la caja escapular superior.'
    ],
    mistakes: [
      'Mantener los hombros tensos y pegados al cuello.'
    ],
    benefit: 'Estiramiento del psoas, descompresión torácica y relajación del sistema de racha tensa.'
  },

  // --- POSTURA PERFECTA (POSTURE DATA) ---
  'Retracción Escapular de Pie': {
    description: 'Activación neuromuscular de la espalda superior (trapecio inferior y romboides) contrarrestando hombros caídos.',
    muscles: ['Trapecio Medio e Inferior', 'Romboides', 'Deltoides Posterior'],
    steps: [
      'Ponte de pie con postura erguida, los brazos a los costados y pulgares apuntando hacia atrás.',
      'Junta firmemente las escápulas atrás sin encoger los hombros hacia arriba.',
      'Sostén la contracción por 3 segundos de manera muy potente.',
      'Regresa despacio abriendo los omóplatos de vuelta al inicio.'
    ],
    tips: [
      'Baja bien los hombros; no utilices el trapecio superior.',
      'Exhala fuerte al apretar los omóplatos.'
    ],
    mistakes: [
      'Arquear la espalda lumbar adelantando el vientre.',
      'Encoger los hombros hacia las orejas.'
    ],
    benefit: 'Tono muscular óptimo en la espalda alta para abrir los hombros y corregir hombro adelantado.'
  },
  'Superman al Suelo': {
    description: 'Fortalecimiento de toda la extensión de la cadena posterior para combatir debilidad por estar sentado.',
    muscles: ['Erectores Espinales', 'Glúteo Mayor', 'Isquiotibiales', 'Trapecios'],
    steps: [
      'Acuéstate boca abajo sobre una colchoneta blanda con brazos estirados al frente.',
      'Eleva al mismo tiempo el pecho, brazos y rodillas del suelo apretando fuerte los glúteos.',
      'Mantén por 2 segundos la mirada neutra apuntada al suelo.',
      'Baja suavemente regresando al reposo.'
    ],
    tips: [
      'No lances la cabeza violentamente hacia atrás para evitar dolor cervical.',
      'Piensa en estirarte más a lo largo que a lo alto.'
    ],
    mistakes: [
      'Flexionar las rodillas al subir utilizando solo los pies.',
      'Mantener la respiración bloqueada.'
    ],
    benefit: 'Sujeción de erectores posteriores promoviendo una postura erguida sólida.'
  },
  'Aperturas con Banda Elástica': {
    description: 'Fortalecimiento elástico dirigido al plano escapular para abatir el acortamiento pectoral.',
    muscles: ['Manguito Rotador Trasero', 'Deltoides Posterior', 'Romboides'],
    steps: [
      'Sujeta la banda con las manos al ancho del pecho con brazos extendidos de frente.',
      'Abre los brazos lentamente separándolos hacia los costados estirando la banda.',
      'Lleva la banda de forma horizontal hasta reposar casi junto al esternón alto.',
      'Regresa reteniendo la fuerza elástica desatada.'
    ],
    tips: [
      'Mantén los codos rectos durante todo el recorrido.',
      'Utiliza una tensión elástica que sea retadora pero limpia.'
    ],
    mistakes: [
      'Doblar los codos reduciendo las fuerzas de palanca del hombro posterior.'
    ],
    benefit: 'Estabilización del manguito de los rotadores superiores evitando dolores posturales.'
  },
  'Y-T-W en el Suelo': {
    description: 'Ejercicio isométrico posicional para activar trapecios medio-inferiores.',
    muscles: ['Trapecio Inferior', 'Romboides', 'Deltoides Posterior'],
    steps: [
      'Boca abajo, eleva los brazos formando una letra "Y" con pulgares arriba retiendo 2s.',
      'Lleva los brazos estirados lateralmente formando una letra "T" con retención 2s.',
      'Dobla los codos y conduce hacia las costillas formando la letra "W" apretando escápulas 2s.',
      'Repasa la terna de letras secuencialmente.'
    ],
    tips: [
      'Mantén la frente en contacto con el suelo o apenas elevada conservando el eje cervical.'
    ],
    mistakes: [
      'Hacer movimientos espásticos apresurados.'
    ],
    benefit: 'Sujeción contra escapular de hombros colapsados previniendo cifosis de oficina.'
  },
  'Estiramiento del Cuello Lateral': {
    description: 'Elongación de la musculatura del trapecio superior y escalenos bajo tensión excesiva por pantallas.',
    muscles: ['Trapecio Superior', 'Escalenos', 'Esternocleidomastoideo'],
    steps: [
      'Sentado con espalda totalmente recta, apoya una mano en la colchoneta o bajo el muslo.',
      'Lleva la oreja opuesta directo al hombro jalando suavemente con la otra mano.',
      'Mantén 15-30 segundos sintiendo cómo cede la tensión con las respiraciones.',
      'Cambia de costado tranquilamente.'
    ],
    tips: [
      'Respira lentamente expandiendo el abdomen para activar el freno del tono muscular.'
    ],
    mistakes: [
      'Tironear de forma violenta o rápida la cabeza arriesgando pinzamientos.'
    ],
    benefit: 'Libera de forma cuasi-instantánea dolores de cabeza tensionales del oficinista.'
  },
  'Dead Bug (Bicho Muerto)': {
    description: 'Excelente patrón de estabilización de core anti-extensión coordinativo.',
    muscles: ['Recto Abdominal', 'Transverso Abdominal', 'Core Profundo'],
    steps: [
      'Acuéstate boca arriba, dobla caderas y rodillas a 90° con los brazos apuntando al techo.',
      'Estira el brazo derecho atrás y al mismo tiempo la pierna izquierda al frente casi tocando el piso.',
      'Conserva tu espalda lumbar totalmente pegada y aplanada contra el suelo.',
      'Regresa al centro de partida y repite con el brazo y pierna opuesta.'
    ],
    tips: [
      'Si se despega la zona lumbar del piso en el estiramiento, no desciendas tanto la pierna.'
    ],
    mistakes: [
      'Arquear la espalda lumbar perdiendo la conexión anti-extensión abdominal.'
    ],
    benefit: 'Fuerza funcional de core aplicable a estabilización de peso de manera aislada.'
  },
  'Bird-Dog (Perro Pájaro)': {
    description: 'Coordinación y resistencia en las porciones cruzadas biomecánicas anteriores y posteriores.',
    muscles: ['Glúteo Mayor', 'Erectores Espinales', 'Estructura Core Posterior (Multífidos)'],
    steps: [
      'Ubícate en cuadripedia (rodillas y manos planas en el piso).',
      'Extiende el brazo derecho al frente y la pierna izquierda atrás hasta linear con cuerpo.',
      'Mantén la pelvis paralela al suelo sin rotar la cadera hacia el costado abierto.',
      'Regresa despacio y cambia a los segmentos invertidos.'
    ],
    tips: [
      'Piensa en estirarte: empuja hacia atrás con el talón y al frente con tus dedos.'
    ],
    mistakes: [
      'Levantar en demasía la pierna arqueando la espalda lumbar por debilidad glútea.'
    ],
    benefit: 'Fuerza integrada cruzada de soporte torácico excelente para evitar desvíos lumbares.'
  },
  'Plancha Lateral': {
    description: 'Estabilización lateral pura que reduce las asimetrías de soporte.',
    muscles: ['Oblicuos', 'Cuadrado Lumbar', 'Glúteo Medio (Soporte)'],
    steps: [
      'Apoya el antebrazo sutilmente en el suelo y alínea los talones de costado.',
      'Eleva la cadera en rampa.',
      'Sostén firme con respiración nasal.'
    ],
    tips: [
      'Mantén el codo alineado directo bajo la vertical del hombro.'
    ],
    mistakes: [
      'Dejar colgar las caderas.'
    ],
    benefit: 'Blindaje asimétrico contra dolores por rotaciones dadas en malas posiciones.'
  },
  'Hollow Hold': {
    description: 'Máximo reclutamiento termófilo de la pared abdominal profunda anti-extensión.',
    muscles: ['Recto Abdominal', 'Transverso Abdominal', 'Oblicuos'],
    steps: [
      'Echado boca arriba, estira brazos atrás y piernas flotantes al frente.',
      'Levanta apenas omóplatos y pies aplanando la espalda lumbar contra el suelo firme.',
      'Mantén esta posición de barca compacta respirando controlado.'
    ],
    tips: [
      'Encoge piernas al pecho si sientes dolor lumbar para facilitar la palanca abdominal.'
    ],
    mistakes: [
      'Permitir un arco debajo de tu espalda baja donde pase tu mano.'
    ],
    benefit: 'Desarrollo de fuerza de faja pélvica impenetrable para máxima transferencia estricta.'
  },
  'Paloff Press con Banda': {
    description: 'Aislamiento anti-rotación excelente para la faja oblicua e interna del vientre.',
    muscles: ['Transverso Abdominal', 'Oblicuo Interno/Externo', 'Erectores'],
    steps: [
      'Fija la banda elástica, tómala de costado con ambas manos y llévala al esternón.',
      'Da un paso amplio para jalar y crear tensión elástica lateral.',
      'Estiende los brazos al frente sin permitir que la banda te gire el torso.',
      'Sostén 2 segundos adelante y vuelve controlando la resistencia.'
    ],
    tips: [
      'Asegúrate de hundir el ombligo y apretar los glúteos de pie.'
    ],
    mistakes: [
      'Dejar rotar los hombros hacia el anclaje lateral perdidéndose la fuerza isométrica anti-rotación.'
    ],
    benefit: 'Erradicación de desbalances de torsión en la espalda baja.'
  },
  'Puente de Glúteos': {
    description: 'Activación y depertar neuromuscular de la extensión del glúteo saboteada por el sedentarismo habitual.',
    muscles: ['Glúteo Mayor (Énfasis principal)', 'Isquiotibiales', 'Erectores'],
    steps: [
      'Acuéstate boca arriba con rodillas dobladas a 90 grados y pies planos al suelo.',
      'Eleva la pelvis empujando desde los talones exhalando arriba.',
      'Aprieta con máxima furia glúteos arriba por 2 segundos formando línea recta hombro-rodilla.',
      'Desciende de vuelta controlado rozando el piso con pelvis.'
    ],
    tips: [
      'No arquees excesivamente la lumbar alta arriba; mete sacro (retroversión) para aislar mejor el glúteo.'
    ],
    mistakes: [
      'Inclinación de empuje excesivo desde las puntas de los pies, perdiendo el foco anterior.'
    ],
    benefit: 'Re-alinear balance de retroversión pélvica apagada por el letargo diario sentados.'
  },
  'Clam Shell (Almeja)': {
    description: 'Aislamiento del glúteo medio, músculo clave para dar soporte y alinear las rodillas al caminar.',
    muscles: ['Glúteo Medio', 'Tensor de la Fascia Lata'],
    steps: [
      'Recuéstate de costado con caderas a 45° y rodillas dobladas a 90° con talones juntos.',
      'Abre la rodilla superior lo máximo que puedas sin rotar la cadera hacia atrás.',
      'Mantén la tensión arriba un instante sintiendo el músculo lateral de tu glúteo.',
      'Desciende lento regresando suave.'
    ],
    tips: [
      'Pon la mano sobre tu pelvis para asegurar que se mantenga inmóvil durante la apertura.'
    ],
    mistakes: [
      'Rotar todo el torso para forzar la apertura de la pierna superior.'
    ],
    benefit: 'Sujeción de cadera previniendo la oscilación lateral lesiva de rodilla.'
  },
  'Monster Walk con Banda': {
    description: 'Activación lateral integrada que asiste en mejorar la fuerza propulsora de cadera.',
    muscles: ['Glúteo Medio/Minúsculo', 'Abductores', 'Cuádriceps'],
    steps: [
      'Equípate con la banda arriba de tus rodillas o tobillos e inclínate en media sentadilla.',
      'Pisa ampliamente hacia tu derecha sintiendo tirón elástico.',
      'Acerca el pie opuesto conservando siempre una distancia de contra-tensión basal en la banda.',
      'Realiza 10 pasos laterales y repite del costado contrario.'
    ],
    tips: [
      'Mantén los pies siempre paralelos sin apuntar con los talones hacia adentro.'
    ],
    mistakes: [
      'Arrastrar ruidosamente el pie perdiendo la estabilidad excéntrica lateral.'
    ],
    benefit: 'Estabilización de rodillas protegiendo rótulas de sobrecarga al correr o caminar.'
  },
  'Patada de Glúteo en 4 Apoyos': {
    description: 'Extensión aislada de cadera sin soporte lumbar para despertar el glúteo mayor.',
    muscles: ['Glúteo Mayor', 'Femorales'],
    steps: [
      'Ubícate en cuadripedia manteniendo espalda firme.',
      'Dobla tu pierna a 90 grados y llévala hacia arriba empujando el talón contra el techo.',
      'Aprieta con total fuerza glúteos arriba sin alterar la curvatura lumbar.',
      'Desciende suave rozando la colchoneta con rodilla.'
    ],
    tips: [
      'Evita doblar los codos para compensar al subir la pierna.'
    ],
    mistakes: [
      'Arquear de más la zona baja lumbar para aumentar artificialmente el rango de altura.'
    ],
    benefit: 'Conexión mente-músculo rápida que re-enciende glúteos atrofiados.'
  },
  'Sentadilla Sumo con Resistencia': {
    description: 'Patrón de sentadilla con abducción aumentada para incidir con fuerza en glúteos y aductores internos.',
    muscles: ['Glúteos Mayor', 'Aductores Internos', 'Cuádriceps'],
    steps: [
      'Adopta un parado de sumo (pies anchos que hombros con puntas a 45 grados).',
      'Desciende cadera abajo empujando rodillas hacia afuera activamente.',
      'Baja hasta la paralela y pisa el suelo desandando el ascenso.',
      'Aprieta glúteos arriba.'
    ],
    tips: [
      'Utiliza banda elástica para retar a las rodillas a no caer colapsadas.'
    ],
    mistakes: [
      'Dejar caer las rodillas hacia adentro al empujar arriba.'
    ],
    benefit: 'Aumento de amplitud rotatoria pélvica y fuerza de cadenas musculares internas.'
  },
  'Apertura de Cadera con Rodilla al Suelo': {
    description: 'Estiramiento profundo encaminado a desinflamar y alargar psoas ilíaco acortado.',
    muscles: ['Psoas Ilíaco', 'Recto Superior Femoral', 'Glúteo Mayor'],
    steps: [
      'Zancada amplia arrodillando la pierna posterior en la colchoneta blanda.',
      'Aprieta los glúteos (anteversión pélvica pasiva) y traslada todo tu peso corporal al frente.',
      'Siente un estiramiento reparador en la ingle y flexor trasero superior.',
      'Eleva el brazo del mismo costado para profundizar.'
    ],
    tips: [
      'Inhala y exhala con ritmo lento y relajado.'
    ],
    mistakes: [
      'Arquear exageradamente la espalda de forma descontrolada.'
    ],
    benefit: 'Erradicación del espasmo del psoas que causa anteversión o inclinación de cadera.'
  },
  'Estiramiento Gato-Vaca': {
    description: 'Movilidad espinal tradicional recomendada para re-lubricar articulaciones vertebrales.',
    muscles: ['Toda la musculatura Erectora Espinal', 'Core'],
    steps: [
      'Colócate en 4 apoyos sobre la colchoneta.',
      'Inhala arqueando la espalda, elevando sutilmente la cervical mirando al cielo (Vaca).',
      'Exhala empujando la colchoneta y curvando de forma redonda la columna al revés (Gato).',
      'Sincroniza dinámicamente con respiración pausada.'
    ],
    tips: [
      'Visualiza que mueves sección por sección del raquis de colas a cabeza.'
    ],
    mistakes: [
      'Mover rápido sin conectar la respiración.'
    ],
    benefit: 'Excelente lubricación de discos espinales ideal para deshacer dureza de espalda baja.'
  },
  'Estiramiento de Pecho en Puerta': {
    description: 'Estiramiento terminal para desatar el acortamiento pectoral del síndrome de hombros torcidos.',
    muscles: ['Pectoral Mayor', 'Pectoral Menor', 'Deltoides Anterior'],
    steps: [
      'Apoya los antebrazos lateralmente en el marco de una puerta al nivel del pecho.',
      'Da un sutil paso al frente dejando colgar parte de tu peso adelante.',
      'Siente la rotación y estiramiento en la porción de tus fibras pectorales por 20s.',
      'Suelta pacíficamente.'
    ],
    tips: [
      'No fuerces el estiramiento; respira sintiendo un estiramiento de alivio, nunca dolor punzante.'
    ],
    mistakes: [
      'Adelantar bruscamente la cabeza forzando las cervicales.'
    ],
    benefit: 'Contrarresta el acortamiento de la cadena anterior tensional abriendo los hombros.'
  },
  'Estiramiento Isquiotibiales Sentado': {
    description: 'Estiramiento con flexión de cadera estricta que reduce tensiones del isquiotibial rígido.',
    muscles: ['Isquiotibiales (Cadena Posterior)', 'Pantorrilla'],
    steps: [
      'Siéntate con una pierna estirada y la opuesta flexionada pegada a la rodilla contraria.',
      'Inclina tu torso al frente tirando desde la cadera (espalda recta).',
      'Lleva las manos hacia la punta del pie lentamente hasta encontrar confort receptivo.',
      'Mantén suave respirando suave.'
    ],
    tips: [
      'Conserva tu cabeza alineada, no dobles el cuello para compensar.'
    ],
    mistakes: [
      'Encorvar violentamente la columna lumbar intentando llegar al pie con la cabeza.'
    ],
    benefit: 'Elongación de la fascia de isquios reduciendo la rigidez transmitida a la lumbar alta.'
  },
  'Postura del Niño': {
    description: 'Postura global reparadora que deprime el sistema simpático y alarga las costillas posteriores.',
    muscles: ['Dorsales', 'Paravertebrales', 'Cadera posterior'],
    steps: [
      'Siéntate sobre los talones en colchoneta separando bien rodillas.',
      'Extiende brazos firmemente adelante arrastrando tus manos contra el suelo.',
      'Siente la de-tensión y elongación de tu espalda y cintura.',
      'Relaja respirando hondamente.'
    ],
    tips: [
      'Pon la mente calma desentendiéndote de esfuerzos en este estiramiento.'
    ],
    mistakes: [
      'Hacer tirones de hombros rápidos escapando al estiramiento.'
    ],
    benefit: 'Descompresión espinal, alivio de rigidez dorsal y de-stress.'
  }
};
