import { motion } from 'framer-motion';

export function Hero() {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center mb-12">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B5BA9]/20 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center px-4 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Estamos aquí para ayudarte
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
          En Labura.com conectamos personas con los mejores profesionales de Argentina. 
          Encuentra expertos confiables para cualquier servicio que necesites, 
          desde el hogar hasta el desarrollo personal.
        </p>
        <p className="text-lg text-white/90 mb-12">
          Miles de profesionales verificados listos para ayudarte en todo el país
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="text-white text-center">
            <div className="text-3xl font-bold mb-2">+1000</div>
            <div className="text-sm">Profesionales verificados</div>
          </div>
          <div className="text-white text-center">
            <div className="text-3xl font-bold mb-2">+50</div>
            <div className="text-sm">Categorías de servicios</div>
          </div>
          <div className="text-white text-center">
            <div className="text-3xl font-bold mb-2">+5000</div>
            <div className="text-sm">Clientes satisfechos</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}