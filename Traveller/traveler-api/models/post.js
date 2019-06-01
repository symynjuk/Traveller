const mongoose = require('mongoose');
const User = require('./user');
const Comment = require('./comment');

const postSchema = new mongoose.Schema({
    postName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 2000,
        required: true
    },
    postImageUrl:[],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
    },
    {
    timestamps: true
    }
);

postSchema.pre('remove', async function(next) {
    try{
        let user = await User.finById(this.user);
        this.comments.map(comment => {
            Comment.findByIdAndRemove(comment);
            user.comments.remove(comment)
        });
        user.posts.remove(this.id)
        await user.save();
       return next()
    }catch (e) {
        return next(e);
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;