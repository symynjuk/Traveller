const db = require('../models');

exports.getPost = async function(req, res, next){
    try{
        let post = await db.Post.findById(req.params.postId).populate('user',{
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(post)
    }catch (e) {
        return next(e);
    }
};

exports.getUserPosts = async function(req, res, next){
    try{
        let posts = await db.Post.find({user: req.params.id}).populate('user', {
            username: true,
            profileImageUrl:true
        });
        return res.status(200).json(posts)
    } catch (e){
        return next(e);
    }
}

exports.createPost = async function(req, res, next){
    try{
        let post = await db.Post.create({
            postName: req.body.postName,
            description: req.body.description,
           // postImageUrl: req.body.postImageUrl,
            user: req.params.id
        });
        req.body.postImageUrl.map(e=> post.postImageUrl.push(e));
        post.save();
        console.log('from api', req.body)
        //post.postImageUrl.push(req.body.postImageUrl.map(e => e));
        let foundUser = await db.User.findById(req.params.id);
        foundUser.posts.push(post.id);
        await foundUser.save();
        let foundPost = await db.Post.findById(post.id).populate('user', {
            username: true,
            profileImageUrl: true
        });
        return res.status(201).json(foundPost);

    }catch (e) {
        return next(e)
    }
};

exports.removePost = async function(req, res, next){
    try{
        let foundPost = await db.Post.findByIdAndRemove(req.params.postId);
        return res.status(200).json(foundPost);
    } catch(e){
        return next(e);
    }
};

exports.updatePost = async function(req, res, next){
    try{
        await db.Post.findByIdAndUpdate(req.params.postId, req.body);
        let foundPost = await db.Post.findById(req.params.postId)
        return res.status(200).json(foundPost);
    } catch (e) {
        return next(e)
    }
};