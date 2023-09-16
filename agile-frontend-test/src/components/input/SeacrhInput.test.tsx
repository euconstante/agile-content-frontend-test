import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchInput from './SearchInput';
import SearchProvider from '../../context/SearchContext';

test('renders SearchInput component with and without search term', () => {
  // Mock the onSearch and onClear functions
  const onSearch = jest.fn();
  const onClear = jest.fn();

  // Render SearchInput with SearchProvider and mock functions
  render(
    <SearchProvider>
      <SearchInput
        placeholder="Search for animals..."
        onSearch={onSearch}
        onClear={onClear}
        isResultsPage={false}
      />
    </SearchProvider>
  );

  // Expect that the search input and button are rendered
  const searchInput = screen.getAllByPlaceholderText('Search for animals...');
  expect(searchInput[0]).toBeInTheDocument();

  const searchButton = screen.getByText('Buscar');
  expect(searchButton).toBeInTheDocument();

  // Simulate typing in the search input
  fireEvent.change(searchInput[0], { target: { value: 'lion' } });

  // Expect that the search term is updated
  expect(searchInput[0].value).toBe('lion');

  // Simulate clicking the search button
  fireEvent.click(searchButton);

  // Expect that the onSearch function is called with the correct search term
  expect(onSearch).toHaveBeenCalledWith('lion');

  // Render SearchInput for results page
  render(
    <SearchProvider>
      <SearchInput
        placeholder="Search for animals..."
        onSearch={onSearch}
        onClear={onClear}
        isResultsPage={true}
        searchValue="lion"
      />
    </SearchProvider>
  );

  // Expect that the search input, search button, and clear button are rendered
  const searchInputResults = screen.getAllByPlaceholderText(
    'Search for animals...'
  );
  expect(searchInputResults).toHaveLength(2);

  const searchButtonResults = screen.getByTestId('search-button-results');
  expect(searchButtonResults).toBeInTheDocument();
});
