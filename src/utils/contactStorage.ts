import { db } from '../firebaseSetup';
import { collection, doc, setDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firebaseError';

const COLLECTION_NAME = 'contacts';

export interface ContactMessage {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  createdAt?: number;
  read?: boolean;
}

export function subscribeToContacts(callback: (contacts: ContactMessage[]) => void, errorCallback?: (error: any) => void) {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const list: ContactMessage[] = [];
    snapshot.forEach(doc => {
      list.push({ id: doc.id, ...doc.data() } as ContactMessage);
    });
    callback(list);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    if (errorCallback) errorCallback(error);
  });
}

export async function addContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): Promise<string> {
  const id = `msg-${Date.now()}`;
  const docRef = doc(db, COLLECTION_NAME, id);
  try {
    await setDoc(docRef, { 
      ...message, 
      createdAt: Date.now(),
      read: false
    });
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${id}`);
    throw error;
  }
}

export async function markContactMessageAsRead(id: string, read: boolean = true): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  try {
    await setDoc(docRef, { read }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    throw error;
  }
}

export async function deleteContactMessage(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
    throw error;
  }
}
