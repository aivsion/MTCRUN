import { Testimonial } from '../types';
import { testimonials as defaultTestimonials } from '../data';

const STORAGE_KEY = 'mtc_testimonials_v2';

/**
 * Get all testimonials from local storage, falling back to data.ts defaults
 */
export function getStoredTestimonials(): Testimonial[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize with default testimonials (approved by default if not set to false)
      const initialized = defaultTestimonials.map(t => ({
        ...t,
        approved: t.approved !== false
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialized));
      return initialized;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading testimonials from localStorage:', error);
    return defaultTestimonials;
  }
}

/**
 * Save testimonials array to local storage
 */
export function saveStoredTestimonials(testimonials: Testimonial[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
  } catch (error) {
    console.error('Error saving testimonials to localStorage:', error);
  }
}

/**
 * Update approved status of a testimonial
 */
export function toggleTestimonialApproval(id: string, isApproved: boolean): Testimonial[] {
  const list = getStoredTestimonials();
  const updated = list.map(t => t.id === id ? { ...t, approved: isApproved } : t);
  saveStoredTestimonials(updated);
  return updated;
}

/**
 * Delete a testimonial by ID
 */
export function deleteTestimonialFromStorage(id: string): Testimonial[] {
  const list = getStoredTestimonials();
  const updated = list.filter(t => t.id !== id);
  saveStoredTestimonials(updated);
  return updated;
}
