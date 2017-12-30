/**
 * Import dependencies
 */
import Path from 'path';
import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

/**
 * Define plugin
 */
const plugin = {
  pkg: require('./package.json'),
  once: true,

  register(server, options) {
    // Define variables
    let config = {};
    let compiler;

    // Require config from path
    if (typeof options === 'string') {
      const configPath = Path.resolve(process.cwd(), options);
      console.log(configPath);
      config = require(configPath);
      compiler = new Webpack(config);
    }
    else {
      config = options;
      compiler = config.compiler;
    }

    // Create middlewares
    const webpackDevMiddleware = WebpackDevMiddleware(compiler, config.assets);
    const webpackHotMiddleware = WebpackHotMiddleware(compiler, config.hot);

    const applyWebpackDevMiddleware = (req, res) => {
      return new Promise(resolve => {
        webpackDevMiddleware(req, res, error => resolve(error));
      });
    };

    const applyWebpackHotMiddleware = (req, res) => {
      return new Promise(resolve => {
        webpackHotMiddleware(req, res, error => resolve(error));
      });
    };

    // Handle webpackDevMiddleware
    server.ext('onRequest', async (request, h) => {
      const {req, res} = request.raw;
      const error = await applyWebpackDevMiddleware(req, res);
      return h.continue;
    });

    // Handle webpackHotMiddleware
    server.ext('onRequest', async (request, h) => {
      const {req, res} = request.raw;
      const error = await applyWebpackHotMiddleware(req, res);
      return h.continue;
    });

    // Expose compiler
    server.expose({compiler});
  }
};

exports.plugin = plugin;
