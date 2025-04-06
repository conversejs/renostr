export default {
    root: true,
    env: {
        es2022: true,
        node: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
};
