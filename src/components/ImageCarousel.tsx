import { motion } from 'framer-motion';

const images = [
  {
    url: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&q=80",
    alt: "Glaciar Perito Moreno"
  },
  {
    url: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&q=80",
    alt: "Bariloche"
  },
  {
    url: "https://images.unsplash.com/photo-1613249352988-6dd627070dc5?auto=format&fit=crop&q=80",
    alt: "Caminito"
  },
  {
    url: "https://images.unsplash.com/photo-1544585037-c4b2d404b49d?auto=format&fit=crop&q=80",
    alt: "Cataratas del Iguazú"
  }
];

export function ImageCarousel() {
  return (
    <div className="flex gap-4 mt-24 overflow-hidden">
      {images.map((image, index) => (
        <motion.div
          key={image.alt}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative min-w-[300px] h-[500px] rounded-3xl overflow-hidden"
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
      ))}
    </div>
  );
}