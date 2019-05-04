const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');

const postController = require('../controllers/post');

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/', isAuth, postController.createPost);
router.delete('/:id', isAuth, postController.deletePost);
router.put('/comment/:id', isAuth, postController.addComment);
router.delete('/comment/:id/:comment_id', isAuth, postController.removeComment);

module.exports = router;