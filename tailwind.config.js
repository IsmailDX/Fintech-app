/** @type {import('tailwindcss').Config} */
module.exports = {
    // Tell Tailwind / NativeWind where to scan for className usage
    content: [
        './app/**/*.{js,jsx,ts,tsx}', // Expo Router
        './components/**/*.{js,jsx,ts,tsx}', // Shared components
    ],

    // Required for React Native
    presets: [require('nativewind/preset')],

    theme: {
        extend: {
            colors: {
                primary: '#3D38ED',
                primaryMuted: '#C9C8FA',
                background: '#F5F5F5',
                dark: '#141518',
                gray: '#626D77',
                lightGray: '#D8DCE2',
            },
        },
    },

    plugins: [],
}
