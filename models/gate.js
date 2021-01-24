//Nate Goldsborough
//Antares Network Discord Bot 

const { Schema, model } = require('mongoose');

const GATE = Schema({
    id: String,
    GUILD_OWNER_ID: Array,
    BANNED_USERS: Array
})

module.exports = model('Gate', GATE);