// src/components/SearchInput.tsx
import React from 'react';
import SearchIcon from '../../assets/images/magnifying-glass.png';
import CloseIcon from '../../assets/images/close.png';
import './SearchInput.css';

interface SearchInputProps {
  placeholder: string;
  searchValue: string;
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
  isResultsPage: boolean;
}

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const { placeholder, searchValue, onSearch, onClear, isResultsPage } = props;

  return (
    <div className={isResultsPage ? 'search__header' : 'search__container'}>
      <div className={isResultsPage ? 'search__results' : 'search'}>
        <span>
          <img className="search__icon" src={SearchIcon} alt="Search Icon" />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
        {isResultsPage && (
          <button className="close__button" onClick={onClear}>
            <img className="close__icon" src={CloseIcon} alt="Close Icon" />
          </button>
        )}
      </div>
      {!isResultsPage && (
        <button
          className="search__button"
          onClick={() => onSearch}
          disabled={!searchValue}
        >
          Buscar
        </button>
      )}
    </div>
  );
};

export default SearchInput;
