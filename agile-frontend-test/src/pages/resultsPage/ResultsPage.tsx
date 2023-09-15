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
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Filter results based on the search term
  const filteredResults = searchTerm
    ? results.filter(
        (item) => item.type.toLowerCase() === searchTerm.toLowerCase()
      )
    : results;

  useEffect(() => {
    // Simulate loading delay using setTimeout
    setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 1000); // Change the delay time as needed
  }, []);

  const handleItemClick = (item: AnimalData) => {
    setSelectedItem(item);
  };

  const renderImage = () => {
    if (selectedItem) {
      return (
        <div>
          <img src={selectedItem.image} alt={selectedItem.title} />
          <a href={selectedItem.url} target="_blank" rel="noreferrer">
            {selectedItem.url}
          </a>
          <h4>{selectedItem.title}</h4>
          <p>{selectedItem.description}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : !searchTerm ? (
        <p>
          Try looking for:{' '}
          <strong>
            insect, fish, horse, crocodilia, bear, cetacean, lion, rabbit, cat,
            snake, dog, bird.
          </strong>
        </p>
      ) : filteredResults.length > 0 ? (
        <div className="results">
          <ul>
            {filteredResults.map((item: AnimalData) => (
              <li key={item.id} onClick={() => handleItemClick(item)}>
                <div>
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
        <p>
          No results found for {searchTerm}
          <br />
          Try looking for:{' '}
          <strong>
            insect, fish, horse, crocodilia, bear, cetacean, lion, rabbit, cat,
            snake, dog, bird.
          </strong>
        </p>
      )}
    </div>
  );
};

export default ResultsPage;
