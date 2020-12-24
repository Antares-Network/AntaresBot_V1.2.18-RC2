//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//


const { Schema, model } = require('mongoose');

const MEMBER = Schema({
    id: String,
    GUILD_ID: String,
    GUILD_MEMBERS: String
})

module.exports = model('Member', MEMBER);