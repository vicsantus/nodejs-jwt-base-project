const { Post } = require('../models');

const getPosts = (userId) => Post.findAll({ 
  where: { userId },
  attributes: { exclude: 'id' },
});

module.exports = {
  getPosts,
};
