const discord = require("discord.js"); 

exports.run = async (bot, message, args) => { 

const ranklistformat = new discord.RichEmbed()
    .setColor('#FFA500')
    .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
    .setTitle('**Rank list**')
    .setDescription(`
 
    **Overlord**
    **God**
    **Legacy**
    **Titan**
    **Lord**
    **Donator**

    `)
    .setFooter(`Copyright AkumaMC`)
    message.channel.send(ranklistformat).then(msg => {
        msg.delete(25000)
    })





}

module.exports.help = {
    name: "ranklist"
}