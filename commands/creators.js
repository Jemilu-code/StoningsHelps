const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {

 const creators = new Discord.RichEmbed()
 .setColor('#FFA500')
 .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
 .setTitle('**Creators**')
 .setDescription(`
 
    **The creators of the bot are:**
    *Jemilu89 & ItsJust4You*

 `)
 .setFooter(`Flex Development Team`)

 message.channel.send(creators);

}
module.exports.help = {
    name: "creators"
}