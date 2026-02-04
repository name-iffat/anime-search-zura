/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'electric-blue': '#007BFF',
                'eco-green': '#28A745',
                'anime-red': '#DC3545',
            },
        },
    },
    plugins: [],
}