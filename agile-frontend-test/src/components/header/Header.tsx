import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import MenuDots from '../../assets/images/dots-menu.png';
import ProfileAvatar from '../../assets/images/pexels-stephan-seeber-1261728.jpg';
import { SearchInput } from '../input';
import GoogleImg from '../../assets/images/Google.png';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);

  return (
    <header className="header">
      {currentPath.startsWith('/results') ? (
        <div className="header__left">
          <img className="header__img" src={GoogleImg} alt="Google logo" />
          <SearchInput
            placeholder={''}
            onSearch={() => console.log('changed')}
            isDisabled={false}
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
