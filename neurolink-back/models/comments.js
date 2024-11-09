const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');
const { kMaxLength } = require('buffer');

const commentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;