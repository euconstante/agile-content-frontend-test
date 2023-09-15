// src/components/SearchInput.tsx
import React from 'react';
import SearchIcon from '../../assets/images/magnifying-glass.png';
import CloseIcon from '../../assets/images/close.png';
import './SearchInput.css';
import { useSearch } from '../../context/SearchContext'; // Import the SearchContext
import { useResults } from '../../context/SearchContext';

interface SearchInputProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
  onClear?: () => void;
  isResultsPage: boolean;
  searchValue?: string; // Make searchValue an optional prop
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  isResultsPage,
  onSearch,
}: SearchInputProps) => {
  const { searchTerm, setSearchTerm } = useSearch(); // Access searchTerm from context
  const { updateResults } = useResults();
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    updateResults([]);
  };

  return (
    <div className={isResultsPage ? 'search__header' : 'search__container'}>
      <div className={isResultsPage ? 'search__results' : 'search'}>
        {isResultsPage && (
          <button onClick={handleSearch}>
            <img className="search__icon" src={SearchIcon} alt="Search Icon" />
          </button>
        )}
        {!isResultsPage && (
          <span>
            <img className="search__icon" src={SearchIcon} alt="Search Icon" />
          </span>
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm in context
        />
        {isResultsPage && (
          <button className="close__button" onClick={handleClear}>
            <img className="close__icon" src={CloseIcon} alt="Close Icon" />
          </button>
        )}
      </div>
      {!isResultsPage && (
        <button
          className="search__button"
          onClick={handleSearch}
          disabled={!searchTerm}
        >
          Buscar
        </button>
      )}
    </div>
  );
};

export default SearchInput;
