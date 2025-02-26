const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components']
      }
    },
    argv
  );

  // Customize the config before returning it
  // Add any custom webpack settings here
  
  return config;
};