import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, MapPin, Star, Shield, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { getClient } from '@/lib/firebase/firestore';
import { signOut } from '@/lib/firebase/auth';
import { EditProfileModal } from './EditProfileModal';
import { ProfilePhotoUpload } from './ProfilePhotoUpload';

interface UserProfileProps {
  onBack: () => void;
}

interface UserProfileData {
  nombre: string;
  profesion: string;
  servicios: string[];
  ubicacion: string;
  descripcion: string;
  foto_perfil: string;
  calificacion: number;
  reviews: number;
  verificado: boolean;
}

const defaultProfileData: UserProfileData = {
  nombre: '',
  profesion: '',
  servicios: [],
  ubicacion: '',
  descripcion: '',
  foto_perfil: '',
  calificacion: 0,
  reviews: 0,
  verificado: false
};

export function UserProfile({ onBack }: UserProfileProps) {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData>(defaultProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const data = await getClient(user.uid);
          if (data) {
            setProfileData({
              ...defaultProfileData,
              ...data,
              nombre: user.displayName || '',
              foto_perfil: user.photoURL || ''
            });
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handlePhotoUpdated = (url: string) => {
    setProfileData(prev => ({ ...prev, foto_perfil: url }));
  };

  const handleLogout = async () => {
    try {
      await signOut();
      onBack();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#59B7F9] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Header with Back Button */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
          <div className="absolute top-4 left-4">
            <button
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>

        {/* Profile Content */}
        <div className="relative px-8 -mt-24 pb-8">
          {/* Profile Picture */}
          <ProfilePhotoUpload
            currentPhotoURL={profileData.foto_perfil}
            onPhotoUpdated={handlePhotoUpdated}
            userName={profileData.nombre}
          />

          {/* Profile Info */}
          <div className="mt-6">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">{profileData.nombre}</h1>
              {profileData.verificado && (
                <Shield className="w-6 h-6 text-blue-500 fill-current" />
              )}
            </div>

            <div className="flex items-center gap-4 mt-2 text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {profileData.ubicacion || 'Sin ubicación'}
              </span>
              {profileData.calificacion > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  {profileData.calificacion} ({profileData.reviews} reseñas)
                </span>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Profesión</h2>
              <p className="mt-2 text-gray-600">{profileData.profesion || 'No especificada'}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Servicios</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.servicios.length > 0 ? (
                  profileData.servicios.map((servicio, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {servicio}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No hay servicios registrados</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Descripción</h2>
              <p className="mt-2 text-gray-600">
                {profileData.descripcion || 'No hay descripción disponible'}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-8 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Editar perfil
            </button>
          </div>
        </div>
      </motion.div>

      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        currentData={profileData}
        onUpdate={setProfileData}
      />
    </div>
  );
}