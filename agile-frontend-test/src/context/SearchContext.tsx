import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

// Create a context for searchTerm
const SearchContext = createContext<
  | {
      searchTerm: string;
      setSearchTerm: Dispatch<SetStateAction<string>>;
    }
  | undefined
>(undefined);

// Create a separate context for results
const ResultsContext = createContext<
  | {
      results: any[];
      updateResults: (newResults: any[]) => void;
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

export function useResults() {
  const context = useContext(ResultsContext);

  if (!context) {
    throw new Error('useResults must be used within a SearchProvider');
  }

  return context;
}

interface SearchProviderProps {
  children: ReactNode;
}

export default function SearchProvider({ children }: SearchProviderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // Function to update results when new data is available
  const updateResults = (newResults: any[]) => {
    setResults(newResults);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <ResultsContext.Provider value={{ results, updateResults }}>
        {children}
      </ResultsContext.Provider>
    </SearchContext.Provider>
  );
}
