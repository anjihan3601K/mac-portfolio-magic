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
  category?: string;
  description?: string;
  tech?: string[];
  codeUrl?: string;
  viewUrl?: string;
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
        id: 'pneumonia',
        name: 'Pneumonia Prediction',
        type: 'link',
        category: 'Healthcare AI',
        description: 'Deep learning model for detecting pneumonia from chest X-rays using CNN architecture with high accuracy.',
        tech: ['Python', 'TensorFlow', 'CNN', 'Medical Imaging'],
        codeUrl: 'https://github.com/anjihan3601K',
        viewUrl: 'https://github.com/anjihan3601K',
        url: 'https://github.com/anjihan3601K',
      },
      {
        id: 'genai-app',
        name: 'GenAI Application',
        type: 'link',
        category: 'Generative AI',
        description: 'Generative AI application leveraging large language models for intelligent content generation and analysis.',
        tech: ['Python', 'OpenAI API', 'LangChain', 'GenAI'],
        codeUrl: 'https://github.com/anjihan3601K',
        viewUrl: 'https://github.com/anjihan3601K',
        url: 'https://github.com/anjihan3601K',
      },
      {
        id: 'stock-prediction',
        name: 'Stock Price Prediction',
        type: 'link',
        category: 'Financial AI',
        description: 'Time series forecasting model for predicting stock prices using LSTM networks and technical indicators.',
        tech: ['Python', 'LSTM', 'Pandas', 'Financial Analysis'],
        codeUrl: 'https://github.com/anjihan3601K',
        viewUrl: 'https://github.com/anjihan3601K',
        url: 'https://github.com/anjihan3601K',
      },
      {
        id: 'stock-analyzer',
        name: 'Stock Analyzer',
        type: 'link',
        category: 'Financial AI',
        description: 'Comprehensive stock analysis tool with data visualization and predictive insights for investment decisions.',
        tech: ['Python', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
        codeUrl: 'https://github.com/anjihan3601K',
        viewUrl: 'https://github.com/anjihan3601K',
        url: 'https://github.com/anjihan3601K',
      },
      {
        id: 'privacy-chat',
        name: 'Privacy Chat',
        type: 'link',
        category: 'Security',
        description: 'Secure messaging application with end-to-end encryption ensuring user privacy and data protection.',
        tech: ['Python', 'Cryptography', 'FastAPI', 'WebSockets'],
        codeUrl: 'https://github.com/anjihan3601K',
        viewUrl: 'https://github.com/anjihan3601K',
        url: 'https://github.com/anjihan3601K',
      },
      {
        id: 'car-price',
        name: 'Car Price Predictor',
        type: 'link',
        category: 'Predictive Analytics',
        description: 'Machine learning model for predicting car prices based on various features using regression techniques.',
        tech: ['Python', 'Regression', 'Feature Engineering', 'Scikit-learn'],
        codeUrl: 'https://github.com/anjihan3601K',
        viewUrl: 'https://github.com/anjihan3601K',
        url: 'https://github.com/anjihan3601K',
      },
      {
        id: 'dynamic-pricing',
        name: 'Dynamic Pricing',
        type: 'link',
        category: 'Business Intelligence',
        description: 'ML-based dynamic pricing system that adjusts prices based on demand, competition, and market conditions.',
        tech: ['Python', 'ML Models', 'Optimization', 'Data Analysis'],
        codeUrl: 'https://github.com/anjihan3601K',
        viewUrl: 'https://github.com/anjihan3601K',
        url: 'https://github.com/anjihan3601K',
      },
      {
        id: 'disaster-mgmt',
        name: 'Disaster Management App',
        type: 'link',
        category: 'Social Impact',
        description: 'Application for disaster prediction and management using ML models to analyze patterns and provide alerts.',
        tech: ['Python', 'ML', 'Real-time Processing', 'Data Analytics'],
        codeUrl: 'https://github.com/anjihan3601K',
        viewUrl: 'https://github.com/anjihan3601K',
        url: 'https://github.com/anjihan3601K',
      },
      {
        id: 'suraksha',
        name: 'Suraksha ML Models',
        type: 'link',
        category: 'Security',
        description: 'Collection of machine learning models focused on safety and security applications with real-world impact.',
        tech: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
        codeUrl: 'https://github.com/anjihan3601K',
        viewUrl: 'https://github.com/anjihan3601K',
        url: 'https://github.com/anjihan3601K',
      },
    ],
  },
...
      { id: 'github', name: 'GitHub', type: 'link', url: 'https://github.com/anjihan3601K' },
      { id: 'linkedin', name: 'LinkedIn', type: 'link', url: 'https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9' },
      { id: 'kaggle', name: 'Kaggle', type: 'link', url: 'https://kaggle.com' },
    ],
  },
  {
    id: 'images',
    name: 'Images',
    type: 'folder',
    children: [
      { id: 'profile-photo', name: 'Profile Photo.jpg', type: 'image', url: '/profile-photo.png' },
      { id: 'hackathon-winner', name: 'Hackathon Winner.jpg', type: 'image', url: '' },
      { id: 'ai-competition', name: 'AI Competition 2024.jpg', type: 'image', url: '' },
      { id: 'conference-speaker', name: 'Tech Conference.jpg', type: 'image', url: '' },
      { id: 'team-project', name: 'Team Project.jpg', type: 'image', url: '' },
    ],
  },
];
