const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: ['mp3', 'png', 'jpg', 'jpeg', 'gif'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
