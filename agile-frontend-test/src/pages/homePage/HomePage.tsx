import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleImg from '../../assets/images/Google.png';
import './HomePage.css';
import { FechData } from '../../services';
import SearchInput from '../../components/input/SearchInput'; // Import the new SearchInput component
import { useResults } from '../../context/SearchContext'; // Import the context hooks

const batchSize = 100;

const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { results, updateResults } = useResults(); // Use the context hooks

  const handleSearch = async (searchTerm: string) => {
    // Check if we have results in cache
    if (results.length === 0) {
      const initialData = await FechData(batchSize);
      updateResults(initialData); // Use updateResults to set results in context
    }
    setSearchValue(searchTerm);
    // Filter the results based on the search term
    const filteredData = results.filter(
      (item) => item.type.toLowerCase() === searchTerm.toLowerCase()
    );
    navigate('/results', { state: { results: filteredData } });
  };

  return (
    <section className="home">
      <div className="home__content">
        <img className="home__image" src={GoogleImg} alt="Google name logo" />
        <SearchInput
          placeholder="Buscar"
          searchValue={searchValue} // Pass the searchValue as needed
          onSearch={handleSearch}
          isResultsPage={false}
        />
      </div>
    </section>
  );
};

export default HomePage;
