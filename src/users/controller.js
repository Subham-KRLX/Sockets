// controller.js - request handlers for users

const userService = require('./service');

exports.getUsers = (req, res) => {
  const users = userService.getAll();
  res.json(users);
};

exports.createUser = (req, res) => {
  const data = req.body || {};
  const user = userService.create(data);
  res.status(201).json(user);
};
