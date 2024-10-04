import React, { useState } from 'react';

const Navbar = ({ onAddNewRecipe, onShowFavorites, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="bg-blue-600 p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-xl font-bold">Recipe App</a>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white hover:text-blue-200">Home</a>
          <button onClick={onAddNewRecipe} className="text-white hover:text-blue-200">Add New Recipe</button>
          <button onClick={onShowFavorites} className="text-white hover:text-blue-200">My Favorites</button>
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2 py-1 rounded-l"
            />
            <button type="submit" className="bg-white text-blue-600 px-2 py-1 rounded-r hover:bg-blue-100">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;