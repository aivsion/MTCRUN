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

export const DETAIL_ARCHITECTURAL_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuD0XBOaKzIrDv3nEyRt8m9GY39KoTrd43XTZZu2Nacw2h1grG_b93bkq3YoxFpqyJizRgKHGiJQVXyvowCMyhCQfCIihrWXTlrVwD0kTC8A6ZaJiM23Qv4LrTrNEvpNQCgidVJ4HN3S2qFQtrWxz_9EsLgB_QJQVDm5RgOBOKBpyyca86ryYV6pDxpSMSRew1Ad0tguFcmk7T4-RaCrvOsobOd74G5Ajde_46FO0HYssqFYT8QBy0xUC1s1CKgQl5PNJMTrPHDu2hQ";

export const engagements: Engagement[] = [
  {
    id: "durabilite",
    number: "01",
    title: "Durabilité FSC",
    description: "Nous sélectionnons rigoureusement des essences de bois issues de forêts gérées durablement, garantissant l'intégrité écologique de chaque réalisation.",
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
    title: "Respect des Délais",
    description: "Nous nous engageons à respecter scrupuleusement les délais convenus et validés ensemble à l'initialisation de votre projet de construction.",
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
    description: "Sublimez vos espaces de vie extérieurs avec nos aménagements d'exception : terrasses suspendues (decking), varangues élégantes, garde-corps originaux ou pergolas contemporaines robustes.",
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
      "Kiosques traditionnels d'exception"
    ],
    imageUrl: REGEN_IMAGE_1781503634507
  },
  {
    id: "particuliers",
    number: "04",
    title: "Projets Particuliers",
    description: "Construction de villas individuelles d'architecte, rénovations et restructurations complètes de l'existant, et agencements extérieurs clés en main sur mesure.",
    bullets: [
      "Villas individuelles d'architecte",
      "Rénovations majeures et surélévations",
      "Restructurations d'envergure",
      "Agencements extérieurs clés en main"
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

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    clientName: "Jean-Pierre L.",
    projectType: "Villa Contemporaine & Gros Œuvre",
    city: "Saint-Gilles-les-Bains",
    region: "La Réunion",
    country: "France",
    comment: "MTC RUN a réalisé la maçonnerie technique et le gros œuvre de notre villa d'architecte sur un terrain extrêmement escarpé. La précision d'exécution de Sébastien et sa gestion rigoureuse du chantier ont été remarquables. Une structure d'une solidité irréprochable face aux contraintes climatiques.",
    rating: 5,
    period: "Fin 2025",
    projectPhotos: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "testimonial-2",
    clientName: "Marie & Damien V.",
    projectType: "Charpente Traditionnelle & Varangue",
    city: "La Saline-les-Bains",
    region: "La Réunion",
    country: "France",
    comment: "Nous souhaitions une grande varangue ouverte en bois de très haute qualité. MTC RUN a conçu un ouvrage d'art exceptionnel. Les finitions par commande numérique (CNC) d'une précision millimétrique et la finesse de l'assemblage traditionnel sont exceptionnelles.",
    rating: 5,
    period: "Début 2026",
    projectPhotos: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "testimonial-3",
    clientName: "Laurent M.",
    projectType: "Eco-Lodges Touristiques (Structure Bois)",
    city: "Cilaos",
    region: "La Réunion",
    country: "France",
    comment: "Pour le compte de notre domaine de prestige, Sébastien Boistel a su s'adapter parfaitement aux fortes exigences d'implantation des hauts. Les terrasses suspendues et les structures robustes en bois de classe d'emploi marine sont de pures merveilles.",
    rating: 5,
    period: "Avril 2026",
    projectPhotos: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "testimonial-4",
    clientName: "Sophie T.",
    projectType: "Terrasse Panoramique & Pergola",
    city: "Saint-Paul",
    region: "La Réunion",
    country: "France",
    comment: "Un accompagnement sur-mesure exceptionnel, de l'étude préparatoire jusqu'à la touche finale de saturateur. Notre terrasse suspendue fait face aux intempéries marines sans friche. Un gérant émérite, d'une grande écoute et d'une rigueur rare.",
    rating: 5,
    period: "Mars 2026",
    projectPhotos: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "photo-1",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaUQpXmC5enSnMVaRjvBMnf38mu98qv5Vi8hFFZ-IWccHqxFz3RCl9D6bvd9tHI7gYcamIHhIibXULfwWMbvsW9KTd73VoUmelONNcMrQRS9GwGTqxb9-Q-VSa-Bq8emkLA1a5MfUAq8LvsHOCwtFkHpmlWKQpu2NPjCe0Zn4VVz0cCd33DkPTY7kigB65N4lWubbKcCdiO5uUH7PxZT2TJC7xDkvl74ch-tdca4HKfsVF8R2MZkzWe8v2uneZA1mkciXhpCfVG8w",
    category: "CHARPENTE BOIS",
    chantierId: "kiosque-eden",
    chantierName: "Kiosque Traditionnel Éden",
    location: "La Saline-les-Bains",
    title: "Structure de Charpente Fine",
    description: "Assemblage de charpente traditionnelle en bois massif à tenons et mortaises, ouvert sur jardin tropical réunionnais."
  },
  {
    id: "photo-2",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFckyRP0DAph2jUHsgDx3MwlhjSKJWlo_mPnUcfFSQIc2hBUjltTBcHyupmLpC2NlXBtvtytOuWrXK5K-pmEysbQ___-M2lm_jz-R6GVEpXzVM5GnOxt8EpW0osjHE5nT_4reK1iEOFeQW5-9xcuQ9YGsFlMmMwJtgWByWpPsWxJRxEeXiJJqCDXPtOcarNaAeXBuyHU8ZKED7tOsTuawk9nXK4goBD2Ff5yVTqKx-bHsqGuvzr83EtCfLKtVUnHLPWlMgqyXCgHE",
    category: "CHARPENTE BOIS",
    chantierId: "villa-stgilles",
    chantierName: "Villa contemporaine d'Architecte",
    location: "Saint-Gilles-les-Bains",
    title: "Élévation de l’Ossature Bois",
    description: "Structure porteuse et ossature à grands volumes, conçue avec calculs structurels avancés contre les vents cycloniques."
  },
  {
    id: "photo-3",
    url: REGEN_IMAGE_AMENAGEMENT_BOIS,
    category: "AMÉNAGEMENTS BOIS",
    chantierId: "terrasse-cafres",
    chantierName: "Terrasse Suspendue Panoramique",
    location: "Plaine des Cafres",
    title: "Deck Suspendu en Bois Exotique",
    description: "Splendide prolongement extérieur en bois de classe marine d'une stabilité parfaite face au relief montagneux."
  },
  {
    id: "photo-4",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmEQdXwMFjLyyKOrU3E6FSr3q1460tZp80vedWsiCYy2gA5wIIyhhbjek1FTppKdy4yzsftvJS1eehUB3BIrW3yi9sI6sZs_XfOfU2BanHKuPJHEre8oEpvCFCQe4VI_VEru8ODDNeVb9YYejAzIzxEaE2muYnnTQ3Tkny4FQKfrHnjo0Ud2XuHOICi3hiU5mTVn_FiMOcGS92ltlyz1nmitmv3hi1w4st_9q03xcaPPYgHPG6_3WfP5K8oFhjklC0KLmBfDawWoM",
    category: "AMÉNAGEMENTS BOIS",
    chantierId: "pergola-sleu",
    chantierName: "Pergola Littorale d'Architecte",
    location: "Saint-Leu",
    title: "Lames Filtrantes & Poteaux Massifs",
    description: "Une prouesse technique mariant bois massif tropical et intégration paysagère moderne pour briser l'intensité du soleil."
  },
  {
    id: "photo-5",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuArbLoTKlkUMao3Js69w3sbsOYgHwsN-peoDO1MsnZncKUOQJ2TKdutPHrlTv01EJNMBizEOZrhExalkgtaXdLSIHDsLiM9ekf4Sg2EmK_za8G0RgqpVJSWi2-Xf1pP70CSnrrkFoJufJnAQ1M7sYugz-e2Ue16G_9DSuiuD5eyI_PzYkeia4g4ZTfazkdSkuZDHooEitbkd--0XqGlm4YscXfdeGe26dBNbAA8v-EGmDTOe48vfFHZJe0U-1jjnXSBqzzAmMfY-qw",
    category: "MENUISERIE BOIS",
    chantierId: "finition-stpaul",
    chantierName: "Rénovation Écologique Échobat",
    location: "Saint-Paul",
    title: "Finitions d'Exception Vernies",
    description: "Application professionnelle de saturateur protégeant et rehaussant l'éclat naturel du bois exposé au milieu salin. Réalisé sous l'égide du réseau national d'écoconstruction solidaire ÉCHOBAT."
  },
  {
    id: "photo-6",
    url: DETAIL_ARCHITECTURAL_IMG,
    category: "MENUISERIE BOIS",
    chantierId: "details-nobles",
    chantierName: "Villas Nobles Réunionnaises",
    location: "Saint-Gilles-les-Bains",
    title: "Détails d'Assemblages Nobles",
    description: "L'excellence du détail architectural : gros plan millimétrique sur nos assemblages traditionnels et façonnages de bois nobles sur mesure."
  },
  {
    id: "photo-7",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuByLpPjFwWWR7IzvgKvUaWy5U-KSJC060yOqlWoFLsGcWeH5iNrPD50HV8R3-fZxX52sjc_TQX_YJw5khYxPO_6_xBlT3vz_WMlQ8gdxJePRSaRDvuNDBHcxl1cv5lTCmbPRBnT2O70rs7ie7p6HU4I-gRFxal4FgLoXmmeoJ324L63QPkS2Wv_WCVkMOmh4cTZTNd0O7ioMxZhJMZAwg8E0kvjaECbYgZaRoMCc6mXjnOd44XThijcIOfKtGJXGnW4IRwAOLVFxbg",
    category: "CHARPENTE BOIS",
    chantierId: "lodges-hauts",
    chantierName: "Lodges et Varangues des Hauts",
    location: "Cilaos",
    title: "Structures & Échafaudages en Bois Massif",
    description: "Élévation de structures de charpentes traditionnelles complexes en bois massif tropical, conçues avec rigueur pour résister aux climats des hauts de l'île."
  }
];

