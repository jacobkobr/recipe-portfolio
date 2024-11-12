import React, { useState, useEffect, useRef } from 'react';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import IngredientSearch from './components/IngredientSearch';

// local recipe type for user-added recipes
export interface LocalRecipe {
  title: string;
  ingredients: string;
  instructions: string;
  image: string | null;
}

// api recipe type for recipes from spoonacular
export interface ApiRecipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
}

// recipe can be either a local recipe or an api recipe
export type Recipe = LocalRecipe | ApiRecipe;

const App: React.FC = () => {
  const [myRecipes, setMyRecipes] = useState<LocalRecipe[]>([]); // stores user-added recipes
  const [searchedRecipes, setSearchedRecipes] = useState<ApiRecipe[]>([]); // stores spoonacular api recipes
  const [selectedRecipe, setSelectedRecipe] = useState<LocalRecipe | null>(null); // holds selected recipe for detailed view
  const initialLoad = useRef(true); // tracks if recipes loaded from localStorage

  // loads saved recipes from localStorage on first load
  useEffect(() => {
    if (initialLoad.current) {
      const stored = localStorage.getItem('recipes');
      if (stored) {
        try {
          const parsed: LocalRecipe[] = JSON.parse(stored);
          setMyRecipes(parsed); // set stored recipes if they exist
        } catch (err) {
          console.error("error loading recipes:", err); // log error
        }
      }
      initialLoad.current = false; // mark initial load as complete
    }
  }, []); // empty dependency array so this runs only once

  // saves user-added recipes to localStorage whenever they change
  useEffect(() => {
    if (myRecipes.length) {
      localStorage.setItem('recipes', JSON.stringify(myRecipes));
    }
  }, [myRecipes]); // runs whenever myRecipes changes

  // adds a new recipe to user-added recipes
  const handleAddRecipe = (recipe: LocalRecipe) => {
    setMyRecipes([recipe, ...myRecipes]); // adds new recipe to the top of the list
    console.log('recipe added:', recipe); // logs added recipe for debugging
  };

  // selects a recipe to show its details
  const handleSelectRecipe = (recipe: LocalRecipe) => {
    setSelectedRecipe(recipe); // sets selected recipe for detail view
  };

  // goes back to recipe list view
  const handleBack = () => {
    setSelectedRecipe(null); // clears selected recipe
  };

  return (
      <div className="min-h-screen bg-gray-500 p-8">
        <div className="container mx-auto max-w-6xl p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#AAADB2' }}>
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8" >Recipe Lab</h1>

          {/* flex layout for columns */}
          <div className="flex flex-col md:flex-row gap-6">

            {/* left column for api recipes and ingredient search */}
            <div className="w-full md:w-1/3 p-4 rounded-lg shadow-sm" style={{ backgroundColor: '#60697A' }}>
              <h2 className="text-2xl font-bold text-gray-800 my-4 pl-14">Generate a Recipe</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {searchedRecipes.map(recipe => (
                    <div key={recipe.id} className="border border-gray-500 rounded-lg p-4 shadow-lg" >
                      <h3 className="font-semibold">{recipe.title}</h3>
                      {recipe.image && (
                          <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover rounded mt-2" />
                      )}
                      <p>Used Ingredients: {recipe.usedIngredientCount}</p>
                      <p>Missing Ingredients: {recipe.missedIngredientCount}</p>
                      <a
                          href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-200 underline mt-2 block"
                      >
                        View Recipe
                      </a>
                    </div>
                ))}
              </div>
              <IngredientSearch onSearchResults={setSearchedRecipes} />
            </div>

            {/* right column for user-added recipes */}
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 my-4">Your Recipes</h2>
              {selectedRecipe ? (
                  <RecipeDetail recipe={selectedRecipe} onBack={handleBack} />
              ) : (
                  <>
                    <AddRecipe onAddRecipe={handleAddRecipe} />
                    <RecipeList recipes={myRecipes} onSelectRecipe={handleSelectRecipe} />
                  </>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;
