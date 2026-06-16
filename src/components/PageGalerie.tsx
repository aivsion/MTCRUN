import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, MapPin, Grid, Layers, Compass } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface PageGalerieProps {
  openModal: (title: string, content: string, imageUrl?: string, category?: string, chantierId?: string) => void;
  photos: GalleryPhoto[];
}

export default function PageGalerie({ openModal, photos }: PageGalerieProps) {
  const [activeFilter, setActiveFilter] = useState<'TOUTES' | 'CHARPENTE BOIS' | 'AMÉNAGEMENTS BOIS' | 'MENUISERIE BOIS'>('TOUTES');

  const filters: ('TOUTES' | 'CHARPENTE BOIS' | 'AMÉNAGEMENTS BOIS' | 'MENUISERIE BOIS')[] = [
    'TOUTES',
    'CHARPENTE BOIS',
    'AMÉNAGEMENTS BOIS',
    'MENUISERIE BOIS'
  ];

  // Filter photos matching active category filter
  const filteredPhotos = activeFilter === 'TOUTES'
    ? photos
    : photos.filter(p => p.category === activeFilter);

  const handleDiscoverPhoto = (photo: GalleryPhoto) => {
    const details = `OUVRAGE DE HAUTE PRÉCISION : ${photo.title}
Localisation : ${photo.location}
Spécificité : ${photo.chantierName} (${photo.category})

SPÉCIFICATIONS TECHNIQUES ET RÉSISTANCE :
${photo.description}

Chez MTC RUN CONSTRUCTION, nos charpentes fines, menuiseries d'exception et decks de varangues font l'objet d'un processus rigoureux : sélection méticuleuse d'essences d'arbres locales et d'importations durables (FSC), contrôle hygrométrique à 12%, taille d'une précision millimétrique par commande numérique (CNC), et finition de haute durabilité préservant le veinage et résistant aux dures atmosphères marines de La Réunion.`;

    openModal(photo.title, details, photo.url, photo.category, photo.chantierId);
  };

  return (
    <div className="w-full bg-[#fcfbfa] text-[#1a1c1c]">
      {/* 1. HERO SECTION */}
      <section className="bg-[#051a0f] text-white py-20 md:py-28 relative">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059] block font-semibold">
            Savoir-Faire &amp; Perfectionnisme
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-normal">
            Notre Galerie de Réalisations
          </h1>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto my-4"></div>
          <p className="font-sans text-gray-300 font-light text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Une immersion visuelle au cœur de nos ouvrages d'exception : charpente traditionnelle fine, aménagements en bois nobles et détails de précision à travers La Réunion.
          </p>
        </div>
      </section>

      {/* 2. FILTER BAR */}
      <section className="py-4 md:py-6 border-b border-gray-100 bg-white sticky top-[96px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-start md:justify-center gap-3 md:gap-5 overflow-x-auto scrollbar-none pb-1 md:pb-0 select-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-sans text-xs uppercase tracking-wider px-5 py-3 border transition-all duration-300 focus:outline-none cursor-pointer flex-shrink-0 whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-[#051a0f] text-[#C5A059] border-[#051a0f] font-semibold'
                  : 'bg-transparent text-gray-500 hover:text-[#051a0f] border-gray-200 hover:border-[#051a0f]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* 3. CORE STATISTICS ACCENT */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <div className="bg-white border border-stone-200/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#051a0f]/5 text-[#C5A059]">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block font-sans text-[10px] tracking-widest text-[#C5A059] uppercase font-bold">EXCELLENCE CERTIFIÉE</span>
              <span className="block font-sans text-xs text-stone-500">Chantiers durables conformes aux normes tropicales</span>
            </div>
          </div>
          <div className="h-px md:h-10 w-full md:w-px bg-stone-200"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-12 text-center md:text-left">
            <div>
              <span className="block font-serif text-xl font-bold text-[#051a0f]">{photos.filter(p => p.category === 'CHARPENTE BOIS').length}</span>
              <span className="block font-sans text-[9px] text-stone-500 uppercase tracking-wider font-semibold">Charpente Bois</span>
            </div>
            <div>
              <span className="block font-serif text-xl font-bold text-[#051a0f]">{photos.filter(p => p.category === 'AMÉNAGEMENTS BOIS').length}</span>
              <span className="block font-sans text-[9px] text-stone-500 uppercase tracking-wider font-semibold">Aménagements</span>
            </div>
            <div>
              <span className="block font-serif text-xl font-bold text-[#051a0f]">{photos.filter(p => p.category === 'MENUISERIE BOIS').length}</span>
              <span className="block font-sans text-[9px] text-stone-500 uppercase tracking-wider font-semibold">Menuiseries</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHOTO GALLERY GRID */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-100 rounded-none space-y-4">
            <span className="inline-block p-4 bg-stone-50 text-[#C5A059] rounded-full">
              <Compass className="w-8 h-8 opacity-40" />
            </span>
            <h3 className="font-serif text-lg font-medium text-[#051a0f]">Aucune réalisation</h3>
            <p className="font-sans text-stone-400 text-sm max-w-md mx-auto">Aucun de nos ouvrages ne correspond à la catégorie sélectionnée pour l’instant.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={photo.id}
                  onClick={() => handleDiscoverPhoto(photo)}
                  className="group relative aspect-[4/3] bg-stone-150 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/40 hover:border-[#C5A059]/30 flex flex-col justify-end"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Elegant refined dark to translucent gold gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03100a]/95 via-[#03100a]/50 to-[#03100a]/10 group-hover:via-[#03100a]/80 transition-all duration-300 z-10"></div>

                  {/* Top floating metadata */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-25 pointer-events-none">
                    <span className="bg-[#C5A059] text-[#051a0f] text-[9px] uppercase tracking-widest px-2.5 py-1.5 font-bold shadow-md">
                      {photo.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-white bg-[#03100a]/60 backdrop-blur-xs text-[9px] uppercase tracking-wider px-2 py-1 shadow-xs border border-white/10 font-medium">
                      <MapPin className="w-2.5 h-2.5 text-[#C5A059]" />
                      {photo.location}
                    </span>
                  </div>

                  {/* Bottom elegant content overlay container */}
                  <div className="relative p-6 md:p-8 flex flex-col justify-end text-left space-y-2 z-20 transition-transform duration-300">
                    {/* Site name reference */}
                    <span className="font-sans text-[9px] tracking-wider text-[#C5A059] uppercase font-bold flex flex-wrap items-center gap-2">
                      {photo.chantierName}
                      {(photo.chantierName.toLowerCase().includes('echobat') || photo.description.toLowerCase().includes('echobat')) && (
                        <span className="text-[8px] bg-[#051a0f] text-[#C5A059] border border-[#C5A059]/30 px-1.5 py-0.5 rounded-none uppercase font-extrabold tracking-widest">
                          PARTENAIRE ÉCHOBAT
                        </span>
                      )}
                    </span>
                    
                    {/* Picture title */}
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-white tracking-wide group-hover:text-[#C5A059] transition-colors duration-300">
                      {photo.title}
                    </h3>
                    
                    {/* Picture short description */}
                    <p className="font-sans text-gray-300 text-xs font-light line-clamp-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 ease-out">
                      {photo.description}
                    </p>
                    
                    {/* Action link */}
                    <div className="pt-2 flex items-center gap-1.5 text-xs text-[#C5A059] uppercase tracking-wider font-bold md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                      <span>Détails &amp; Fiche d'Ouvrage</span>
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
