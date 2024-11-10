import React, { useState } from 'react';

interface Recipe {
    title: string;
    ingredients: string;
    instructions: string;
    image: string | null;
}

interface AddRecipeProps {
    onAddRecipe: (recipe: Recipe) => void;
}

const AddRecipe: React.FC<AddRecipeProps> = ({ onAddRecipe }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && ingredients && instructions) {
            onAddRecipe({ title, ingredients, instructions, image });
            setTitle('');
            setIngredients('');
            setInstructions('');
            setImage(null);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="mb-8 space-y-4">
            <div>
                <label className="block text-gray-700 font-semibold">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Recipe title"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Ingredients:</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="List ingredients"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Instructions:</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Cooking instructions"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-2"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Add Recipe
            </button>
        </form>
    );
};

export default AddRecipe;
