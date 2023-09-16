import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

test('renders NotFound component with and without search term', () => {
  // Test without a search term
  render(<NotFound />);
  const defaultMessage = screen.getByText(
    /insect, fish, horse, crocodilia, bear, cetacean, lion, rabbit, cat, snake, dog, bird/i
  );
  expect(defaultMessage).toBeInTheDocument();

  // Test with a search term
  render(<NotFound searchTerm="elephant" />);
  const specificMessage = screen.getByText(/No results found for '/i);
  expect(specificMessage).toBeInTheDocument();
});
