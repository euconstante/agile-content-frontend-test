import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchInput from './SearchInput';

jest.mock('../../context/SearchContext', () => ({
  useResults: () => ({
    results: [],
    updateResults: jest.fn(),
  }),
  useSearch: () => ({
    seacrhTerm: '',
    setSearchTerm: jest.fn(),
  }),
  useError: () => ({
    error: false,
    setError: jest.fn(),
  }),
}));

describe('SearchInput Component', () => {
  it('renders without errors', async () => {
    render(
      <SearchInput
        placeholder="Search for animals..."
        onSearch={() => {}}
        isResultsPage={true}
      />
    );

    expect(
      screen.getByPlaceholderText('Search for animals...')
    ).toBeInTheDocument();
  });

  it('ensure disables the search button when the input is empty', () => {
    render(
      <SearchInput
        placeholder="Search for animals..."
        onSearch={() => {}}
        isResultsPage={false}
      />
    );

    const searchButton = screen.getByText('Buscar');
    expect(searchButton).toBeDisabled();
  });
});
