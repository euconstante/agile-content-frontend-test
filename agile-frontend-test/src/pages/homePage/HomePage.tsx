import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleImg from '../../assets/images/Google.png';
import './HomePage.css';
import { FechData } from '../../services';
import SearchInput from '../../components/input/SearchInput'; //
import { useResults } from '../../context/SearchContext';

const batchSize = 100;

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { results, updateResults } = useResults();

  const handleSearch = async (searchTerm: string) => {
    if (results.length === 0) {
      const initialData = await FechData(batchSize);
      updateResults(initialData);
    }
    setSearchTerm(searchTerm);

    const filteredData = results.filter(
      (item) =>
        item.type.toLowerCase() === searchTerm.toLowerCase() ||
        item.title.toLowerCase()
    );
    navigate('/results', { state: { results: filteredData } });
  };

  return (
    <section className="home">
      <div className="home__content">
        <img className="home__image" src={GoogleImg} alt="Google name logo" />
        <SearchInput
          placeholder="Buscar"
          searchValue={searchTerm}
          onSearch={handleSearch}
          isResultsPage={false}
        />
      </div>
    </section>
  );
};

export default HomePage;
