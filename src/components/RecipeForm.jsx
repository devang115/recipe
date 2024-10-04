import React, { useState } from 'react';

const RecipeForm = ({ recipe, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(recipe || {
    title: '',
    cuisine: '',
    cookingTime: '',
    ingredients: [''],
    instructions: [''],
    image: null,
    nutritionalInfo: {
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData(prevData => ({ ...prevData, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: [...prevData[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuisine">
          Cuisine
        </label>
        <input
          type="text"
          id="cuisine"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cookingTime">
          Cooking Time (minutes)
        </label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={formData.cookingTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Ingredients
        </label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleArrayChange(e, index, 'ingredients')}
              className="flex-grow p-2 border rounded mr-2"
              required
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, 'ingredients')}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('ingredients')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Ingredient
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Instructions
        </label>
        {formData.instructions.map((instruction, index) => (
          <div key={index} className="flex mb-2">
            <textarea
              value={instruction}
              onChange={(e) => handleArrayChange(e, index, 'instructions')}
              className="flex-grow p-2 border rounded mr-2"
              required
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, 'instructions')}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('instructions')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Instruction
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Recipe Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageUpload}
          accept="image/*"
          className="w-full p-2 border rounded"
        />
        {formData.image && (
          <img src={formData.image} alt="Recipe preview" className="mt-2 max-w-xs h-auto" />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nutritional Information
        </label>
        <input
          type="number"
          name="calories"
          value={formData.nutritionalInfo.calories}
          onChange={(e) => setFormData(prev => ({...prev, nutritionalInfo: {...prev.nutritionalInfo, calories: e.target.value}}))}
          placeholder="Calories"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="protein"
          value={formData.nutritionalInfo.protein}
          onChange={(e) => setFormData(prev => ({...prev, nutritionalInfo: {...prev.nutritionalInfo, protein: e.target.value}}))}
          placeholder="Protein (g)"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="carbs"
          value={formData.nutritionalInfo.carbs}
          onChange={(e) => setFormData(prev => ({...prev, nutritionalInfo: {...prev.nutritionalInfo, carbs: e.target.value}}))}
          placeholder="Carbs (g)"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="fat"
          value={formData.nutritionalInfo.fat}
          onChange={(e) => setFormData(prev => ({...prev, nutritionalInfo: {...prev.nutritionalInfo, fat: e.target.value}}))}
          placeholder="Fat (g)"
          className="w-full p-2 border rounded mb-2"
        />
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save Recipe
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;