const mongoose = require('mongoose');
const Post = require('./models/posts');

mongoose.connect('mongodb://127.0.0.1:27017/CultureLink');

const seedsPost = [
    {
        user_id: '672ea734e9f8334fe5a207ab',
        title: "This is post 1",
        content: "Something very unimporant, but maybe could be important...we will see",
        category: 'Travel'
    },
    {
        user_id: '672ea734e9f8334fe5a207ab',
        title: "This is post 2",
        content: "Let's good, so tasty",
        category: 'Food'
    }
]

Post.insertMany(seedsPost)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })