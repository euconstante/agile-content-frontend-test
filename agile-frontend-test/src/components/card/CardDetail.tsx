import React from 'react';
import './CardDetail.css';

interface CardProps {
  image: string;
  url: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { image, url, title, description } = props;
  return (
    <div className="card">
      <img src={image} alt={title} />
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default Card;
