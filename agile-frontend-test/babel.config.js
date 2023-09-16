module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  ignore: [
    '__tests__',
    '__snapshots__',
    '**/*.test.tsx?',
    '**/*.spec.tsx?',
    '**/*.stories.tsx?',
  ],
};
