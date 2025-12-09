import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { useLocationStore, fileSystem, FileItem } from '@/stores/locationStore';
import { useWindowStore } from '@/stores/windowStore';
import {
  Folder, 
  FileText, 
  File, 
  Image, 
  Link, 
  ChevronLeft, 
  ChevronRight,
  Home,
  Star
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

export const FinderWindow = () => {
  const { currentPath, selectedItem, setPath, navigateTo, navigateBack, selectItem } = useLocationStore();
  const currentItems = getCurrentItems(currentPath);

  const handleItemClick = (item: FileItem) => {
    selectItem(item);
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateTo(item.name);
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
    <WindowWrapper id="finder" title={currentPath[currentPath.length - 1]} width={800} height={500}>
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

          {/* File Grid */}
          <div className="flex-1 p-4 overflow-auto">
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

            {currentItems.length === 0 && (
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
