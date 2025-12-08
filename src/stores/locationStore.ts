import { create } from 'zustand';

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'pdf' | 'image' | 'link';
  icon?: string;
  children?: FileItem[];
  content?: string;
  url?: string;
  image?: string;
  isDownload?: boolean;
}

interface LocationStore {
  currentPath: string[];
  selectedItem: FileItem | null;
  setPath: (path: string[]) => void;
  navigateTo: (folder: string) => void;
  navigateBack: () => void;
  selectItem: (item: FileItem | null) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  currentPath: ['Home'],
  selectedItem: null,

  setPath: (path) => set({ currentPath: path, selectedItem: null }),

  navigateTo: (folder) =>
    set((state) => ({
      currentPath: [...state.currentPath, folder],
      selectedItem: null,
    })),

  navigateBack: () =>
    set((state) => ({
      currentPath: state.currentPath.length > 1 ? state.currentPath.slice(0, -1) : state.currentPath,
      selectedItem: null,
    })),

  selectItem: (item) => set({ selectedItem: item }),
}));

export const fileSystem: FileItem[] = [
  {
    id: 'projects',
    name: 'Projects',
    type: 'folder',
    children: [
      {
        id: 'project-1',
        name: 'E-Commerce Platform',
        type: 'folder',
        children: [
          { id: 'p1-readme', name: 'README.md', type: 'file', content: 'A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product management, shopping cart, and payment integration.' },
          { id: 'p1-screenshot', name: 'screenshot.png', type: 'image', image: '' },
        ],
      },
      {
        id: 'project-2',
        name: 'AI Dashboard',
        type: 'folder',
        children: [
          { id: 'p2-readme', name: 'README.md', type: 'file', content: 'An analytics dashboard with AI-powered insights. Built with React, TensorFlow.js, and D3.js for data visualization.' },
        ],
      },
      {
        id: 'project-3',
        name: 'Mobile App',
        type: 'folder',
        children: [
          { id: 'p3-readme', name: 'README.md', type: 'file', content: 'Cross-platform mobile application built with React Native. Features real-time messaging, push notifications, and offline support.' },
        ],
      },
    ],
  },
  {
    id: 'about',
    name: 'About Me',
    type: 'file',
    content: 'I am a passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in React, TypeScript, and Node.js, with a keen eye for design and user experience.',
  },
  {
    id: 'resume',
    name: 'Resume.pdf',
    type: 'pdf',
    url: '/resume/Resume_Data_Scientist.pdf',
    isDownload: true,
  },
  {
    id: 'links',
    name: 'Links',
    type: 'folder',
    children: [
      { id: 'github', name: 'GitHub', type: 'link', url: 'https://github.com' },
      { id: 'linkedin', name: 'LinkedIn', type: 'link', url: 'https://linkedin.com' },
      { id: 'twitter', name: 'Twitter', type: 'link', url: 'https://twitter.com' },
    ],
  },
];
