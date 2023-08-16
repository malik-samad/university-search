module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // roots: ['./src'], // Adjust the path to your source code directory
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};