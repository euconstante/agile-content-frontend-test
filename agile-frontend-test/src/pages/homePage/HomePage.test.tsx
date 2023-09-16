import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
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
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../services', () => ({
  FechData: jest.fn(() => []),
}));

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(jest.fn());
  });

  it('renders without errors', () => {
    render(<HomePage />);

    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });
});
