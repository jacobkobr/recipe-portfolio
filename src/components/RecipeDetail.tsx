import React from 'react';

// recipe type for user-added recipe details
interface Recipe {
    title: string;
    ingredients: string;
    instructions: string;
    image: string | null;
}

// props type for RecipeDetail component
interface RecipeDetailProps {
    recipe: Recipe; // the selected recipe to display in detail
    onBack: () => void; // function to go back to recipe list
}

// component to display detailed view of a selected recipe
const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => (
    <div className="max-w-3xl mx-auto">
        <button
            onClick={onBack} // handle back button click
            className="text-blue-500 underline mb-4"
        >
            Back to Recipes
        </button>

        <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2> {/* recipe title */}

        {recipe.image && (
            <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded mb-4" /> // recipe image if available
        )}

        <div className="text-gray-700 text-sm space-y-4">
            <p className="font-semibold">Ingredients:</p> {/* ingredients label */}
            <p className="break-words">{recipe.ingredients}</p> {/* ingredients content */}

            <p className="font-semibold mt-4">Instructions:</p> {/* instructions label */}
            <p className="break-words">{recipe.instructions}</p> {/* instructions content */}
        </div>
    </div>
);

export default RecipeDetail;
