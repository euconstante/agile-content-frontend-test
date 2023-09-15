import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext'; // Import useSearch from context

interface AnimalData {
  type: string;
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const { searchTerm } = useSearch(); // Access the search term from context
  const results = location.state
    ? (location.state as { results: AnimalData[] }).results
    : [];

  // Filter results based on the search term
  const filteredResults = searchTerm
    ? results.filter(
        (item) => item.type.toLowerCase() === searchTerm.toLowerCase()
      )
    : results;

  return (
    <div>
      <h2>Search Results</h2>
      {filteredResults.length > 0 ? (
        <ul>
          {filteredResults.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <img src={item.image} alt={item.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultsPage;
