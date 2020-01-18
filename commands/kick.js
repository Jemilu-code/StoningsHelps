const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    // als auteur geen permissie KICK_MEMBERS heeft, dan niks
    if (!message.member.hasPermission("KICK_MEMBERS")) return;


    // als auteur geen permissie KICK_MEMBERS heeft, dan verderzetten!!
    if (message.member.hasPermission("KICK_MEMBERS"));
    
    const kickformat = new discord.RichEmbed()
   .setColor('#FFA500')
   .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
   .setTitle('**kick**')
   .setDescription(`
   
    **Command:** -kick [username] [reason]
  
    `)
   .setFooter(`Copyright AkumaMC`)

    const kickformatplayer = new discord.RichEmbed()
    .setColor('#FFA500')
    .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
    .setTitle('**kick**')
    .setDescription(`
   
    **Command:** -kick [username] [reason]
    **Error Message:** This is not a player or the player is not in the server.
  
    `)
    .setFooter(`Copyright AkumaMC`)

    const kickformatreason = new discord.RichEmbed()
    .setColor('#FFA500')
    .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
    .setTitle('**kick**')
    .setDescription(`
   
    **Command:** -kick [username] [reason]
    **Error Message:** The reason of your kick is missing.
    `)
    .setFooter(`Copyright AkumaMC`)

    if (!args[0]) return message.channel.send(kickformat);

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send(kickformatplayer);

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send(kickformatreason)
    const kickEmbed = new discord.RichEmbed()
        .setDescription("Kick")
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setColor("#FFA500")
        .addField("**Kicked user**", `${user}`)
        .addField("**Executer**", `${message.author}`)
        .addField("**Reason**", reason)
        .setFooter(message.createdAt);

    var channelKick = message.guild.channels.find("name", "kick-logs");
    if (!channelKick) return message.channel.send("**Channel has not been found");

    // ZORG VOOR ADMINISTRATOR RECHTEN OP BOT.
    message.delete();
    user.kick();
    return channelKick.send(kickEmbed);
}

module.exports.help = {
    name: "kick"
}