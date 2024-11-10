import React from 'react';
import RecipeCard from './RecipeCard';

interface Recipe {
    title: string;
    ingredients: string;
    instructions: string;
    image: string | null;
}

interface RecipeListProps {
    recipes: Recipe[];
    onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onSelectRecipe={onSelectRecipe} />
        ))}
    </div>
);

export default RecipeList;
