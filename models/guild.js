const { Schema, model } = require('mongoose');

const GUILD = Schema({
    id: String,
    prefix: {
        default: '&',
        type: String
    },
    BOT_ADMIN_ROLE: String,
    BOT_SANTA_ROLE: String,
    BOT_DEFAULT_CHANNEL: String
})

module.exports = model('Guild', GUILD);