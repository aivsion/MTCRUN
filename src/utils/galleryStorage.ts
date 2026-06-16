import { GalleryPhoto } from '../types';
import { db } from '../firebaseSetup';
import { collection, getDocs, doc, setDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firebaseError';

const COLLECTION_NAME = 'gallery_photos';

export function subscribeToGalleryPhotos(callback: (photos: GalleryPhoto[]) => void, errorCallback?: (error: any) => void) {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const photos: GalleryPhoto[] = [];
    snapshot.forEach(doc => {
      photos.push({ id: doc.id, ...doc.data() } as GalleryPhoto);
    });
    callback(photos);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
    if (errorCallback) errorCallback(error);
  });
}

export async function addPhotoToStorage(newPhoto: Omit<GalleryPhoto, 'id'>): Promise<GalleryPhoto> {
  const id = `photo-${Date.now()}`;
  const docRef = doc(db, COLLECTION_NAME, id);
  try {
    await setDoc(docRef, { ...newPhoto, createdAt: Date.now() }); // Using Date.now so it's a number, compliant with our rule
    return { ...newPhoto, id };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${id}`);
    throw error;
  }
}

export async function updatePhotoInStorage(updatedPhoto: GalleryPhoto): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, updatedPhoto.id);
  const data = { ...updatedPhoto };
  // remove id property before saving
  delete (data as any).id;
  try {
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${updatedPhoto.id}`);
    throw error;
  }
}

export async function deletePhotoFromStorage(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
    throw error;
  }
}

export async function clearAllPhotosFromStorage(): Promise<void> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, COLLECTION_NAME);
    throw error;
  }
}

