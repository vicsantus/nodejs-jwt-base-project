const { PostService } = require('../services');

module.exports = async (req, res) => {
  const posts = await PostService.getPosts(req.user.id);
  res.status(200).json({ mockPosts: posts });
};
