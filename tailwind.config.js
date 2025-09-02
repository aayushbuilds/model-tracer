module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                barlow: ["var(--font-barlow)", "sans-serif"],
                alphaLyrae: ["var(--font-alpha-lyrae)", "sans-serif"],
                geist: ["var(--font-geist-sans)", "sans-serif"],
                geistMono: ["var(--font-geist-mono)", "monospace"],
            },
        },
    },
};
