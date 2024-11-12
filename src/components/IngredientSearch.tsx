import React, { useState } from 'react';
import axios from 'axios';

interface ApiRecipe {
    id: number;
    title: string;
    image: string;
    usedIngredientCount?: number;
    missedIngredientCount?: number;
}

interface IngredientSearchProps {
    onSearchResults: (results: ApiRecipe[]) => void;
}

const IngredientSearch: React.FC<IngredientSearchProps> = ({ onSearchResults }) => {
    const [input, setInput] = useState('');

    const handleSearch = async () => {
        const ingredients = input.split(',').map(ingredient => ingredient.trim()).join(',');
        try {
            const response = await axios.get<ApiRecipe[]>('https://api.spoonacular.com/recipes/findByIngredients', {
                params: {
                    ingredients: ingredients,
                    number: 10,
                    ranking: 2,
                    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
                },
            });
            onSearchResults(response.data); // pass results back to App component
        } catch (error) {
            console.error("Error fetching recipes from Spoonacular API:", error);
        }
    };

    return (
        <div style={{ width: '330px', padding: '1rem', backgroundColor: '#D1D5DB', borderRadius: '8px' }}>
            <h2>Find Recipes by Ingredients</h2>
            <input
                type="text"
                placeholder="Enter ingredients (comma-separated)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '8px' }}
            />
            <button  onClick={handleSearch} style={{ width: '100%', padding: '0.5rem', backgroundColor: '#ADACAC', color: 'black', borderRadius: '8px', borderColor: 'gray' }} className="border border-gray-300">
                Search
            </button>
        </div>
    );
};

export default IngredientSearch;
