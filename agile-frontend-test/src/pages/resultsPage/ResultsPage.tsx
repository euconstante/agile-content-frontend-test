import { CardDetail, Loader, NotFound } from '../../components';
import React, { useState, useEffect } from 'react';
import { useSearch, useResults } from '../../context/SearchContext';
import './Results.css';

interface AnimalData {
  type: string;
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
}

const ResultsPage: React.FC = () => {
  const { searchTerm } = useSearch();
  const { results } = useResults();
  const [selectedItem, setSelectedItem] = useState<AnimalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const filteredResults = searchTerm
    ? results.filter(
        (item) =>
          item.type.toLowerCase() === searchTerm.toLowerCase() ||
          item.title.toLowerCase() === searchTerm.toLowerCase()
      )
    : [];

  const closeCard = () => {
    setIsCardOpen(false);
  };

  useEffect(() => {
    // Simulate loading delay using setTimeout
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleItemClick = (item: AnimalData) => {
    setSelectedItem(item);
    setIsCardOpen(true);
  };

  const renderResults = () => {
    if (filteredResults.length > 0) {
      return (
        <div className="results">
          <ul>
            {filteredResults.map((item: AnimalData) => (
              <li key={item.id} onClick={() => handleItemClick(item)}>
                <div className="results__container">
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.url}
                  </a>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          {renderImage()}
        </div>
      );
    } else {
      // Check if a search term is present to decide whether to show NotFound with or without the search term
      return <NotFound searchTerm={searchTerm} />;
    }
  };

  const renderImage = () => {
    if (selectedItem) {
      return (
        <>
          {isCardOpen && (
            <div className="results__card--mobile">
              <CardDetail
                image={selectedItem.image}
                url={selectedItem.url}
                title={selectedItem.title}
                description={selectedItem.description}
                onClose={closeCard}
              />
            </div>
          )}
        </>
      );
    }
    return null;
  };

  return <div>{loading ? <Loader /> : renderResults()}</div>;
};

export default ResultsPage;
