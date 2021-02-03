//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//
//guild.js -- This houses the schema for talking to the MongoDB as well as the data that can be exchanged
// const mongoose = require('mongoose');


const { Schema, model } = require('mongoose');

const GUILD = Schema({
    id: String,
    BOT_DEFAULT_CHANNEL: String,
    GUILD_JOIN_DATE: String,
    GUILD_CREATED_AT: String,
    GUILD_ID: String,
    GUILD_NAME: String,
    GUILD_DESCRIPTION: String,
    GUILD_OWNER: String,
    GUILD_OWNER_ID: String,
    GUILD_MEMBERS: String,
    GUILD_DEFAULT_CHANNEL: String,
    GUILD_ADMIN_CHANNEL: String,
    GUILD_ICON_URL: String,
    GUILD_MESSAGES: String
})

module.exports = model('Guild', GUILD);