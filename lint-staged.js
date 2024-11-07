module.exports = {
  'src/**/*.{ts,tsx}': () => 'tsc --noEmit',
  'src/**/*.{js,jsx,ts,tsx}': 'eslint --cache --fix',
};
