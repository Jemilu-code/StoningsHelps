const discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const filter = (reaction, user) => ['🇦', '🇧', '🇨', '🇩'].includes(reaction.emoji.name) && user.id === message.author.id;

    // als auteur geen permissie Move Members heeft, dan niks
    if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send("**You have nog permission to execute this command**")


    // als auteur geen permissie Move Members heeft, dan verderzetten!!
    if (message.member.hasPermission("MOVE_MEMBERS"));

    let Admin = message.member.guild.roles.find("name", 'Admin');

    let SeniorMod = message.member.guild.roles.find("name", 'Senior Mod');

    let Mod = message.member.guild.roles.find("name", 'Mod');

    let Helper = message.member.guild.roles.find("name", 'Helper');

    let Members = message.member.guild.roles.find("name", 'Member');

    var user = message.guild.member(message.author);

    const StaffUpdateChannel = message.member.guild.channels.find("name", "staff-updates");

    if (!StaffUpdateChannel) return message.channel.send('Channel has not been found.');
    

    const resignStart = new discord.RichEmbed()
        .setColor('#FFA500')
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setTitle('**Resign**')
        .setDescription(`
    
        **if you want to resign, click on the emote of your current rank**

        🇦: Helper
        🇧: Mod
        🇨: Senior Mod
        🇩: Admin

   
        `)
        .setFooter(`Copyright AkumaMC`)
    message.channel.send(resignStart).then(async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        await msg.react('🇨');
        await msg.react('🇩');
        msg.delete(15000)
        msg.awaitReactions(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(collected => {

            const reaction = collected.first();

            switch (reaction.emoji.name) {
                case '🇦':
                    user.removeRole(Helper);
                    user.removeRole(Mod);
                    user.removeRole(SeniorMod);
                    user.removeRole(Admin);
                    user.addRole(Members)

                    const ResignHelper = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Resign**')
                        .setDescription(`
            
                        ${user} has succesfully resigned as **Helper**
               
                        `)
                        .setTimestamp()
                        .setFooter(`AkumaMC Resign`)
                    
                    StaffUpdateChannel.send(ResignHelper);
                    break
                case '🇧':
                    user.removeRole(Helper);
                    user.removeRole(Mod);
                    user.removeRole(SeniorMod);
                    user.removeRole(Admin);
                    user.addRole(Members)

                    const ResignMod = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Resign**')
                        .setDescription(`
            
                        ${user} has succesfully resigned as **Mod**
               
                        `)
                        .setTimestamp()
                        .setFooter(`AkumaMC Resign`)
                    StaffUpdateChannel.send(ResignMod);
                    break
                case '🇨':
                    user.removeRole(Helper);
                    user.removeRole(Mod);
                    user.removeRole(SeniorMod);
                    user.removeRole(Admin);
                    user.addRole(Members)

                    const ResignSrMod = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Resign**')
                        .setDescription(`
            
                        ${user} has succesfully resigned as **Senior Mod**
               
                        `)
                        .setTimestamp()
                        .setFooter(`AkumaMC Resign`)
                    StaffUpdateChannel.send(ResignSrMod);
                    break
                case '🇩':
                    user.removeRole(Helper);
                    user.removeRole(Mod);
                    user.removeRole(SeniorMod);
                    user.removeRole(Admin);
                    user.addRole(Members)

                    const ResignAdmin = new discord.RichEmbed()
                        .setColor('#FFA500')
                        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                        .setTitle('**Resign**')
                        .setDescription(`
            
                        ${user} has succesfully resigned as **Admin**
               
                        `)
                        .setTimestamp()
                        .setFooter(`AkumaMC Resign`)
                    StaffUpdateChannel.send(ResignAdmin);
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
    name: "resign"
}