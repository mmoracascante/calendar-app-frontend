module.exports = {
    globDirectory: 'dist/',
    globPatterns: [
        '**/*.{js,css,html,png,jpg}'
    ],
    swDest: 'dist/sw.js',
    swSrc: 'src/sw.ts', // Ruta a tu archivo sw.ts
};