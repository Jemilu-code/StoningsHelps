const discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const filter = (reaction, user) => ['🇦', '🇧', '🇨', '🇩'].includes(reaction.emoji.name) && user.id === message.author.id;

    const promoteFormat = new discord.RichEmbed()
        .setColor('#FFA500')
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setTitle('**Promotion**')
        .setDescription(`
 
        **Command:** -promote [player] 

        **Ranks that are able to execute this command**
        Manager & Owner
        `)
        .setFooter(`Copyright AkumaMC`)

    const promotePlayerMissing = new discord.RichEmbed()
        .setColor('#FFA500')
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setTitle('**Promotion**')
        .setDescription(`
 
        **Command:** -promote [player]
        **Error Message:** This is not a player or the player is not in the server. 

        `)
        .setFooter(`Copyright AkumaMC`)

    // als auteur geen permissie administrator heeft, dan niks
    if (!message.member.hasPermission("ADMINISTRATOR")) return;


    // als auteur geen permissie administrator heeft, dan verderzetten!!
    if (message.member.hasPermission("ADMINISTRATOR"));

    if (!args[0]) return message.channel.send(promoteFormat);

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send(promotePlayerMissing);

    let Admin = message.member.guild.roles.find("name", 'Admin');

    let SeniorMod = message.member.guild.roles.find("name", 'Senior Mod');

    let Mod = message.member.guild.roles.find("name", 'Mod');

    let Helper = message.member.guild.roles.find("name", 'Helper');

    let Members = message.member.guild.roles.find("name", 'Member');

    const StaffUpdateChannel = message.member.guild.channels.find("name", "staff-updates");

    if (!StaffUpdateChannel) return message.channel.send('Channel has not been found.');

    const EmbedBegin = new discord.RichEmbed()
        .setTitle(`**Promotions**`)
        .setColor("#FFA500")
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setDescription(`
            
            🇦: Admin
            🇧: Senior Mod
            🇨: Mod
            🇩: Helper
        
        `)
        .setFooter(`Copyright AkumaMC`)
    message.channel.send(EmbedBegin).then(async msg => {

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
                    user.addRole(Admin);
                    user.removeRole(SeniorMod);
                    user.removeRole(Mod);
                    user.removeRole(Helper);
                    user.removeRole(Members);

                    const PromotionAdmin = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Promotion**')
                        .setDescription(`
 
                        ${user} has been promoted to **Admin**

                        `)
                        .setTimestamp()
                        .setFooter(`Promoted by ${message.author.username}`)
                    StaffUpdateChannel.send(PromotionAdmin);
                    break
                case '🇧':
                    user.addRole(SeniorMod);
                    user.removeRole(Mod);
                    user.removeRole(Helper);
                    user.removeRole(Members);


                    const PromotionSrMod = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Promotion**')
                        .setDescription(`
 
                        ${user} has been promoted to **Senior Mod**

                        `)
                        .setTimestamp()
                        .setFooter(`Promoted by ${message.author.username}`)

                    StaffUpdateChannel.send(PromotionSrMod);
                    break
                case '🇨':
                    user.addRole(Mod);
                    user.removeRole(Helper);
                    user.removeRole(Members);


                    const PromotionMod = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Promotion**')
                        .setDescription(`
 
                        ${user} has been promoted to **Mod**

                        `)
                        .setTimestamp()
                        .setFooter(`Promoted by ${message.author.username}`)

                    StaffUpdateChannel.send(PromotionMod);
                    break
                case '🇩':
                    user.addRole(Helper);
                    user.removeRole(Members);

                    const PromotionHelper = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Promotion**')
                        .setDescription(`
 
                        ${user} has been promoted to **Helper**

                        `)
                        .setTimestamp()
                        .setFooter(`Promoted by ${message.author.username}`)

                    StaffUpdateChannel.send(PromotionHelper);
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
    name: "promote"
}