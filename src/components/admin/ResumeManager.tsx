import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Trash2, Loader2, Download, ExternalLink } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const BUCKET = 'portfolio-assets';
const RESUME_PATH = 'resume/current-resume.pdf';

export const useResumeUrl = () => {
  return useQuery({
    queryKey: ['resume-url'],
    queryFn: async () => {
      const { data } = await supabase.storage
        .from(BUCKET)
        .list('resume', { limit: 1, search: 'current-resume' });

      if (data && data.length > 0) {
        const { data: urlData } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(RESUME_PATH);
        return urlData.publicUrl;
      }
      // Fallback to static file
      return '/resume/Resume_Data_Scientist.pdf';
    },
  });
};

export const ResumeManager = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data: resumeUrl, isLoading } = useResumeUrl();

  const isStorageResume = resumeUrl?.includes('supabase');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File must be less than 10MB');
      return;
    }

    setIsUploading(true);
    try {
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(RESUME_PATH, file, { upsert: true });

      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['resume-url'] });
      toast.success('Resume uploaded successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload resume');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.storage
        .from(BUCKET)
        .remove([RESUME_PATH]);

      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['resume-url'] });
      toast.success('Resume deleted — will use default');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete resume');
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
        <h2 className="text-2xl font-bold text-foreground">Resume</h2>
        <p className="text-muted-foreground">Upload or replace your resume PDF</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        {/* Current Resume Preview */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Current Resume</p>
            <p className="text-sm text-muted-foreground">
              {isStorageResume ? 'Uploaded via admin' : 'Default static file'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                View
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={resumeUrl} download="Resume_Anjani_Kumar.pdf">
                <Download className="w-4 h-4 mr-1" />
                Download
              </a>
            </Button>
          </div>
        </div>

        {/* Upload New */}
        <div className="border-t border-border pt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
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
              {isUploading ? 'Uploading...' : 'Upload New Resume'}
            </Button>

            {isStorageResume && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Resume</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove the uploaded resume and revert to the default file.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">PDF only, max 10MB</p>
        </div>
      </div>
    </div>
  );
};
