'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const WebpackPlugin = require('./plugins/hapi-webpack');

const webRoot = Path.join(__dirname, 'public');

const server = new Hapi.Server({
  port: 3000,
  routes: {
    files: {
      relativeTo: webRoot
    }
  }
});

const plugins = [Inert, {
  plugin: WebpackPlugin,
  options: './webpack.config.js'
}];

const startServer = async () => {
  await server.register(plugins);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: webRoot,
        redirectToSlash: true,
        index: true,
      }
    }
  });

  await server.start();

  console.log('Server running at:', server.info.uri);
};

startServer();
