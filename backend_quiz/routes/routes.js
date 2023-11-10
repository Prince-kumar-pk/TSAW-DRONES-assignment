const express = require('express');
const router = express.Router();
const Model = require('../module/module');

// POST - Create a new post
router.post('/createPost', async (req, res) => {
    // res.send(" Post API");
    const newPost = new Model({
        id: req.body.id,
        text: req.body.text,
        options: req.body.options,
        correctAnswer: req.body.correctAnswer
    });

    try {
        const result = await newPost.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

// GET - Get all posts
router.get('/getAllPosts', async (req, res) => {
    try {
        const result = await Model.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
