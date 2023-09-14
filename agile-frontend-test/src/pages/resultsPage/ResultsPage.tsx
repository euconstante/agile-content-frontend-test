// src/components/ResultsPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();
  console.log(searchTerm);
  return (
    <div>
      <div>{/* Display search results here based on the searchTerm */}</div>
      <p>TESTE</p>
    </div>
  );
};

export default ResultsPage;
