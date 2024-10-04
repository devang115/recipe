import React from 'react';
import RatingStars from './RatingStars';
import Reviews from './Reviews';
import NutritionalInfo from './NutritionalInfo';

const RecipeDetailView = ({ recipe, onEdit, onDelete, onRate, onAddReview, onToggleFavorite }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    {recipe.image && (
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover mb-4 rounded" />
    )}
    <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
    <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
    <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
    <h3 className="text-xl font-semibold mt-4 mb-2">Ingredients:</h3>
    <ul className="list-disc list-inside">
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
    <h3 className="text-xl font-semibold mt-4 mb-2">Instructions:</h3>
    <ol className="list-decimal list-inside">
      {recipe.instructions.map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ol>
    <NutritionalInfo info={recipe.nutritionalInfo} />
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Rate this recipe:</h3>
      <RatingStars rating={recipe.ratings.length > 0 ? recipe.ratings.reduce((a, b) => a + b) / recipe.ratings.length : 0} onRate={onRate} />
    </div>
    <Reviews reviews={recipe.reviews} onAddReview={onAddReview} />
    <div className="mt-6 flex space-x-4">
      <button onClick={onEdit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
      <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
      <button onClick={() => navigator.clipboard.writeText(recipe.shareLink)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Share Recipe
      </button>
      <button onClick={onToggleFavorite} className={`${recipe.isFavorite ? 'bg-yellow-500' : 'bg-gray-500'} text-white px-4 py-2 rounded hover:bg-yellow-600`}>
        {recipe.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  </div>
);

export default RecipeDetailView;