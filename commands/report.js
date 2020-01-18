const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

   const reportformat = new discord.RichEmbed()
   .setColor('#FFA500')
   .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
   .setTitle('**Report**')
   .setDescription(`
   
    **Command:** -report [username] [reason]
  
   `)
   .setFooter(`Copyright AkumaMC`)

   const reportformatplayer = new discord.RichEmbed()
   .setColor('#FFA500')
   .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
   .setTitle('**Report**')
   .setDescription(`
   
    **Command:** -report [username] [reason]
    **Error Message:** This is not a player or the player is not in the server.
  
   `)
   .setFooter(`Copyright AkumaMC`)

   const reportformatreason = new discord.RichEmbed()
   .setColor('#FFA500')
   .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
   .setTitle('**Report**')
   .setDescription(`
   
    **Command:** -report [username] [reason]
    **Error Message:** The reason of your report is missing.
  
   `)
   .setFooter(`Copyright AkumaMC`)


    // {prefix}report speler reden

    if (!args[0]) return message.channel.send(reportformat)

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send(reportformatplayer);

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send()

    var reportEmbed = new discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#FFA500")
        .addField("**Reported user**", `${user}`)
        .addField("**Reporter**", `${message.author}`)
        .addField("**Reason**", reason)
        .setFooter(message.createdAt);

    var channelReport = message.guild.channels.find("name", "report-logs");
    if (!channelReport) return message.channel.send("**Channel has not been found");

    // ZORG VOOR ADMINISTRATOR RECHTEN OP BOT.
    message.delete();

    return channelReport.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}