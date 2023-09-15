// src/components/SearchInput.tsx
import React, { useState } from 'react';
import SearchIcon from '../../assets/images/magnifying-glass.png';
import CloseIcon from '../../assets/images/close.png';
import { useLocation } from 'react-router-dom';
import './SearchInput.css';

interface SearchInputProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
  isDisabled: boolean;
}

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const { placeholder, onSearch } = props;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(true);
  const location = useLocation();

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div
      className={
        location.pathname.includes('results')
          ? 'search__header'
          : 'search__container'
      }
    >
      <div
        className={
          location.pathname.includes('results') ? 'search__results' : 'search'
        }
      >
        <span>
          <img className="search__icon" src={SearchIcon} alt="Search Icon" />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDisabled(false);
          }}
        />
        {location.pathname.includes('results') && (
          <button className="close__button">
            <img className="close__icon" src={CloseIcon} alt="Close Icon" />
          </button>
        )}
      </div>
      {!location.pathname.includes('results') && (
        <button
          className="search__button"
          onClick={handleSearch}
          disabled={isDisabled}
        >
          Buscar
        </button>
      )}
    </div>
  );
};

export default SearchInput;
