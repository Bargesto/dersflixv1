import { createContext, useContext, useState, ReactNode } from 'react';

interface SiteContextType {
  siteName: string;
  themeColor: string;
  setSiteName: (name: string) => void;
  setThemeColor: (color: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [siteName, setSiteName] = useState(() => {
    return localStorage.getItem('siteName') || 'DERSFLIX';
  });

  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('themeColor') || '#DC2626'; // Default red-600
  });

  const updateSiteName = (name: string) => {
    setSiteName(name);
    localStorage.setItem('siteName', name);
  };

  const updateThemeColor = (color: string) => {
    setThemeColor(color);
    localStorage.setItem('themeColor', color);
  };

  return (
    <SiteContext.Provider 
      value={{ 
        siteName, 
        themeColor,
        setSiteName: updateSiteName, 
        setThemeColor: updateThemeColor 
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}