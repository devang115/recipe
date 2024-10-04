import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CuisineFilter from '../components/CuisineFilter';
import RecipeListing from '../components/RecipeListing';
import RecipeDetailView from '../components/RecipeDetailView';
import RecipeForm from '../components/RecipeForm';
import useRecipes from '../hooks/useRecipes';

const Home = () => {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const cuisines = [...new Set(recipes.map((recipe) => recipe.cuisine))];

  const filteredRecipes = recipes.filter((recipe) =>
    (selectedCuisine ? recipe.cuisine === selectedCuisine : true) &&
    (recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase())) ||
     recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
     recipe.instructions.some(instruction => instruction.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditing(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNewRecipe = () => {
    setSelectedRecipe(null);
    setIsEditing(true);
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleNavbarSearch = (term) => {
    setSearchTerm(term);
  };

  const handleEditRecipe = () => {
    setIsEditing(true);
  };

  const handleDeleteRecipe = () => {
    deleteRecipe(selectedRecipe.id);
    setSelectedRecipe(null);
  };

  const handleSaveRecipe = (recipeData) => {
    if (recipeData.id) {
      updateRecipe(recipeData);
    } else {
      addRecipe(recipeData);
    }
    setSelectedRecipe(recipeData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleRateRecipe = (rating) => {
    const updatedRecipe = {...selectedRecipe, ratings: [...selectedRecipe.ratings, rating]};
    updateRecipe(updatedRecipe);
    setSelectedRecipe(updatedRecipe);
  };

  const handleAddReview = (review) => {
    const updatedRecipe = {...selectedRecipe, reviews: [...selectedRecipe.reviews, review]};
    updateRecipe(updatedRecipe);
    setSelectedRecipe(updatedRecipe);
  };

  const handleToggleFavorite = () => {
    const updatedRecipe = { ...selectedRecipe, isFavorite: !selectedRecipe.isFavorite };
    updateRecipe(updatedRecipe);
    setSelectedRecipe(updatedRecipe);
  };

  return (
    <div>
      <Navbar
        onAddNewRecipe={handleAddNewRecipe}
        onShowFavorites={handleShowFavorites}
        onSearch={handleNavbarSearch}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Recipe Management App</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <CuisineFilter
              cuisines={cuisines}
              selectedCuisine={selectedCuisine}
              onSelectCuisine={setSelectedCuisine}
            />
            <RecipeListing
              recipes={showFavorites ? favoriteRecipes : filteredRecipes}
              onSelectRecipe={handleSelectRecipe}
              onSearchChange={handleSearchChange}
              selectedRecipeId={selectedRecipe?.id}
            />
          </div>
          <div className="w-full md:w-2/3">
            {isEditing ? (
              <RecipeForm
                recipe={selectedRecipe}
                onSubmit={handleSaveRecipe}
                onCancel={handleCancelEdit}
              />
            ) : selectedRecipe ? (
              <RecipeDetailView
                recipe={selectedRecipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
                onRate={handleRateRecipe}
                onAddReview={handleAddReview}
                onToggleFavorite={handleToggleFavorite}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p>Select a recipe or create a new one to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;