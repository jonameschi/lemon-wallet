module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'typescript-sort-keys',
    'sort-destructure-keys',
  ],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    'react/prop-types': 'off',
    'import/group-exports': 'warn',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
          },
          {
            pattern: 'react-native',
            group: 'builtin',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        maxBOF: 0,
        maxEOF: 1,
        max: 1,
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    'global-require': 'off',
    'react/require-default-props': 'off',
    'typescript-sort-keys/interface': [
      'error',
      'asc',
      { caseSensitive: false, requiredFirst: true },
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      1,
      { caseSensitive: false },
    ],
    'typescript-sort-keys/string-enum': [
      'error',
      'asc',
      { caseSensitive: false },
    ],
    'no-console': 'error',
    'func-style': ['error', 'expression'],
    'max-params': ['error', 3],
    'react/jsx-props-no-spreading': 'off',
  },
  overrides: [
    {
      files: ['*.test.ts*'],
    },
  ],
};
