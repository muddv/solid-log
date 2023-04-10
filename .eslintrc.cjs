module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        // Solid `use:` directive leads to unused variables warning
        '@typescript-eslint/no-unused-vars': 'off'
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true
}
