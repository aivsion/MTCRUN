import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { DIRIGEANT_PORTRAIT, MAP_PIN_URL } from '../data';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function PageContact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'Maçonnerie Technique',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    try {
      // 1. Sauvegarde dans Firestore pour l'interface Admin
      const { addContactMessage } = await import('../utils/contactStorage');
      await addContactMessage({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        message: formData.message
      });
      
      // 2. Envoi de l'email via EmailJS
      await emailjs.send(
        'service_kzcex7i', // Service ID
        'template_k68qysi', // Template ID
        {
          from_name: formData.fullName,
          reply_to: formData.email,
          phone: formData.phone,
          project_type: formData.projectType,
          message: formData.message,
          user_email: formData.email,
          fullName: formData.fullName,
          email: formData.email,
          projectType: formData.projectType
        },
        'GxsyNzCSVq4HpHDU6' // Public Key
      );
      
      setIsSubmitted(true);
    } catch (e) {
      console.error(e);
      alert("Une erreur s'est produite lors de l'envoi de votre message. Veuillez vérifier votre configuration EmailJS.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#fcfbfa] text-[#1a1c1c]">
      {/* 1. SECTION BANNER */}
      <section className="bg-[#051a0f] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="max-w-2xl text-left space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C5A059] block font-semibold">
              PRESTATIONS SUR MESURE
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-normal leading-tight">
              Concrétisez votre Projet d'Exception...
            </h1>
            <p className="font-sans text-stone-300 font-light text-sm md:text-base max-w-xl">
              Nous étudions minutieusement chaque dossier de construction gros œuvre et d'aménagement bois haut de gamme à La Réunion.
            </p>
          </div>

          {/* LIGNE DIRECTE */}
          <div className="bg-[#03100a] border border-[#C5A059]/35 p-6 md:p-8 flex items-center gap-6 min-w-[280px] md:min-w-[340px] shadow-xl hover:border-[#C5A059] transition-all duration-300">
            <div className="p-3 bg-[#051a0f] border border-[#C5A059]/20 rounded-none text-[#C5A059]">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="block font-sans text-[10px] tracking-widest text-[#C5A059] uppercase font-bold">Ligne Directe</span>
              <a
                href="tel:0692596520"
                className="block font-sans text-2xl md:text-3xl font-extrabold text-[#C5A059] hover:text-white transition-colors tracking-wide mt-1 focus:outline-none"
              >
                0692 596 520
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ZONE DE FORMULAIRE */}
      <section className="py-20 bg-[#f5f4f0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Coordinates & Map */}
            <div className="lg:col-span-5 space-y-10 text-left">
              <div className="space-y-6">
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C5A059] block font-bold">
                  COORDONNÉES
                </span>
                
                {/* Sébastien Portrait Mini */}
                <div className="flex items-center gap-5 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C5A059] flex-shrink-0">
                    <img
                      src={DIRIGEANT_PORTRAIT}
                      alt="Sébastien Boistel"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#051a0f]">Sébastien Boistel</h3>
                    <span className="text-xs font-sans text-gray-500 uppercase tracking-widest block font-light">Maître d'œuvre &amp; Fondateur</span>
                  </div>
                </div>

                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#C5A059] mt-1 flex-shrink-0" />
                    <div>
                      <span className="block font-sans text-[10px] tracking-widest text-gray-400 uppercase font-bold">Courriel</span>
                      <a
                        href="mailto:mtcrunconstruction@gmail.com"
                        className="font-sans text-sm md:text-base text-gray-700 hover:text-[#C5A059] transition-colors font-medium break-all"
                      >
                        mtcrunconstruction@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#C5A059] mt-1 flex-shrink-0" />
                    <div>
                      <span className="block font-sans text-[10px] tracking-widest text-gray-400 uppercase font-bold">Bureau</span>
                      <span className="font-sans text-sm md:text-base text-gray-700 font-light block leading-relaxed">
                        45 Allée des Basilics, Bois Rouge, <br />97460 Saint-Paul, La Réunion
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map visualizer "BUREAU MTC" */}
              <div className="space-y-3">
                <span className="block font-sans text-[10px] tracking-widest text-gray-400 uppercase font-bold">Symphonie Paysagère</span>
                <div className="relative w-full aspect-video bg-[#051a0f] border border-[#C5A059]/25 flex items-center justify-center p-6 overflow-hidden group shadow-lg">
                  {/* Styled Grid Background representing a map */}
                  <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(to_right,#C5A059_1px,transparent_1px),linear-gradient(to_bottom,#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
                  
                  {/* Water feature overlay mock */}
                  <div className="absolute bottom-0 right-0 left-1/3 top-1/4 bg-[#C5A059]/10 rounded-full blur-3xl"></div>
                  
                  {/* Map Labels */}
                  <div className="absolute top-10 left-12 text-[10px] uppercase font-sans text-stone-500 tracking-widest select-none">Baie de St-Paul</div>
                  <div className="absolute bottom-16 right-16 text-[10px] uppercase font-sans text-stone-500 tracking-widest select-none">Rte des Tamarins</div>

                  {/* Marker Pin inside a beautifully rendered card */}
                  <div className="relative z-10 bg-white/95 backdrop-blur-sm border border-[#C5A059]/40 p-4 shadow-2xl flex items-center gap-3.5 group-hover:border-[#C5A059] transition-colors duration-300">
                    <div className="w-10 h-10 p-1 bg-[#051a0f] border border-[#C5A059]/20 flex items-center justify-center flex-shrink-0">
                      <img src={MAP_PIN_URL} className="w-7 h-7" alt="Bureau MTC Pin" />
                    </div>
                    <div>
                      <span className="block font-serif text-sm font-bold text-[#051a0f] tracking-wide">BUREAU MTC</span>
                      <span className="block font-sans text-[9px] text-gray-500 uppercase tracking-widest font-semibold">Saint-Paul • La Réunion</span>
                    </div>
                  </div>
                  
                  {/* Coordinates overlay badge */}
                  <div className="absolute bottom-3 right-4 font-mono text-[9px] text-[#C5A059]/60 select-none">
                    -21.0735° S, 55.2669° E
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating White Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-gray-100 shadow-xl p-8 md:p-12 relative">
                
                {/* Golden top highlight bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#C5A059]"></div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-16 h-16 bg-[#051a0f] border border-[#C5A059]/30 flex items-center justify-center mx-auto rounded-full">
                      <CheckCircle className="w-10 h-10 text-[#C5A059]" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#051a0f] tracking-wide">
                        Votre Demande a été Transmise
                      </h3>
                      <p className="font-sans text-gray-600 text-sm md:text-base leading-relaxed max-w-md mx-auto font-light">
                        Nous vous remercions pour l'intérêt que vous portez à MTC RUN CONSTRUCTION. Sébastien Boistel étudiera personnellement votre demande dans les plus bref délais.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            projectType: 'Maçonnerie Technique',
                            message: ''
                          });
                        }}
                        className="border border-[#C5A059] hover:bg-[#C5A059] text-[#C5A059] hover:text-white font-sans text-xs tracking-wider uppercase font-semibold px-6 py-3 transition-colors duration-300"
                      >
                        Nouvelle demande
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="space-y-2">
                      <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#051a0f] tracking-wide">
                        Votre PROJET...
                      </h2>
                      <p className="font-sans text-gray-500 text-xs md:text-sm font-light">
                        Veuillez renseigner les champs ci-dessous pour lancer l'étude de votre projet architectural d'exception.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Nom Complet */}
                      <div className="space-y-2">
                        <label htmlFor="fullName" className="block font-sans text-[10px] tracking-widest text-[#051a0f] uppercase font-bold">
                          Nom Complet *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="M. ou Mme Jean Dupont"
                          className="w-full font-sans text-sm border-b border-gray-200 focus:border-[#C5A059] py-3 focus:outline-none transition-colors duration-300 placeholder:text-gray-300 font-light"
                        />
                      </div>

                      {/* Adresse Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block font-sans text-[10px] tracking-widest text-[#051a0f] uppercase font-bold">
                          Adresse Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@domaine.com"
                          className="w-full font-sans text-sm border-b border-gray-200 focus:border-[#C5A059] py-3 focus:outline-none transition-colors duration-300 placeholder:text-gray-300 font-light"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Téléphone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block font-sans text-[10px] tracking-widest text-[#051a0f] uppercase font-bold">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0692 00 00 00"
                          className="w-full font-sans text-sm border-b border-gray-200 focus:border-[#C5A059] py-3 focus:outline-none transition-colors duration-300 placeholder:text-gray-300 font-light"
                        />
                      </div>

                      {/* Type de Projet Dropdown */}
                      <div className="space-y-2">
                        <label htmlFor="projectType" className="block font-sans text-[10px] tracking-widest text-[#051a0f] uppercase font-bold">
                          Type de Projet
                        </label>
                        <select
                          id="projectType"
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full font-sans text-sm border-b border-gray-200 focus:border-[#C5A059] py-3 focus:outline-none bg-transparent transition-colors duration-300 cursor-pointer text-gray-700 font-light"
                        >
                          <option value="Menuiserie Bois">Menuiserie Bois</option>
                          <option value="Charpente/Bois">Charpente / Ossature Bois</option>
                          <option value="Aménagement Bois">Aménagement Bois</option>
                          <option value="Rénovation">Rénovation</option>
                          <option value="Autre">Autre Projet</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block font-sans text-[10px] tracking-widest text-[#051a0f] uppercase font-bold">
                        Description de votre Vision *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Exprimez vos besoins, le lieu d'implantation recherché, ainsi que les exigences de matérialité..."
                        className="w-full font-sans text-sm border-b border-gray-200 focus:border-[#C5A059] py-3 focus:outline-none transition-colors duration-300 placeholder:text-gray-300 resize-none font-light"
                      ></textarea>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#C5A059] hover:bg-[#b08d48] disabled:bg-stone-300 text-[#051a0f] disabled:text-stone-500 font-sans text-xs tracking-widest uppercase font-bold py-5 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group shadow-md"
                      >
                        {isSubmitting ? 'TRANSMISSION EN COURS...' : 'ENVOYER MA DEMANDE →'}
                        {!isSubmitting && <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
