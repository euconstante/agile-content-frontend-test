const config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  coverageReporters: [['lcov', { projectRoot: '../../..' }], 'text'],
  collectCoverageFrom: [
    'src/components/**/*.ts(x)?',
    'src/hooks/**/*.ts(x)?',
    'src/utils/**/*.ts(x)?',
    'src/pages/**/*.ts(x)?',
    '!src/**/styles/*.ts(x)?',
    '!src/**/index.ts',
    '!src/components/HiringPartnersVideoPlayer/HiringPartnersVideoPlayer.tsx',
  ],

  rootDir: './',
  setupFiles: ['./setupTests.ts'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
};

module.exports = config;
