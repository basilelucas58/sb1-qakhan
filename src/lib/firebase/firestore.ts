import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { db } from './config';

interface ClientData {
  id: string;
  nombre: string;
  correo_electronico: string;
  numero_telefono: string;
  direccion: string;
  nombre_usuario: string;
  fecha_registro: Date;
  email_verificado: boolean;
  foto_perfil?: string;
  profesion?: string;
  servicios?: string[];
  ubicacion?: string;
  descripcion?: string;
  calificacion?: number;
  reviews?: number;
  verificado?: boolean;
}

export const createClient = async (data: ClientData) => {
  try {
    const clientRef = doc(db, 'usuarios', data.id);
    await setDoc(clientRef, {
      ...data,
      fecha_registro: serverTimestamp(),
      calificacion: 0,
      reviews: 0,
      verificado: false,
      servicios: []
    });
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const getClient = async (userId: string) => {
  try {
    const clientRef = doc(db, 'usuarios', userId);
    const docSnap = await getDoc(clientRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching client:', error);
    throw error;
  }
};

export const updateClient = async (userId: string, data: Partial<ClientData>) => {
  try {
    const clientRef = doc(db, 'usuarios', userId);
    await updateDoc(clientRef, {
      ...data,
      updated_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

export const getServiceProviders = async (categoria: string, servicio: string) => {
  try {
    const usersRef = collection(db, 'usuarios');
    const q = query(
      usersRef,
      where('servicios_ofrecidos', 'array-contains', {
        categoria,
        tipo_servicio: servicio
      })
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching service providers:', error);
    return [];
  }
};

export const addServiceOffering = async (userId: string, serviceData: {
  categoria: string;
  tipo_servicio: string;
  descripcion: string;
  ubicacion: string;
  radio_cobertura: number;
}) => {
  try {
    const userRef = doc(db, 'usuarios', userId);
    await updateDoc(userRef, {
      servicios_ofrecidos: [{
        ...serviceData,
        fecha_registro: serverTimestamp(),
        calificacion: 0,
        reviews: 0,
        verified: false,
        portfolio_urls: []
      }]
    });
  } catch (error) {
    console.error('Error adding service offering:', error);
    throw error;
  }
};