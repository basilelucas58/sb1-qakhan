import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';
import { auth } from './config';
import { updateProfile } from 'firebase/auth';
import { updateClient } from './firestore';

export const uploadProfileImage = async (file: File) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user authenticated');

    // Create a reference to the file location
    const fileRef = ref(storage, `profile-photos/${user.uid}/${Date.now()}-${file.name}`);
    
    // Upload the file
    const snapshot = await uploadBytes(fileRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Update user profile in Firebase Auth
    await updateProfile(user, {
      photoURL: downloadURL
    });

    // Update user profile in Firestore
    await updateClient(user.uid, {
      foto_perfil: downloadURL
    });

    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw new Error('Error al subir la imagen de perfil');
  }
};