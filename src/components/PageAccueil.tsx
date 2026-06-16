import { DIRIGEANT_PORTRAIT, HERO_ACCUEIL_BG, engagements } from '../data';
import { Page } from '../types';
import { motion } from 'motion/react';
import { TreePine, Cpu, Timer, ArrowRight, GraduationCap, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import Testimonials from './Testimonials';
import ECHOBAT_LOGO from '../assets/images/regenerated_image_1781250096754.png';

interface PageAccueilProps {
  setCurrentPage: (page: Page) => void;
}

export default function PageAccueil({ setCurrentPage }: PageAccueilProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trees':
        return <TreePine className="w-8 h-8 text-[#C5A059]" />;
      case 'Cpu':
        return <Cpu className="w-8 h-8 text-[#C5A059]" />;
      case 'FileText':
        return <FileText className="w-8 h-8 text-[#C5A059]" />;
      case 'Timer':
        return <Timer className="w-8 h-8 text-[#C5A059]" />;
      default:
        return <TreePine className="w-8 h-8 text-[#C5A059]" />;
    }
  };

  return (
    <div className="w-full">
      {/* 1. SECTION HÉRO */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_ACCUEIL_BG}
            alt="MTC RUN structure charpente s'ouvrant sur les montagnes"
            className="w-full h-full object-cover filter brightness-[0.45] scale-102 transition-transform duration-[2000s]"
            style={{ transform: 'scale(1.05)' }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="space-y-6"
          >
            <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#C5A059] block">
              Maîtrise Artisanale &amp; Innovation
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-semibold text-white tracking-normal leading-tight">
              L'Esprit MTC RUN
            </h1>
            <p className="font-sans text-stone-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              L’alliance du savoir-faire artisanal et de l’ingénierie moderne pour bâtir l’exceptionnel au cœur de La Réunion.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setCurrentPage('galerie')}
                className="bg-[#C5A059] hover:bg-[#b08d48] text-[#051a0f] font-sans text-xs tracking-wider uppercase font-bold px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Découvrir nos créations
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('heritage-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-white/40 hover:border-white text-white font-sans text-xs tracking-wider uppercase font-medium px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Notre histoire
              </button>
            </div>

            <div className="pt-12 border-t border-white/10 mt-8 max-w-sm mx-auto text-center">
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full bg-transparent border-2 border-[#C5A059] hover:bg-[#051a0f] text-[#C5A059] hover:text-[#C5A059] font-sans text-xs tracking-[0.25em] uppercase font-bold py-4 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:border-[#C5A059]"
              >
                VOUS AVEZ UN PROJET ?
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom fading block */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f9f9f9] to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* 2. SECTION NOS ENGAGEMENTS */}
      <section id="durabilite-section" className="py-24 md:py-32 bg-[#051a0f] text-white scroll-mt-24 relative overflow-visible">
        {/* Subtle background organic pattern or shape */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059] block font-bold">
              ENGAGEMENTS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-wide">
              Nos Engagements d'Excellence
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto my-4"></div>
            <p className="font-sans text-gray-400 font-light text-base md:text-lg max-w-xl mx-auto">
              Chaque ouvrage que nous façonnons respecte un cahier des charges rigoureux garantissant notre responsabilité environnementale et technique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagements.map((engagement, idx) => (
              <div
                key={engagement.id}
                className="bg-[#03100a] border border-[#C5A059]/15 hover:border-[#C5A059]/40 p-8 md:p-10 text-left space-y-6 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-[#051a0f] border border-[#C5A059]/20 group-hover:bg-[#C5A059] group-hover:text-primary transition-all duration-300 text-[#C5A059]">
                    {getIcon(engagement.iconName)}
                  </div>
                  <span className="font-serif text-3xl font-light text-gray-700 group-hover:text-[#C5A059]/30 transition-colors duration-300">
                    {engagement.number}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-medium group-hover:text-[#C5A059] transition-colors duration-300 text-white">
                    {engagement.title}
                  </h3>
                  <p className="font-sans text-gray-400 text-sm md:text-base leading-relaxed font-light text-justify hyphens-none">
                    {engagement.description}
                  </p>
                  {engagement.id === 'devis' && (
                    <div className="pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPage('contact');
                        }}
                        className="w-full bg-transparent border-2 border-[#C5A059] hover:bg-[#051a0f] text-[#C5A059] hover:text-[#C5A059] font-sans text-xs tracking-[0.2em] uppercase font-bold py-3 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:border-[#C5A059]"
                      >
                        VOUS AVEZ UN PROJET ?
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2b. SECTION PARTENAIRE ÉCHOBAT */}
      <section id="echobat-section" className="py-20 bg-[#051a0f] text-white scroll-mt-24 relative overflow-hidden">
        {/* Subtle background organic pattern or shape */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none -mr-48 -mt-48"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#03100a]/10 rounded-full blur-3xl pointer-events-none -ml-48 -mb-48"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Box with Logo and badge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center bg-white p-8 md:p-10 border border-[#C5A059]/20 shadow-xl relative group">
              {/* Subtle top decoration gold line */}
              <div className="absolute top-0 left-0 right-0 h-1  bg-[#C5A059]"></div>
              
              <div className="w-full h-24 flex items-center justify-center p-2 mb-6">
                <img
                  src={ECHOBAT_LOGO}
                  alt="Logo ÉCHOBAT"
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full h-px bg-stone-100 my-4"></div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#051a0f]/5 border border-[#051a0f]/10 text-[#051a0f] font-sans text-[10px] font-bold uppercase tracking-widest rounded-full">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span>
                  Adhérent Réseau
                </span>
                <span className="block font-mono text-[10px] text-stone-400 mt-2">Membre Actif • Réseau National</span>
              </div>
            </div>

            {/* Right explanation of Echobat */}
            <div className="lg:col-span-8 text-left space-y-6">
              <div className="space-y-3">
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                  COOPÉRATION &amp; SOLIDARITÉ
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white font-medium leading-tight">
                  Construire l'Avenir Durable avec ÉCHOBAT
                </h2>
                <div className="w-12 h-px bg-[#C5A059] mt-3"></div>
              </div>

              <div className="space-y-4 text-gray-300 font-sans text-sm md:text-base leading-relaxed font-light text-justify hyphens-none">
                <p>
                  MTC RUN est fier d'être adhérent de l'association <strong>ÉCHOBAT</strong>. Depuis 2010, ce réseau collaboratif rassemble les acteurs engagés de l'<strong>écoconstruction</strong>, de l'<strong>insertion par l'activité économique</strong> et de la <strong>formation professionnelle</strong>.
                </p>
                <p>
                  À travers ce partenariat de confiance, nous accompagnons les maîtres d'ouvrage (particuliers, entreprises et collectivités) dans la réussite de leurs projets de construction écologique et de <strong>rénovation énergétique performante</strong>.
                </p>
                <p>
                Garant d'une démarche de haute qualité éthique et environnementale.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <a
                  href="https://www.echobat.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#C5A059] hover:bg-[#03100a] transition-all duration-300 text-[#051a0f] hover:text-white font-sans text-[11px] font-bold uppercase tracking-wider px-6 py-3.5 shadow-md border border-[#C5A059] hover:border-transparent cursor-pointer"
                >
                  <span>Découvrir echobat.fr</span>
                  <ExternalLink className="w-3.5 h-3.5 animate-pulse" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SECTION TÉMOIGNAGES CLIENTS */}
      <Testimonials />

      {/* 4. SECTION PARCOURS / CV DU DIRIGEANT (HÉRITAGE) */}
      <section id="heritage-section" className="pt-24 md:pt-32 pb-12 md:pb-16 bg-[#f9f9f9] text-[#1a1c1c] scroll-mt-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column (Text) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4">
                <span className="font-sans text-xs md:text-sm uppercase tracking-[0.25em] text-[#C5A059] font-semibold block">
                  MAÎTRE D'ŒUVRE
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-[#051a0f] leading-tight font-medium">
                  L'Expertise de Sébastien Boistel
                </h2>
                <div className="w-16 h-1 bg-[#C5A059]"></div>
              </div>

              <div className="space-y-6 text-gray-700 font-sans text-base md:text-lg leading-relaxed font-light text-justify hyphens-none">
                <p>
                  Fort de plus de 20 années d'expérience dans le secteur de la construction haut de gamme, Sébastien Boistel incarne la rigueur et la passion du bâti. Certifié par l'AFPAR, son parcours est jalonné de réalisations complexes alliant technicité et esthétisme.
                </p>
                <p>
                  Spécialisé dans la maçonnerie de précision et le travail des bois nobles, il dirige chaque projet avec une vision architecturale globale, garantissant une exécution sans faille du gros œuvre aux finitions les plus délicates.
                </p>
              </div>

              {/* Key indicators */}
              <div className="pt-6 border-t border-gray-200 flex flex-row flex-wrap xl:flex-nowrap justify-between items-center w-full">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-[#051a0f]" />
                  <div className="text-left">
                    <span className="block font-sans text-[11px] tracking-widest text-[#C5A059] uppercase font-bold">AFPAR CERTIFIÉ</span>
                    <span className="block font-sans text-xs text-gray-500">Diplômé 2006</span>
                  </div>
                </div>
                <div className="hidden md:block h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3">
                  <span className="font-serif text-4xl font-extrabold text-[#051a0f]">20+</span>
                  <div className="text-left">
                    <span className="block font-sans text-[11px] tracking-widest text-[#C5A059] uppercase font-bold">Années d'expérience</span>
                    <span className="block font-sans text-xs text-gray-500">Bâtiment d'exception</span>
                  </div>
                </div>
                <div className="hidden md:block h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-[#051a0f]" />
                  <div className="text-left">
                    <span className="block font-sans text-[11px] tracking-widest text-[#C5A059] uppercase font-bold">RC DÉCENNALE</span>
                    <span className="block font-sans text-xs text-gray-500">Garantie 10 ans</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Portrait photo) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[3/4] bg-stone-200 shadow-2xl overflow-hidden group border border-[#C5A059]/20">
                <img
                  src={DIRIGEANT_PORTRAIT}
                  alt="Sébastien Boistel, Maitre d'œuvre de MTC RUN CONSTRUCTION"
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-102 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Decorative golden corner frame overlay */}
                <div className="absolute inset-4 border border-[#C5A059]/30 pointer-events-none group-hover:border-[#C5A059]/60 transition-colors duration-300"></div>
                <div className="absolute top-0 right-0 bg-[#C5A059] text-[#051a0f] text-[9px] uppercase tracking-[0.2em] px-4 py-2 font-bold z-10">
                  Gérant Fondateur
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
