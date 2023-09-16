import React from 'react';
import CloseIcon from '../../assets/images/close.png';

import './CardDetail.css';

interface CardProps {
  image: string;
  url: string;
  title: string;
  description: string;
  onClose: () => void;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { image, url, title, description, onClose } = props;

  return (
    <div className="card">
      <button className="close-button" onClick={onClose}>
        <img src={CloseIcon} alt="Close Icon" />
      </button>
      <img className="card__image" src={image} alt={title} />
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default Card;
