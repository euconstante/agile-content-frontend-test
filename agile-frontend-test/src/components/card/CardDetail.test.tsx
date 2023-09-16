import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './CardDetail';

const mockCardData = {
  image: 'image-url',
  url: 'https://example.com',
  title: 'Example Title',
  description: 'Example Description',
};

test('renders Card component with correct data', () => {
  const onCloseMock = jest.fn();

  render(
    <Card
      image={mockCardData.image}
      url={mockCardData.url}
      title={mockCardData.title}
      description={mockCardData.description}
      onClose={onCloseMock}
    />
  );

  const closeButton = screen.getByRole('button', { name: 'Close Icon' });
  const cardImage = screen.getByAltText(mockCardData.title);
  const linkElement = screen.getByText(mockCardData.url);
  const titleElement = screen.getByText(mockCardData.title);
  const descriptionElement = screen.getByText(mockCardData.description);

  expect(closeButton).toBeInTheDocument();
  expect(cardImage).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();

  fireEvent.click(closeButton);
  expect(onCloseMock).toHaveBeenCalled();
});
