const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

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