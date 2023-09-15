import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch, useResults } from '../../context/SearchContext';
import './Header.css';
import MenuDots from '../../assets/images/dots-menu.png';
import ProfileAvatar from '../../assets/images/pexels-stephan-seeber-1261728.jpg';
import SearchInput from '../input/SearchInput';
import GoogleImg from '../../assets/images/Google.png';
import { FechData } from '../../services';

const batchSize = 100;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();
  const currentPath = location.pathname;
  const { results, updateResults } = useResults();
  const [error, setError] = useState<string | null>(null); // State to track errors

  const handleSearch = async (newSearchTerm: string) => {
    setError(null); // Clear any previous errors

    // Check if we have results in cache
    if (results.length === 0) {
      try {
        const initialData = await FechData(batchSize);
        updateResults(initialData);
      } catch (error) {
        setError('Error fetching data. Please try again.'); // Set an error message on fetch failure
        return;
      }
    }

    // Update search term state
    setSearchTerm(newSearchTerm);
  };

  return (
    <header className="header">
      {currentPath.startsWith('/results') && (
        <div className="header__left">
          <a href="/">
            <img className="header__img" src={GoogleImg} alt="Google logo" />
          </a>
          <SearchInput
            placeholder="Search for animals..."
            searchValue={searchTerm}
            onSearch={handleSearch}
            onClear={() => {
              setSearchTerm('');
              updateResults([]);
              setError(null); // Clear errors when clearing the input
              navigate('/results', { state: { results: [] } });
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
      {error && <p className="error-message">{error}</p>}{' '}
      {/* Display error message */}
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
