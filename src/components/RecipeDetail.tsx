import React from 'react';

interface Recipe {
    title: string;
    ingredients: string;
    instructions: string;
    image: string | null;
}

interface RecipeDetailProps {
    recipe: Recipe;
    onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => (
    <div className="max-w-3xl mx-auto">
        <button
            onClick={onBack}
            className="text-blue-500 underline mb-4"
        >
            Back to Recipes
        </button>
        <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>
        {recipe.image && (
            <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded mb-4" />
        )}
        <div className="text-gray-700 text-sm space-y-4">
            <p className="font-semibold">Ingredients:</p>
            <p className="break-words">{recipe.ingredients}</p>
            <p className="font-semibold mt-4">Instructions:</p>
            <p className="break-words">{recipe.instructions}</p>
        </div>
    </div>
);

export default RecipeDetail;
