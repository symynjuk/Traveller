const express = require('express');
const router = express.Router({mergeParams: true});
const { getPost, createPost, updatePost, removePost, getUserPosts } = require('../handlers/post');
const{ loginRequired, ensureCorrectUser  } = require('../middleware/auth');

router.route('/')
    .get(getUserPosts)
    .post(loginRequired, ensureCorrectUser, createPost);
router.route('/:postId')
    .get(getPost)
    .put(loginRequired, ensureCorrectUser, updatePost)
    .delete(loginRequired, ensureCorrectUser, removePost);
module.exports = router;
