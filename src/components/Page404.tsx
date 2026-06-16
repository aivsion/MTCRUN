import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Page } from '../types';

interface Page404Props {
  setCurrentPage: (page: Page) => void;
}

export default function Page404({ setCurrentPage }: Page404Props) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#fcfbfa] px-6 py-24 text-center">
      <div className="relative mb-12">
        <h1 className="text-9xl md:text-[12rem] font-serif font-black text-[#051a0f]/5 tracking-tighter select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <AlertCircle className="w-24 h-24 text-[#C5A059]" strokeWidth={1} />
        </div>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-serif text-[#051a0f] mb-6 font-bold tracking-tight">
        Page Introuvable
      </h2>
      
      <p className="text-gray-600 font-sans md:text-lg mb-12 max-w-lg mx-auto font-light leading-relaxed">
        La page que vous recherchez semble avoir été déplacée, supprimée, ou n'a peut-être jamais existé. 
        Retournez à l'accueil pour découvrir nos réalisations et prestations.
      </p>

      <button
        onClick={() => {
          setCurrentPage('accueil');
          window.history.pushState({}, '', '/');
        }}
        className="group relative flex items-center gap-4 bg-[#051a0f] hover:bg-[#C5A059] text-white font-sans text-sm tracking-widest uppercase font-semibold px-8 py-4 transition-all duration-500 overflow-hidden cursor-pointer"
      >
        <span className="relative z-10 flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </span>
        <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
      </button>
    </div>
  );
}
