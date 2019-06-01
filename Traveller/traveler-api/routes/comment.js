const express = require('express');
const router = express.Router({mergeParams: true});
const { createComment, getComments, removeComment, updateComment, getComment } = require('../handlers/comment');
const{ loginRequired, ensureCorrectUser  } = require('../middleware/auth');

router.route('/')
    .get(getComments)
    .post(loginRequired, ensureCorrectUser, createComment);
router.route('/:commentId')
    .delete(loginRequired, ensureCorrectUser, removeComment)
    .get(getComment)
    .put(loginRequired, ensureCorrectUser, updateComment);


module.exports = router;