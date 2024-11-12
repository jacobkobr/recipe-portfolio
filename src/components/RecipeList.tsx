import React from 'react';
import RecipeCard from './RecipeCard';

// recipe type for user-added recipes
interface Recipe {
    title: string;
    ingredients: string;
    instructions: string;
    image: string | null;
}

// props type for RecipeList component
interface RecipeListProps {
    recipes: Recipe[]; // array of recipes to display
    onSelectRecipe: (recipe: Recipe) => void; // function to handle recipe selection
}

// displays a grid of recipe cards
const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onSelectRecipe={onSelectRecipe} /> // render each recipe card
        ))}
    </div>
);

export default RecipeList;