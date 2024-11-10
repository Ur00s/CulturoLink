const mongoose = require('mongoose');
const Comment = require('./models/comments');
const Post = require('./models/posts');

mongoose.connect('mongodb://127.0.0.1:27017/CultureLink');

const post = {
    user_id: '672ea734e9f8334fe5a207ab',
    title: "This is post 1",
    content: "Something very unimporant, but maybe could be important...we will see",
    category: 'Travel'
}

const seedsComment = [
    {
        user_id: '672ea734e9f8334fe5a207ab',
        post_id: "672ebc4e392f713dbdc58e6f",
        content: "It looks very nice, I like it"
    },
    {
        user_id: '672ea734e9f8334fe5a207ab',
        post_id: "672ebc4e392f713dbdc58e70",
        content: "Dislike, so bad"
    }
]

Comment.insertMany(seedsComment)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })