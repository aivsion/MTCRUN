import React, { useState, useEffect, useRef } from 'react';
import { testimonials } from '../data';
import { Testimonial } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star, Plus, X, UploadCloud, Trash2, CheckCircle2, MessageSquare } from 'lucide-react';
import { getStoredTestimonials, subscribeToPublicTestimonials, addTestimonialToStorage } from '../utils/testimonialStorage';

export default function Testimonials() {
  const [list, setList] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const unsub = subscribeToPublicTestimonials((data) => {
      setList(data);
      setActiveIndex(prev => (data.length > 0 && prev >= data.length) ? 0 : prev);
    });
    return () => unsub();
  }, []);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    clientName: '',
    projectType: '',
    city: '',
    region: 'La Réunion',
    country: 'France',
    comment: '',
    rating: 5,
    period: '',
    projectPhotos: [] as string[]
  });

  const [dragActive, setDragActive] = useState(false);
  const [sizeAlertOpen, setSizeAlertOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset active photo index when active testimonial changes
  useEffect(() => {
    setActivePhotoIndex(0);
  }, [activeIndex]);

  // Display only approved testimonials or those with undetermined approval (defaults)
  const publicList = list.filter(item => item.approved !== false);

  const active = publicList[activeIndex] || publicList[0] || testimonials[0];

  const handlePrev = () => {
    if (publicList.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? publicList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (publicList.length === 0) return;
    setActiveIndex((prev) => (prev === publicList.length - 1 ? 0 : prev + 1));
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = (files: FileList) => {
    const remainingSlots = 10 - formData.projectPhotos.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    let sizeError = false;

    filesToProcess.forEach(file => {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          sizeError = true;
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_SIZE = 600;
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > MAX_SIZE) {
                  height *= MAX_SIZE / width;
                  width = MAX_SIZE;
                }
              } else {
                if (height > MAX_SIZE) {
                  width *= MAX_SIZE / height;
                  height = MAX_SIZE;
                }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, width, height);
              
              const base64Data = canvas.toDataURL('image/jpeg', 0.5);
              setFormData(prev => ({
                ...prev,
                projectPhotos: [...prev.projectPhotos, base64Data].slice(0, 10)
              }));
            };
            img.src = reader.result;
          }
        };
        reader.readAsDataURL(file);
      }
    });

    if (sizeError) {
      setSizeAlertOpen(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = (indexToRemove: number) => {
    setFormData(prev => {
      const updatedPhotos = prev.projectPhotos.filter((_, idx) => idx !== indexToRemove);
      // Revoke the object URL if we created it to avoid memory leak
      try {
        if (prev.projectPhotos[indexToRemove].startsWith('blob:')) {
          URL.revokeObjectURL(prev.projectPhotos[indexToRemove]);
        }
      } catch (e) {
        console.error(e);
      }
      return {
        ...prev,
        projectPhotos: updatedPhotos
      };
    });
  };

  const handeSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.comment || !formData.projectType || !formData.city) {
      return;
    }

    // Default placeholder for project photos if none uploaded
    const finalPhotos = formData.projectPhotos.length > 0
      ? formData.projectPhotos
      : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"];

    const newTestimonial = {
      clientName: formData.clientName,
      projectType: formData.projectType,
      city: formData.city,
      region: formData.region,
      country: formData.country,
      comment: formData.comment,
      rating: formData.rating,
      period: formData.period || 'Récent',
      projectPhotos: finalPhotos
    };

    try {
      await addTestimonialToStorage(newTestimonial);

      // Reset form
      setFormData({
        clientName: '',
        projectType: '',
        city: '',
        region: 'La Réunion',
        country: 'France',
        comment: '',
        rating: 5,
        period: '',
        projectPhotos: []
      });

      // Show success message briefly
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        setIsFormOpen(false);
      }, 4500);

      // Send notification to admin
      try {
        await fetch('/api/notify-testimonial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTestimonial)
        });
      } catch (e) {
        console.error("Failed to send notification email", e);
      }
    } catch (err: any) {
      alert("Erreur: " + err.message);
    }
  };

  return (
    <section id="temoignages-section" className="py-24 md:py-32 bg-transparent text-[#1a1c1c] overflow-visible sm:overflow-x-hidden scroll-mt-24 border-t border-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl text-left space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059] block font-bold">
              RÉPUTATION
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-wide text-[#051a0f] bg-transparent">
              Expériences Partagées
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] my-4"></div>
            <p className="font-sans text-gray-500 font-light text-base md:text-lg">
              Découvrez les retours d'expérience et les photos réelles des ouvrages livrés à nos clients, témoins de notre haute technicité.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="self-start md:self-end bg-[#051a0f] hover:bg-[#C5A059] text-white hover:text-[#051a0f] font-sans text-xs tracking-widest uppercase font-semibold px-8 py-4.5 transition-colors duration-300 flex items-center gap-2 border border-transparent hover:border-[#051a0f] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Laisser un Témoignage</span>
          </button>
        </div>

        {/* Interactive Split Showcase */}
        {publicList.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
            
            {/* Left: Immersive Project Photo Gallery display (lg:col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              
              {/* Photo Viewport Container */}
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-full aspect-[4/3] bg-stone-900 border border-[#C5A059]/20 shadow-xl overflow-hidden group cursor-zoom-in"
                title="Cliquer pour agrandir la photo en entier"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active.id}-${activePhotoIndex}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {active.projectPhotos && active.projectPhotos.length > 0 ? (
                      <img
                        src={active.projectPhotos[activePhotoIndex]}
                        alt={`${active.projectType} - Rendu photo ${activePhotoIndex + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-stone-500 space-y-2">
                        <UploadCloud className="w-8 h-8 text-[#C5A059]/40" />
                        <span className="font-sans text-xs tracking-wider uppercase font-light">Structure MTC RUN</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

                {/* Live overlay showing a high-standard tag on mouse-over */}
                <div className="absolute inset-0 bg-[#051a0f]/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-[#051a0f]/90 backdrop-blur-sm border border-[#C5A059]/30 px-4 py-2.5 text-white font-sans text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-ping"></span>
                    <span className="text-[#C5A059] font-bold">Agrandir la photo</span>
                  </div>
                </div>

                {/* Floating Period Badge */}
                <div className="absolute top-4 left-4 bg-[#051a0f]/80 backdrop-blur-sm border border-[#C5A059]/30 text-white px-3 py-1 text-[10px] tracking-widest uppercase font-medium">
                  LIVRÉ EN {active.period}
                </div>

                {/* Floating Navigation Chevrons for photos if multi-photo */}
                {active.projectPhotos && active.projectPhotos.length > 1 && (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhotoIndex(prev => prev === 0 ? active.projectPhotos!.length - 1 : prev - 1);
                      }}
                      className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#C5A059] text-white hover:text-black flex items-center justify-center transition-colors pointer-events-auto backdrop-blur-sm focus:outline-none cursor-pointer"
                      title="Photo précédente"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhotoIndex(prev => prev === active.projectPhotos!.length - 1 ? 0 : prev + 1);
                      }}
                      className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#C5A059] text-white hover:text-black flex items-center justify-center transition-colors pointer-events-auto backdrop-blur-sm focus:outline-none cursor-pointer"
                      title="Photo suivante"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Multi-photo Thumbnail Strip if multiple photos */}
              {active.projectPhotos && active.projectPhotos.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 scrollbar-none">
                  {active.projectPhotos.map((photo, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => {
                        setActivePhotoIndex(pIdx);
                      }}
                      className={`relative flex-shrink-0 w-16 h-12 border-2 transition-all duration-300 cursor-pointer ${
                        activePhotoIndex === pIdx
                          ? 'border-[#C5A059] scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo}
                        alt="Prestation vignette"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                  <span className="font-sans text-[10px] text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0 whitespace-nowrap">
                    {active.projectPhotos.length} photos de la prestation
                  </span>
                </div>
              )}
            </div>

            {/* Right: Testimonial rich narrative and rating card (lg:col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between text-left space-y-8 lg:pl-4">
              
              <div className="space-y-6">
                
                {/* Score and Category Indicator */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(active.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                    {[...Array(5 - active.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-stone-200" />
                    ))}
                  </div>

                  <span className="font-sans text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold border-b border-[#C5A059]/30 pb-0.5">
                    {active.projectType}
                  </span>
                </div>

                {/* Narrative with Quote graphic watermark */}
                <div className="relative">
                  <Quote className="absolute -top-6 -left-6 w-14 h-14 text-[#C5A059]/10 stroke-[1]" />
                  
                  <div className="min-h-[140px] flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="relative z-10 space-y-4"
                      >
                        <blockquote className="font-serif text-lg md:text-xl text-[#051a0f] leading-relaxed font-light italic text-stone-800">
                          "{active.comment}"
                        </blockquote>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Client Label and Detailed Verified localization metadata */}
                <div className="pt-4 space-y-1">
                  <h3 className="font-serif text-xl font-bold tracking-wide text-[#051a0f]">
                    {active.clientName}
                  </h3>
                  <p className="font-sans text-xs tracking-wider text-stone-500 uppercase font-light">
                    {active.city} • {active.region} • {active.country}
                  </p>
                </div>
              </div>

              {/* Bottom Carousel Navigation Controls */}
              <div className="pt-8 border-t border-gray-100 flex items-center justify-between gap-6">
                
                {/* Horizontal progress dots representing current index */}
                <div className="flex items-center gap-2">
                  {publicList.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 transition-all duration-300 rounded-full ${
                        activeIndex === idx ? 'w-8 bg-[#C5A059]' : 'w-2 bg-stone-200 hover:bg-stone-450'
                      }`}
                      aria-label={`Aller au témoignage ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="w-12 h-12 border border-gray-200 hover:border-[#051a0f] rounded-none flex items-center justify-center text-gray-500 hover:text-[#051a0f] transition-all hover:bg-[#051a0f]/5 cursor-pointer focus:outline-none"
                    aria-label="Témoignage précédent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="font-mono text-xs text-gray-400 select-none px-2">
                    0{activeIndex + 1} / 0{publicList.length}
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-12 h-12 border border-gray-200 hover:border-[#051a0f] rounded-none flex items-center justify-center text-gray-500 hover:text-[#051a0f] transition-all hover:bg-[#051a0f]/5 cursor-pointer focus:outline-none"
                    aria-label="Témoignage suivant"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-stone-50 border border-stone-100">
            <MessageSquare className="w-12 h-12 text-[#C5A059]/40 mx-auto mb-4" />
            <p className="font-serif text-xl font-bold text-stone-600">Aucun témoignage pour le moment</p>
            <p className="font-sans text-sm text-stone-500 mt-2 max-w-lg mx-auto">Soyez le premier à partager votre expérience avec MTC RUN CONSTRUCTION.</p>
          </div>
        )}

      </div>

      {/* RETHINK EXQUISITE MODAL FOR LAUNCHING A NEW REVIEW */}
      {isFormOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop screen */}
          <div 
            onClick={() => setIsFormOpen(false)}
            className="fixed inset-0 bg-[#03100a]/90 backdrop-blur-sm cursor-pointer transition-opacity duration-300"
          ></div>

          {/* Form Modal Layout */}
          <div className="relative bg-white border border-[#C5A059]/30 rounded-none w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl my-8">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C5A059]"></div>
            
            {/* Close */}
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 focus:outline-none p-2 transition-colors z-25 cursor-pointer"
              aria-label="Fermer la fenêtre d'écriture"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Frame */}
            <div className="p-6 md:p-10 space-y-8">
              
              <div className="text-left space-y-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C5A059] block font-bold">
                  EXPÉRIENCE
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#051a0f] tracking-wide">
                  Raconter Votre Projet
                </h3>
                <p className="font-sans text-[#1a1c1c]/70 text-xs md:text-sm font-light leading-relaxed">
                  Votre avis témoigne du respect des normes et des règles de l'art. Partagez votre ressenti sur nos prestations.
                </p>
              </div>

              {/* Form implementation */}
              <form onSubmit={handeSubmitTestimonial} className="space-y-6 text-left">
                
                {/* Row: Client Name & Project Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#051a0f]">
                      Votre Nom <span className="text-[#C5A059]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-[#fdfdfc] border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-none px-4 py-3 text-sm font-sans focus:outline-none transition-colors"
                      placeholder="Ex: Sophie & David M."
                      value={formData.clientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#051a0f]">
                      Type de Prestation <span className="text-[#C5A059]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-[#fdfdfc] border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-none px-4 py-3 text-sm font-sans focus:outline-none transition-colors"
                      placeholder="Ex: Charpente Traditionnelle en Pin Sylvestre"
                      value={formData.projectType}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Row: City / Region / Country & Delivery Date */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 space-y-1.5">
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#051a0f]">
                      Ville <span className="text-[#C5A059]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-[#fdfdfc] border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-none px-3 py-3 text-sm font-sans focus:outline-none transition-colors"
                      placeholder="Ex: Saint-Paul"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>

                  <div className="md:col-span-1 space-y-1.5">
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#051a0f]">
                      Région
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#fdfdfc] border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-none px-3 py-3 text-sm font-sans focus:outline-none transition-colors"
                      placeholder="La Réunion"
                      value={formData.region}
                      onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                    />
                  </div>

                  <div className="md:col-span-1 space-y-1.5">
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#051a0f]">
                      Pays
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#fdfdfc] border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-none px-3 py-3 text-sm font-sans focus:outline-none transition-colors"
                      placeholder="France"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    />
                  </div>

                  <div className="md:col-span-1 space-y-1.5">
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#051a0f]">
                      Date Livraison
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#fdfdfc] border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-none px-3 py-3 text-sm font-sans focus:outline-none transition-colors"
                      placeholder="Ex: Mai 2026"
                      value={formData.period}
                      onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Rating selection stars */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#051a0f]">
                    Votre Évaluation
                  </span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: stars }))}
                        className="p-1 focus:outline-none scale-100 hover:scale-110 active:scale-95 transition-transform"
                      >
                        <Star 
                          className={`w-7 h-7 transition-colors ${
                            stars <= formData.rating 
                              ? 'fill-[#C5A059] text-[#C5A059]' 
                              : 'text-stone-300 hover:text-[#C5A059]/50'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-mono text-xs text-gray-500 pl-2">({formData.rating} / 5 étoiles)</span>
                  </div>
                </div>

                {/* Comments / Texarea */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#051a0f]">
                    Votre Message / Commentaire <span className="text-[#C5A059]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-[#fdfdfc] border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-none px-4 py-3 text-sm font-sans focus:outline-none transition-colors resize-y leading-relaxed"
                    placeholder="Écrivez ici votre retour d'expérience précieux..."
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  />
                </div>

                {/* Photos of the prestation: Up to 10 photos */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#051a0f]">
                      Photos de Vos Travaux <span className="font-normal text-stone-400 font-sans tracking-tight">(Optionnel - Max 10 photos)</span>
                    </label>
                    <span className="font-mono text-xs text-[#C5A059] font-bold">
                      {formData.projectPhotos.length} / 10
                    </span>
                  </div>

                  {/* Drag-and-Drop Dropzone Zone */}
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border-2 border-dashed rounded-none p-6 text-center transition-colors cursor-pointer flex flex-col items-center justify-center space-y-2 select-none min-h-[110px] ${
                      dragActive 
                        ? 'border-[#C5A059] bg-[#051a0f]/5' 
                        : 'border-stone-300 hover:border-[#C5A059] hover:bg-stone-50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <UploadCloud className="w-8 h-8 text-[#C5A059] stroke-[1.25]" />
                    <div className="space-y-1">
                      <p className="font-sans text-xs text-stone-700 font-medium">
                        Déposez vos photos ou <span className="text-[#C5A059] underline font-semibold">parcourez votre ordinateur</span>
                      </p>
                      <p className="font-sans text-[10px] text-stone-400 font-medium">
                        Fichiers JPG, PNG acceptés (Max 10 / <span className="text-rose-500">Max 5 Mo par photo</span>).
                      </p>
                    </div>
                  </div>

                  {/* Interactive Previews of loaded pictures with remove button */}
                  {formData.projectPhotos.length > 0 && (
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2 p-2 bg-stone-50 border border-gray-100">
                      {formData.projectPhotos.map((photoUrl, pIdx) => (
                        <div key={pIdx} className="relative aspect-square bg-[#051a0f] border border-stone-200 group overflow-hidden">
                          <img
                            src={photoUrl}
                            alt="Aperçu"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(pIdx)}
                            className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-90 transition-opacity hover:scale-105"
                            title="Supprimer la photo"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submitting Status feedback or standard button */}
                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="font-sans text-xs tracking-widest uppercase font-medium text-stone-500 hover:text-[#051a0f] py-2 cursor-pointer focus:outline-none"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    className="bg-[#051a0f] hover:bg-[#C5A059] text-white hover:text-[#051a0f] font-sans text-xs tracking-widest uppercase font-semibold px-8 py-4 transition-all duration-300 flex items-center gap-2 border border-transparent hover:border-[#051a0f] cursor-pointer"
                  >
                    <span>Soumettre mon Témoignage</span>
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/95 p-4 md:p-8 animate-fade-in">
            {/* Backdrop click to close */}
            <div 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute inset-0 cursor-zoom-out"
            ></div>

            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-105 p-3 rounded-full bg-stone-900/65 border border-white/10 backdrop-blur-md z-35 cursor-pointer transition-all"
              aria-label="Fermer la vue plein écran"
              title="Fermer (Échap)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <div className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center z-10 select-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activePhotoIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  src={active.projectPhotos?.[activePhotoIndex]}
                  alt="Prestation en entier"
                  className="max-w-full max-h-full object-contain shadow-2xl border border-stone-800"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Navigation arrows inside lightbox */}
              {active.projectPhotos && active.projectPhotos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex(prev => prev === 0 ? active.projectPhotos!.length - 1 : prev - 1);
                    }}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-[#C5A059] text-white hover:text-black flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm border border-white/10"
                    aria-label="Photo précédente"
                    title="Précédent"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex(prev => prev === active.projectPhotos!.length - 1 ? 0 : prev + 1);
                    }}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-[#C5A059] text-white hover:text-black flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm border border-white/10"
                    aria-label="Photo suivante"
                    title="Suivant"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Information bar showing testimonial info & photo index */}
            <div className="mt-6 z-10 flex flex-col items-center gap-2 text-center max-w-lg bg-stone-900/80 border border-white/10 px-6 py-3 backdrop-blur-md shadow-xl">
              <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-[0.2em] font-semibold">
                Photo {activePhotoIndex + 1} sur {active.projectPhotos?.length}
              </span>
              <p className="font-serif text-sm text-stone-200">
                {active.clientName} • <span className="font-sans text-xs text-stone-400">{active.projectType} ({active.city})</span>
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Exquisite full success overlay banner */}
      <AnimatePresence>
        {successMessage && (
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#03100a]/80 backdrop-blur-sm"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white border-2 border-[#C5A059] p-8 md:p-12 text-center max-w-sm w-full space-y-4 shadow-2xl z-20"
            >
              <div className="w-16 h-16 bg-[#051a0f] text-[#C5A059] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#051a0f]">Témoignage Enregistré !</h3>
              <p className="font-sans text-[11px] text-stone-500 leading-relaxed uppercase tracking-wider">
                Merci infiniment pour votre partage. Votre témoignage a été transmis à l'administrateur et sera publié après validation.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Photo Size Limit Alert Overlay */}
      <AnimatePresence>
        {sizeAlertOpen && (
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setSizeAlertOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white border border-rose-200 p-8 text-center max-w-sm w-full space-y-5 shadow-2xl z-20 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
              
              <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-sm ring-4 ring-rose-50/50">
                <UploadCloud className="w-6 h-6" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-stone-900">Image Trop Volumineuse</h3>
                <p className="font-sans text-xs text-stone-500 leading-relaxed">
                  L'image que vous tentez d'importer dépasse la limite stricte de <span className="font-bold text-rose-600">5 Mo</span>.
                </p>
                <div className="bg-stone-50 border border-stone-200 p-3 mt-4 text-left">
                  <p className="font-sans text-[10px] text-stone-600">
                    <strong className="block text-stone-800 mb-1 tracking-wider uppercase text-[9px]">Pourquoi cette limite ?</strong>
                    Pour garantir des performances de chargement ultra-rapides du site web sur mobile et assurer un hébergement écologique optimal de l'application, nous limitons le poids des ressources.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSizeAlertOpen(false)}
                className="w-full mt-4 bg-stone-900 hover:bg-stone-800 text-white font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors"
              >
                Compris, merci
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
