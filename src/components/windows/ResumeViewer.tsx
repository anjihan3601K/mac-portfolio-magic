import { useState } from 'react';
import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { useResumeUrl } from '@/components/admin/ResumeManager';

export const ResumeViewer = () => {
  const { data: resumeUrl } = useResumeUrl();
  const currentUrl = resumeUrl || '/resume/Resume_Data_Scientist.pdf';
  const [pdfError, setPdfError] = useState(false);

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
        
        {/* PDF Viewer with fallback */}
        <div className="flex-1 overflow-hidden relative">
          {!pdfError ? (
            <object
              data={currentUrl}
              type="application/pdf"
              className="w-full h-full"
              onError={() => setPdfError(true)}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/20 p-8 text-center">
                <FileText className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Resume Preview</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Your browser doesn't support PDF preview. Click below to view or download.
                </p>
                <div className="flex gap-3">
                  <button onClick={handleOpenInNewTab} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground">
                    <ExternalLink className="w-4 h-4" /> Open in New Tab
                  </button>
                  <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                </div>
              </div>
            </object>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/20 p-8 text-center">
              <FileText className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Resume Preview</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">Click below to view or download the resume.</p>
              <div className="flex gap-3">
                <button onClick={handleOpenInNewTab} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground">
                  <ExternalLink className="w-4 h-4" /> Open in New Tab
                </button>
                <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </WindowWrapper>
  );
};
