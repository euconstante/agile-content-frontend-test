import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom'; // Import MemoryRouter and useLocation
import SearchProvider from '../../context/SearchContext';
import Header from './Header';

// Mock the useLocation hook to provide a custom pathname
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

test('renders Header component with and without search term', () => {
  // Mock the useLocation hook to provide a custom pathname
  useLocation.mockReturnValue({ pathname: '/' });

  // Render Header with MemoryRouter and SearchProvider
  render(
    <MemoryRouter>
      <SearchProvider>
        <Header />
      </SearchProvider>
    </MemoryRouter>
  );

  // Expect that "Agile Content Frontend test" is displayed when not on the results page
  const titleElement = screen.getByText('Agile Content');
  expect(titleElement).toBeInTheDocument();

  // Render Header with a custom pathname
  useLocation.mockReturnValue({ pathname: '/results' });

  // Render Header again with the /results pathname
  render(
    <MemoryRouter>
      <SearchProvider>
        <Header />
      </SearchProvider>
    </MemoryRouter>
  );

  // Expect that the search input is rendered when on the results page
  const searchInput = screen.getByPlaceholderText('Search for animals...');
  expect(searchInput).toBeInTheDocument();

  // Simulate typing in the search input
  fireEvent.change(searchInput, { target: { value: 'lion' } });

  // Expect that the search term is updated
  expect(searchInput.value).toBe('lion');
});
