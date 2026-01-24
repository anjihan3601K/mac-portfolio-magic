import { useState } from 'react';
import { useGallery, useCreateGalleryImage, useUpdateGalleryImage, useDeleteGalleryImage, GalleryImage } from '@/hooks/usePortfolioData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Image, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const GalleryManager = () => {
  const { data: gallery, isLoading } = useGallery();
  const createImage = useCreateGalleryImage();
  const updateImage = useUpdateGalleryImage();
  const deleteImage = useDeleteGalleryImage();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    src: '',
    category: '',
    description: '',
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      src: '',
      category: '',
      description: '',
      display_order: 0,
    });
    setEditingImage(null);
  };

  const openEditDialog = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      src: image.src,
      category: image.category,
      description: image.description || '',
      display_order: image.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const imageData = {
      title: formData.title,
      src: formData.src,
      category: formData.category,
      description: formData.description || null,
      display_order: formData.display_order,
    };

    try {
      if (editingImage) {
        await updateImage.mutateAsync({ id: editingImage.id, ...imageData });
        toast.success('Image updated successfully');
      } else {
        await createImage.mutateAsync(imageData);
        toast.success('Image added successfully');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save image');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteImage.mutateAsync(id);
      toast.success('Image deleted successfully');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
          <p className="text-muted-foreground">Manage your photo gallery</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingImage ? 'Edit Image' : 'Add New Image'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Events, Achievements"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="src">Image URL *</Label>
                <Input
                  id="src"
                  type="url"
                  value={formData.src}
                  onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              {formData.src && (
                <div className="aspect-video rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={formData.src}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createImage.isPending || updateImage.isPending}>
                  {(createImage.isPending || updateImage.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingImage ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery?.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No images yet. Add your first image!
          </div>
        )}
        {gallery?.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square rounded-xl overflow-hidden bg-secondary"
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-medium truncate">{image.title}</p>
                <p className="text-white/70 text-xs">{image.category}</p>
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <Button
                  variant="secondary"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => openEditDialog(image)}
                >
                  <Pencil className="w-3 h-3" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-8 h-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Image</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{image.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(image.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
