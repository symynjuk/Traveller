const db = require("../models");

exports.createComment = async function(req, res, next){
    try {
       let comment = await db.Comment.create({
            text: req.body.text,
            user: req.params.id,
            post: req.params.postId
        });
        let foundComment = await db.Comment.findById(comment._id).populate('user', {
            username: true,
            profileImageUrl: true
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.comments.push(comment.id);
        await foundUser.save();
        let foundPost = await db.Post.findById(req.params.postId);
        foundPost.comments.push(comment.id);
        await foundPost.save();
        return res.status(201).json(foundComment);
    } catch (e){
        return next(e);
    }
};

exports.getComments = async function(req, res, next) {
    try{
        let comments = await db.Comment.find({post: req.params.postId}).populate('user', {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(comments)
    } catch (e) {
       return next(e)
    }
};
exports.removeComment = async function(req, res, next) {
    try {
        let comment = await db.Comment.findByIdAndRemove(req.params.commentId);
        let user = await db.User.findById(req.params.id);
        await user.comments.remove(comment.id);
        await user.save();
        let post = await db.Post.findById(req.params.postId);
        await post.comments.remove(comment.id);
        await post.save();
        return res.status(200).json(comment);
    } catch (e) {
        return next(e)
    }
};
exports.updateComment = async function(req, res, next) {
    try {
        await db.Comment.findByIdAndUpdate(req.params.commentId, req.body);
        let foundComment = await db.Comment.findById(req.params.commentId);
        return res.status(200).json(foundComment)
    } catch (e) {
        return next(e);
    }
};
exports.getComment = async function(req, res, next) {
    try {
        let foundComment = await db.Comment.findById(req.params.commentId);
        return res.status(200).json(foundComment);
    } catch (e) {
        return next(e);
    }
}