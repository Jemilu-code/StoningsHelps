const discord = require("discord.js"); 

exports.run = async (bot, message, args) => { 

    const RChannel = message.member.guild.channels.find("name", "rank-request");

    if (!RChannel) return message.channel.send('Channel has not been found.');

    const Request = args.join(" ");

    const RankRequestFormat = new discord.RichEmbed()
        .setColor('#FFA500')
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setTitle('**Rank Request**')
        .setDescription(`
 
        **Command:** -rankrequest [rank]
        **Available Ranks:** -ranklist

        `)
        .setFooter(`Copyright AkumaMC`)

    if (!Request){
        return message.channel.send(RankRequestFormat);
    }else{
        const RequestFormat = new discord.RichEmbed()
            .setColor('#FFA500')
            .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
            .setTitle('**Rank Request**')
            .setDescription(`
    
               **${message.author.username}** has requested **${Request}** rank
    
            `)
            .setFooter(`Copyright AkumaMC`)
        RChannel.send(RequestFormat);
    }


}

module.exports.help = {
    name: "rankrequest"
}