import { Page } from '../types';
import { LOGO_URL } from '../data';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  scrollToSection: (sectionId: string) => void;
}

export default function Header({ currentPage, setCurrentPage, scrollToSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (page: Page, sectionId?: string) => {
    setIsOpen(false);
    setCurrentPage(page);

    // Update the URL properly so 404 and page refreshes work beautifully
    let path = '/';
    if (page === 'contact') path = '/contact';
    else if (page === 'prestations') path = '/prestations';
    else if (page === 'galerie') path = '/galerie';
    
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }

    if (sectionId) {
      // Delay slightly to allow page routing state to commit if switching pages
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-[#051a0f] text-white border-b border-[#C5A059]/20 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        {/* Logo Container */}
        <div className="flex items-center">
          <button 
            onClick={() => handleNav('accueil')} 
            className="group flex items-center gap-4 focus:outline-none"
            aria-label="MTC RUN HOME"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 -my-2 flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="MTC RUN CONSTRUCTION Logo"
                className="w-full h-full object-contain rounded-full border border-[#C5A059]/30 group-hover:border-[#C5A059] transition-all duration-300 shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden lg:block text-left">
              <span className="font-serif text-lg tracking-wider font-bold block text-white group-hover:text-[#C5A059] transition-colors">
                MTC RUN
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-gray-400 block font-light">
                CONSTRUCTION
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            onClick={() => handleNav('accueil')}
            className={`font-sans text-[11px] uppercase tracking-[0.1em] transition-all duration-300 focus:outline-none ${
              currentPage === 'accueil'
                ? 'text-[#C5A059] font-medium border-b-2 border-[#C5A059] pb-1'
                : 'text-gray-300 hover:text-[#C5A059] pb-1'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => handleNav('galerie')}
            className={`font-sans text-[11px] uppercase tracking-[0.1em] transition-all duration-300 focus:outline-none ${
              currentPage === 'galerie'
                ? 'text-[#C5A059] font-medium border-b-2 border-[#C5A059] pb-1'
                : 'text-gray-300 hover:text-[#C5A059] pb-1'
            }`}
          >
            Réalisations
          </button>
          <button
            onClick={() => handleNav('prestations')}
            className={`font-sans text-[11px] uppercase tracking-[0.1em] transition-all duration-300 focus:outline-none ${
              currentPage === 'prestations'
                ? 'text-[#C5A059] font-medium border-b-2 border-[#C5A059] pb-1'
                : 'text-gray-300 hover:text-[#C5A059] pb-1'
            }`}
          >
            Prestations
          </button>
          <button
            onClick={() => handleNav('accueil', 'durabilite-section')}
            className="font-sans text-[11px] uppercase tracking-[0.1em] text-gray-300 hover:text-[#C5A059] pb-1 transition-all duration-300 focus:outline-none"
          >
            Engagements
          </button>
          <button
            onClick={() => handleNav('accueil', 'temoignages-section')}
            className="font-sans text-[11px] uppercase tracking-[0.1em] text-gray-300 hover:text-[#C5A059] pb-1 transition-all duration-300 focus:outline-none"
          >
            Témoignages
          </button>
          <button
            onClick={() => handleNav('accueil', 'heritage-section')}
            className="font-sans text-[11px] uppercase tracking-[0.1em] text-gray-300 hover:text-[#C5A059] pb-1 transition-all duration-300 focus:outline-none"
          >
            Identité
          </button>
        </nav>

        {/* CTA button */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNav('contact')}
            className="bg-transparent border border-[#C5A059] hover:bg-[#C5A059] text-[#C5A059] hover:text-white font-sans text-xs tracking-wider uppercase font-medium px-6 py-3.5 transition-all duration-500 flex items-center gap-2 group cursor-pointer"
          >
            DEMANDER UN RDV
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-[#C5A059] focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#051a0f] border-b border-[#C5A059]/20">
          <div className="px-6 pt-2 pb-6 flex flex-col gap-5 text-left">
            <button
              onClick={() => handleNav('accueil')}
              className={`font-sans text-sm uppercase tracking-wider text-left py-2 focus:outline-none ${
                currentPage === 'accueil' ? 'text-[#C5A059] font-medium' : 'text-gray-300'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => handleNav('galerie')}
              className={`font-sans text-sm uppercase tracking-wider text-left py-2 focus:outline-none ${
                currentPage === 'galerie' ? 'text-[#C5A059] font-medium' : 'text-gray-300'
              }`}
            >
              Réalisations
            </button>
            <button
              onClick={() => handleNav('prestations')}
              className={`font-sans text-sm uppercase tracking-wider text-left py-2 focus:outline-none ${
                currentPage === 'prestations' ? 'text-[#C5A059] font-medium' : 'text-gray-300'
              }`}
            >
              Prestations
            </button>
            <button
              onClick={() => handleNav('accueil', 'durabilite-section')}
              className="font-sans text-sm uppercase tracking-wider text-left py-2 text-gray-300 text-left focus:outline-none"
            >
              Engagements
            </button>
            <button
              onClick={() => handleNav('accueil', 'temoignages-section')}
              className="font-sans text-sm uppercase tracking-wider text-left py-2 text-gray-300 text-left focus:outline-none"
            >
              Témoignages
            </button>
            <button
              onClick={() => handleNav('accueil', 'heritage-section')}
              className="font-sans text-sm uppercase tracking-wider text-left py-2 text-gray-300 text-left focus:outline-none"
            >
              Identité
            </button>
            <div className="h-px bg-[#C5A059]/10 my-1"></div>
            <button
              onClick={() => handleNav('contact')}
              className="w-full text-center bg-[#C5A059] hover:bg-[#b08d48] text-[#051a0f] font-sans text-xs tracking-wider uppercase font-bold py-4 transition-all duration-300 flex items-center justify-center gap-2"
            >
              DEMANDER UN RDV
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
