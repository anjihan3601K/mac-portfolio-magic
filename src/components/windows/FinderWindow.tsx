import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { useLocationStore, fileSystem, FileItem } from '@/stores/locationStore';
import { useWindowStore } from '@/stores/windowStore';
import { useProjects } from '@/hooks/usePortfolioData';
import {
  Folder, 
  FileText, 
  File, 
  Image, 
  Link, 
  ChevronLeft, 
  ChevronRight,
  Home,
  Star,
  Github,
  ExternalLink,
  Loader2
} from 'lucide-react';

const getIcon = (type: FileItem['type']) => {
  switch (type) {
    case 'folder':
      return <Folder className="w-4 h-4 text-primary" />;
    case 'file':
      return <FileText className="w-4 h-4 text-muted-foreground" />;
    case 'pdf':
      return <File className="w-4 h-4 text-destructive" />;
    case 'image':
      return <Image className="w-4 h-4 text-green-500" />;
    case 'link':
      return <Link className="w-4 h-4 text-primary" />;
    default:
      return <File className="w-4 h-4" />;
  }
};

const getCurrentItems = (path: string[]): FileItem[] => {
  if (path.length === 1) return fileSystem;
  
  let current: FileItem[] = fileSystem;
  for (let i = 1; i < path.length; i++) {
    const folder = current.find((item) => item.name === path[i]);
    if (folder?.children) {
      current = folder.children;
    }
  }
  return current;
};

// Check if we're in the Projects folder
const isProjectsFolder = (path: string[]): boolean => {
  return path.length === 2 && path[1] === 'Projects';
};

export const FinderWindow = () => {
  const { currentPath, selectedItem, setPath, navigateTo, navigateBack, selectItem } = useLocationStore();
  const { data: dbProjects, isLoading: projectsLoading } = useProjects();
  
  const currentItems = getCurrentItems(currentPath);
  const inProjectsView = isProjectsFolder(currentPath);

  // Use database projects if available, otherwise fall back to hardcoded
  const projectItems = inProjectsView && dbProjects && dbProjects.length > 0
    ? dbProjects.map(p => ({
        id: p.id,
        name: p.name,
        type: 'link' as const,
        category: p.category || undefined,
        description: p.description || undefined,
        tech: p.technologies || undefined,
        codeUrl: p.github_url || undefined,
        viewUrl: p.demo_url || undefined,
        url: p.github_url || p.demo_url || undefined,
      }))
    : currentItems;

  const handleItemClick = (item: FileItem) => {
    selectItem(item);
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      // Open gallery for Images folder
      if (item.id === 'images') {
        const { openWindow } = useWindowStore.getState();
        openWindow('gallery');
      } else {
        navigateTo(item.name);
      }
    } else if (item.type === 'link' && item.url) {
      window.open(item.url, '_blank');
    } else if (item.type === 'pdf') {
      // Open resume in the resume viewer window
      const { openWindow } = useWindowStore.getState();
      openWindow('resume');
    } else if (item.type === 'file' && item.id === 'about') {
      // Open about me in the about window
      const { openWindow } = useWindowStore.getState();
      openWindow('about');
    }
  };

  return (
    <WindowWrapper id="finder" title={currentPath[currentPath.length - 1]} width={900} height={550}>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-48 bg-finder-sidebar border-r border-border p-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
            Favorites
          </div>
          <button
            onClick={() => setPath(['Home'])}
            className={`finder-item w-full flex items-center gap-2 text-sm ${
              currentPath.length === 1 ? 'active' : ''
            }`}
          >
            <Home className="w-4 h-4 text-primary" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setPath(['Home', 'Projects'])}
            className={`finder-item w-full flex items-center gap-2 text-sm ${
              currentPath[1] === 'Projects' ? 'active' : ''
            }`}
          >
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Projects</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-finder-content">
          {/* Toolbar */}
          <div className="h-10 px-3 flex items-center gap-2 border-b border-border">
            <button
              onClick={navigateBack}
              disabled={currentPath.length <= 1}
              className="p-1 rounded hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled
              className="p-1 rounded hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex-1 text-sm text-muted-foreground">
              {currentPath.join(' › ')}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 overflow-auto">
            {inProjectsView ? (
              projectsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : (
                // Projects List View - Name, Git Repo, Deployed Link
                <div className="space-y-2">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                    <div className="col-span-5">Project Name</div>
                    <div className="col-span-4">Git Repository</div>
                    <div className="col-span-3">Deployed Link</div>
                  </div>
                  {/* Project Rows */}
                  {projectItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item as FileItem)}
                      onDoubleClick={() => handleItemDoubleClick(item as FileItem)}
                      className={`grid grid-cols-12 gap-4 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                        selectedItem?.id === item.id
                          ? 'bg-finder-selected'
                          : 'hover:bg-secondary/50'
                      }`}
                    >
                      <div className="col-span-5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Link className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-foreground text-sm truncate">{item.name}</div>
                          {item.category && (
                            <div className="text-xs text-muted-foreground">{item.category}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-span-4 flex items-center">
                        {item.codeUrl ? (
                          <a
                            href={item.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span className="truncate">View Code</span>
                          </a>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </div>
                      <div className="col-span-3 flex items-center">
                        {item.viewUrl ? (
                          <a
                            href={item.viewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="truncate">Live Demo</span>
                          </a>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {projectItems.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No projects yet. Add some from the admin panel!
                    </div>
                  )}
                </div>
              )
            ) : (
              // Default Grid View
              <div className="grid grid-cols-4 gap-4">
                {currentItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    className={`p-3 rounded-lg flex flex-col items-center gap-2 text-center transition-colors ${
                      selectedItem?.id === item.id
                        ? 'bg-finder-selected'
                        : 'hover:bg-secondary/50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      {getIcon(item.type)}
                    </div>
                    <span className="text-xs text-foreground truncate w-full">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {!inProjectsView && currentItems.length === 0 && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                This folder is empty
              </div>
            )}
          </div>

          {/* Preview Panel */}
          {selectedItem && selectedItem.type === 'file' && selectedItem.content && (
            <div className="h-32 px-4 py-3 border-t border-border bg-card/30">
              <div className="text-xs font-semibold text-muted-foreground mb-1">Preview</div>
              <p className="text-sm text-foreground/80 line-clamp-3">{selectedItem.content}</p>
            </div>
          )}
        </div>
      </div>
    </WindowWrapper>
  );
};
