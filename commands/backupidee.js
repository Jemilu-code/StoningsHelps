const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    var suggest = args.join(" ");

    const suggestionmissing = new discord.RichEmbed()
        .setColor('#FFA500')
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setTitle('**Suggest**')
        .setDescription(`

        **Command:** -suggest [suggestion]
        **Error message:** You did not provide a suggestion.

        `)
        .setFooter(`Copyright AkumaMC`)

    if (!suggest) return message.channel.send(suggestionmissing);
 
    const ideeEmbed = new discord.RichEmbed()
        .setColor('#FFA500')
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setTitle('**Suggest**')
        .addField("Suggestion", suggest)
        .addField("Send by", message.author)
        .setFooter(`Copyright AkumaMC`)
 
    var SuggestChannel = message.guild.channels.find(`name`, "suggestions");
    if (!SuggestChannel) return message.guild.send("Kan het kanaal niet vinden");
 
    SuggestChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('✅');
        embedMessage.react('🚫');
    });
 
}
 
module.exports.help = {
    name: "idee"
}