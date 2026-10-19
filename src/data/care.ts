import { CareGuide } from '../types';

export const careGuides: CareGuide[] = [
  {
    id: 'guia-orquideas',
    title: 'Guía de Cuidado para Orquídeas',
    category: 'Orquídeas',
    light: 'Luz indirecta brillante. Prefieren estar cerca de una ventana protegida por una cortina delgada para evitar quemaduras por sol directo.',
    water: 'Regar únicamente cuando las raíces que se ven a través de la maceta plástica transparente se tornen de color grisáceo o plateado. Riego por inmersión de 10-15 minutos.',
    soil: 'Sustrato altamente aireado que imite su hábitat natural (corteza de pino, fibra de coco y un poco de musgo sphagnum). Nunca usar tierra común de jardín.',
    temp: 'Rango óptimo de 18°C a 28°C durante el día, y ligeras bajadas por la noche (mínimo 15°C) para inducir la floración.',
    humidity: 'Humedad relativa alta (50-70%). Se puede usar una bandeja con agua y piedras debajo de la maceta (sin que la base toque el agua) o pulverizar el follaje.',
    fertilizing: 'Fertilizante especial para orquídeas diluido al 50% de la recomendación del envase, aplicado una vez al mes después del riego ordinario en la época de crecimiento.',
    commonProblems: [
      {
        problem: 'Hojas amarillas y blandas',
        solution: 'Exceso de agua o pudrición de raíz. Suspende el riego de inmediato, revisa si hay raíces negras o podridas y córtalas con tijeras desinfectadas.'
      },
      {
        problem: 'Falta de floración',
        solution: 'Falta de luz indirecta suficiente o ausencia de contraste de temperatura día/noche. Mueve la orquídea a una zona más luminosa.'
      },
      {
        problem: 'Hojas arrugadas y raíces secas',
        solution: 'Deshidratación severa. Aumenta la frecuencia de riego por inmersión y la humedad ambiental.'
      },
      {
        problem: 'Plagas (Cochinilla algodonosa)',
        solution: 'Aparecen como pequeños copos blancos de algodón. Retíralas individualmente con un algodón humedecido en alcohol isopropílico.'
      }
    ]
  },
  {
    id: 'guia-anturios',
    title: 'Guía de Cuidado para Anturios',
    category: 'Anturios',
    light: 'Luz indirecta de intensidad media a brillante. Tolera condiciones de luz moderada, pero producirá menos flores si está en una zona muy oscura.',
    water: 'Mantener el sustrato moderadamente húmedo. Regar cuando la superficie de la tierra se sienta seca al tacto (aprox. 1-2 veces por semana en clima cálido).',
    soil: 'Sustrato suelto y bien drenado. Una mezcla de turba, perlita y un poco de corteza de orquídea funciona de maravilla para oxigenar las raíces.',
    temp: 'Temperatura estable entre 18°C y 25°C. Evitar colocar la planta cerca de corrientes de aire frío o radiadores de calefacción directos.',
    humidity: 'Alta (más de 60%). Pulveriza sus hojas con agua no calcárea a diario o utiliza un humidificador cercano.',
    fertilizing: 'Abonar una vez al mes durante primavera y verano con fertilizante específico para plantas de interior con flor para promover espatas coloridas.',
    commonProblems: [
      {
        problem: 'Puntas de las hojas marrones y secas',
        solution: 'Falta de humedad ambiental o uso de agua del grifo con exceso de cloro. Pulveriza más seguido y riega con agua reposada durante 24 horas.'
      },
      {
        problem: 'Hojas amarillentas',
        solution: 'Exceso de riego o sustrato encharcado. Deja secar la tierra antes de volver a regar y asegúrate de que drene bien.'
      },
      {
        problem: 'Las flores salen verdes en vez de rojas/rosas',
        solution: 'Generalmente se debe a la falta de luz indirecta adecuada para que complete su proceso de pigmentación. Acércala a una ventana más iluminada.'
      },
      {
        problem: 'Pudrición del tallo',
        solution: 'Hongo causado por exceso de agua acumulada en la corona. Evita regar directamente sobre el centro de la planta y limpia las partes dañadas.'
      }
    ]
  },
  {
    id: 'guia-suculentas',
    title: 'Guía de Cuidado para Suculentas',
    category: 'Suculentas',
    light: 'Requieren luz abundante, idealmente de 4 a 6 horas de sol directo suave o luz indirecta muy brillante. Si se estiran (etiolación), es señal de falta de luz.',
    water: 'Riego muy escaso. Aplicar el método de "empapar y secar". Esperar a que todo el sustrato esté completamente seco antes de volver a regar. En invierno espaciar al máximo.',
    soil: 'Sustrato mineral poroso y de drenaje rápido. Mezcla de tierra común con perlita, arena gruesa, pómice o grava fina. Evita sustratos arcillosos que retengan agua.',
    temp: 'Rango amplio de 10°C a 30°C. Protegerlas de heladas intensas y constantes bajo cero.',
    humidity: 'Baja. No pulverizar agua sobre sus hojas, ya que la humedad atrapada entre las rosetas propicia hongos y pudrición.',
    fertilizing: 'No requieren abundante abono. Una dosis muy ligera de abono para cactus y suculentas a principios de primavera es suficiente.',
    commonProblems: [
      {
        problem: 'Hojas translúcidas, blandas y caedizas',
        solution: 'Pudrición por exceso de agua. Saca la planta, retira las raíces podridas e infectadas y trasplántala a sustrato seco sin regar por una semana.'
      },
      {
        problem: 'Hojas arrugadas y sin turgencia',
        solution: 'Falta de agua. La planta está consumiendo sus reservas de las hojas. Da un buen riego profundo.'
      },
      {
        problem: 'Plaga de cochinilla en las raíces o rosetas',
        solution: 'Cochinillas harinosas. Trata con insecticida a base de jabón potásico y aceite de neem, o limpia con un bastoncillo humedecido en alcohol.'
      },
      {
        problem: 'Estiramiento excesivo (Etiolación)',
        solution: 'Falta de luz. Las hojas se separan y el tallo se alarga buscando el sol. Muévela a una zona más soleada y, si lo deseas, decapita el brote para replantarlo.'
      }
    ]
  },
  {
    id: 'guia-bonsais',
    title: 'Guía de Cuidado para Bonsáis',
    category: 'Bonsáis',
    light: 'Variable según especie. Ficus y Carmona toleran interiores muy iluminados junto a ventanas. Juníperos requieren exterior absoluto a pleno sol para sobrevivir.',
    water: 'Riego minucioso y regular. Regar cuando la superficie del sustrato comience a secarse. Nunca dejes secar el cepellón por completo, ni dejes la maceta estancada en agua.',
    soil: 'Sustrato especial de alta calidad y drenaje como la Akadama (arcilla japonesa) sola o mezclada con pómice y tierra volcánica.',
    temp: 'Especies tropicales (Ficus, Carmona) requieren resguardo en interiores cálidos en invierno (mínimo 12°C). Juníperos soportan heladas exteriores de forma natural.',
    humidity: 'Media-alta para bonsáis de interior. Pulverizar las hojas con frecuencia, especialmente en verano o bajo el efecto de calefacciones.',
    fertilizing: 'Abonar de forma continua durante la época de crecimiento activo (primavera a otoño) con abono orgánico para bonsáis de liberación lenta.',
    commonProblems: [
      {
        problem: 'Pérdida masiva de hojas verdes (Ficus)',
        solution: 'Cambio brusco de ubicación o corriente de aire frío. El ficus se estresa con facilidad. Elige un lugar luminoso y no lo muevas más.'
      },
      {
        problem: 'Hojas secas y crujientes',
        solution: 'Falta de agua crítica. El sustrato se secó por completo. Sumerge toda la maceta en agua durante 15 minutos para rehidratar el cepellón de emergencia.'
      },
      {
        problem: 'Hojas amarillas que caen lentamente',
        solution: 'Exceso de agua constante o pudrición de raíz por mal drenaje. Revisa que el sustrato no esté compactado.'
      },
      {
        problem: 'Presencia de araña roja',
        solution: 'Aparecen telarañas finas bajo las hojas con diminutos ácaros. Incrementa la humedad pulverizando agua y aplica acaricida específico o aceite de neem.'
      }
    ]
  }
];
