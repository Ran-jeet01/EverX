/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
        "./app/app.vue",
        "./app/error.vue",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0f172a',
                secondary: '#334155',
                accent: {
                    DEFAULT: '#6366f1',
                    hover: '#4f46e5',
                },
                background: '#f8fafc',
                surface: '#ffffff',
                text: {
                    primary: '#1e293b',
                    secondary: '#64748b',
                },
                success: '#10b981',
                error: '#ef4444',
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
            maxWidth: {
                'container': '1280px',
            }
        },
    },
    plugins: [],
}
