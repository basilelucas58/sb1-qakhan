import { motion } from 'framer-motion';

interface AssistanceService {
  id: string;
  title: string;
  emoji: string;
}

const assistanceServices: AssistanceService[] = [
  {
    id: 'ninos',
    title: 'Niños',
    emoji: '👶'
  },
  {
    id: 'adultos',
    title: 'Adultos',
    emoji: '🧓'
  },
  {
    id: 'nutricion',
    title: 'Nutrición',
    emoji: '🥗'
  },
  {
    id: 'psicologia',
    title: 'Psicología',
    emoji: '🧠'
  },
  {
    id: 'mecanica',
    title: 'Mecánica',
    emoji: '🔧'
  },
  {
    id: 'tecnologica',
    title: 'Tecnológica',
    emoji: '💻'
  },
  {
    id: 'idiomas',
    title: 'Idiomas',
    emoji: '🗣️'
  },
  {
    id: 'viajes',
    title: 'Viajes',
    emoji: '✈️'
  }
];

export function AssistanceServiceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      {assistanceServices.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="bg-white rounded-xl p-6 w-full aspect-square flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <span className="text-7xl mb-4">{service.emoji}</span>
            <div className="bg-[#2B5BA9] text-white py-2 px-6 rounded-full text-lg font-medium w-full text-center">
              {service.title}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}