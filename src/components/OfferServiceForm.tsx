import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronRight, MapPin, Clock, FileText, Loader2 } from 'lucide-react';
import { useAuth } from './auth/AuthContext';
import { addServiceOffering } from '@/lib/firebase/firestore';

interface OfferServiceFormProps {
  onClose: () => void;
}

export function OfferServiceForm({ onClose }: OfferServiceFormProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    descripcion: '',
    ubicacion: '',
    radio_cobertura: 10,
    horarios: '',
    portfolio: [] as File[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { id: 'hogar', name: 'Hogar', emoji: '🏠' },
    { id: 'mascotas', name: 'Mascotas', emoji: '🐾' },
    { id: 'deporte', name: 'Deporte', emoji: '⚽' },
    { id: 'estetica', name: 'Estética', emoji: '💅' },
    { id: 'asistencia', name: 'Asistencia', emoji: '🤝' },
    { id: 'mas', name: 'Más', emoji: '✨' }
  ];

  const services = {
    hogar: [
      { id: 'pintores', name: 'Pintores', emoji: '🎨' },
      { id: 'jardineria', name: 'Jardinería', emoji: '🌳' },
      { id: 'mudanzas', name: 'Mudanzas', emoji: '📦' },
      { id: 'seguridad', name: 'Seguridad', emoji: '🔒' },
      { id: 'pileteros', name: 'Pileteros', emoji: '🏊' },
      { id: 'limpieza', name: 'Limpieza', emoji: '🧹' },
      { id: 'carpinteria', name: 'Carpintería', emoji: '🔨' },
      { id: 'plomeria', name: 'Plomería', emoji: '🔧' }
    ],
    mascotas: [
      { id: 'veterinarias', name: 'Veterinarias', emoji: '🏥' },
      { id: 'guarderias', name: 'Guarderías', emoji: '🏠' },
      { id: 'adopciones', name: 'Adopciones', emoji: '🐶' },
      { id: 'pensiones', name: 'Pensiones', emoji: '🐎' },
      { id: 'peluquerias', name: 'Peluquerías', emoji: '✂️' },
      { id: 'paseadores', name: 'Paseadores', emoji: '🦮' },
      { id: 'adiestradores', name: 'Adiestradores', emoji: '🦴' },
      { id: 'clases-equitacion', name: 'Clases Equitación', emoji: '🐎' }
    ],
    deporte: [
      { id: 'golf', name: 'Golf', emoji: '⛳' },
      { id: 'navegacion', name: 'Navegación', emoji: '⛵' },
      { id: 'tennis', name: 'Tennis', emoji: '🎾' },
      { id: 'gym', name: 'Gym', emoji: '💪' },
      { id: 'skate', name: 'Skate', emoji: '🛹' },
      { id: 'snow-ski', name: 'Snow & Ski', emoji: '🎿' },
      { id: 'surf', name: 'Surf', emoji: '🏄' },
      { id: 'yoga', name: 'Yoga', emoji: '🧘' }
    ],
    estetica: [
      { id: 'tatuajes', name: 'Tatuajes', emoji: '💉' },
      { id: 'salones', name: 'Salones', emoji: '💅' },
      { id: 'peluquerias', name: 'Peluquerías', emoji: '💇' },
      { id: 'tratamientos', name: 'Tratamientos', emoji: '🧴' },
      { id: 'depilacion', name: 'Depilación', emoji: '✨' },
      { id: 'spa', name: 'Spa', emoji: '🧖' },
      { id: 'masajes', name: 'Masajes', emoji: '💆' },
      { id: 'asesoria', name: 'Asesoría', emoji: '👗' }
    ],
    asistencia: [
      { id: 'ninos', name: 'Niños', emoji: '👶' },
      { id: 'adultos', name: 'Adultos', emoji: '🧓' },
      { id: 'nutricion', name: 'Nutrición', emoji: '🥗' },
      { id: 'psicologia', name: 'Psicología', emoji: '🧠' },
      { id: 'mecanica', name: 'Mecánica', emoji: '🔧' },
      { id: 'tecnologica', name: 'Tecnológica', emoji: '💻' },
      { id: 'idiomas', name: 'Idiomas', emoji: '🗣️' },
      { id: 'viajes', name: 'Viajes', emoji: '✈️' }
    ],
    mas: [
      { id: 'musica', name: 'Clases de música', emoji: '🎹' },
      { id: 'fotografia', name: 'Fotografía & video', emoji: '📸' },
      { id: 'artes-plasticas', name: 'Artes plásticas', emoji: '🎨' },
      { id: 'diseno-moda', name: 'Diseño & moda', emoji: '👗' },
      { id: 'influencers', name: 'Influencers', emoji: '📱' },
      { id: 'artes-escenicas', name: 'Artes escénicas', emoji: '💃' },
      { id: 'exposiciones', name: 'Exposiciones', emoji: '🎭' },
      { id: 'astrologia', name: 'Astrología', emoji: '🔮' }
    ]
  };

  const handleSubmit = async () => {
    if (!user) {
      setError('Debes iniciar sesión para ofrecer servicios');
      return;
    }

    setLoading(true);
    try {
      await addServiceOffering(user.uid, {
        categoria: selectedCategory,
        tipo_servicio: selectedService,
        descripcion: formData.descripcion,
        ubicacion: formData.ubicacion,
        radio_cobertura: formData.radio_cobertura,
        horarios: formData.horarios
      });
      onClose();
    } catch (error) {
      console.error('Error al registrar el servicio:', error);
      setError('Error al registrar el servicio. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Ofrecer Servicio</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    step >= i ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Selecciona una categoría</h3>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setStep(2);
                    }}
                    className="p-6 rounded-xl border-2 transition-colors hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center gap-2"
                  >
                    <span className="text-4xl">{category.emoji}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && selectedCategory && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Selecciona un servicio</h3>
              <div className="grid grid-cols-2 gap-4">
                {services[selectedCategory as keyof typeof services].map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service.id);
                      setStep(3);
                    }}
                    className="p-6 rounded-xl border-2 transition-colors hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center gap-2"
                  >
                    <span className="text-4xl">{service.emoji}</span>
                    <span className="font-medium">{service.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Detalles del servicio</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del servicio
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="Describe tu servicio..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tu ubicación"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Radio de cobertura (KM)
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.radio_cobertura}
                  onChange={(e) => setFormData({ ...formData, radio_cobertura: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600">{formData.radio_cobertura} KM</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horarios disponibles
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.horarios}
                    onChange={(e) => setFormData({ ...formData, horarios: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: Lunes a Viernes 9:00 - 18:00"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Registrando...</span>
                    </>
                  ) : (
                    <span>Registrar servicio</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}