import getUsers from '../controllers/user/get-users';
import getUser from '../controllers/user/get-user';

const routes = [
  {
    method: 'GET',
    path: '/api/users',
    handler: getUsers,
  },
  {
    method: 'GET',
    path: '/api/users/{id}',
    handler: getUser,
  },
];

export default routes;
