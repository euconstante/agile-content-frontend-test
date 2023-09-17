// src/components/SearchInput.tsx
import React from 'react';
import { useError, useSearch } from '../../context/SearchContext';
import { useResults } from '../../context/SearchContext';
import SearchIcon from '../../assets/images/magnifying-glass.png';
import CloseIcon from '../../assets/images/close.png';

import './SearchInput.css';
interface SearchInputProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
  onClear?: () => void;
  isResultsPage: boolean;
  searchValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { onSearch, isResultsPage } = props;
  const { searchTerm, setSearchTerm } = useSearch();
  const { results, updateResults } = useResults();
  const { setError } = useError();

  const handleSearch = () => {
    onSearch?.(searchTerm);
    if (results.length === 0) {
      setError(true);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    updateResults([]);
    setError(false);
  };

  return (
    <div className={isResultsPage ? 'search__header' : 'search__container'}>
      <div className={isResultsPage ? 'search__results' : 'search'}>
        {isResultsPage ? (
          <button className="search__results-button" onClick={handleSearch}>
            <img className="search__icon" src={SearchIcon} alt="Search Icon" />
          </button>
        ) : (
          <span>
            <img className="search__icon" src={SearchIcon} alt="Search Icon" />
          </span>
        )}
        <input
          type="text"
          placeholder={props.placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isResultsPage && (
          <button
            className="close__button"
            onClick={handleClear}
            data-testid="clear-button-results"
          >
            <img className="close__icon" src={CloseIcon} alt="Close Icon" />
          </button>
        )}
      </div>
      {!isResultsPage && (
        <button
          className="search__button"
          onClick={handleSearch}
          disabled={!searchTerm}
          data-testid="search-button"
        >
          Buscar
        </button>
      )}
    </div>
  );
};

export default SearchInput;
