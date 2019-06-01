const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb+srv://traveler:traveler@cluster0-52rrg.mongodb.net/traveler-api?retryWrites=true', {useNewUrlParser: true});
module.exports.User = require('./user');
module.exports.Post = require('./post');
module.exports.Comment = require('./comment');