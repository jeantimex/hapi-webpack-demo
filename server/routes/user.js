const getUsers = require('../controllers/user/get-users');
const getUser = require('../controllers/user/get-user');

module.exports = [
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
