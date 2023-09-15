// src/components/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleImg from '../../assets/images/Google.png';
import './HomePage.css';
import { FechData } from '../../services';
import SearchInput from '../../components/input/SearchInput'; // Import the new SearchInput component

interface AnimalData {
  type: string;
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
}

const batchSize = 100;

const HomePage: React.FC = () => {
  const [results, setResults] = useState<AnimalData[]>([]);
  console.log(results);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load initial data when the component mounts
    const loadInitialData = async () => {
      const initialData = await FechData(batchSize);
      setResults(initialData);
    };

    loadInitialData();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    // Check if we have results in cache
    if (results.length === 0) {
      const initialData = await FechData(batchSize);
      setResults(initialData);
    }
    setSearchValue(searchTerm);
    console.log({ results });
    // Filter the results based on the search term
    const filteredData = results.filter(
      (item) => item.type.toLowerCase() === searchTerm.toLowerCase()
    );
    console.log({ filteredData });
    navigate('/results', { state: { results: filteredData } });
  };

  const loadMoreData = async () => {
    // Load additional data as needed
    const additionalData = await FechData(batchSize);
    setResults([...results, ...additionalData]);
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
          onClear={() => console.log('clear')}
        />
        {results.length > 0 && (
          <button onClick={loadMoreData}>Load More</button>
        )}
      </div>
    </section>
  );
};

export default HomePage;
