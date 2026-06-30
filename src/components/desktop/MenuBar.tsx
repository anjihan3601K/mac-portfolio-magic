import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Wifi, Battery, Search, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useWindowStore, WindowId } from '@/stores/windowStore';
import { useAIStore } from '@/stores/aiStore';

export const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { windows, openWindow, closeWindow, minimizeWindow, toggleMaximize } = useWindowStore();
  const { openChat } = useAIStore();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ⌘K / Ctrl+K to open search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openableWindows: { id: WindowId; label: string }[] = [
    { id: 'finder', label: 'Finder' },
    { id: 'about', label: 'About Me' },
    { id: 'resume', label: 'Resume' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
    { id: 'notes', label: 'Notes' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'safari', label: 'Safari' },
  ];

  const openWindows = openableWindows.filter((w) => windows[w.id].isOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const match = openableWindows.find((w) => w.label.toLowerCase().includes(q));
    if (match) {
      openWindow(match.id);
      toast.success(`Opening ${match.label}`);
    } else if (q.includes('chat') || q.includes('ai') || q.includes('recruit')) {
      openChat();
      toast.success('Opening Recruiter Assistant');
    } else {
      toast.error(`No results for "${searchQuery}"`);
    }
    setSearchQuery('');
    setSearchOpen(false);
  };

  const menuItem = 'text-muted-foreground hover:text-foreground cursor-pointer transition-colors outline-none';

  return (
    <>
      <header className="menubar-glass fixed top-0 left-0 right-0 h-7 px-4 flex items-center justify-between z-[9999] text-sm">
        <div className="flex items-center gap-5">
          {/* Apple menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="font-semibold text-foreground hover:text-foreground/80 outline-none">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[200px]">
              <DropdownMenuItem onClick={() => openWindow('about')}>About This Portfolio</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openChat()}>Recruiter Assistant…</DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open('https://github.com/anjihan3601K', '_blank')}>
                GitHub
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast('Goodbye 👋')}>Sleep</DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.reload()}>Restart</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="font-semibold text-foreground outline-none">AK Portfolio</DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => openWindow('about')}>About AK Portfolio</DropdownMenuItem>
              <DropdownMenuItem onClick={() => openWindow('resume')}>View Resume</DropdownMenuItem>
              <DropdownMenuItem onClick={() => openWindow('contact')}>Contact Me</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* File */}
          <DropdownMenu>
            <DropdownMenuTrigger className={menuItem}>File</DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => openWindow('finder')}>New Finder Window</DropdownMenuItem>
              <DropdownMenuItem onClick={() => openWindow('resume')}>Open Resume</DropdownMenuItem>
              <DropdownMenuItem onClick={() => openWindow('gallery')}>Open Gallery</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  openWindows.forEach((w) => closeWindow(w.id));
                  if (openWindows.length) toast(`Closed ${openWindows.length} window${openWindows.length > 1 ? 's' : ''}`);
                }}
              >
                Close All Windows
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Edit */}
          <DropdownMenu>
            <DropdownMenuTrigger className={menuItem}>Edit</DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => document.execCommand('copy')}>Copy</DropdownMenuItem>
              <DropdownMenuItem onClick={() => document.execCommand('paste')}>Paste</DropdownMenuItem>
              <DropdownMenuItem onClick={() => document.execCommand('selectAll')}>Select All</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSearchOpen(true);
                  setSearchQuery('');
                }}
              >
                Find… <span className="ml-auto text-xs text-muted-foreground">⌘K</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View */}
          <DropdownMenu>
            <DropdownMenuTrigger className={menuItem}>View</DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => {
                  if (document.fullscreenElement) document.exitFullscreen();
                  else document.documentElement.requestFullscreen().catch(() => {});
                }}
              >
                Toggle Full Screen
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const root = document.documentElement;
                  root.classList.toggle('dark');
                  toast(root.classList.contains('dark') ? 'Dark mode' : 'Light mode');
                }}
              >
                Toggle Appearance
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Scroll to Top
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Window */}
          <DropdownMenu>
            <DropdownMenuTrigger className={menuItem}>Window</DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[200px]">
              <DropdownMenuItem
                onClick={() => {
                  openWindows.forEach((w) => minimizeWindow(w.id));
                  if (openWindows.length) toast('Minimized all windows');
                }}
              >
                Minimize All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const top = openWindows.sort((a, b) => windows[b.id].zIndex - windows[a.id].zIndex)[0];
                  if (top) toggleMaximize(top.id);
                  else toast('No window to zoom');
                }}
              >
                Zoom Front Window
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {openWindows.length === 0 ? (
                <DropdownMenuItem disabled>No open windows</DropdownMenuItem>
              ) : (
                openWindows.map((w) => (
                  <DropdownMenuItem key={w.id} onClick={() => openWindow(w.id)}>
                    {w.label}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help */}
          <DropdownMenu>
            <DropdownMenuTrigger className={menuItem}>Help</DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => openChat()}>Ask the Recruiter Assistant</DropdownMenuItem>
              <DropdownMenuItem onClick={() => openWindow('contact')}>Contact Anjani</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  toast('Tip', { description: 'Double-click desktop folders, or press ⌘K to search.' })
                }
              >
                Keyboard Shortcuts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          {/* Battery */}
          <button
            onClick={() => toast('Battery', { description: '100% — Plugged in & charging' })}
            className="hover:opacity-80 transition"
            aria-label="Battery"
          >
            <Battery className="w-5 h-5 text-foreground" />
          </button>

          {/* Wifi */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none hover:opacity-80" aria-label="Wi-Fi">
              <Wifi className="w-4 h-4 text-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
              <DropdownMenuItem disabled className="opacity-100 font-semibold">
                Wi-Fi: On
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className="opacity-100">
                ✓ Anjani's Network
              </DropdownMenuItem>
              <DropdownMenuItem disabled>Portfolio_Guest</DropdownMenuItem>
              <DropdownMenuItem disabled>Lovable_5G</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="hover:opacity-80 transition"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-foreground" />
          </button>

          {/* Clock */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground outline-none hover:opacity-80">
              {currentTime.format('ddd MMM D')} <span className="ml-2">{currentTime.format('h:mm A')}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[220px]">
              <DropdownMenuItem disabled className="opacity-100 font-semibold">
                {currentTime.format('dddd, MMMM D, YYYY')}
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="opacity-100">
                {currentTime.format('h:mm:ss A')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Spotlight-style search */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-start justify-center pt-32 bg-black/30 backdrop-blur-sm animate-fade-in"
          onClick={() => setSearchOpen(false)}
        >
          <form
            onSubmit={handleSearch}
            onClick={(e) => e.stopPropagation()}
            className="w-[min(92vw,560px)] flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/85 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/30 shadow-2xl"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Spotlight Search — try 'resume', 'gallery', 'chat'…"
              className="flex-1 bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground"
            />
            <button type="button" onClick={() => setSearchOpen(false)} className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
