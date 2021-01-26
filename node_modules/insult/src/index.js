const insult = require("./data/insults.js");

const Insult = () => {
    return insult[Math.floor(Math.random() * insult.length)];
}

module.exports.Insult = Insult;