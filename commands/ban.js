const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    // als auteur geen permissie Ban heeft, dan niks
    if (!message.member.hasPermission("BAN_MEMBERS")) return;


    // als auteur geen permissie Ban heeft, dan verderzetten!!
    if (message.member.hasPermission("BAN_MEMBERS"));
    
    const banformat = new discord.RichEmbed()
   .setColor('#FFA500')
   .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
   .setTitle('**Ban**')
   .setDescription(`
   
    **Command:** -ban [username] [reason]
  
    `)
   .setFooter(`Copyright AkumaMC`)

    const banformatplayer = new discord.RichEmbed()
    .setColor('#FFA500')
    .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
    .setTitle('**ban**')
    .setDescription(`
   
    **Command:** -ban [username] [reason]
    **Error Message:** This is not a player or the player is not in the server.
  
    `)
    .setFooter(`Copyright AkumaMC`)

    const banformatreason = new discord.RichEmbed()
    .setColor('#FFA500')
    .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
    .setTitle('**Ban**')
    .setDescription(`
   
    **Command:** -ban [username] [reason]
    **Error Message:** The reason of your ban is missing.
    `)
    .setFooter(`Copyright AkumaMC`)

    if (!args[0]) return message.channel.send(banformat);

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send(banformatplayer);

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send(banformatreason)
    const banEmbed = new discord.RichEmbed()
        .setDescription("Ban")
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setColor("#FFA500")
        .addField("**Banned user**", `${user}`)
        .addField("**Executer**", `${message.author}`)
        .addField("**Reason**", reason)
        .setTimestamp()
        .setFooter("Copyright AkumaMC");

    var channelban = message.guild.channels.find("name", "ban-logs");
    if (!channelban) return message.channel.send("**Channel has not been found");

    // ZORG VOOR ADMINISTRATOR RECHTEN OP BOT.
    message.delete();
    user.ban();
    return channelban.send(banEmbed);
}

module.exports.help = {
    name: "ban"
}