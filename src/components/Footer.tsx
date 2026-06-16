import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  openModal: (title: string, content: string) => void;
}

export default function Footer({ setCurrentPage, openModal }: FooterProps) {
  const links = [
    {
      label: 'Mentions Légales',
      content: 'MTC RUN CONSTRUCTION\nEntreprise Individuelle dirigée par Sébastien Boistel\nSiège social : Bureau 45 Allée des Basilics, Bois Rouge, 97460 Saint-Paul, La Réunion\nEmail : mtcrunconstruction@gmail.com\nTéléphone : 0692 596 520\nSIRET : 10236343900013\nCode APE : 4399C (Gros oeuvres / Travaux de charpente)\n\nHébergeur : Google Cloud Run Container Service'
    },
    {
      label: 'Politique de Confidentialité',
      content: 'Chez MTC RUN CONSTRUCTION, nous accordons une importance primordiale à la protection de vos données. Les informations récoltées via notre formulaire de contact (nom, email, téléphone, type de projet et description) sont utilisées uniquement dans le cadre de votre demande de consultation et de la relation commerciale qui peut en découler. Vos données ne sont jamais vendues, cédées ou transmises à des tiers sans votre consentement explicite.'
    },
    {
      label: 'Paramètres des Cookies',
      content: 'Nous utilisons uniquement des cookies techniques essentiels au bon fonctionnement et à l\'affichage de notre plateforme. Aucun traceur publicitaire ou de profilage tiers n\'est actif sur notre site vitrine.'
    },
    {
      label: 'Rapport de Durabilité',
      content: 'EXIGENCE ÉCOLOGIQUE & ENGAGEMENT LOCAL :\nMTC RUN CONSTRUCTION s\'engage au quotidien pour un habitat vertueux :\n- 100% de nos bois de structure proviennent de forêts gérées de manière éco-responsable (FSC / PEFC).\n- Recyclage systématique des résidus de bois en paillage local ou énergie bois.'
    }
  ];

  return (
    <footer className="bg-[#03100a] text-white py-16 px-6 md:px-12 border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl tracking-wider font-bold text-white">MTC RUN</span>
            <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span>
          </div>
          <p className="text-gray-400 text-xs md:text-sm font-sans tracking-wide max-w-sm">
            © 2026 MTC RUN. Maîtrise Artisanale &amp; Excellence Architecturale.
          </p>
        </div>

        {/* Right column */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 justify-start md:justify-end max-w-xl">
          {links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => openModal(link.label, link.content)}
              className="text-gray-400 hover:text-[#C5A059] text-xs font-sans tracking-wider transition-colors duration-300 focus:outline-none"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
