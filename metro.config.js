
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
 resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
 transformer: {
   getTransformOptions: async () => ({
     transform: {
       experimentalImportSupport: false,
       inlineRequires: true,
     },
   }),
   assetPlugins: ['expo-asset/tools/hashAssetFiles'],
   babelTransformerPath: require.resolve("react-native-css-transformer")
  
  },
 resolver: {

   sourceExts: [...sourceExts, "css"]

 },
};

module.exports = mergeConfig(defaultConfig, config);