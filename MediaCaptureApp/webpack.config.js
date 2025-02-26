const { createWebpackConfigAsync } = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: [
        // Add any modules that need transpiling here
      ]
    }
  }, argv);

  // Override the devServer config
  if (config.devServer) {
    // Force port 5000 with any host
    config.devServer.port = 5000;
    config.devServer.allowedHosts = 'all';
    config.devServer.headers = {
      'Access-Control-Allow-Origin': '*'
    };
  }

  return config;
};