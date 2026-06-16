import { useState, useEffect } from 'react';
import { Page, GalleryPhoto } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import PageAccueil from './components/PageAccueil';
import PagePrestations from './components/PagePrestations';
import PageGalerie from './components/PageGalerie';
import PageContact from './components/PageContact';
import PageAdmin from './components/PageAdmin';
import Page404 from './components/Page404';
import { subscribeToGalleryPhotos } from './utils/galleryStorage';
import { X, Check, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('accueil');
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  // Synchronize dynamic gallery photos from Firebase
  useEffect(() => {
    const unsubscribe = subscribeToGalleryPhotos((data) => {
      setPhotos(data);
    });
    return () => unsubscribe();
  }, []);


  // Route URL listener for /ADMIN or /admin
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toUpperCase();
      const hash = window.location.hash.toUpperCase();
      
      if (path === '/ADMIN' || path === '/ADMIN/' || hash === '#/ADMIN' || hash === '#ADMIN') {
        setCurrentPage('admin');
      } else if (path === '/CONTACT' || path === '/CONTACT/') {
        setCurrentPage('contact');
      } else if (path === '/PRESTATIONS' || path === '/PRESTATIONS/') {
        setCurrentPage('prestations');
      } else if (path === '/GALERIE' || path === '/GALERIE/' || path === '/REALISATIONS' || path === '/REALISATIONS/') {
        setCurrentPage('galerie');
      } else if (path === '/' || path === '' || path === '/INDEX.HTML') {
        setCurrentPage('accueil');
      } else {
        setCurrentPage('404');
      }
    };
    
    // Check initially on mount
    handleUrlChange();

    // Hook listeners for pushState/hash changes
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
    imageUrl?: string;
    category?: string;
    chantierId?: string;
    imageUrls?: string[];
    galleryNav?: {
      onNext: () => void;
      onPrev: () => void;
      index: number;
      total: number;
    };
  }>({
    isOpen: false,
    title: '',
    content: ''
  });

  const [fullscreenData, setFullscreenData] = useState<{
    isOpen: boolean;
    photos: GalleryPhoto[];
    currentIndex: number;
  }>({
    isOpen: false,
    photos: [],
    currentIndex: 0,
  });

  const openFullscreen = (imageUrls?: string[], currentImageUrl?: string) => {
    if (!currentImageUrl && (!imageUrls || imageUrls.length === 0)) return;
    
    const urlsToUse = (imageUrls && imageUrls.length > 0) ? imageUrls : (currentImageUrl ? [currentImageUrl] : []);
    const index = currentImageUrl ? urlsToUse.findIndex(url => url === currentImageUrl) : 0;
    
    setFullscreenData({
      isOpen: true,
      photos: urlsToUse.map(url => ({
        id: 'temp',
        urls: [url],
        title: modalData.title,
        description: modalData.content,
        category: (modalData.category as any) || 'CHARPENTE BOIS',
        chantierId: modalData.chantierId || 'temp',
        chantierName: '',
        location: ''
      })),
      currentIndex: index >= 0 ? index : 0,
    });
  };

  const closeFullscreen = () => {
    setFullscreenData(prev => ({ ...prev, isOpen: false }));
  };

  const nextFullscreenPhoto = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setFullscreenData(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.photos.length
    }));
  };

  const prevFullscreenPhoto = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setFullscreenData(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length
    }));
  };

  const openModal = (
    title: string, 
    content: string, 
    imageUrl?: string, 
    category?: string, 
    chantierId?: string, 
    imageUrls?: string[],
    galleryNav?: { onNext: () => void; onPrev: () => void; index: number; total: number; }
  ) => {
    setModalData({
      isOpen: true,
      title,
      content,
      imageUrl,
      category,
      chantierId,
      imageUrls,
      galleryNav
    });
  };

  const closeModal = () => {
    setModalData(prev => ({ ...prev, isOpen: false }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'accueil':
        return <PageAccueil setCurrentPage={setCurrentPage} />;
      case 'prestations':
        return <PagePrestations setCurrentPage={setCurrentPage} />;
      case 'galerie':
        return <PageGalerie openModal={openModal} photos={photos} />;
      case 'contact':
        return <PageContact />;
      case 'admin':
        return (
          <PageAdmin 
            setCurrentPage={setCurrentPage} 
          />
        );
      case '404':
        return <Page404 setCurrentPage={setCurrentPage} />;
      default:
        return <PageAccueil setCurrentPage={setCurrentPage} />;
    }
  };

  const isAdminPage = currentPage === 'admin';

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbfa] font-sans antialiased text-[#1a1c1c] selection:bg-[#C5A059] selection:text-[#051a0f]">
      {/* Prime Header element */}
      {!isAdminPage && (
        <Header 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          scrollToSection={scrollToSection} 
        />
      )}

      {/* Main page content layout state with animate container */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Footer element */}
      {!isAdminPage && (
        <Footer 
          setCurrentPage={setCurrentPage} 
          openModal={openModal} 
        />
      )}

      {/* Custom Reusable Premium Overlay Modal */}
      {modalData.isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={closeModal}
            className="absolute inset-0 bg-[#03100a]/90 backdrop-blur-sm cursor-pointer transition-opacity duration-300"
          ></div>

          {/* Modal Content Frame */}
          <div className="relative bg-white border border-[#C5A059]/30 rounded-none w-full max-w-3xl max-h-[85vh] overflow-y-auto z-10 shadow-2xl">
            {/* Golden top highlight bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C5A059]"></div>
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-stone-400 hover:text-[#C5A059] focus:outline-none p-2 transition-colors z-20 cursor-pointer bg-white/80 rounded-full"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Layout */}
            <div className="flex flex-col">
              {/* Optional Image container for projects */}
              {modalData.imageUrl && (
                <div 
                  className="relative w-full aspect-video bg-stone-100 overflow-hidden border-b border-gray-100 group cursor-pointer"
                  onClick={() => openFullscreen(modalData.imageUrls, modalData.imageUrl)}
                >
                  <img
                    src={modalData.imageUrl}
                    alt={modalData.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay icon to indicate it's clickable for fullscreen */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                    <Maximize className="w-12 h-12 text-white drop-shadow-md mb-2" />
                    <span className="text-white font-sans text-xs uppercase tracking-widest font-bold">Agrandir la photo</span>
                  </div>
                  {modalData.category && (
                    <span className="absolute bottom-4 left-4 bg-[#C5A059] text-[#051a0f] text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 font-bold shadow-md z-10 pointer-events-none">
                      {modalData.category}
                    </span>
                  )}
                </div>
              )}

              {/* Text content details */}
              <div className="p-8 md:p-12 text-left space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#051a0f] tracking-wide">
                    {modalData.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-[#C5A059]"></div>
                </div>

                <div className="text-gray-700 font-sans text-sm md:text-base leading-relaxed whitespace-pre-line font-light space-y-4">
                  {modalData.content}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  {modalData.galleryNav ? (
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); modalData.galleryNav?.onPrev(); }} 
                        className="p-2 border border-stone-200 text-stone-500 hover:text-[#C5A059] hover:border-[#C5A059] transition-all cursor-pointer rounded-full bg-stone-50"
                        title="Projet précédent"
                      >
                        <ChevronLeft className="w-5 h-5"/>
                      </button>
                      <span className="text-xs font-sans text-stone-500 tracking-widest font-medium">
                        {modalData.galleryNav.index + 1} / {modalData.galleryNav.total}
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); modalData.galleryNav?.onNext(); }} 
                        className="p-2 border border-stone-200 text-stone-500 hover:text-[#C5A059] hover:border-[#C5A059] transition-all cursor-pointer rounded-full bg-stone-50"
                        title="Projet suivant"
                      >
                        <ChevronRight className="w-5 h-5"/>
                      </button>
                    </div>
                  ) : <div />}
                  <button
                    onClick={closeModal}
                    className="w-full sm:w-auto justify-center bg-[#051a0f] hover:bg-[#C5A059] text-white hover:text-[#051a0f] font-sans text-xs tracking-widest uppercase font-semibold px-6 py-3.5 transition-colors duration-300 flex items-center gap-2 cursor-pointer border border-transparent hover:border-[#051a0f]"
                  >
                    <span>Fermer la fenêtre</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows for Gallery Projects (Desktop outer floating arrows) */}
          {modalData.galleryNav && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); modalData.galleryNav?.onPrev(); }}
                className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 z-20 cursor-pointer bg-white/10 hover:bg-[#C5A059] rounded-full transition-all border border-white/20 hover:border-[#C5A059] hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]"
                aria-label="Projet précédent"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); modalData.galleryNav?.onNext(); }}
                className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 z-20 cursor-pointer bg-white/10 hover:bg-[#C5A059] rounded-full transition-all border border-white/20 hover:border-[#C5A059] hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]"
                aria-label="Projet suivant"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Fullscreen Slider Viewer */}
      {fullscreenData.isOpen && fullscreenData.photos.length > 0 && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center backdrop-blur-md">
          {/* Close Area */}
          <div className="absolute inset-0 z-0 cursor-pointer" onClick={closeFullscreen} title="Fermer"></div>
          
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-20 p-2 cursor-pointer bg-black/20 hover:bg-black/50 rounded-full"
            aria-label="Fermer le plein écran"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Current Image */}
          <div className="relative z-10 max-w-7xl max-h-[90vh] w-full px-4 md:px-12 flex flex-col items-center justify-center pointer-events-none">
            <img 
              src={fullscreenData.photos[fullscreenData.currentIndex].urls[0]} 
              alt={fullscreenData.photos[fullscreenData.currentIndex].title}
              className="max-h-[85vh] max-w-full object-contain pointer-events-auto shadow-2xl"
              referrerPolicy="no-referrer"
            />
            {/* Title / Description */}
            <div className="mt-4 text-center pointer-events-auto">
              <h4 className="text-white text-lg font-serif tracking-wide">{fullscreenData.photos[fullscreenData.currentIndex].title}</h4>
              <p className="text-white/60 font-sans text-xs mt-1">
                {fullscreenData.photos.length > 1 
                  ? `Photo ${fullscreenData.currentIndex + 1} sur ${fullscreenData.photos.length}` 
                  : 'Image vue en plein écran'}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          {fullscreenData.photos.length > 1 && (
            <>
              <button
                onClick={prevFullscreenPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 z-20 cursor-pointer bg-black/20 hover:bg-black/80 rounded-full transition-all"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextFullscreenPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 z-20 cursor-pointer bg-black/20 hover:bg-black/80 rounded-full transition-all"
                aria-label="Photo suivante"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
