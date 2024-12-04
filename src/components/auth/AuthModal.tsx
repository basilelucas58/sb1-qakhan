import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react';
import { createUser, signIn, sendVerificationEmail } from '@/lib/firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const validatePassword = () => {
    if (formData.password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/[A-Z]/.test(formData.password)) {
      return 'La contraseña debe contener al menos una mayúscula';
    }
    if (!/[0-9]/.test(formData.password)) {
      return 'La contraseña debe contener al menos un número';
    }
    if (!/[!@#$%^&*]/.test(formData.password)) {
      return 'La contraseña debe contener al menos un carácter especial (!@#$%^&*)';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!isLogin) {
        // Registration validation
        const passwordError = validatePassword();
        if (passwordError) {
          setError(passwordError);
          setLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError('Las contraseñas no coinciden');
          setLoading(false);
          return;
        }

        const user = await createUser(formData.email, formData.password, formData.name);
        await sendVerificationEmail();
        setVerificationSent(true);
      } else {
        await signIn(formData.email, formData.password);
      }

      if (!verificationSent) {
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderVerificationMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-6"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-green-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">¡Verifica tu correo electrónico!</h3>
      <p className="text-gray-600 mb-4">
        Hemos enviado un enlace de verificación a {formData.email}. Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
      </p>
      <button
        onClick={onClose}
        className="w-full bg-[#2B5BA9] text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Entendido
      </button>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {verificationSent ? (
              renderVerificationMessage()
            ) : (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-start gap-2"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Tu nombre completo"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                        required
                        minLength={8}
                      />
                    </div>
                    {!isLogin && (
                      <p className="mt-1 text-xs text-gray-500">
                        Mínimo 8 caracteres, una mayúscula, un número y un carácter especial
                      </p>
                    )}
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData({ ...formData, confirmPassword: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="••••••••"
                          required
                          minLength={8}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2B5BA9] text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                    )}
                  </button>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError(null);
                        setFormData({
                          email: '',
                          password: '',
                          confirmPassword: '',
                          name: ''
                        });
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {isLogin
                        ? '¿No tienes cuenta? Regístrate'
                        : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}