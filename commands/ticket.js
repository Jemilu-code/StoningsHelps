const discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

    message.delete();

    let catjson = JSON.parse(fs.readFileSync("./data/ticket-cat.json", "utf8"));
    let catogory = catjson[message.guild.id].catogory;
    const categoryId = `${catogory}`;

    var userName = message.author.username;
    var bool = false;

    const filter = (reaction, user) => ['🇦', '🇧', '🇨','🛑'].includes(reaction.emoji.name) && user.id === message.author.id;

    const embed = new discord.RichEmbed()
        .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
        .setTitle('Ticket')
        .setDescription(`

        🇦: **Staff**
        *Questions for Staff*

        🇧: **Problems**
        *For any kind of problems (e.g Bugs, payments)*

        🇨: **General**
        *For general questions.*
        
        🛑: **Cancel**
        *Cancel your ticket.*

        `)
        .setColor('#FFA500');
        
    message.channel.send(embed).then(async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        await msg.react('🇨');
        await msg.react('🛑');

        msg.awaitReactions(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(collected =>{

            const reaction = collected.first();

            switch (reaction.emoji.name){
                case '🛑':
                    message.channel.send(`**You have canceled your ticket**`).then(m => m.delete(10000));
                    msg.delete();
                    break
                case '🇦':
                    var userDiscriminator = message.author.discriminator;
                    message.guild.channels.forEach((channel) => {

                        if (channel.name == userName.toLowerCase()) {
                
                            message.channel.send("**You already have a ticket open, please close this ticket with `-close`**").then(m => m.delete(5000));
                            msg.delete();
                
                            bool = true;
                
                        }
                
                    });
                
                    if (bool == true) return;
                    if(!bool == false) return message.channel.send("Something went wrong.");
                
                    var embedCreateTicket = new discord.RichEmbed()

                    .setColor('#FFA500')
                    .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                    .setTitle("Dear, " + message.author.username + '-' + userDiscriminator)
                    .setFooter("Your Ticket has been created.");

                    message.channel.send(embedCreateTicket);

                    message.guild.createChannel(userName + ' # ' + userDiscriminator, "text").then((createdChan) => {
                        createdChan.setParent(categoryId).then((settedParent) => {
                            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Admin"), { "READ_MESSAGES": true });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Senior Mod"), { "READ_MESSAGES": true });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Mod"), { "READ_MESSAGES": true });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Helper"), { "READ_MESSAGES": true });
                            
                            
                
                            settedParent.overwritePermissions(message.author, {
                
                                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                                "ATTACH_FILES": true, "CONNECT": true,
                                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
                
                            });
                
                            var embedParent = new discord.RichEmbed()
                                .setColor('#FFA500')
                                .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                                .setTitle('Staff Questions')
                                .setDescription("Welcome, **" + message.author.username.toString() + `-` + userDiscriminator + "**, please send your message , We will get to you as soon as posible!");
                                
                            settedParent.send(embedParent);
                        }).catch(err => {
                            return;
                        });
                    }).catch(err => {
                        return;
                    });
                    msg.delete();
                    break
                case '🇧':
                    message.guild.channels.forEach((channel) => {

                        if (channel.name == userName.toLowerCase()) {
                
                            message.channel.send("**You already have a ticket open, please close this ticket with `-close`**").then(m => m.delete(5000));
                            msg.delete();
                
                            bool = true;
                
                        }
                
                    });
                
                    if (bool == true) return;
                    if(!bool == false) return message.channel.send("Something went wrong.");
                
                    var embedCreateTicket = new discord.RichEmbed()
                    .setColor('#FFA500')
                    .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                    .setTitle("Dear, " + message.author.username + '-' + userDiscriminator)
                    .setFooter("Your Ticket has been created.");
                
                    message.channel.send(embedCreateTicket);

                    message.guild.createChannel(userName, "text").then((createdChan) => {
                        createdChan.setParent(categoryId).then((settedParent) => {
                            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Admin"), { "READ_MESSAGES": true });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Senior Mod"), { "READ_MESSAGES": true });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Mod"), { "READ_MESSAGES": true });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Helper"), { "READ_MESSAGES": true });
                            
                            
                
                            settedParent.overwritePermissions(message.author, {
                
                                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                                "ATTACH_FILES": true, "CONNECT": true,
                                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
                
                            });
                
                            var embedParent = new discord.RichEmbed()
                                .setColor('#FFA500')
                                .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                                .setTitle('Problems')
                                .setDescription("Welcome, **" + message.author.username.toString() + `-` + userDiscriminator + "**, please send your message , We will get to you as soon as posible!");
                                
                            settedParent.send(embedParent);
                        }).catch(err => {
                            return;
                        });
                    }).catch(err => {
                        return;
                    });
                    msg.delete();
                    break
                case '🇨':
                    message.guild.channels.forEach((channel) => {

                        if (channel.name == userName.toLowerCase()) {
                
                            message.channel.send("**You already have a ticket open, please close this ticket with `-close`**").then(m => m.delete(5000));
                            msg.delete();
                
                            bool = true;
                
                        }
                
                    });
                
                    if (bool == true) return;
                    if(!bool == false) return message.channel.send("Something went wrong.");
                
                    var embedCreateTicket = new discord.RichEmbed()
                    .setColor('#FFA500')
                    .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                    .setTitle("Dear, " + message.author.username + '-' + userDiscriminator)
                    .setFooter("Your Ticket has been created.");
                
                    message.channel.send(embedCreateTicket);

                    message.guild.createChannel(userName, "text").then((createdChan) => {
                        createdChan.setParent(categoryId).then((settedParent) => {
                            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Admin"), { "READ_MESSAGES": true });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Senior Mod"), { "READ_MESSAGES": true });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Mod"), { "READ_MESSAGES": true });
                            settedParent.overwritePermissions(message.guild.roles.find('name', "Helper"), { "READ_MESSAGES": true });
                            
                            
                
                            settedParent.overwritePermissions(message.author, {
                
                                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                                "ATTACH_FILES": true, "CONNECT": true,
                                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
                
                            });
                
                            var embedParent = new discord.RichEmbed()
                                .setColor('#FFA500')
                                .setThumbnail('https://cdn.discordapp.com/attachments/663458467541024769/663784146455363654/AkumaMC.png')
                                .setTitle('General questions')
                                .setDescription("Welcome, **" + message.author.username.toString() + `-` + userDiscriminator + "** , please send your message , We will get to you as soon as posible!");
                                
                            settedParent.send(embedParent);
                        }).catch(err => {
                            return;
                        });
                    }).catch(err => {
                        return;
                    });
                    msg.delete();
                    break
            }

        }).catch(collected =>{
            msg.delete();
            return message.channel.send(`Something went wrong, this is why your ticket got closed.`).then(m => m.delete(10000));
        });

    });

};

module.exports.help = {
    name: "ticket"

};