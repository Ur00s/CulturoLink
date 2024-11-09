const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');
const { kMaxLength } = require('buffer');

// const User = require("./models/users");

const commentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;