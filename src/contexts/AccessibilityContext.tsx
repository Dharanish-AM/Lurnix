import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  fontSize: number;
  setFontSize: (size: number) => void;
  isDyslexicFont: boolean;
  setIsDyslexicFont: (enabled: boolean) => void;
  isHighContrast: boolean;
  setIsHighContrast: (enabled: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fontSize');
      return stored ? parseInt(stored, 10) : 16;
    }
    return 16;
  });

  const [isDyslexicFont, setIsDyslexicFont] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dyslexicFont') === 'true';
    }
    return false;
  });

  const [isHighContrast, setIsHighContrast] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('highContrast') === 'true';
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    if (isDyslexicFont) {
      document.body.style.fontFamily = '"OpenDyslexic", sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }
    localStorage.setItem('dyslexicFont', isDyslexicFont.toString());
  }, [isDyslexicFont]);

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', isHighContrast.toString());
  }, [isHighContrast]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        isDyslexicFont,
        setIsDyslexicFont,
        isHighContrast,
        setIsHighContrast
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}