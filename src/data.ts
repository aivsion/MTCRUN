import { Engagement, Domain, Project, Testimonial, GalleryPhoto } from './types';
import DIRIGEANT_IMG from './assets/images/regenerated_image_1781117494962.jpg';
import HERO_ACCUEIL_BG_IMG from './assets/images/regenerated_image_1781248182009.jpg';
import REGEN_IMAGE_TAMARIN from './assets/images/regenerated_image_1781248081162.jpg';
import REGEN_IMAGE_ECHOBAT_WORK_1 from './assets/images/regenerated_image_1781250037090.png';
import REGEN_IMAGE_ECHOBAT_WORK_2 from './assets/images/regenerated_image_1781250096754.png';
import REGEN_IMAGE_AMENAGEMENT_BOIS from './assets/images/regenerated_image_1781503486644.jpg';
import REGEN_IMAGE_1781503634507 from './assets/images/regenerated_image_1781503634507.jpg';
import REGEN_IMAGE_1781503640995 from './assets/images/regenerated_image_1781503640995.png';
import REGEN_IMAGE_1781503644557 from './assets/images/regenerated_image_1781503644557.jpg';
import REGEN_IMAGE_1781504716072 from './assets/images/regenerated_image_1781504716072.png';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBWfjFFxxrNSR1LX5bNS4IjrkLGYQ8Z6-8rKAJ_6DhC6zL0hlLr91ANORPteLZbpfbbGrsIq_tgIDdEiSA6JHtmRNEBtOdF_YC4UlMdF-1ebs0cug6ZBM2BxHJUCsmv40RNoDO5ICyrbcr0TcXNK4nZz9QxusGNZI0ZsoXF4jnhC0MCKOPuHLK28U6U1-6GMo3-5ceZO9-mcRnOTmEPjyZgKLoTS_IvZT5OVFJ6VibQhccxDDP_E93PjONO_s5VPRzU6gYCWb4dP-Q";

export const DIRIGEANT_PORTRAIT = DIRIGEANT_IMG;

export const MAP_PIN_URL = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='%23C5A059' viewBox='0 0 24 24' stroke='white' stroke-width='1.5'><path stroke-linecap='round' stroke-linejoin='round' d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' /><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' /></svg>";

export const HERO_ACCUEIL_BG = HERO_ACCUEIL_BG_IMG;

import REGEN_IMAGE_NEW_DETAIL from './assets/images/regenerated_image_1781634092670.jpg';
export const DETAIL_ARCHITECTURAL_IMG = REGEN_IMAGE_NEW_DETAIL;

export const engagements: Engagement[] = [
  {
    id: "durabilite",
    number: "01",
    title: "Ecologie",
    description: "Nous utilisons des essences de bois issues de forêts gérées durablement, garantissant l'intégrité écologique de chaque réalisation.\nCe choix écoresponsable s’associe à des traitements de haute technicité, parfaitement adaptés à la préservation de vos structures face aux exigences du climat tropical.",
    iconName: "Trees"
  },
  {
    id: "devis",
    number: "02",
    title: "Devis Gratuit & Détaillé",
    description: "Nous vous proposons des études rigoureuses et des chiffrages détaillés, clairs et gratuits sous de brefs délais pour planifier sereinement votre ouvrage.",
    iconName: "FileText"
  },
  {
    id: "delais",
    number: "03",
    title: "Délais et Budgets",
    description: "Nous nous engageons à respecter scrupuleusement les délais convenus et les budgets validés ensemble à l'initialisation de votre projet de construction.\nVous garantissant une transparence totale et une parfaite maîtrise financière.",
    iconName: "Timer"
  }
];

export const domains: Domain[] = [
  {
    id: "menuiserie-bois",
    number: "01",
    title: "Menuiserie BOIS",
    description: "Conception, fabrication fine et pose de menuiseries bois haut de gamme. Portes, fenêtres, agencements élégants et finitions sur mesure façonnés dans les règles de l'art.",
    bullets: [
      "Huisseries & blocs-portes nobles",
      "Agencements intérieurs de prestige",
      "Menuiseries extérieures sur mesure",
      "Savoir-faire traditionnel & essences locales"
    ],
    imageUrl: DETAIL_ARCHITECTURAL_IMG
  },
  {
    id: "amenagement-bois",
    number: "02",
    title: "Aménagement BOIS",
    description: "Sublimez vos espaces de vie extérieurs avec nos aménagements artisanaux : terrasses suspendues (decking), varangues élégantes, garde-corps originaux ou pergolas contemporaines robustes.",
    bullets: [
      "Terrasses panoramiques haut de gamme",
      "Varangues d'exception sur mesure",
      "Pergolas à fort relief tropical",
      "Habillages et plages de piscine"
    ],
    imageUrl: REGEN_IMAGE_1781504716072
  },
  {
    id: "charpente-bois",
    number: "03",
    title: "Charpente BOIS",
    description: "Conception, taillage numérique de pointe et élévation de charpentes traditionnelles apparentes complexes. Un savoir-faire millimétrique conçu pour résister aux climats et vents cycloniques.",
    bullets: [
      "Charpentes traditionnelles apparentes",
      "Structures lourdes en bois massif",
      "Ouvrages complexes à tenons & mortaises",
      "Kiosques traditionnels"
    ],
    imageUrl: REGEN_IMAGE_1781503634507
  },
  {
    id: "particuliers",
    number: "04",
    title: "Projets Particuliers",
    description: "Construction de villas individuelles d'architecte, rénovations et restructurations complètes de l'existant, et agencements extérieurs clés en main sur mesure.",
    bullets: [
      "Villas individuelles",
      "Rénovations majeures et surélévations",
      "Restructurations d'envergure",
      "Agencements extérieurs/intérieurs clés en main"
    ],
    imageUrl: REGEN_IMAGE_1781503640995
  },
  {
    id: "projet-pro",
    number: "05",
    title: "Projet Pro",
    description: "Une offre globale d'envergure réunissant nos métiers d'excellence (Menuiserie, Aménagement & Charpente BOIS) au service des logements collectifs ainsi que des bâtiments industriels et commerciaux.",
    bullets: [
      "Logements collectifs",
      "Bâtiments industriels",
      "Bâtiments commerciaux",
      "Synergie Menuiserie, Aménagement & Charpente"
    ],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  }
];

export const projects: Project[] = [
  {
    id: "terrasse",
    number: "01",
    category: "AMÉNAGEMENTS BOIS",
    title: "Terrasse Panoramique",
    description: "Réalisation d'une terrasse en bois exotique sur mesure, intégrant les contraintes du relief et sublimant la vue océan.",
    imageUrl: REGEN_IMAGE_AMENAGEMENT_BOIS
  },
  {
    id: "kiosque",
    number: "02",
    category: "CHARPENTE",
    title: "Kiosque Traditionnel",
    description: "Assemblage traditionnel pour ce kiosque en bois, véritable havre de paix au cœur du jardin tropical.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaUQpXmC5enSnMVaRjvBMnf38mu98qv5Vi8hFFZ-IWccHqxFz3RCl9D6bvd9tHI7gYcamIHhIibXULfwWMbvsW9KTd73VoUmelONNcMrQRS9GwGTqxb9-Q-VSa-Bq8emkLA1a5MfUAq8LvsHOCwtFkHpmlWKQpu2NPjCe0Zn4VVz0cCd33DkPTY7kigB65N4lWubbKcCdiO5uUH7PxZT2TJC7xDkvl74ch-tdca4HKfsVF8R2MZkzWe8v2uneZA1mkciXhpCfVG8w"
  },
  {
    id: "structure",
    number: "03",
    category: "CHARPENTE",
    title: "Structure Primitive",
    description: "Élévation de l'ossature bois d'une villa d'architecte, illustrant notre maîtrise des grands volumes.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFckyRP0DAph2jUHsgDx3MwlhjSKJWlo_mPnUcfFSQIc2hBUjltTBcHyupmLpC2NlXBtvtytOuWrXK5K-pmEysbQ___-M2lm_jz-R6GVEpXzVM5GnOxt8EpW0osjHE5nT_4reK1iEOFeQW5-9xcuQ9YGsFlMmMwJtgWByWpPsWxJRxEeXiJJqCDXPtOcarNaAeXBuyHU8ZKED7tOsTuawk9nXK4goBD2Ff5yVTqKx-bHsqGuvzr83EtCfLKtVUnHLPWlMgqyXCgHE"
  },
  {
    id: "finition",
    number: "04",
    category: "AMÉNAGEMENTS BOIS",
    title: "Traitement de Surface",
    description: "L'art de la finition : application minutieuse de saturateur pour protéger et révéler le veinage naturel.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuArbLoTKlkUMao3Js69w3sbsOYgHwsN-peoDO1MsnZncKUOQJ2TKdutPHrlTv01EJNMBizEOZrhExalkgtaXdLSIHDsLiM9ekf4Sg2EmK_za8G0RgqpVJSWi2-Xf1pP70CSnrrkFoJufJnAQ1M7sYugz-e2Ue16G_9DSuiuD5eyI_PzYkeia4g4ZTfazkdSkuZDHooEitbkd--0XqGlm4YscXfdeGe26dBNbAA8v-EGmDTOe48vfFHZJe0U-1jjnXSBqzzAmMfY-qw"
  },
  {
    id: "gros-oeuvre",
    number: "05",
    category: "MAÇONNERIE",
    title: "Gros Œuvre Crépusculaire",
    description: "L'exigence ne s'arrête pas avec le soleil. Vue de notre chantier emblématique sur les hauteurs.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtQIh_vIzp62zTZ4Mkna9Jc-ISIQlJs0oCi4Ye04ojcL6cJyymzbAzP0tuNggl6mr9QMsMBRVlJf-PxESN7HrVxN6m-YhYiXdL_7xf1Zm-XAahThYQsFhWPUB8yM65ERM55xfPYkCOcYgVfK4BaAzZaX4qd_aw5N4MuZgUTQflzWt6xf5uusvXdnmCZHgm3ItBbYnnRZfpz0rVdRbvIB-LWKeUy0b9m2PHx060jbJdg7lLg0i2EkWWF1h58nItibRsWiJdXu1i5L8"
  },
  {
    id: "pergola",
    number: "06",
    category: "AMÉNAGEMENTS BOIS",
    title: "Pergola Monumentale",
    description: "Une prouesse technique mariant bois massif et intégration paysagère. Cette structure filtre la lumière tropicale tout en créant un espace de vie extérieur sculptural.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmEQdXwMFjLyyKOrU3E6FSr3q1460tZp80vedWsiCYy2gA5wIIyhhbjek1FTppKdy4yzsftvJS1eehUB3BIrW3yi9sI6sZs_XfOfU2BanHKuPJHEre8oEpvCFCQe4VI_VEru8ODDNeVb9YYejAzIzxEaE2muYnnTQ3Tkny4FQKfrHnjo0Ud2XuHOICi3hiU5mTVn_FiMOcGS92ltlyz1nmitmv3hi1w4st_9q03xcaPPYgHPG6_3WfP5K8oFhjklC0KLmBfDawWoM",
    isHero: true
  }
];

export const testimonials: Testimonial[] = [];

export const galleryPhotos: GalleryPhoto[] = [];

