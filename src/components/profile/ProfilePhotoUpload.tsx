import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader2 } from 'lucide-react';
import { uploadProfileImage } from '@/lib/firebase/storage';

interface ProfilePhotoUploadProps {
  currentPhotoURL: string | null;
  onPhotoUpdated: (url: string) => void;
  userName: string;
}

export function ProfilePhotoUpload({ currentPhotoURL, onPhotoUpdated, userName }: ProfilePhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar los 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const downloadURL = await uploadProfileImage(file);
      onPhotoUpdated(downloadURL);
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      alert('Error al subir la imagen. Por favor, intenta nuevamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const defaultPhotoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&size=200`;

  return (
    <div className="relative inline-block">
      <motion.div 
        className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {isUploading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <img
            src={currentPhotoURL || defaultPhotoUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      <motion.label
        className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Camera className="w-4 h-4 text-white" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </motion.label>
    </div>
  );
}