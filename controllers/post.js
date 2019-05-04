const Post = require('../models/Post');
const postValidation = require('../validation/post');

// GET POSTS
exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  if (!posts) res.status(404).json({ error: 'Posts not found' });

  res.json(posts);
};

// GET SINGLE POST
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) res.status(404).json({ error: 'Post not found' })

  res.json(post);
};

// CREATE POST
exports.createPost = async (req, res) => {
  const { text, nickname } = req.body;

  const { errors, isValid } = postValidation(req.body);
  if (!isValid) return res.status(400).json(errors);

  const newPost = await new Post({
    text,
    nickname,
    user: req.user.id
  }).save();

  res.json(newPost);
};

// DELETE POST
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  if (post.user.toString() !== req.user.id) return res.status(401).json({ error: 'User not authorized' });

  const removedPost = await post.remove();
  if (!removedPost) res.status(404).json({ error: "Post not found" });

  res.json({ success: true });
};

// ADD COMMENT TO POST
exports.addComment = async (req, res) => {
  const { text, nickname } = req.body;

  const { errors, isValid } = postValidation(req.body);
  if (!isValid) return res.status(400).json(errors);

  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const comment = {
    text,
    nickname,
    user: req.user.id
  };

  post.comments.unshift(comment);
  const updatedPost = await post.save();

  res.json(updatedPost);
};

// // REMOVE COMMENT FROM POST
exports.removeComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0)
    return res.status(404).json({ error: 'Comment does not exist' });

  const removeIndex = post.comments
    .map(item => item._id.toString())
    .indexOf(req.params.comment_id);

  post.comments.splice(removeIndex, 1);
  const updatedPost = await post.save();

  res.json(updatedPost);
};