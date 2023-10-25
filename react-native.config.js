module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'], // stays the same
  dependencies: {
    ...(process.env.CI
      ? {'react-native-flipper': {platforms: {ios: null}}}
      : {}),
  },
};
