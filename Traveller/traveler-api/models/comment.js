const mongoose = require('mongoose');
const User = require('./user');
const Post = require('./post');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        maxLength: 400
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
    },
    {
    timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;