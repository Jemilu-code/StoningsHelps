const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    let catjson = JSON.parse(fs.readFileSync("./data/ticket-cat.json", "utf8"));

    let catogory = catjson[message.guild.id].catogory;

    // Id van category van tickets.
    const categoryId = `${catogory}`;

    // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
    if (message.channel.parentID == categoryId) {

        message.channel.delete();

    } else {

        message.channel.send("Use this command in a ticket channel.");
        return;
    }


}

module.exports.help = {
    name: "close"
}