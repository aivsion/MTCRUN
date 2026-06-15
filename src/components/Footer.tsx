import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  openModal: (title: string, content: string) => void;
}

export default function Footer({ setCurrentPage, openModal }: FooterProps) {
  const links = [
    {
      label: 'Mentions Légales',
      content: 'MTC RUN CONSTRUCTION\nEntreprise Individuelle dirigée par Sébastien Boistel\nSiège social : Bureau 66 bis rue de l\'Océan, 97460 Saint-Paul, La Réunion\nEmail : sebastienboistel974@gmail.com\nTéléphone : 06 92 59 65 20\nSIRET : En cours d\'enregistrement\nCode APE : 4399C (Travaux de charpente)\n\nHébergeur : Google Cloud Run Container Service'
    },
    {
      label: 'Politique de Confidentialité',
      content: 'Chez MTC RUN CONSTRUCTION, nous accordons une importance primordiale à la protection de vos données. Les informations récoltées via notre formulaire de contact (nom, email, téléphone, type de projet et description) sont utilisées uniquement dans le cadre de votre demande de consultation et de la relation commerciale qui peut en découler. Vos données ne sont jamais vendues, cédées ou transmises à des tiers sans votre consentement explicite.'
    },
    {
      label: 'Paramètres des Cookies',
      content: 'Nous utilisons uniquement des cookies techniques essentiels au bon fonctionnement et à l\'affichage de notre plateforme. Aucun traceur publicitaire ou de profilage tiers n\'est actif sur notre site vitrine d\'exception.'
    },
    {
      label: 'Rapport de Durabilité',
      content: 'EXIGENCE ÉCOLOGIQUE & ENGAGEMENT LOCAL :\nMTC RUN CONSTRUCTION s\'engage au quotidien pour un habitat vertueux :\n- 100% de nos bois de structure proviennent de forêts gérées de manière éco-responsable (FSC / PEFC).\n- Réduction de l\'empreinte carbone à travers l\'optimisation de nos découpes par commande numérique (CNC).\n- Recyclage systématique des résidus de bois en paillage local ou énergie bois.'
    },
    {
      label: 'Portfolio PDF',
      content: 'MTC RUN construction présente son catalogue d\'excellence.\nNotre catalogue complet détaillant nos méthodes d\'ingénierie bois, de charpente traditionnelle et de maçonnerie armée haut de gamme sera bientôt téléchargeable au format PDF.\n\nPour toute demande immédiate de documents techniques, veuillez nous contacter directement à l\'adresse : sebastienboistel974@gmail.com'
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
