const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    mode: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Cards', cardSchema);