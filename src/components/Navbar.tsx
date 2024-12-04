import { User, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AuthModal } from './auth/AuthModal';
import { useAuth } from './auth/AuthContext';
import { signOut } from '@/lib/firebase/auth';
import { UserProfile } from './profile/UserProfile';

interface NavbarProps {
  onHomeClick: () => void;
  onOfferService: () => void;
}

export function Navbar({ onHomeClick, onOfferService }: NavbarProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (showProfile) {
    return <UserProfile onBack={() => setShowProfile(false)} />;
  }

  return (
    <>
      <nav className="bg-transparent absolute top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            className="cursor-pointer select-none"
            onClick={onHomeClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="block text-white text-4xl font-extrabold tracking-wider" 
                  style={{ 
                    fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}>
              ARGENTINA
            </span>
            <span className="block text-white text-2xl font-light -mt-1"
                  style={{ 
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '0.05em'
                  }}>
              Labura.com
            </span>
          </motion.div>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={onOfferService}
              className="text-white hover:text-gray-200 transition-colors"
            >
              Ofrecer servicio
            </button>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 bg-white text-[#59B7F9] px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'Profile'} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-8 h-8" />
                  )}
                  <span className="font-medium">{user.displayName || 'Usuario'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50"
                    >
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          setShowProfile(true);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Mi Perfil</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          // Add settings navigation here
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Configuración</span>
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 bg-white text-[#59B7F9] px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <User className="w-5 h-5" />
                Iniciar
              </button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}