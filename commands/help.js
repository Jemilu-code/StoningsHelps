const discord = require("discord.js"); 

module.exports.run = async (bot, message, args) => { 

    const filter = (reaction, user) => ['🌐', '🛠️', '🌎', '⚙️', '🛑'].includes(reaction.emoji.name) && user.id === message.author.id;

    const EmbedBeginHelp = new discord.RichEmbed()
        .setTitle(`**Help**`)
        .setColor("#FFA500")
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setDescription(`
            
            🌐: Admistrator

            🛠️: Moderation

            🌎: General
            
            ⚙️: information

            🛑: Cancel
        
        `)
        .setFooter(`Copyright AkumaMC`)
    message.channel.send(EmbedBeginHelp).then(async msg => {

        await msg.react('🌐');
        await msg.react('🛠️');
        await msg.react('🌎');
        await msg.react('⚙️');
        await msg.react('🛑');

        msg.awaitReactions(filter, {
            max: 1,
            time: 5000,
            errors: ['time']
        }).then(collected => {

            const reaction = collected.first();

            switch (reaction.emoji.name) {
                case '🛑':
                    message.channel.send(`**You have canceled the command**`).then(m => m.delete(10000));
                    msg.delete();
                    break
                case '🌐':
                    const AdministratorHelp = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Administrator Help**')
                        .setDescription(`
 
                        **-promote:** 
                        Promote players in the discord

                        **-demote:** 
                        Demote players in the discord


                        `)
                        .setFooter(`AkumaMC Copyright`)
                    message.channel.send(AdministratorHelp).then(m => m.delete(10000));
                    msg.delete();
                    break
                case '🛠️':
                    const ModerationHelp = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Moderation Help**')
                        .setDescription(`
 
                        **-kick:** 
                        Kick a user from the discord server.

                        **-tempmute:** 
                        Mute a player for a duration

                        **-mute:** 
                        PERMANENT mute

                        **-tempban:** 
                        Tempban a player for a duration

                        **-ban:**
                        PERMANENT ban

                        `)
                        .setFooter(`AkumaMC Copyright`)
                    message.channel.send(ModerationHelp).then(m => m.delete(10000));
                    msg.delete();
                    break
                case '🌎':
                    const GeneralHelp = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**General Help**')
                        .setDescription(`
 
                        **-ticket or -new:** 
                        Create a ticket

                        **-close:** 
                        Close a ticket

                        **-rankrequest:** 
                        Request a Donator rank

                        **-ranklist:**
                        To see all donator ranks

                        **-report:** 
                        Report a player(only purpose for discord)

                        **-suggest:**
                        To make a suggestion

                        `)
                        .setFooter(`AkumaMC Copyright`)
                    message.channel.send(GeneralHelp).then(m => m.delete(10000));
                    msg.delete();
                    break
                case '⚙️':
                    const InformationHelp = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Information Help**')
                        .setDescription(`
 
                        **-creators:**
                        To see the creators of the bot

                        **-ping**
                        To see the bots ping

                        `)
                        .setFooter(`AkumaMC Copyright`)
                    message.channel.send(InformationHelp).then(m => m.delete(10000));
                    msg.delete();
                    break
            }

        }).catch(collected => {
            msg.delete();
            return;
        });

    }).catch(err => {
        return;
    });


}

module.exports.help = {
    name: "help"
}