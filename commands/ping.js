const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {

    const filter = (reaction, user) => ['🛑'].includes(reaction.emoji.name) && user.id === message.author.id;

 // message.channel.send(`My ping is: ${bot.ping}ms`);
 const ping = new Discord.RichEmbed()
 .setColor('#FFA500')
 .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
 .setTitle('**Ping**')
 .setDescription(`
 
    My ping is: **${bot.ping}**ms
 
 `)
 .setFooter(`Copyright AkumaMC`)

 message.channel.send(ping);

}
module.exports.help = {
    name: "ping"
}