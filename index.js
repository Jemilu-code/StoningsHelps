const discord = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);

        console.log(`✅  De file ${f} is compleet geladen`);

        bot.commands.set(fileGet.help.name, fileGet);
    })

});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

    bot.user.setActivity("-help", { type: "LISTENING" });

});

bot.on("guildMemberAdd", member =>{

    var role = member.guild.roles.find("name", "Member")

    if(!role) return;

    member.addRole(role);

    const WelcomeChannel = member.guild.channels.find("name" , "⛔-joinlog");

    if(!WelcomeChannel) return;

    WelcomeChannel.send("+ " + member);

});

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var prefix = (botConfig.prefix);

    if (!message.content.startsWith(prefix)) return;

    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments);


});

bot.login(botConfig.token);