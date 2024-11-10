import React, { useState, useEffect, useRef } from 'react';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';

interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
  image: string | null;
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // track the selected recipe for detailed view
  const initialLoad = useRef(true); // ensure only load from localStorage once to not reset on refresh

  // load recipes from localStorage on first mount only
  useEffect(() => {
    if (initialLoad.current) {
      const storedRecipes = localStorage.getItem('recipes');
      if (storedRecipes) {
        try {
          const parsedRecipes = JSON.parse(storedRecipes);
          setRecipes(parsedRecipes); // only sets recipes if data exists
        } catch (error) {
          console.error("Error parsing recipes from localStorage:", error);
        }
      }
      initialLoad.current = false; // doesn't rerun logic
    }
  }, []); // empty array to only run once on mount

  // saves recipes to localStorage whenever the state is changed
  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem('recipes', JSON.stringify(recipes));
    }
  }, [recipes]);

  const handleAddRecipe = (recipe: Recipe) => {
    setRecipes([recipe, ...recipes]);
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe); // set the selected recipe to view details
  };

  const handleBack = () => {
    setSelectedRecipe(null); // clear selected recipe to return to the list view
  };

  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            Recipe Portfolio
          </h1>
          {selectedRecipe ? (
              <RecipeDetail recipe={selectedRecipe} onBack={handleBack} />
          ) : (
              <>
                <AddRecipe onAddRecipe={handleAddRecipe} />
                <RecipeList recipes={recipes} onSelectRecipe={handleSelectRecipe} />
              </>
          )}
        </div>
      </div>
  );
};

export default App;
