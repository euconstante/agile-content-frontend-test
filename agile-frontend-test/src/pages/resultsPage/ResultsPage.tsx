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
        (item) => item.type.toLowerCase() === searchTerm.toLowerCase()
      )
    : results;

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

  return (
    <div>
      {loading ? (
        <Loader />
      ) : filteredResults.length > 0 ? (
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
      ) : (
        <NotFound searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default ResultsPage;
