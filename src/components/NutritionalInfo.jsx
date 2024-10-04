import React from 'react';

const NutritionalInfo = ({ info }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mt-4 mb-2">Nutritional Information</h3>
      <ul>
        <li>Calories: {info.calories}</li>
        <li>Protein: {info.protein}g</li>
        <li>Carbs: {info.carbs}g</li>
        <li>Fat: {info.fat}g</li>
      </ul>
    </div>
  );
};

export default NutritionalInfo;