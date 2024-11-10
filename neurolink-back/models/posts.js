const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');
const { kMaxLength } = require('buffer');

// const User = require("./models/users");

const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        kMaxLength: 255
    },
    content: {
        type: String
    },
    image_url: {
        type: String,
        kMaxLength: 255
    },
    video_url: {
        type: String,
        kMaxLength: 255
    },
    category: {
        type: String,
        enum: ["Food", "Traditions", "Travel", "Festivals"]
    },
    language: {
        type: String,
        default: "English"
    },
    created_at: {
        type: Date
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;