import React from 'react';

// recipe type for user-added recipe card display
interface Recipe {
    title: string;
    ingredients: string;
    instructions: string;
    image: string | null;
}

// props type for RecipeCard component
interface RecipeCardProps {
    recipe: Recipe; // recipe to display in the card
    onSelectRecipe: (recipe: Recipe) => void; // function to select this recipe for detailed view
}

// component to render individual recipe card
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelectRecipe }) => (
    <div
        className="border border-gray-500 rounded-lg cursor-pointer hover:opacity-75 transition-opacity duration-200 shadow-lg overflow-hidden"
        style={{ width: '200px', height: '250px' }} // fixed size for card layout
        onClick={() => onSelectRecipe(recipe)} // trigger selection when card is clicked
    >
        {recipe.image && (
            <img src={recipe.image} alt={recipe.title} className="w-full h-2/3 object-cover" /> // display recipe image if available
        )}
        <div className="p-2 text-center">
            <h2 className="text-lg font-bold">{recipe.title}</h2> {/* recipe title */}
        </div>
    </div>
);

export default RecipeCard;
