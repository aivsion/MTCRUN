import { domains, DETAIL_ARCHITECTURAL_IMG } from '../data';
import { Layers, TreePine, Building2, Home, Check, Hammer, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { Page } from '../types';

interface PagePrestationsProps {
  setCurrentPage: (page: Page) => void;
}

export default function PagePrestations({ setCurrentPage }: PagePrestationsProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'menuiserie-bois':
        return <Hammer className="w-6 h-6 text-[#C5A059]" />;
      case 'amenagement-bois':
        return <TreePine className="w-6 h-6 text-[#C5A059]" />;
      case 'charpente-bois':
        return <Layers className="w-6 h-6 text-[#C5A059]" />;
      case 'particuliers':
        return <Home className="w-6 h-6 text-[#C5A059]" />;
      case 'projet-pro':
        return <Building2 className="w-6 h-6 text-[#C5A059]" />;
      default:
        return <Layers className="w-6 h-6 text-[#C5A059]" />;
    }
  };

  return (
    <div className="w-full bg-[#fcfbfa] text-[#1a1c1c]">
      {/* 1. PAGE HEADER */}
      <section className="bg-[#051a0f] text-white py-20 md:py-28 relative">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059] block font-semibold">
            Savoir-Faire D'Exception
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-normal">
            Nos Domaines d'Expertise
          </h1>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto my-4"></div>
          <p className="font-sans text-gray-300 font-light text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Une approche intégrée du bâtiment où la rigueur structurelle de la maçonnerie rencontre l'élégance du design bois.
          </p>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {domains.map((domain, idx) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`bg-white border border-gray-100 shadow-sm rounded-none overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-all duration-300 group ${
                idx === 4 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Image side */}
              <div className="w-full md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                <img
                  src={domain.imageUrl}
                  alt={domain.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#051a0f]/20 pointer-events-none"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-[#C5A059]/30 text-[#051a0f] font-serif font-bold text-xs px-3 py-1.5 shadow-sm">
                  {domain.number}
                </div>
              </div>

              {/* Text side */}
              <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-between text-left space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-stone-50 border border-[#C5A059]/20 flex-shrink-0">
                      {getIcon(domain.id)}
                    </div>
                    <h2 className="font-serif text-2xl font-medium tracking-wide text-[#051a0f] group-hover:text-[#C5A059] transition-colors duration-300">
                      {domain.title}
                    </h2>
                  </div>
                  <p className="font-sans text-gray-600 text-sm md:text-base leading-relaxed font-light">
                    {domain.description}
                  </p>
                </div>

                {/* Elegant gold bullets list */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <span className="block font-sans text-[10px] tracking-widest text-[#C5A059] uppercase font-bold mb-2">Prestations incluses</span>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {domain.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-stone-700 text-sm font-light">
                        <Check className="w-4 h-4 text-[#C5A059] mt-0.5 flex-shrink-0" />
                        <span className="font-sans">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ARCHITECTURAL DETAIL SEGMENT */}
      <section className="py-16 md:py-24 bg-[#051a0f] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Col */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/5] overflow-hidden border border-[#C5A059]/30 shadow-2xl">
                <img
                  src={DETAIL_ARCHITECTURAL_IMG}
                  alt="Jonction parfaite maçonnerie et charpente d'exception"
                  className="w-full h-full object-cover filter brightness-[0.85] scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-4 border border-[#C5A059]/20 pointer-events-none"></div>
              </div>
            </div>

            {/* Text Col */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left lg:pl-6">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C5A059] block font-bold">
                ARTISANAT DE PRÉCISION
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-normal text-white">
                Complices de vos projets, artisans de vos idées.
              </h2>
              <div className="w-16 h-1 bg-[#C5A059]"></div>
              
              <div className="space-y-4 font-sans text-stone-300 font-light text-base leading-relaxed">
                <p>
                  Chaque structure commence par une écoute attentive de vos envies. Notre savoir-faire de charpentier met la technique au service de votre imagination, en façonnant le bois sur mesure pour créer des espaces uniques qui vous ressemblent.                </p>
                <p>
                  De la charpente traditionnelle aux projets contemporains, nous marions la précision du geste artisanal à la robustesse des matériaux. Confiez-nous vos idées : ensemble, nous leur donnons vie.                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="bg-[#C5A059] hover:bg-[#b08d48] text-[#051a0f] font-sans text-xs tracking-wider uppercase font-bold px-8 py-4 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  VOUS AVEZ UN PROJET ?
                  <Check className="w-4 h-4 translate-y-[0px] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
