export type Page = 'accueil' | 'prestations' | 'galerie' | 'contact' | 'admin';

export interface Engagement {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Domain {
  id: string;
  number: string;
  title: string;
  description: string;
  bullets: string[];
  imageUrl: string;
}

export interface Project {
  id: string;
  number: string;
  category: 'MAÇONNERIE' | 'CHARPENTE' | 'AMÉNAGEMENTS BOIS' | 'CHARPENTE BOIS' | 'MENUISERIE BOIS';
  title: string;
  description: string;
  imageUrl: string;
  isHero?: boolean;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  category: 'CHARPENTE BOIS' | 'AMÉNAGEMENTS BOIS' | 'MENUISERIE BOIS';
  chantierId: string;
  chantierName: string;
  location: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  projectType: string;
  city: string;
  region: string;
  country: string;
  comment: string;
  rating: number;
  period: string;
  projectPhotos?: string[];
  approved?: boolean;
}

