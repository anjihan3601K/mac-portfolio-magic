import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { User, Upload, Trash2, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import defaultPhoto from '@/assets/profile-photo.png';

const BUCKET = 'portfolio-assets';
const PHOTO_PATH = 'photos/profile-photo.png';

export const useProfilePhotoUrl = () => {
  return useQuery({
    queryKey: ['profile-photo-url'],
    queryFn: async () => {
      const { data } = await supabase.storage
        .from(BUCKET)
        .list('photos', { limit: 1, search: 'profile-photo' });

      if (data && data.length > 0) {
        const { data: urlData } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(PHOTO_PATH);
        return urlData.publicUrl + '?t=' + Date.now();
      }
      return null; // use default import
    },
  });
};

export const ProfilePhotoManager = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data: photoUrl, isLoading } = useProfilePhotoUrl();

  const currentPhoto = photoUrl || defaultPhoto;
  const isStoragePhoto = !!photoUrl;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(PHOTO_PATH, file, { upsert: true });

      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['profile-photo-url'] });
      toast.success('Profile photo updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload photo');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.storage
        .from(BUCKET)
        .remove([PHOTO_PATH]);

      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['profile-photo-url'] });
      toast.success('Photo removed — using default');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete photo');
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
      <div>
        <h2 className="text-2xl font-bold text-foreground">Profile Photo</h2>
        <p className="text-muted-foreground">Update your profile picture</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-6">
          <img
            src={currentPhoto}
            alt="Profile"
            className="w-24 h-32 rounded-xl object-cover border border-border"
          />
          <div className="flex-1">
            <p className="font-medium text-foreground">Current Photo</p>
            <p className="text-sm text-muted-foreground">
              {isStoragePhoto ? 'Uploaded via admin' : 'Default photo'}
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <div className="flex items-center gap-3">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              {isUploading ? 'Uploading...' : 'Upload New Photo'}
            </Button>

            {isStoragePhoto && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Photo</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will revert to the default profile photo.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Remove</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">JPG, PNG, or WebP, max 5MB</p>
        </div>
      </div>
    </div>
  );
};
