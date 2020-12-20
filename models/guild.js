const { Schema, model } = require('mongoose');

const GUILD = Schema({
    id: String,
    prefix: {
        default: '&',
        type: String
    }
})

module.exports = model('Guild', GUILD);