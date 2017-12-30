const Path = require('path');

const userRoute = require('./user');

const staticAssetsRoute = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: Path.join(__dirname, '../../public'),
      redirectToSlash: true,
      index: true,
    }
  }
};

const routes = []
  .concat(userRoute)
  .concat(staticAssetsRoute);

module.exports = routes;
