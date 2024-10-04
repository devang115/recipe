import React, { useState } from 'react';

const Reviews = ({ reviews, onAddReview }) => {
  const [newReview, setNewReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview(newReview);
    setNewReview('');
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mt-4 mb-2">Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
          <p>{review}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write a review..."
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Review
        </button>
      </form>
    </div>
  );
};

export default Reviews;