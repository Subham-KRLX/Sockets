// service.js - simple in-memory user service

let users = [];

exports.getAll = () => users;

exports.create = (data) => {
  const user = {
    id: Date.now().toString(),
    name: data.name || 'Unnamed',
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
};
