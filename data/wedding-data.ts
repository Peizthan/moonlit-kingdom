import type { WeddingData } from '@/lib/types';

export const weddingData: WeddingData = {
  couple: {
    partner1: 'Constanza Martinez',
    partner2: 'Ivan Kostianovsky',
    weddingDate: '28 de agosto de 2027',
    location: 'Salón Oscar Pérez Uribe, Club Centenario',
    version: '3.5',
    lastUpdated: 'octubre de 2026',
  },

  story: {
    howWeMet: '',
    proposal: '',
    vision:
      'Imaginamos nuestra boda como un viaje encantado a través de un bosque celestial — un mundo suspendido entre el crepúsculo y la luz de las estrellas, donde la nobleza del mundo antiguo se encuentra con el misterio de la naturaleza, y donde cada detalle parece haber sido descubierto en lugar de diseñado. Queremos que nuestros invitados sientan que han ingresado a un cuento de hadas vivo: uno de romance, maravilla y elegancia atemporal.',
    moodKeywords: [
      'Encantado',
      'Celestial',
      'Etéreo',
      'Romántico',
      'Misterioso',
      'Luminoso',
      'Ancestral',
      'Noble',
      'Íntimo',
      'Cinematográfico',
    ],
  },

  venue: {
    name: 'Salón Perez Uribe',
    address: 'Av. Mariscal López 2351',
    city: 'Asunción',
    country: 'Paraguay',
    capacity: 500,
    indoorOutdoor: 'Interior y Exterior',
    description:
      'El Salón Pérez Uribe del Club Centenario es un espacio de gran elegancia arquitectónica, con techos de roble labrado, ventanales que dan a los jardines históricos del club y una terraza rodeada de árboles centenarios. El salón cuenta con una capilla privada, un gran salón de recepción y jardines aterrazados perfectos para una recepción nocturna bajo las estrellas.',
    coordinator: 'Verónica',
    coordinatorEmail: 'info@clubcentenario.org.py',
    coordinatorPhone: '(+595 21) 247 0000',
    website: 'https://www.clubcentenario.org.py/',
  },

  colorPalette: [
    {
      name: 'Verde Bosque Profundo',
      hex: '#10261D',
      role: 'primary',
      description: 'El tono más profundo de un bosque antiguo al caer la noche — sólido y rico.',
    },
    {
      name: 'Verde Esmeralda',
      hex: '#1D4A3A',
      role: 'primary',
      description: 'Exuberante y vital, evocando piedra cubierta de musgo y doseleras antiguas.',
    },
    {
      name: 'Azul Medianoche',
      hex: '#121C2E',
      role: 'primary',
      description: 'El color del cielo una hora después del atardecer — profundo, aterciopelado, infinito.',
    },
    {
      name: 'Negro Carbón',
      hex: '#171515',
      role: 'primary',
      description: 'Un casi-negro cálido que ancla cada superficie con drama silencioso.',
    },
    {
      name: 'Vino Borgoña',
      hex: '#4E1F2D',
      role: 'primary',
      description: 'La profundidad del claret añejo, las cortinas de terciopelo y los pétalos de rosa al anochecer.',
    },
    {
      name: 'Oro Antiguo',
      hex: '#B08D57',
      role: 'accent',
      description: 'Oro cálido y envejecido con la pátina de los siglos — el hilo del lujo.',
    },
    {
      name: 'Bronce Añejo',
      hex: '#8C6A3C',
      role: 'accent',
      description: 'Oro más profundo y terroso para una cualidad celestial arraigada.',
    },
    {
      name: 'Champán',
      hex: '#D8C3A5',
      role: 'accent',
      description: 'Suave, cálido, luminoso — el color de la luz de las velas reflejada en la seda.',
    },
    {
      name: 'Marfil',
      hex: '#F3EBDD',
      role: 'accent',
      description: 'La crema más suave, evocando lino añejado, pergamino y la tradición nupcial.',
    },
    {
      name: 'Neblina de Piedra',
      hex: '#C7C0B6',
      role: 'neutral',
      description: 'Un neutro frío y desgastado para el equilibrio y la refinación.',
    },
    {
      name: 'Gris Lunar',
      hex: '#8E8A86',
      role: 'neutral',
      description: 'La plata tranquila de la luz de luna entre nubes — contenida y hermosa.',
    },
  ],

  florals: [
    {
      area: 'Arco de la Ceremonia',
      description:
        'Un arco dramático de bosque envuelto en rosas de jardín en cascada, enredaderas y botanicals blancos lunares. Estructural e imponente pero romántico.',
      flowers: ['Rosa de Jardín (Marfil y Rosa Suave)', 'Ranúnculo', 'Cosmos Blanco', 'Anémona', 'Heléboro'],
      foliage: ['Eucalipto Colgante', 'Ruscus', 'Helecho Culantrillo', 'Jazmín Enredadera'],
      notes: 'Agregar faroles de velas en la base. El arco debe medir aproximadamente 3,5 m de alto.',
    },
    {
      area: 'Mesas de la Recepción (Largas)',
      description:
        'Centros de mesa exuberantes y bajos que recorren el largo de las mesas con velas de distintas alturas, musgo, botanicals y pétalos dispersos.',
      flowers: ['Rosas Borgoña Profundo', 'Ranúnculo Rosa Polvoriento', 'Cosmos Chocolate', 'Dalias del Bosque'],
      foliage: ['Frondes de Helecho', 'Rama de Olivo', 'Vid de Zarza', 'Eucalipto con Semillas'],
      notes: 'Entrelazar luces de hadas entre los arreglos. Usar jarrones de latón y bronce antiguo.',
    },
    {
      area: 'Entrada y Bienvenida',
      description:
        'Dos urnas de declaración flanqueando la entrada del salón con arreglos altos y dramáticos que evocan la grandeza de la llegada.',
      flowers: ['Lisianthus Blanco', 'Dedalera', 'Rosa de Jardín', 'Muguet'],
      foliage: ['Palmas', 'Hojas Tropicales', 'Espirales de Hiedra', 'Helecho Esparraguero'],
    },
    {
      area: 'Ramo de la Novia',
      description:
        'Un ramo atado a mano, romántico y en cascada, de botanicals de marfil y rosa suave mezclados con cinta colgante y verde.',
      flowers: ['Rosa de Jardín', 'Heléboro', 'Guisante de Olor', 'Ranúnculo Blanco', 'Anémona'],
      foliage: ['Eucalipto', 'Helecho', 'Hiedra', 'Jazmín Colgante'],
      notes: 'Envolver con cinta de seda marfil, asegurada con un alfiler dorado.',
    },
    {
      area: 'Grupos de Velas',
      description: 'Dispersos por toda la recepción — grupos bajos de votivos intercalados con pequeños ramos florales.',
      flowers: ['Rosas en Spray', 'Scabiosa', 'Paniculata'],
      foliage: ['Musgo', 'Boj'],
    },
  ],

  timeline: [
    {
      id: 't1',
      time: '14:00',
      title: 'Inicio de los Preparativos de la Novia',
      description: 'Llega el equipo de pelo y maquillaje. Se sirve brunch con champán en el tocador nupcial.',
      location: 'A definir - Suite de la Novia',
      responsible: 'Wedding Planner y Equipo de Belleza',
      category: 'preparation',
    },
    {
      id: 't2',
      time: '15:30',
      title: 'Preparativos del Novio y Cortejo',
      description: 'El novio comienza a vestirse, la novia está lista.',
      location: 'A definir - Suite del Novio',
      responsible: 'Padrinos de Honor',
      category: 'preparation',
    },
    {
      id: 't3',
      time: '16:00',
      title: 'La novia se viste y fotos previas',
      description: 'La novia y sus madrinas se preparan para la ceremonia. Sesión de fotos previas.',
      location: 'Suite de la Novia y Jardines Formales',
      responsible: 'Wedding Planner y Fotógrafa',
      category: 'preparation',
    },
    {
      id: 't4',
      time: '16:30',
      title: 'Sesión de fotos de la novia con familia y madrinas.',
      description: 'Fotos íntimas y formales de la novia con su familia y madrinas en los jardines formales.',
      location: 'A definir - Jardines Formales',
      responsible: 'Wedding Planner y Fotógrafa',
      category: 'preparation',
    },
    {
      id: 't5',
      time: '17:15',
      title: 'First Look de la novia y fotos',
      description: 'Momento de fotos solo de la novia en su atuendo completo.',
      location: 'Escalones del Salón y Jardines Formales',
      responsible: 'Fotógrafa',
      category: 'preparation',
    },
    {
      id: 't6',
      time: '18:00',
      title: 'El novio sale en dirección al salón.',
      description: 'Ivan se dirige al salón mientras Costi termina sesión de fotos.',
      location: 'Entrada de Salón',
      responsible: 'Novio y Wedding Planner',
      category: 'logistics',
    },
    {
      id: 't7',
      time: '18:15',
      title: 'Llegada del novio, salida de la novia.',
      description: 'El novio llega al salón mientras la novia se prepara para su entrada.',
      location: 'Salón',
      responsible: 'Wedding Planner',
      category: 'logistics',
    },
    {
      id: 't8',
      time: '18:30',
      title: 'Llegada de la novia e inicio de la ceremonia.',
      description: 'La novia hace su entrada mientras los invitados toman asiento.',
      location: 'Espacio para la Ceremonia',
      responsible: 'Wedding Planner, Fotógrafos, Músicos y Oficial de la Ceremonia',
      category: 'ceremony',
    },
    {
      id: 't9',
      time: '18:40',
      title: 'Ceremonia Espiritual',
      description: 'Breve ceremonia espiritual dirigida por oficial de ceremonia.',
      location: 'Espacio de la Ceremonia',
      responsible: 'Oficial de la Ceremonia, Fotógrafos, Padrinos de Honor, Novios',
      category: 'ceremony',
    },
    {
      id: 't10',
      time: '19:10',
      title: 'Ceremonia Civil',
      description: 'Ceremonia Formal con Jueza.',
      location: 'Espacio de la Ceremonia',
      responsible: 'Jueza, Fotógrafos, Padrinos de Honor, Novios',
      category: 'ceremony',
    },
    {
      id: 't11',
      time: '19:30',
      title: 'Fin de Ceremonia y Apertura de la Fiesta con show de Tempranos',
      description: 'Los invitados de la noche son bienvenidos. El Salón se abre para la recepción.',
      location: 'Entrada del Salón y Área de Recepción',
      responsible: 'Wedding Planner, Coordinadora de Bodas, Músicos, Fotógrafos',
      category: 'entertainment',
    },
    {
      id: 't12',
      time: '20:00',
      title: 'Cena',
      description: 'Los invitados disfrutan de una cena exquisita con menú seleccionado.',
      location: 'Salón Principal',
      responsible: 'Wedding Planner, Coordinacion de staff, djs.',
      category: 'reception',
    },
    {
      id: 't13',
      time: '20:45',
      title: 'Primer Baile y Apertura de la Pista de Baile',
      description: 'Los novios realizan su primer baile y se abre la pista de baile para los invitados.',
      location: 'Salón Principal - Pista de Baile',
      responsible: 'Wedding Planner, Coordinadoras, Djs, Fotógrafos',
      category: 'entertainment',
    },
    {
      id: 't14',
      time: '04:00',
      title: 'Cierre de la Velada',
      description: 'Última canción, despedida de los novios, autos desde la medianoche.',
      location: 'Entrada del Salón',
      responsible: 'Coordinadora de Bodas',
      category: 'logistics',
    },
  ],

  menu: [
    {
      course: 'Bocado de Bienvenida',
      options: [
        {
          name: 'Velouté de Hongos del Bosque',
          description: 'Crema de porcini salvaje, aceite de trufa, crutón de brioche',
        },
      ],
    },
    {
      course: 'Entrada',
      options: [
        {
          name: 'Terrina de Foie Gras',
          description: 'Terrina de hígado de pato artesanal, gelatina de Sauternes, tostada de brioche',
          dietary: ['Contiene Gluten'],
        },
        {
          name: 'Remolacha Patrimonial con Burrata',
          description: 'Remolacha asada, burrata batida, nuez garapiñada, hierbas micro',
          dietary: ['Vegetariano', 'Sin Gluten'],
        },
        {
          name: 'Roseta de Salmón Curado',
          description: 'Salmón del Atlántico curado en casa, crema de eneldo, pepino encurtido, caviar',
          dietary: ['Sin Gluten'],
        },
      ],
      dietaryNotes: 'Todas las entradas se sirven con pan artesanal y aceite de oliva extra virgen',
    },
    {
      course: 'Plato de Pescado',
      options: [
        {
          name: 'Merluza Negra a la Sartén',
          description: 'Filete de merluza negra, beurre blanc al azafrán, ensalada de hinojo y naranja',
          dietary: ['Sin Gluten'],
        },
      ],
    },
    {
      course: 'Plato Principal',
      options: [
        {
          name: 'Lomo de Res Asado',
          description: 'Lomo madurado asado lentamente, puré de papas, jus de trufa, mantequilla de tuétano',
          dietary: ['Sin Gluten'],
        },
        {
          name: 'Cordero Patagónico al Horno',
          description: 'Costillar de cordero con hierbas, ratatouille, jus de romero',
          dietary: ['Sin Gluten'],
        },
        {
          name: 'Wellington de Hongos Silvestres',
          description: 'Hongos del bosque y castaña en croûte, espinaca, reducción de vino tinto',
          dietary: ['Vegetariano'],
        },
      ],
      dietaryNotes: 'Todos los platos principales se sirven con vegetales de temporada y papas gratinadas',
    },
    {
      course: 'Pre-Postre',
      options: [
        {
          name: 'Sorbete de Verbena Limón',
          description: 'Sorbete de hierbas, espuma de flor de saúco, violeta cristalizada',
          dietary: ['Vegano', 'Sin Gluten'],
        },
      ],
    },
    {
      course: 'Postre',
      options: [
        {
          name: 'Tarta de Chocolate Negro y Caramelo Salado',
          description: 'Ganache de chocolate Valrhona, caramelo de sal marina, pan de oro',
          dietary: ['Vegetariano'],
        },
        {
          name: 'Mille-Feuille de Vainilla',
          description: 'Capas de hojaldre caramelizado, crema de vainilla de Madagascar, coulis de frambuesa',
          dietary: ['Vegetariano'],
        },
        {
          name: 'Selección de Quesos Artesanales',
          description: 'Quesos artesanales seleccionados, panal de miel, pan de nuez, membrillo',
          dietary: ['Vegetariano'],
        },
      ],
    },
    {
      course: 'Torta de Bodas',
      options: [
        {
          name: 'Torta Moonlit Kingdom',
          description:
            'Torta de cinco pisos naked: champán y flor de saúco, limón y lavanda, chocolate negro y frutos del bosque. Decorada con flores frescas, pan de oro y detalles celestiales pintados a mano.',
          dietary: ['Contiene Gluten', 'Vegetariano'],
        },
      ],
    },
  ],

  vendors: [],

  actionItems: [],

  meetingNotes: [],

  decisions: [],

  risks: [],

  seating: [],

  lighting: [
    { id: 'l1', area: 'Capilla Privada', scene: 'Ceremonia – Pre-Llegada', description: 'Ambiente de velas cálidas. Uplighting en pilares a 20% blanco cálido. Pin spots en florales del pasillo.', colorTemp: '2700K', intensity: '20-30%', equipment: ['12x Uplights LED', '6x Pin Spots'], timing: 'Activo desde las 13:00' },
    { id: 'l2', area: 'Capilla Privada', scene: 'Ceremonia – Procesional', description: 'Aumento gradual a lavado cálido completo. Spotlight suave en el arco. Pasillo iluminado con velas en el piso.', colorTemp: '2800K', intensity: '60%', timing: '14:30 en cue' },
    { id: 'l3', area: 'Jardines Formales', scene: 'Hora del Cóctel', description: 'Luces festoon en los árboles. Pin spots en urnas florales. Iluminación de caminos con farolitos de vela.', equipment: ['Líneas Festoon (120m)', 'Farolitos de Vela x40'], timing: '15:30 – 17:00' },
    { id: 'l4', area: 'Gran Salón', scene: 'Cena de Bodas', description: 'Luz de velas cálida en las mesas. Dosel de luces de hadas al 40%. Uplighting sutil en paredes con ámbar profundo.', colorTemp: '2700K', intensity: '40-50%', equipment: ['Dosel de Luces de Hadas (techo completo)', '20x Uplights LED', 'Velas'], timing: 'Activo desde las 17:00' },
    { id: 'l5', area: 'Gran Salón', scene: 'Primer Baile y Fiesta', description: 'Dosel de hadas se atenúa levemente. Iluminación de pista con rayos móviles en dorado y ámbar. Banda con contraluz.', colorTemp: 'Dinámico', intensity: '60-80%', equipment: ['4x Moving Heads', '8x Par Cans', 'Hazer'], timing: '20:00 – 23:30' },
    { id: 'l6', area: 'Terraza del Jardín', scene: 'Suelta de Globos Luminosos', description: 'Todas las luces atenuadas al mínimo. Grupos de velas al borde de la terraza. Los globos luminosos como fuente de luz principal.', intensity: '5%', timing: '22:00' },
  ],

  technical: [],
};
