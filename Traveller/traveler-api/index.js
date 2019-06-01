require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/errorHandler');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const {loginRequired, ensureCorrectUser} = require('./middleware/auth');
const db = require('./models');
const PORT = process.env.PORT || 8080;
const router = express.Router();
//app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/posts/', postRoutes);
app.use('/api/users/:id/posts/:postId/comments', commentRoutes);
app.use('/api/posts', async function(req, res, next){
    try {
        let posts = await db.Post.find().sort({createdAt: 'desc'}).populate('user', {
            username: true,
            profileImageUrl:true
        });
        return res.status(200).json(posts)
    } catch (e) {
        return next(e)
    }
});
app.use(function(req, res, next){
    let err = new Error("Not found");
    err.status = 404;
    next(err);
});
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
});
