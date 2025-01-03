import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig, // Disable ESLint rules that conflict with Prettier
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-console': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "JSXAttribute[name.name='fontSize'][parent.name.name='Text']",
          message: "The 'fontSize' prop is not allowed on Text components.",
        },
        {
          selector:
            "JSXAttribute[name.name='fontWeight'][parent.name.name='Text']",
          message: "The 'fontWeight' prop is not allowed on Text components.",
        },
        {
          selector:
            "JSXAttribute[name.name='lineHeight'][parent.name.name='Text']",
          message: "The 'lineHeight' prop is not allowed on Text components.",
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error', // Show Prettier errors as ESLint errors
    },
  },
);
