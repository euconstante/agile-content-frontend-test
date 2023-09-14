// src/components/SearchInput.tsx
import React, { useState } from 'react';
import SearchIcon from '../../assets/images/magnifying-glass.png';
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
          ? 'seach__header'
          : 'search__container'
      }
    >
      <div
        className={
          location.pathname.includes('results') ? 'seach__results' : 'search'
        }
      >
        <span>
          <img src={SearchIcon} alt="Search Icon" />
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
