import React, { useState, useRef, useEffect } from 'react';
import { GalleryPhoto, Testimonial } from '../types';
import { 
  addPhotoToStorage, 
  updatePhotoInStorage, 
  deletePhotoFromStorage,
  subscribeToGalleryPhotos
} from '../utils/galleryStorage';
import {
  toggleTestimonialApproval,
  deleteTestimonialFromStorage,
  subscribeToAdminTestimonials
} from '../utils/testimonialStorage';
import { auth } from '../firebaseSetup';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  ArrowLeft, 
  Lock, 
  Settings, 
  MapPin, 
  Check, 
  LogOut, 
  AlertTriangle,
  Layers,
  Sparkles,
  RefreshCw,
  MessageSquare,
  Eye,
  EyeOff,
  Star,
  CheckCircle2,
  Wand2
} from 'lucide-react';

interface PageAdminProps {
  setCurrentPage: (page: string) => void;
}

export default function PageAdmin({ setCurrentPage }: PageAdminProps) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginError, setLoginError] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccessMessage('Connexion réussie.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setLoginError('Échec de la connexion: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setSuccessMessage('Déconnexion réussie.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };


  // Photos management state
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);

  // Selected category filter for the photo list
  const [selectedCategory, setSelectedCategory] = useState<string>('TOUS');

  // Multi-files state
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ url: string; title: string; filename: string }>>([]);

  // New photo form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'CHARPENTE BOIS' as GalleryPhoto['category'],
    chantierName: '',
    location: '',
    description: '',
    url: ''
  });

  // Base64 file state & drag-over state
  const [fileBase64, setFileBase64] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragError, setDragError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

// Success notifications
  const [successMessage, setSuccessMessage] = useState('');

  // Active Tab state
  const [activeTab, setActiveTab] = useState<'photos' | 'testimonials'>('photos');

  // Testimonials state
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);

  // Load photos and testimonials on mount / auth change
  useEffect(() => {
    let unsubPhotos: any;
    let unsubTestimonials: any;

    if (isAuthenticated) {
      unsubPhotos = subscribeToGalleryPhotos((data) => {
        setPhotos(data);
      });
      unsubTestimonials = subscribeToAdminTestimonials((data) => {
        setTestimonialsList(data);
      });
    } else {
      setPhotos([]);
      setTestimonialsList([]);
    }

    return () => {
      if (unsubPhotos) unsubPhotos();
      if (unsubTestimonials) unsubTestimonials();
    };
  }, [isAuthenticated]);

  // Derived state: filter photos by category in real-time
  const filteredPhotos = selectedCategory === 'TOUS'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  // Handle testimonial approval toggle
  const handleToggleApproval = async (id: string, currentApproved: boolean) => {
    const nextApprovedState = !currentApproved;
    try {
      await toggleTestimonialApproval(id, nextApprovedState);
      setSuccessMessage(
        nextApprovedState 
          ? "✨ Témoignage approuvé ! Il est maintenant visible sur le site public." 
          : "👁️ Témoignage suspendu. Il a été masqué du site public."
      );
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (e: any) {
      alert("Erreur: " + e.message);
    }
  };

  // Handle testimonial deletion
  const handleDeleteTestimonial = async (id: string, clientName: string) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement le témoignage de "${clientName}" ?`);
    if (confirmDelete) {
      try {
        await deleteTestimonialFromStorage(id);
        setSuccessMessage('🗑️ Témoignage supprimé du système.');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (e: any) {
        alert("Erreur: " + e.message);
      }
    }
  };

  // Convert Files to Base64 with resizing
  const processFiles = (files: FileList) => {
    const validFiles: File[] = [];
    let errorMsg = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        errorMsg = 'Seuls les fichiers d’image sont autorisés.';
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        errorMsg = `L'image "${file.name}" dépasse 5 Mo. Veuillez choisir une image plus légère.`;
        continue;
      }
      validFiles.push(file);
    }

    if (errorMsg) {
      setDragError(errorMsg);
    } else {
      setDragError('');
    }

    if (validFiles.length === 0) return;

    // Convert each to base64, resizing to max 1024px to save bandwidth
    const promises = validFiles.map(file => {
      return new Promise<{ url: string; title: string; filename: string }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
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
            
            // Clean/beautify the filename for default title
            const label = file.name.split('.').slice(0, -1).join('.').replace(/[-_]/g, ' ');
            resolve({
              url: canvas.toDataURL('image/jpeg', 0.5),
              title: label.charAt(0).toUpperCase() + label.slice(1),
              filename: file.name
            });
          };
          img.onerror = () => reject();
          img.src = reader.result as string;
        };
        reader.onerror = () => reject();
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(results => {
      if (isEditing) {
        // In editing mode, replace/set the single file
        if (results.length > 0) {
          setFileBase64(results[0].url);
          setFormData(prev => ({ ...prev, url: results[0].url }));
          setUploadedFiles([results[0]]);
        }
      } else {
        // In add mode, append/set multiple files!
        setUploadedFiles(prev => {
          const next = [...prev, ...results];
          return next;
        });
        if (results.length > 0) {
          setFormData(prev => ({ 
            ...prev, 
            url: results[0].url,
            title: prev.title || results[0].title
          }));
          setFileBase64(results[0].url);
        }
      }
    }).catch(err => {
      console.error('Failure reading files:', err);
    });
  };

  // Drag Event Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission (Add or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.url && uploadedFiles.length === 0) {
      alert('Veuillez ajouter au moins une image.');
      return;
    }

    try {
      if (isEditing && editingPhoto) {
        // Edit mode
        const updated: GalleryPhoto = {
          ...editingPhoto,
          title: formData.title || 'Nouvelle réalisation',
          category: formData.category || 'CHARPENTE BOIS',
          chantierName: formData.chantierName || 'Nouveau Chantier',
          location: formData.location || 'La Réunion',
          description: formData.description || '',
          urls: uploadedFiles.length > 0 ? uploadedFiles.map(f => f.url) : editingPhoto.urls
        };
        await updatePhotoInStorage(updated);
        setSuccessMessage('Photo de chantier modifiée avec succès.');
      } else {
        // Create mode
        if (uploadedFiles.length > 0) {
          // Uploaded files mode
          const chantierId = `chantier-${Date.now()}`;
          const finalChantierName = formData.chantierName || 'Nouveau Chantier';
          
          await addPhotoToStorage({
            title: formData.title || 'Nouvelle réalisation',
            category: formData.category || 'CHARPENTE BOIS',
            chantierName: finalChantierName,
            location: formData.location || 'La Réunion',
            description: formData.description || '',
            urls: uploadedFiles.map(f => f.url),
            chantierId: chantierId
          });
          
          setSuccessMessage(`✨ Chantier "${finalChantierName}" avec ${uploadedFiles.length} photo(s) ajouté avec succès.`);
        } else {
          // Direct URL mode (fallback if URL was manual - but wait, we only support urls array now)
          await addPhotoToStorage({
            title: formData.title || 'Nouvelle réalisation',
            category: formData.category || 'CHARPENTE BOIS',
            chantierName: formData.chantierName || 'Nouveau Chantier',
            location: formData.location || 'La Réunion',
            description: formData.description || '',
            urls: formData.url ? [formData.url] : [],
            chantierId: `chantier-${Date.now()}`
          });
          setSuccessMessage('Nouvelle photo de chantier ajoutée avec succès.');
        }
      }

      // Reset Form & state
      resetForm();
      onPhotosUpdated(); // Trigger refresh in parent
      // Note: we can't reliably load getStoredPhotos if it hasn't synced, but we use subscription
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: any) {
      alert("Erreur: L'image est peut-être trop lourde pour être sauvegardée ou réseau indisponible. " + err.message);
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'CHARPENTE BOIS',
      chantierName: '',
      location: '',
      description: '',
      url: ''
    });
    setFileBase64('');
    setUploadedFiles([]);
    setIsEditing(false);
    setEditingPhoto(null);
    setDragError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Edit Action clicked
  const handleStartEdit = (photo: GalleryPhoto) => {
    setIsEditing(true);
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      category: photo.category,
      chantierName: photo.chantierName,
      location: photo.location,
      description: photo.description,
      url: (photo.urls && photo.urls.length > 0) ? photo.urls[0] : (photo.url || '')
    });
    setFileBase64('');
    
    // Handle migration from .url to .urls smoothly
    let filesToLoad: any[] = [];
    if (photo.urls && photo.urls.length > 0) {
      filesToLoad = photo.urls.map((u, i) => ({
        url: u,
        title: `${photo.title} ${i + 1}`,
        filename: `image-${i}`
      }));
    } else if (photo.url) {
      filesToLoad = [{
        url: photo.url,
        title: photo.title,
        filename: 'image-existante'
      }];
    }
    setUploadedFiles(filesToLoad);
    
    // Scroll smoothly to edit form
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Delete Action clicked
  const handleDelete = (id: string, title: string) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement la photo "${title}" ?`);
    if (confirmDelete) {
      deletePhotoFromStorage(id)
        .then(() => {
          setSuccessMessage('Photo supprimée définitivement.');
          onPhotosUpdated(); // Trigger parent reload
          // We rely on subscribeToGalleryPhotos to update photos state automatically
          setTimeout(() => setSuccessMessage(''), 3000);
          if (isEditing && editingPhoto?.id === id) {
            resetForm();
          }
        })
        .catch(err => {
          alert("Erreur lors de la suppression. " + err.message);
        });
    }
  };

  // Delete all photos to start from scratch
  const handleClearAll = () => {
    const confirmClear = window.confirm(
      "Êtes-vous sûr de vouloir SUPPRIMER TOUTES les photos de la galerie ? Cette action est irréversible et vous repartirez totalement à zéro !"
    );
    if (confirmClear) {
      saveStoredPhotos([]);
      setPhotos([]);
      onPhotosUpdated(); // Sync empty list to the rest of the application
      setSuccessMessage('✨ La galerie a été entièrement vidée. Vous pouvez maintenant repartir à zéro !');
      setTimeout(() => setSuccessMessage(''), 5000);
      resetForm();
    }
  };

  // Return to public app
  const handleBackToPublic = () => {
    // Clear URL path of '/ADMIN' to clean up URL
    window.history.pushState(null, '', '/');
    setCurrentPage('accueil');
  };

  return (
    <div className="w-full bg-[#fcfbfa] text-[#1a1c1c]">
      {/* 1. HEADER HERO */}
      <section className="bg-[#051a0f] text-white py-16 px-6 relative border-b border-[#C5A059]/20">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-left">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C5A059] block font-bold">
              PANNEAU DE CONTRÔLE SÉCURISÉ
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-medium">
              Espace Administration
            </h1>
            <p className="font-sans text-gray-300 font-light text-sm max-w-xl">
              Gérez en toute simplicité les chantiers d'exception et la galerie de réalisations MTC RUN CONSTRUCTION.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 self-start md:self-auto">
            <button
              onClick={handleBackToPublic}
              className="bg-transparent hover:bg-[#C5A059] text-[#C5A059] hover:text-[#051a0f] font-sans text-xs tracking-widest uppercase font-semibold px-6 py-3.5 border border-[#C5A059]/40 hover:border-[#C5A059] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Retourner au site public</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-transparent hover:bg-rose-700 hover:text-white text-stone-300 font-sans text-xs tracking-widest uppercase font-semibold px-6 py-3.5 border border-stone-700 hover:border-transparent transition-all duration-300 flex items-center gap-2 cursor-pointer"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
              <span>Quitter</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. AUTHENTICATION GATE */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto px-6 py-16">
          <div className="bg-white border border-stone-200/80 shadow-2xl p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-[#051a0f]/5 border border-[#C5A059]/30 rounded-full flex items-center justify-center text-[#C5A059]">
              <Lock className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#051a0f]">Authentification Requise</h2>
              <p className="font-sans text-xs text-stone-500">
                L'accès à cet espace est réservé au gérant et administrateur du site.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs text-left rounded-sm flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="pt-4 space-y-4">
              <button
                onClick={handleLogin}
                className="w-full bg-[#051a0f] hover:bg-[#C5A059] text-white hover:text-[#051a0f] font-sans text-xs tracking-widest uppercase font-bold py-4 transition-all duration-300 cursor-pointer text-center flex justify-center items-center gap-2"
              >
                Se connecter avec Google
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 3. ADMIN DASHBOARD */
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12 text-left">
          {/* Notification Zone */}
          {successMessage && (
            <div className="p-4 bg-[#051a0f] border border-[#C5A059] text-white text-sm font-semibold flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <span className="p-1 bg-[#C5A059] text-[#051a0f] rounded-full">
                  <Check className="w-4 h-4" />
                </span>
                <span>{successMessage}</span>
              </div>
              <button 
                onClick={() => setSuccessMessage('')}
                className="text-white hover:text-[#C5A059] text-xs font-bold uppercase font-mono px-2"
              >
                Fermer
              </button>
            </div>
          )}

          {/* Admin Tabs Selector */}
          <div className="flex border-b border-stone-200 gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('photos')}
              className={`pb-4 px-6 font-sans text-xs uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'photos'
                  ? 'border-[#051a0f] text-[#051a0f]'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Réalisations & Galerie</span>
              <span className="bg-stone-100 text-stone-600 text-[10px] font-sans font-extrabold px-2 py-0.5 ml-1">
                {photos.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`pb-4 px-6 font-sans text-xs uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 relative whitespace-nowrap ${
                activeTab === 'testimonials'
                  ? 'border-[#051a0f] text-[#051a0f]'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Témoignages & Modération</span>
              {testimonialsList.filter(t => t.approved === false).length > 0 ? (
                <span className="bg-amber-500 text-white text-[9px] font-sans font-extrabold px-1.5 py-0.5 ml-1 animate-pulse rounded-full">
                  {testimonialsList.filter(t => t.approved === false).length} EN ATTENTE
                </span>
              ) : (
                <span className="bg-stone-100 text-stone-500 text-[10px] font-sans font-extrabold px-2 py-0.5 ml-1">
                  {testimonialsList.length}
                </span>
              )}
            </button>
          </div>

          {activeTab === 'photos' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Form Section - Add/Edit */}
            <div className="lg:col-span-5 bg-white border border-stone-200 shadow-lg p-6 md:p-8 space-y-6 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#C5A059]"></div>
              
              <div className="space-y-1">
                <span className="font-sans text-[9px] text-[#C5A059] uppercase tracking-widest font-extrabold flex items-center gap-1">
                  <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  {isEditing ? 'ÉDITION D’OUVRAGE EXISTANT' : 'CRÉATION DE FICHE TECHNIQUE'}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#051a0f]">
                  {isEditing ? 'Modifier la Photo' : 'Ajouter un Chantier'}
                </h3>
                <p className="font-sans text-xs text-stone-400">
                  Renseignez les détails structurels et matériels de cet ouvrage.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
                    Titre de la photo (ex: Assemblage Traditionnel) *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="ex: Détail de Chevronnage Invisible"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                  />
                </div>

                {/* Category & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
                      Catégorie Métier *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-stone-50 border border-stone-200 font-sans text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all cursor-pointer"
                    >
                      <option value="CHARPENTE BOIS">CHARPENTE BOIS</option>
                      <option value="AMÉNAGEMENTS BOIS">AMÉNAGEMENTS BOIS</option>
                      <option value="MENUISERIE BOIS">MENUISERIE BOIS</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
                      Localisation de l'île *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="ex: Saint-Gilles-les-Bains, Cilaos"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                    />
                  </div>
                </div>

                {/* Chantier Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
                    Nom du Projet / Chantier *
                  </label>
                  <input
                    type="text"
                    name="chantierName"
                    value={formData.chantierName}
                    onChange={handleInputChange}
                    placeholder="ex: Villa d'Architecte Contemporaine"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
                    Spécificités & Description de l'Ouvrage *
                  </label>
                  <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Décrivez les assemblages techniques, essences utilisées, résistance cyclonique, certifications durables..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 font-sans text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                  ></textarea>
                </div>

                {/* Image Section */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
                    Image du Projet (Fichier Local ou URL) *
                  </label>

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-none p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                      isDragOver 
                        ? 'border-[#C5A059] bg-[#C5A059]/5' 
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100/50 hover:border-stone-400'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    
                    {fileBase64 ? (
                      <div className="relative w-full max-h-36 overflow-hidden border border-stone-200">
                        <img 
                          src={fileBase64} 
                          alt="Prévisualisation" 
                          className="w-full h-full object-cover max-h-36"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-[#051a0f]/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-[10px] uppercase tracking-wider font-bold bg-[#C5A059] px-2.5 py-1">
                            Glisser de nouvelles photos ou cliquer pour remplacer / ajouter
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-7 h-7 text-stone-400 group-hover:text-[#C5A059]" />
                        <div>
                          <p className="font-sans text-xs font-semibold text-[#051a0f]">
                            Glissez vos photos ici ou <span className="text-[#C5A059] underline">parcourez vos fichiers</span>
                          </p>
                          <p className="text-[10px] text-stone-400 mt-1 font-light">Sélection individuelle ou multiple (PNG, JPG, jusqu'à 5 Mo)</p>
                        </div>
                      </>
                    )}
                  </div>

                  {dragError && (
                    <p className="text-[10px] font-semibold text-red-650 font-sans">{dragError}</p>
                  )}

                  {/* List of uploaded files to import */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-3 pt-2 bg-stone-50/50 border border-stone-200 p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                        <span className="block text-[10.5px] font-sans font-bold uppercase tracking-wider text-[#051a0f]">
                          Photos sélectionnées ({uploadedFiles.length})
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {!isEditing && (
                            <button
                              type="button"
                              onClick={() => {
                                setUploadedFiles([]);
                                setFileBase64('');
                                setFormData(prev => ({ ...prev, url: '' }));
                                if (fileInputRef.current) fileInputRef.current.value = '';
                              }}
                              className="text-[10px] uppercase font-bold tracking-wider text-red-600 hover:text-red-800 font-sans cursor-pointer ml-2"
                            >
                              Tout effacer
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="relative group/thumb border border-stone-250 bg-white p-2 space-y-1.5 flex flex-col justify-between shadow-xs">
                            <div className="relative aspect-video w-full overflow-hidden bg-stone-900 border border-stone-100">
                              <img 
                                src={file.url} 
                                alt={file.title} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              {/* Delete individual photo button */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = uploadedFiles.filter((_, i) => i !== index);
                                  setUploadedFiles(updated);
                                  if (updated.length > 0) {
                                    setFileBase64(updated[0].url);
                                    setFormData(prev => ({ ...prev, url: updated[0].url }));
                                  } else {
                                    setFileBase64('');
                                    setFormData(prev => ({ ...prev, url: '' }));
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                  }
                                }}
                                className="absolute top-1 right-1 bg-rose-600 hover:bg-rose-700 text-white p-1 shadow transition-colors cursor-pointer"
                                title="Retirer cette photo"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>

                              {/* Index badge */}
                              <span className="absolute bottom-1 left-1 bg-[#051a0f] text-white font-sans text-[8.5px] font-bold px-1.5 py-0.5 pointer-events-none">
                                Photo {index + 1}
                              </span>
                            </div>

                            {/* Subtitle/Title input per specific image */}
                            <div className="space-y-1 text-left">
                              <label className="block text-[8px] font-sans font-bold uppercase tracking-wider text-stone-400">
                                Titre individuel de l'ouvrage
                              </label>
                              <input
                                type="text"
                                value={file.title}
                                placeholder="Saisir un titre..."
                                onChange={(e) => {
                                  const updated = [...uploadedFiles];
                                  updated[index].title = e.target.value;
                                  setUploadedFiles(updated);
                                  
                                  // If it's the first photo, sync it with main formData.title
                                  if (index === 0) {
                                    setFormData(prev => ({ ...prev, title: e.target.value }));
                                  }
                                }}
                                className="w-full px-2 py-1 bg-stone-50 border border-stone-200 font-sans text-[10px] focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all text-stone-700"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Separator */}
                  <div className="flex items-center text-stone-400 gap-2 select-none justify-center">
                    <span className="h-px w-full bg-stone-200"></span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold">OU</span>
                    <span className="h-px w-full bg-stone-200"></span>
                  </div>

                  {/* Alternative URL paste */}
                  <div className="space-y-1">
                    <input
                      type="text"
                      name="url"
                      value={formData.url.startsWith('data:') ? '' : formData.url}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({ ...prev, url: val }));
                        setFileBase64(''); // Clear local file preview if pasting URL
                      }}
                      placeholder="Coller l'adresse (URL) d'une image internet"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 font-sans text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-transparent hover:bg-stone-50 text-stone-500 border border-stone-200 font-sans text-[10px] tracking-widest uppercase font-bold py-3.5 transition-all text-center cursor-pointer"
                  >
                    Annuler / Vider
                  </button>
                  <button
                    type="submit"
                    className="bg-[#051a0f] hover:bg-[#C5A059] text-white hover:text-[#051a0f] font-sans text-[10px] tracking-widest uppercase font-bold py-3.5 border border-transparent hover:border-[#051a0f] transition-all text-center cursor-pointer"
                  >
                    {isEditing ? 'SAUVEGARDER' : 'AJOUTER'}
                  </button>
                </div>
              </form>
            </div>

            {/* List & Edit Area */}
            <div className="lg:col-span-7 bg-white border border-stone-200 shadow-xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-4 gap-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#051a0f]">
                    Liste des Ouvrages de la Galerie
                  </h3>
                  <p className="font-sans text-xs text-stone-400">
                    Cliquez sur les onglets de catégories ci-dessous pour filtrer l'affichage.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      // Handled by snapshot listener automatically. Just show a message.
                      setSuccessMessage('Données de la galerie synchronisées en temps réel.');
                      setTimeout(() => setSuccessMessage(''), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-[#051a0f] bg-stone-50 text-xs font-bold uppercase font-sans tracking-wide transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Réactualiser
                  </button>
                  
                  {photos.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-200 hover:border-red-600 hover:bg-red-50 text-red-600 text-xs font-bold uppercase font-sans tracking-wide transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Vider la galerie
                    </button>
                  )}
                </div>
              </div>

              {/* Category-based real-time filtering bar */}
              <div className="flex flex-wrap gap-1.5 pb-2">
                {[
                  { id: 'TOUS', label: 'Tous les projets' },
                  { id: 'CHARPENTE BOIS', label: 'Charpente' },
                  { id: 'AMÉNAGEMENTS BOIS', label: 'Aménagements' },
                  { id: 'MENUISERIE BOIS', label: 'Menuiserie' }
                ].map((catFilter) => {
                  const count = catFilter.id === 'TOUS' 
                    ? photos.length 
                    : photos.filter(p => p.category === catFilter.id).length;
                  const isActive = selectedCategory === catFilter.id;
                  
                  return (
                    <button
                      key={catFilter.id}
                      type="button"
                      onClick={() => setSelectedCategory(catFilter.id)}
                      className={`px-3 py-2 font-sans text-[10px] tracking-wider uppercase font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#051a0f] border-[#051a0f] text-white font-medium shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-605 hover:border-stone-400 hover:bg-stone-100'
                      }`}
                    >
                      <span>{catFilter.label}</span>
                      <span className={`text-[8px] font-sans px-1.5 py-0.5 font-extrabold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {filteredPhotos.length === 0 ? (
                <div className="text-center py-20 bg-stone-50 border border-stone-100 border-dashed space-y-2">
                  <Layers className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="font-sans text-xs text-stone-500">Aucun projet enregistré dans cette catégorie d'ouvrage.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                  {filteredPhotos.map((photo) => (
                    <div 
                      key={photo.id}
                      className={`flex flex-col sm:flex-row border p-4 items-start sm:items-center gap-4 transition-all ${
                        isEditing && editingPhoto?.id === photo.id 
                          ? 'border-[#C5A059] bg-[#C5A059]/5' 
                          : 'border-stone-100 bg-white hover:border-[#051a0f]/30 hover:bg-stone-50/40'
                      }`}
                    >
                      {/* Image Preview Thumbnail */}
                      <div className="w-20 sm:w-24 aspect-[4/3] relative flex-shrink-0 bg-stone-100 overflow-hidden border border-stone-100">
                        <img 
                          src={(photo.urls && photo.urls.length > 0) ? photo.urls[0] : (photo.url || '')} 
                          alt={photo.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-1 left-1 bg-[#051a0f] text-white text-[7px] font-bold p-1 leading-none uppercase">
                          {photo.category.split(' ')[0]}
                        </span>
                      </div>

                      {/* Photo details metadatas */}
                      <div className="flex-grow space-y-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="font-sans text-[9px] uppercase tracking-wider text-[#C5A059] font-bold">
                            {photo.category}
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-stone-400 text-[9px] font-sans">
                            <MapPin className="w-2.5 h-2.5 text-[#C5A059]" />
                            {photo.location}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-[#051a0f]">
                          {photo.title}
                        </h4>
                        <p className="font-sans text-[11px] text-stone-400 leading-tight">
                          Projet : <span className="text-stone-600 font-medium">{photo.chantierName}</span>
                        </p>
                        <p className="font-sans text-[10px] text-stone-400 line-clamp-1 italic">
                          "{photo.description}"
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex sm:flex-col items-center justify-end gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100 flex-shrink-0">
                        <button
                          onClick={() => handleStartEdit(photo)}
                          className="flex-1 sm:flex-none inline-flex items-center gap-1 bg-stone-100 hover:bg-[#C5A059] text-stone-600 hover:text-[#051a0f] px-3 py-1.5 text-[10px] font-bold uppercase font-sans tracking-wide transition-all cursor-pointer border border-[#C5A059]/10"
                          title="Modifier cet ouvrage"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Modifier</span>
                        </button>
                        <button
                          onClick={() => handleDelete(photo.id, photo.title)}
                          className="flex-1 sm:flex-none inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white px-3 py-1.5 text-[10px] font-bold uppercase font-sans tracking-wide transition-all cursor-pointer border border-rose-100"
                          title="Supprimer cet ouvrage"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Testimonial moderation interface */
          <div className="space-y-8 animate-fadeIn">
            {/* Header card inside moderation tab */}
            <div className="bg-white border border-stone-200 p-6 md:p-8 space-y-4 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#C5A059]"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-[#051a0f]">
                    Modération et Validation des Témoignages
                  </h3>
                  <p className="font-sans text-xs text-stone-500">
                    Les commentaires soumis par vos clients apparaissent ici. Choisissez quels avis et photos vous souhaitez rendre publics sur votre page d'accueil d'exception.
                  </p>
                </div>
                <div className="flex gap-2.5 text-xs font-sans font-bold flex-wrap">
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 border border-emerald-100">
                    {testimonialsList.filter(t => t.approved !== false).length} Publics
                  </span>
                  <span className="bg-amber-50 text-amber-700 px-3 py-1 border border-amber-200">
                    {testimonialsList.filter(t => t.approved === false).length} En attente
                  </span>
                </div>
              </div>
            </div>

            {/* Grid or list of testimonials */}
            {testimonialsList.length === 0 ? (
              <div className="p-16 text-center border-2 border-dashed border-stone-200 bg-white">
                <MessageSquare className="w-12 h-12 text-[#C5A059]/40 mx-auto mb-4" />
                <p className="font-serif text-lg font-bold text-stone-600">Aucun témoignage disponible</p>
                <p className="font-sans text-xs text-stone-400 mt-1">Vos clients n'ont pas encore soumis de témoignage ou la base de données est vide.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {testimonialsList.map((t) => {
                  const isApproved = t.approved !== false;
                  return (
                    <div 
                      key={t.id} 
                      className={`bg-white border p-6 md:p-8 relative flex flex-col md:flex-row gap-6 justify-between transition-all group ${
                        isApproved 
                          ? 'border-stone-200 hover:border-emerald-500/20' 
                          : 'border-amber-200 bg-amber-50/5 hover:border-amber-500/20 ring-1 ring-amber-500/5'
                      }`}
                    >
                      {/* Status bar on left/top */}
                      <div className={`absolute top-0 left-0 right-0 h-1 ${isApproved ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                      
                      {/* Testimonial body content */}
                      <div className="flex-grow space-y-4 max-w-4xl">
                        <div className="flex items-start gap-4 flex-wrap">
                          {/* Star rating display */}
                          <div className="flex items-center gap-0.5 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3.5 h-3.5 ${
                                  i < t.rating ? 'fill-[#C5A059] text-[#C5A059]' : 'text-stone-200'
                                }`} 
                              />
                            ))}
                          </div>

                          {/* Status badge */}
                          <span className={`text-[9.5px]/none font-bold uppercase tracking-wider font-sans px-2.5 py-1 border ${
                            isApproved 
                              ? 'bg-emerald-50 text-emerald-850 border-emerald-150' 
                              : 'bg-amber-50 text-amber-850 border-amber-150 animate-pulse'
                          }`}>
                            {isApproved ? 'Visible Publiquement' : 'En attente de modération'}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-serif text-lg font-bold text-[#051a0f]">
                            {t.clientName}
                          </h4>
                          <p className="font-sans text-xs text-stone-500 font-light">
                            Type d'ouvrage : <span className="font-semibold text-stone-700">{t.projectType}</span> • {t.city || 'Non renseigné'} ({t.region || 'La Réunion'}) • Période : {t.period || 'Non spécifié'}
                          </p>
                        </div>

                        {/* Comment block quotation */}
                        <div className="relative bg-stone-50 border-l-2 border-[#C5A059] p-4 font-sans text-xs sm:text-sm text-stone-650 italic leading-relaxed">
                          "{t.comment}"
                        </div>

                        {/* Client's attached project photos list */}
                        {t.projectPhotos && t.projectPhotos.length > 0 && (
                          <div className="space-y-1.5 pt-2">
                            <span className="block text-[10px] font-sans font-bold uppercase tracking-wider text-stone-400">
                              Photos jointes au projet ({t.projectPhotos.length})
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {t.projectPhotos.map((photoUrl, pIdx) => (
                                <div key={pIdx} className="w-16 h-16 sm:w-20 sm:h-20 bg-stone-900 overflow-hidden border border-stone-200 relative group/photo">
                                  <img 
                                    src={photoUrl} 
                                    alt={`Photo de projet client n°\${pIdx + 1}`} 
                                    className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-300"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action controls block on the right/bottom */}
                      <div className="flex flex-row md:flex-col items-center justify-start md:justify-center md:w-48 gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-stone-100 md:pl-6 flex-shrink-0">
                        {isApproved ? (
                          <button
                            onClick={() => handleToggleApproval(t.id, true)}
                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-stone-50 hover:bg-stone-150 text-stone-600 hover:text-[#051a0f] py-2.5 px-3 text-[10px] font-bold uppercase font-sans tracking-wide transition-all cursor-pointer border border-stone-250 w-full"
                            title="Masquer ce témoignage de la page publique"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Masquer</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleApproval(t.id, false)}
                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-[#051a0f] hover:bg-[#C5A059] text-white hover:text-[#051a0f] py-2.5 px-3 text-[10px] font-bold uppercase font-sans tracking-wide transition-all cursor-pointer border border-transparent w-full"
                            title="Approuver pour rendre public sur le site"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approuver</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteTestimonial(t.id, t.clientName)}
                          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white py-2.5 px-3 text-[10px] font-bold uppercase font-sans tracking-wide transition-all cursor-pointer border border-rose-100 hover:border-transparent w-full"
                          title="Supprimer définitivement ce témoignage"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    )}
    </div>
  );
}
