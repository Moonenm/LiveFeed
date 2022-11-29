const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
titel: {type: String},
link: {type: String},
inhoud: {type: String},
datum: {type : Date}

},{
    collection: 'feed'
});

module.exports = mongoose.model('feed', FeedSchema);