import { motion } from 'framer-motion';

interface PetServiceGridProps {
  onServiceClick: (serviceType: string) => void;
}

const petServices = [
  { id: 'veterinarias', title: 'Veterinarias', emoji: '🏥' },
  { id: 'guarderias', title: 'Guarderías', emoji: '🏠' },
  { id: 'adopciones', title: 'Adopciones', emoji: '🐶' },
  { id: 'pensiones', title: 'Pensiones', emoji: '🐎' },
  { id: 'peluquerias', title: 'Peluquerías', emoji: '✂️' },
  { id: 'paseadores', title: 'Paseadores', emoji: '🦮' },
  { id: 'adiestradores', title: 'Adiestradores', emoji: '🦴' },
  { id: 'clases-equitacion', title: 'Clases Equitación', emoji: '🐎' }
];

export function PetServiceGrid({ onServiceClick }: PetServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      {petServices.map((service, index) => (
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