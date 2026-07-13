import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { useResumeUrl } from '@/components/admin/ResumeManager';
import { useState } from 'react';

export const ResumeViewer = () => {
  const { data: resumeUrl } = useResumeUrl();
  const currentUrl = resumeUrl || '/resume/Resume_Data_Scientist.pdf';
  const [iframeFailed, setIframeFailed] = useState(false);

  // Google Docs viewer bypasses browser PDF-embed restrictions for cross-origin URLs
  const isExternal = /^https?:\/\//i.test(currentUrl);
  const viewerSrc = isExternal
    ? `https://docs.google.com/gview?url=${encodeURIComponent(currentUrl)}&embedded=true`
    : currentUrl;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentUrl;
    link.download = 'Resume_Anjani_Kumar.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => window.open(currentUrl, '_blank');

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

        {/* PDF Viewer with fallback */}
        <div className="flex-1 overflow-hidden relative bg-secondary/10">
          {!iframeFailed ? (
            <iframe
              key={viewerSrc}
              src={viewerSrc}
              title="Resume PDF"
              className="w-full h-full border-0"
              onError={() => setIframeFailed(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6 text-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <div>
                <div className="text-foreground font-semibold">Resume_Anjani_Kumar.pdf</div>
                <div className="text-sm text-muted-foreground">Preview blocked by your browser</div>
              </div>
              <div className="flex gap-2">
                <button onClick={handleOpenInNewTab} className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm">Open in New Tab</button>
                <button onClick={handleDownload} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">Download</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </WindowWrapper>
  );
};
