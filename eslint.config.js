module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import'],
  rules: {
    // Customize your rules
    'react/prop-types': 'error', // Ensure PropTypes are enforced
    'no-undef': 'error', // Ensure variables are defined
    // Add other rules as needed
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
