const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Ensure the right devServer configuration
  if (config.devServer) {
    config.devServer.port = 5000;
    config.devServer.host = '0.0.0.0';
  }
  
  return config;
};