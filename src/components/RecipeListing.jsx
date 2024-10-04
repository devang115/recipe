import React, { useState } from 'react';

const RecipeListing = ({ recipes, onSelectRecipe, onSearchChange, selectedRecipeId }) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      onSelectRecipe(recipes[index]);
    } else if (e.key === 'ArrowDown') {
      setFocusedIndex(prev => Math.min(prev + 1, recipes.length - 1));
    } else if (e.key === 'ArrowUp') {
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={onSearchChange}
        className="w-full p-2 mb-4 border rounded"
      />
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe, index) => (
            <li
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              className={`cursor-pointer p-2 rounded ${
                recipe.id === selectedRecipeId 
                  ? 'bg-blue-100 font-semibold' 
                  : 'hover:bg-gray-100'
              } ${focusedIndex === index ? 'ring-2 ring-blue-300' : ''}`}
            >
              {recipe.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No recipes found</p>
      )}
    </div>
  );
};

export default RecipeListing;