import Path from 'path';
import Hapi from 'hapi';
import Inert from 'inert';

import routes from './routes';
import WebpackPlugin from './plugins/hapi-webpack';

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
