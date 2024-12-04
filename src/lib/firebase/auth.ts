import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendEmailVerification as firebaseSendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from './config';
import { createClient } from './firestore';

export const createUser = async (email: string, password: string, name?: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (name) {
      await updateProfile(user, { displayName: name });
    }

    // Create user profile in Firestore
    await createClient({
      id: user.uid,
      nombre: name || '',
      correo_electronico: email,
      numero_telefono: '',
      direccion: '',
      nombre_usuario: email.split('@')[0],
      fecha_registro: new Date(),
      email_verificado: false
    });

    await sendVerificationEmail();
    return user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const sendVerificationEmail = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await firebaseSendEmailVerification(user);
    } else {
      throw new Error('No user is currently signed in');
    }
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Este email ya está registrado';
    case 'auth/invalid-email':
      return 'Email inválido';
    case 'auth/operation-not-allowed':
      return 'Operación no permitida';
    case 'auth/weak-password':
      return 'La contraseña es muy débil';
    case 'auth/user-disabled':
      return 'Usuario deshabilitado';
    case 'auth/user-not-found':
      return 'Usuario no encontrado';
    case 'auth/wrong-password':
      return 'Contraseña incorrecta';
    default:
      return 'Error al procesar la solicitud';
  }
}