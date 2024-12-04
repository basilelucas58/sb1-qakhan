import React, { useState, useEffect } from 'react';
import { Star, Heart, MapPin, CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { getServiceProviders } from '@/lib/firebase/firestore';

interface ServiceDetailProps {
  onBack: () => void;
  serviceType: string;
  category: string;
}

export function ServiceDetail({ onBack, serviceType, category }: ServiceDetailProps) {
  const [providers, setProviders] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await getServiceProviders(category, serviceType);
        setProviders(data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [category, serviceType]);

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(providerId)) {
        newFavorites.delete(providerId);
      } else {
        newFavorites.add(providerId);
      }
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#59B7F9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#59B7F9] p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-8"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver</span>
        </button>

        {providers.length === 0 ? (
          <Card className="bg-white rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">No hay proveedores disponibles</h2>
            <p className="text-gray-600">
              Actualmente no hay profesionales registrados para este servicio.
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {providers.map((provider) => (
              <Card key={provider.id} className="bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={provider.foto_perfil || `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.nombre)}`}
                        alt={provider.nombre}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold">{provider.nombre}</h2>
                          {provider.verificado && (
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span>{provider.calificacion}</span>
                          <span>({provider.reviews} reseñas)</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(provider.id)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Heart className={`w-6 h-6 ${favorites.has(provider.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <MapPin className="w-5 h-5" />
                    <span>{provider.ubicacion}</span>
                    <span className="mx-2">•</span>
                    <span>Radio {provider.radio_cobertura}KM</span>
                  </div>

                  <p className="text-gray-600 mb-6">{provider.descripcion}</p>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-[#2B5BA9] text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                      Solicitar cotización
                    </button>
                    <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#2B5BA9] text-[#2B5BA9] rounded-full font-semibold hover:bg-blue-50 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      Mensaje
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}