module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'error'
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true
}
