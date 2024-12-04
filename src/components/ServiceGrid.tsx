import { motion } from 'framer-motion';

interface ServiceGridProps {
  onServiceClick: (serviceType: string) => void;
}

const homeServices = [
  { id: 'pintores', title: 'Pintores', emoji: '🎨' },
  { id: 'jardineria', title: 'Jardinería', emoji: '🌳' },
  { id: 'mudanzas', title: 'Mudanzas', emoji: '📦' },
  { id: 'seguridad', title: 'Seguridad', emoji: '🔒' },
  { id: 'pileteros', title: 'Pileteros', emoji: '🏊' },
  { id: 'limpieza', title: 'Limpieza', emoji: '🧹' },
  { id: 'carpinteria', title: 'Carpintería', emoji: '🔨' },
  { id: 'plomeria', title: 'Plomería', emoji: '🔧' }
];

export function ServiceGrid({ onServiceClick }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      {homeServices.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
          onClick={() => onServiceClick(service.id)}
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