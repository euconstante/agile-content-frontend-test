import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import './Header.css';
import MenuDots from '../../assets/images/dots-menu.png';
import ProfileAvatar from '../../assets/images/pexels-stephan-seeber-1261728.jpg';
import SearchInput from '../input/SearchInput';
import GoogleImg from '../../assets/images/Google.png';

function Header() {
  const location = useLocation();
  const { searchTerm } = useSearch();
  const currentPath = location.pathname;
  console.log({ searchTerm });
  return (
    <header className="header">
      {currentPath.startsWith('/results') && (
        <div className="header__left">
          <img className="header__img" src={GoogleImg} alt="Google logo" />
          <SearchInput
            placeholder="Search for animals..."
            searchValue={searchTerm}
            onSearch={() => console.log('handleSearch')}
            onClear={() => {
              // Implement your clear function here
            }}
            isResultsPage={currentPath.startsWith('/results')}
          />
        </div>
      )}
      {!currentPath.startsWith('/results') && (
        <div className="header__left">
          <p>
            <strong>Agile Content </strong>Frontend test
          </p>
        </div>
      )}
      <div className="header__right">
        <button className="chrome-header__menu">
          <img src={MenuDots} alt="Menu" />
        </button>

        <div className="chrome-header__profile">
          <img
            src={ProfileAvatar}
            alt="Profile"
            className="chrome-header__avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
