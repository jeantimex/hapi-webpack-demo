import Path from 'path';

import userRoute from './user';

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

export default routes;
