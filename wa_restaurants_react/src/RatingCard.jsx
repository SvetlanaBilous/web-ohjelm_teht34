import React from 'react';
import StarRating from './StarRating';
import './RatingCard.css';

function RatingCard({ rating, restaurantId, onDelete }) {
  return (
    <div className="rating-card">
      <div className="rating-card-top">
        <StarRating rating={rating.value} />
        <button className="delete-button" onClick={() => onDelete(rating.id)}>Delete</button>
      </div>
      {rating.description && <p>{rating.description}</p>}
      <p className="rating-date">
        Date: {new Date(rating.date_rated).toLocaleString('fi-FI')}
      </p>
    </div>
  );
}

export default RatingCard;