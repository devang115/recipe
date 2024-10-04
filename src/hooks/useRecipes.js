import { useState, useEffect } from 'react';

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      // In a real application, you would fetch data from an API here
      const sampleRecipes = [
        {
          id: 1,
          title: 'Spaghetti Carbonara',
          cuisine: 'Italian',
          cookingTime: 30,
          ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan cheese', 'Black pepper'],
          instructions: [
            'Cook spaghetti according to package instructions.',
            'In a bowl, whisk eggs and grated Parmesan cheese.',
            'Cook pancetta in a pan until crispy.',
            'Toss hot spaghetti with egg mixture and pancetta.',
            'Season with black pepper and serve immediately.'
          ],
          image: null,
          ratings: [],
          reviews: [],
          nutritionalInfo: {
            calories: 500,
            protein: 20,
            carbs: 60,
            fat: 25
          },
          shareLink: 'https://websim.ai/recipe/1',
          isFavorite: false
        },
        // Add more sample recipes here...
      ];
      setRecipes(sampleRecipes);
    };

    fetchRecipes();
  }, []);

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };

  return {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
  };
};

export default useRecipes;