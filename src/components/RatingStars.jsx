import React from 'react';

const RatingStars = ({ rating, onRate }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingStars;