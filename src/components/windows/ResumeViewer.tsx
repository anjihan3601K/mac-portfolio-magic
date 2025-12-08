import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Download, ExternalLink } from 'lucide-react';

export const ResumeViewer = () => {
  const resumeUrl = '/resume/Resume_Data_Scientist.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Resume_Anjani_Kumar.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(resumeUrl, '_blank');
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
        <div className="flex-1 overflow-hidden">
          <iframe
            src={`${resumeUrl}#toolbar=0`}
            className="w-full h-full border-0"
            title="Resume PDF"
          />
        </div>
      </div>
    </WindowWrapper>
  );
};
