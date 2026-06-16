import { Testimonial } from '../types';
import { db } from '../firebaseSetup';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firebaseError';

const COLLECTION_NAME = 'testimonials';

export function subscribeToTestimonials(callback: (testimonials: Testimonial[]) => void, errorCallback?: (error: any) => void) {
  // Usually we'd want only approved ones for public and all for admin.
  // Since rules allow admin to read all, we can just fetch all, but we might get permission denied if not admin.
  // We should create separate functions or handle it based on auth.
  // Wait, we'll let the component pass `isAdmin` flag to get either all or only approved.
  return () => {}; // Temporary, will implement properly
}

export function subscribeToPublicTestimonials(callback: (testimonials: Testimonial[]) => void, errorCallback?: (error: any) => void) {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('approved', '==', true)
  );
  
  return onSnapshot(q, (snapshot) => {
    const list: Testimonial[] = [];
    snapshot.forEach(doc => {
      list.push({ id: doc.id, ...doc.data() } as Testimonial);
    });
    // Sort on client descending
    list.sort((a, b) => ((b as any).createdAt || 0) - ((a as any).createdAt || 0));
    callback(list);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    if (errorCallback) errorCallback(error);
  });
}

export function subscribeToAdminTestimonials(callback: (testimonials: Testimonial[]) => void, errorCallback?: (error: any) => void) {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const list: Testimonial[] = [];
    snapshot.forEach(doc => {
      list.push({ id: doc.id, ...doc.data() } as Testimonial);
    });
    callback(list);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    if (errorCallback) errorCallback(error);
  });
}

export async function addTestimonialToStorage(newTestimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  const id = `testimonial-${Date.now()}`;
  const docRef = doc(db, COLLECTION_NAME, id);
  try {
    await setDoc(docRef, { ...newTestimonial, approved: false, createdAt: Date.now() });
    return { ...newTestimonial, id, approved: false };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${id}`);
    throw error;
  }
}

export async function toggleTestimonialApproval(id: string, isApproved: boolean): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  try {
    await setDoc(docRef, { approved: isApproved }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    throw error;
  }
}

export async function deleteTestimonialFromStorage(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
    throw error;
  }
}

