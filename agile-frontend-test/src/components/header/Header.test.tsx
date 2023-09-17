import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom'; // Import MemoryRouter and useLocation
import SearchProvider from '../../context/SearchContext';
import Header from './Header';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

test('renders Header component with and without search term', () => {
  const mockUseLocation = useLocation as jest.Mock<any>;
  mockUseLocation.mockReturnValue({ pathname: '/' });

  render(
    <MemoryRouter>
      <SearchProvider>
        <Header />
      </SearchProvider>
    </MemoryRouter>
  );

  const titleElement = screen.getByText('Agile Content');
  expect(titleElement).toBeInTheDocument();

  mockUseLocation.mockReturnValue({ pathname: '/results' });

  render(
    <MemoryRouter>
      <SearchProvider>
        <Header />
      </SearchProvider>
    </MemoryRouter>
  );

  const searchInput = screen.getByPlaceholderText(
    'Search for animals...'
  ) as HTMLInputElement;
  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: 'lion' } });

  expect(searchInput.value).toBe('lion');
});
