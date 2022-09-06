const { User } = require('../models');

const createUser = (username, password) => User.create(username, password);

const getUsers = () => User.findAll();

const getByUsername = (username) => User.findOne({ where: { username } });

module.exports = {
  createUser,
  getUsers,
  getByUsername,
};