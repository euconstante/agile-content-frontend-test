import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <p>
          <strong>Agile Content </strong>Frontend test
        </p>
        {/* TODO: ADD CONDITION TO RENDERING */}
        {/* <div className="header__search">
          <input type="text" className="header__input" />
          <i className="fas fa-search header__searchIcon"></i>
        </div> */}
      </div>

      <div className="header__right">
        <button className="header__btn">Google Search</button>
        <button className="header__btn">I'm Feeling Lucky</button>
      </div>
    </header>
  );
}

export default Header;
