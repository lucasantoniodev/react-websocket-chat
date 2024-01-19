import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface VisibilityContextProps {
  isVisible: boolean;
}

const VisibilityContext = createContext<VisibilityContextProps | undefined>(undefined);

export const useVisibility = (): VisibilityContextProps => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
};

interface VisibilityProviderProps {
  children: ReactNode;
}

const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const contextValue: VisibilityContextProps = {
    isVisible,
  };

  return (
    <VisibilityContext.Provider value={contextValue}>
      {children}
    </VisibilityContext.Provider>
  );
};

export default VisibilityProvider;