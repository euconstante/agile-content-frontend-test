import { useError } from '../../context/SearchContext';
import React from 'react';
import './NotFound.css';

interface NotFoundProps {
  searchTerm?: string | any;
}

const NotFound: React.FC<NotFoundProps> = (props: NotFoundProps) => {
  const { searchTerm } = props;
  const { error } = useError();

  return (
    <div className="not-found">
      {searchTerm?.length > 0 && error && (
        <p>
          No results found for '<strong>{searchTerm}</strong>''
          <br />
          Try looking for:{' '}
          <strong>
            insect, fish, horse, crocodilia, bear, cetacean, lion, rabbit, cat,
            snake, dog, bird.
          </strong>
        </p>
      )}
      {searchTerm?.length === 0 && error && (
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
