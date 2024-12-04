import { Timestamp } from 'firebase/firestore';

// Cliente Types
export interface Cliente {
  id: string;
  nombre: string;
  correo_electronico: string;
  numero_telefono: string;
  direccion: string;
  nombre_usuario: string;
  password_hash: string; // Never store plain passwords
  fecha_registro: Timestamp;
  servicios?: string[]; // Array of service IDs
}

// Servicio Types
export interface Servicio {
  id: string;
  cliente_id: string;
  tipo_servicio: string;
  fecha_inicio: Timestamp;
  duracion: number; // in minutes
  precio: number;
  estado: 'pendiente' | 'confirmado' | 'completado' | 'cancelado';
  metadata: {
    creado: Timestamp;
    actualizado: Timestamp;
  };
}

// Collection Names
export const COLLECTIONS = {
  CLIENTES: 'clientes',
  SERVICIOS: 'servicios',
} as const;