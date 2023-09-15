// src/components/HomePage.tsx
import { SearchInput } from '../../components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleImg from '../../assets/images/Google.png';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    navigate(`/results/${searchTerm}`);
  };

  return (
    <section className="home">
      <div className="home__content">
        <img className="home__image" src={GoogleImg} alt="Google name logo" />
        <SearchInput onSearch={handleSearch} placeholder="buscar" isDisabled />
      </div>
    </section>
  );
};

export default HomePage;
