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

const ErrorContext = createContext<
  | {
      error: string | null | boolean; // Updated the type to match the error handling in your components
      setError: Dispatch<SetStateAction<string | null | boolean>>; // Updated the type to match the error handling in your components
    }
  | undefined
>(undefined);

export function useError() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within a SearchProvider');
  }

  return context;
}

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
  const [error, setError] = useState<string | null | boolean>(null); // Updated the type to match the error handling in your components

  // Function to update results when new data is available
  const updateResults = (newResults: any[]) => {
    setResults(newResults);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <ResultsContext.Provider value={{ results, updateResults }}>
        <ErrorContext.Provider value={{ error, setError }}>
          {children}
        </ErrorContext.Provider>
      </ResultsContext.Provider>
    </SearchContext.Provider>
  );
}
