const pool = require('../helpers/db');
const { promisify } = require('util');
const execPromise = promisify(pool.query).bind(pool);

const user = 'users';

exports.register = (data) => {
  return execPromise(`insert into users (username, fullname, password) values ($1,$2,$3)`, data);
}
exports.getUserByUsername = (username) => {
  return execPromise(`select id, username from users where username = $1`, username);
}