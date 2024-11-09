const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');

const likeSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    }
})

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;