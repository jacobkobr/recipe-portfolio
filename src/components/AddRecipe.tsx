import React, { useState, useRef } from 'react';

interface Recipe {
    title: string;
    ingredients: string;
    instructions: string;
    image: string | null;
}


interface AddRecipeProps {
    onAddRecipe: (recipe: Recipe) => void; // callback to pass new recipe to parent
}

// component to add a new recipe
const AddRecipe: React.FC<AddRecipeProps> = ({ onAddRecipe }) => {
    const [title, setTitle] = useState(''); // state for recipe title
    const [ingredients, setIngredients] = useState(''); // state for ingredients list
    const [instructions, setInstructions] = useState(''); // state for instructions
    const [image, setImage] = useState<string | null>(null); // state for optional image
    const fileInputRef = useRef<HTMLInputElement | null>(null); // ref to trigger file input

    // handles submission for new recipe
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // prevent page reload on submit
        if (title && ingredients && instructions) { // ensure required fields are filled
            onAddRecipe({ title, ingredients, instructions, image }); // pass recipe to parent component
            setTitle(''); // reset title field
            setIngredients(''); // reset ingredients field
            setInstructions(''); // reset instructions field
            setImage(null); // reset image
        }
    };

    // image upload and sets it in state
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // get selected file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string); // set image to Base64 string
            reader.readAsDataURL(file); // read file as Data URL
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="mb-8 space-y-4">
            <div>
                <label className="block text-gray-700 font-semibold">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // update title state
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Recipe title"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Ingredients:</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)} // update ingredients state
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="List ingredients"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Instructions:</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)} // update instructions state
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
                    onChange={handleImageUpload} // handle image upload
                    ref={fileInputRef} // ref to trigger file input
                    style={{ display: 'none' }} // hide the default file input
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()} // trigger file input dialog
                    className="w-full py-2 mt-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {image ? "Change Image" : "Upload Image"}
                </button>
                {image && (
                    <p className="mt-2 text-gray-600">Image selected</p> // feedback when an image is selected
                )}
            </div>
            <button
                type="submit"
                className="w-full py-2 font-semibold text-black border rounded border-gray-500 hover:bg-blue-600 transition duration-300"
                style={{ backgroundColor: '#ADACAC' }}
            >
                Add Recipe
            </button>
        </form>
    );
};

export default AddRecipe;
