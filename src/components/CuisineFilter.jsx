import React from 'react';

const CuisineFilter = ({ cuisines, selectedCuisine, onSelectCuisine }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Cuisines</h3>
      <div className="flex flex-wrap gap-2">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => onSelectCuisine(cuisine)}
            className={`px-3 py-1 rounded ${
              selectedCuisine === cuisine
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {cuisine}
          </button>
        ))}
        <button
          onClick={() => onSelectCuisine(null)}
          className={`px-3 py-1 rounded ${
            selectedCuisine === null
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default CuisineFilter;