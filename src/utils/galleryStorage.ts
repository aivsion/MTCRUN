import { GalleryPhoto } from '../types';
import { galleryPhotos as defaultPhotos } from '../data';

const STORAGE_KEY = 'mtc_run_gallery_photos_v1';

/**
 * Get all gallery photos from local storage, falling back to data.ts defaults
 */
export function getStoredPhotos(): GalleryPhoto[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize with default photos
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPhotos));
      return defaultPhotos;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading gallery photos from localStorage:', error);
    return defaultPhotos;
  }
}

/**
 * Save photos array to local storage
 */
export function saveStoredPhotos(photos: GalleryPhoto[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  } catch (error) {
    console.error('Error saving gallery photos to localStorage:', error);
  }
}

/**
 * Add a new photo to the list
 */
export function addPhotoToStorage(newPhoto: Omit<GalleryPhoto, 'id'>): GalleryPhoto {
  const photos = getStoredPhotos();
  const created: GalleryPhoto = {
    ...newPhoto,
    id: `photo-${Date.now()}`
  };
  
  const updated = [created, ...photos];
  saveStoredPhotos(updated);
  return created;
}

/**
 * Update an existing photo by ID
 */
export function updatePhotoInStorage(updatedPhoto: GalleryPhoto): void {
  const photos = getStoredPhotos();
  const updated = photos.map(p => p.id === updatedPhoto.id ? updatedPhoto : p);
  saveStoredPhotos(updated);
}

/**
 * Delete a photo by ID
 */
export function deletePhotoFromStorage(id: string): void {
  const photos = getStoredPhotos();
  const updated = photos.filter(p => p.id !== id);
  saveStoredPhotos(updated);
}
