import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  delay: number;
}

export function ServiceCard({ title, description, imageUrl, delay }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="h-48 overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}