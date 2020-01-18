const discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const filter = (reaction, user) => ['🇦', '🇧', '🇨', '🇩'].includes(reaction.emoji.name) && user.id === message.author.id;

    const DemoteFormat = new discord.RichEmbed()
        .setColor('#FFA500')
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setTitle('**Demotion**')
        .setDescription(`
 
        **Command:** -Demote [player] 

        `)
        .setFooter(`Copyright AkumaMC`)

    const DemotePlayerMissing = new discord.RichEmbed()
        .setColor('#FFA500')
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setTitle('**Demotion**')
        .setDescription(`
 
        **Command:** -Demote [player] 
        **Error Message:** This is not a player or the player is not in the server. 

        `)
        .setFooter(`Copyright AkumaMC`)


    // als auteur geen permissie administrator heeft, dan niks
    if (!message.member.hasPermission("ADMINISTRATOR")) return;


    // als auteur geen permissie administrator heeft, dan verderzetten!!
    if (message.member.hasPermission("ADMINISTRATOR"));

    if (!args[0]) return message.channel.send(DemoteFormat);

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send(DemotePlayerMissing);

    let Admin = message.member.guild.roles.find("name", 'Admin');

    let SeniorMod = message.member.guild.roles.find("name", 'Senior Mod');

    let Mod = message.member.guild.roles.find("name", 'Mod');

    let Helper = message.member.guild.roles.find("name", 'Helper');

    let Members = message.member.guild.roles.find("name", 'Member');

    const StaffUpdateChannel = message.member.guild.channels.find("name", "staff-updates");

    if (!StaffUpdateChannel) return message.channel.send('Channel has not been found.');

    const EmbedDemote = new discord.RichEmbed()
        .setTitle(`**Promotions**`)
        .setColor("#FFA500")
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setDescription(`
            
            🇦: Senior Mod
            🇧: Mod
            🇨: Helper
            🇩: Member
        
        `)
        .setFooter(`Copyright AkumaMC`)
    message.channel.send(EmbedDemote).then(async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        await msg.react('🇨');
        await msg.react('🇩');

        msg.awaitReactions(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(collected => {

            const reaction = collected.first();

            switch (reaction.emoji.name) {
                case '🇦':
                    user.removeRole(Admin);
                    user.addRole(SeniorMod);

                    const DemotionSrMod = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Demotion**')
                        .setDescription(`
 
                        ${user} has been demoted to **Senior Mod**

                        `)
                        .setTimestamp()
                        .setFooter(`Demoted by ${message.author.username}`)
                    StaffUpdateChannel.send(DemotionSrMod);
                    break
                case '🇧':
                    user.removeRole(Admin);
                    user.removeRole(SeniorMod);
                    user.addRole(Mod);

                    const DemotionMod = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Demotion**')
                        .setDescription(`
 
                        ${user} has been demoted to **Mod**

                        `)
                        .setTimestamp()
                        .setFooter(`Demoted by ${message.author.username}`)

                    StaffUpdateChannel.send(DemotionMod);
                    break
                case '🇨':
                    user.removeRole(Admin);
                    user.removeRole(SeniorMod);
                    user.removeRole(Mod);
                    user.addRole(Helper);

                    const DemotionHelper = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Demotion**')
                        .setDescription(`
 
                        ${user} has been demoted to **Helper**

                        `)
                        .setTimestamp()
                        .setFooter(`Demoted by ${message.author.username}`)

                    StaffUpdateChannel.send(DemotionHelper);
                    break
                case '🇩':
                    user.removeRole(Admin);
                    user.removeRole(SeniorMod);
                    user.removeRole(Mod);
                    user.removeRole(Helper);
                    user.addRole(Members);

                    const DemotionMember = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Demotion**')
                        .setDescription(`
 
                        ${user} has been demoted to **Member**

                        `)
                        .setTimestamp()
                        .setFooter(`Demoted by ${message.author.username}`)

                    StaffUpdateChannel.send(DemotionMember);
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
    name: "demote"
}