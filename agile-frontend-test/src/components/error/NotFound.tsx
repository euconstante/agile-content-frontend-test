import React from 'react';
import './NotFound.css';

interface NotFoundProps {
  searchTerm?: string;
}

const NotFound: React.FC<NotFoundProps> = (props: NotFoundProps) => {
  const { searchTerm } = props;

  return (
    <div className="not-found">
      {searchTerm ? (
        <p>
          No results found for '<strong>{searchTerm}</strong>''
          <br />
          Try looking for:{' '}
          <strong>
            insect, fish, horse, crocodilia, bear, cetacean, lion, rabbit, cat,
            snake, dog, bird.
          </strong>
        </p>
      ) : (
        <p>
          Try looking for:{' '}
          <strong>
            insect, fish, horse, crocodilia, bear, cetacean, lion, rabbit, cat,
            snake, dog, bird.
          </strong>
        </p>
      )}
    </div>
  );
};

export default NotFound;
