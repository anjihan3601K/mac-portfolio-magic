import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Download, ExternalLink } from 'lucide-react';
import { useResumeUrl } from '@/components/admin/ResumeManager';

export const ResumeViewer = () => {
  const { data: resumeUrl } = useResumeUrl();
  const currentUrl = resumeUrl || '/resume/Resume_Data_Scientist.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentUrl;
    link.download = 'Resume_Anjani_Kumar.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(currentUrl, '_blank');
  };

  return (
    <WindowWrapper id="resume" title="Resume.pdf" width={700} height={600}>
      <div className="h-full flex flex-col bg-card">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
          <span className="text-sm font-medium text-foreground">Resume_Anjani_Kumar.pdf</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenInNewTab}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
        
        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden relative bg-secondary/10">
          <iframe
            src={currentUrl}
            title="Resume PDF"
            className="w-full h-full border-0"
          />
          <div className="absolute bottom-3 right-3 flex gap-2 pointer-events-none">
            <button
              onClick={handleOpenInNewTab}
              className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur border border-border text-foreground text-xs shadow-md hover:bg-background"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Open
            </button>
            <button
              onClick={handleDownload}
              className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs shadow-md hover:bg-primary/90"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
};
