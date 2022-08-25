const { Post } = require('../models');

module.exports = async (req, res) => {
  const posts = await Post.findAll({ 
    where: { userId: req.user.id },
    attributes: { exclude: 'id' },
  });
  res.status(200).json({ mockPosts: posts });
};
