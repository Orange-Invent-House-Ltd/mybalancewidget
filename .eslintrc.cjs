module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '^_', "argsIgnorePattern": "^_" }],
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off",
    "no-unsafe-optional-chaining": "off",
    "@typescript-eslint/no-unused-vars" : "off"
  },
}
