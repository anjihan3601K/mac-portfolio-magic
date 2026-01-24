import { useState } from 'react';
import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { useGallery } from '@/hooks/usePortfolioData';
import { Image, X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';

interface GalleryImage {
  id: string;
  title: string;
  src: string;
  category: string;
  description?: string | null;
}

// Fallback gallery images if database is empty
const fallbackGalleryImages: GalleryImage[] = [
  {
    id: 'profile',
    title: 'Profile Photo',
    src: profilePhoto,
    category: 'Personal',
    description: 'Professional headshot'
  },
  {
    id: 'hackathon',
    title: 'Hackathon Winner 2024',
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    category: 'Achievements',
    description: 'First place at Tech Innovation Summit'
  },
  {
    id: 'ai-competition',
    title: 'AI Competition 2024',
    src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    category: 'Achievements',
    description: 'AI & ML National Competition'
  },
  {
    id: 'conference',
    title: 'Tech Conference Speaker',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    category: 'Events',
    description: 'Speaking at Developer Summit 2024'
  },
  {
    id: 'team-project',
    title: 'Team Project',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    category: 'Work',
    description: 'Collaborative ML research project'
  },
  {
    id: 'workshop',
    title: 'AI Workshop',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
    category: 'Events',
    description: 'Teaching AI fundamentals to students'
  },
];

export const GalleryWindow = () => {
  const { data: dbGallery, isLoading } = useGallery();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Use database gallery if available, otherwise fall back to hardcoded
  const galleryImages = dbGallery && dbGallery.length > 0 
    ? dbGallery.map(img => ({
        id: img.id,
        title: img.title,
        src: img.src,
        category: img.category,
        description: img.description
      }))
    : fallbackGalleryImages;

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];
  
  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <WindowWrapper id="gallery" title="Photo Gallery" width={800} height={550}>
      <div className="h-full flex flex-col bg-gradient-to-b from-card to-background">
        {/* Header with categories */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Image className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Photo Gallery</h2>
              <p className="text-xs text-muted-foreground">{galleryImages.length} photos</p>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex-1 p-4 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {filteredImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-secondary hover:ring-2 hover:ring-primary transition-all"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-xs font-medium truncate">{image.title}</p>
                      <p className="text-white/70 text-[10px]">{image.category}</p>
                    </div>
                    <div className="absolute top-2 right-2">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {!isLoading && filteredImages.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No images in this category
            </div>
          )}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="max-w-[80%] max-h-[80%] flex flex-col items-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-semibold">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-white/70 text-sm mt-1">{selectedImage.description}</p>
                )}
                <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs">
                  {selectedImage.category}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </WindowWrapper>
  );
};
