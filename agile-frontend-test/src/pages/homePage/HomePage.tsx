// src/components/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleImg from '../../assets/images/Google.png';
import './HomePage.css';
import { FechData } from '../../services';
import { useSearch } from '../../context/SearchContext'; // Import the context hook

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
  const navigate = useNavigate();
  const [results, setResults] = useState<AnimalData[]>([]);
  const { searchTerm, setSearchTerm } = useSearch(); // Access the search term from context

  useEffect(() => {
    // Load initial data when the component mounts
    const loadInitialData = async () => {
      const initialData = await FechData(batchSize);
      setResults(initialData);
      // Don't set the results if the search term is empty (prevents unnecessary re-renders)
      if (!searchTerm) {
        setSearchTerm('');
      }
    };

    loadInitialData();
  }, [searchTerm, setSearchTerm]);

  const handleSearch = async () => {
    // Load additional data if no results are available
    if (searchTerm && !results.length) {
      const initialData = await FechData(batchSize);
      setResults(initialData);
      setSearchTerm(searchTerm);
    }

    // Filter the results based on the search term
    const filteredData = results.filter(
      (item) => item.type.toLowerCase() === searchTerm.toLowerCase()
    );

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
        <input
          type="text"
          placeholder="buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {results.length > 0 && (
          <button onClick={loadMoreData}>Load More</button>
        )}
      </div>
    </section>
  );
};

export default HomePage;
