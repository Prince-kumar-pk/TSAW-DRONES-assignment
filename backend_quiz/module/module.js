const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    text: {
        required: true,
        type: String
    },
    options: {
        required: true,
        type: [String] 
    },
    correctAnswer: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
