import { createContext, useContext, useState } from 'react';

type pageContextType = {
  page: string;
  setPage: (page: string) => void;
};

const StateContext = createContext({} as pageContextType);

interface PageContextProps {
  children: React.ReactNode;
}

export function PageContextProvider({ children }: PageContextProps) {
  const [page, setPage] = useState('task-manager');

  return <StateContext.Provider value={{ page, setPage }}>{children}</StateContext.Provider>;
}

export const usePageContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('usePageContext must be used within a PageContextProvider');
  }
  return context;
};
