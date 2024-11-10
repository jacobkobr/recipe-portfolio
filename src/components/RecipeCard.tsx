import React from 'react';

interface Recipe {
    title: string;
    ingredients: string;
    instructions: string;
    image: string | null;
}

interface RecipeCardProps {
    recipe: Recipe;
    onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelectRecipe }) => (
    <div
        className="border border-gray-300 rounded-lg cursor-pointer hover:opacity-75 transition-opacity duration-200 shadow-lg overflow-hidden"
        style={{ width: '200px', height: '250px' }}
        onClick={() => onSelectRecipe(recipe)}
    >
        {recipe.image && (
            <img src={recipe.image} alt={recipe.title} className="w-full h-2/3 object-cover" />
        )}
        <div className="p-2 text-center">
            <h2 className="text-lg font-bold">{recipe.title}</h2>
        </div>
    </div>
);

export default RecipeCard;
