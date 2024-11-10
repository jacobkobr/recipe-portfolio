/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Include all React components
        "./public/index.html",        // Include index.html file in public folder
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
