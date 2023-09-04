const pool = require('../helpers/db');
const { promisify } = require('util');
const execPromise = promisify(pool.query).bind(pool);

const user = 'users';

exports.register = (data) => {
  return execPromise(`insert into ${user} (username, fullname, password) values ($1,$2,$3)`, data);
}
exports.getUserByUsername = (username) => {
  return execPromise(`select id, username from ${user} where username = $1`, username);
}
exports.getUsers = () => {
  return execPromise(`select id, username, fullname, password from ${user}`);
}