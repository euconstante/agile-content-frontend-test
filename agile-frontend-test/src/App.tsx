import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header, Footer } from './components';
import { HomePage } from './pages/homePage';
import { ResultsPage } from './pages/resultsPage';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          {/* Add more routes for other pages if needed */}
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
