import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

jest.mock('../../context/SearchContext', () => ({
  useResults: () => ({
    results: [],
    updateResults: jest.fn(),
  }),
  useSearch: () => ({
    searchTerm: '',
    setSearchTerm: jest.fn(),
  }),
  useError: () => ({
    error: false,
    setError: jest.fn(),
  }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('HomePage Component', () => {
  it('renders without errors', () => {
    render(<HomePage />);

    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });
});
