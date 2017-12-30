'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const routes = require('./routes');
const WebpackPlugin = require('./plugins/hapi-webpack');

const server = new Hapi.Server({ port: 3000 });

const plugins = [Inert, {
  plugin: WebpackPlugin,
  options: './webpack.config.js'
}];

const startServer = async () => {
  await server.register(plugins);

  server.route(routes);

  await server.start();

  console.log('Server running at:', server.info.uri);
};

startServer();
