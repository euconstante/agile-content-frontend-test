import React, { createContext, useContext, useState, ReactNode } from 'react';

const SearchContext = createContext<
  | {
      searchTerm: string;
      setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
}

interface SearchProviderProps {
  children: ReactNode;
}

export default function SearchProvider({ children }: SearchProviderProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}
