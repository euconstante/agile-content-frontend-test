import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext'; // Import useSearch from context
import './Header.css';
import MenuDots from '../../assets/images/dots-menu.png';
import ProfileAvatar from '../../assets/images/pexels-stephan-seeber-1261728.jpg';
import { SearchInput } from '../input';
import GoogleImg from '../../assets/images/Google.png';

function Header() {
  const location = useLocation();
  const { searchTerm } = useSearch(); // Access the search term from context
  const currentPath = location.pathname;
  console.log(currentPath);

  return (
    <header className="header">
      {currentPath.startsWith('/results') || searchTerm ? ( // Check if there's a search term in context
        <div className="header__left">
          <img className="header__img" src={GoogleImg} alt="Google logo" />
          <SearchInput
            placeholder="Search for animals..."
            onSearch={() => console.log('changed')}
            searchValue={''}
            onClear={function (): void {
              throw new Error('Function not implemented.');
            }}
            isResultsPage={false}
          />
        </div>
      ) : (
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
