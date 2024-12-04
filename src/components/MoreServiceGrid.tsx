import { motion } from 'framer-motion';

interface MoreService {
  id: string;
  title: string;
  emoji: string;
}

const moreServices: MoreService[] = [
  {
    id: 'musica',
    title: 'Clases de música',
    emoji: '🎹'
  },
  {
    id: 'fotografia',
    title: 'Fotografía & video',
    emoji: '📸'
  },
  {
    id: 'artes-plasticas',
    title: 'Artes plásticas',
    emoji: '🎨'
  },
  {
    id: 'diseno-moda',
    title: 'Diseño & moda',
    emoji: '👗'
  },
  {
    id: 'influencers',
    title: 'Influencers',
    emoji: '📱'
  },
  {
    id: 'artes-escenicas',
    title: 'Artes escénicas',
    emoji: '💃'
  },
  {
    id: 'exposiciones',
    title: 'Exposiciones',
    emoji: '🎭'
  },
  {
    id: 'astrologia',
    title: 'Astrología',
    emoji: '🔮'
  }
];

export function MoreServiceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      {moreServices.map((service, index) => (
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