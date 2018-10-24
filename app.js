const Commando = require('discord.js-commando');
const { SQLiteProvider } = require('discord.js-commando');
const sqlite = require('sqlite');
const path = require('path');
const cfg = require('./cfg.json');
const pack = require('./package.json');
const { RichEmbed } = require('discord.js');
const games = require('./util/games.json');
const remind = require('./util/remind.js');
const timeutil = require('./util/time.js');

process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: \n' + err.stack);
});

const client = new Commando.CommandoClient({
    commandoPrefix: cfg.prefix,
    owner: cfg.ownerID,
    disableEveryone: true,
    unknownCommandResponse: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['general', 'General Usage Commands'],
        ['adm', 'Admin Commands'],
        ['tools', 'Tools']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

    sqlite.open(path.join(__dirname, './db/settings.db')).then((db) => {
        client.setProvider(new SQLiteProvider(db));
    });

    client.on('ready', () => {
        console.log('Logged in!');
        remind.checkReminders(client);
        client.user.setPresence({game: {name: games[Math.floor(Math.random() * (games.length))]}, status: 'idle'})
            .then(console.log('Presence set!');
    });

/*
GuildMemberRemove-event
triggers when a user leaves a guild
*/
client.on('guildMemberRemove', (member) => {
    console.log(`[-] "${member.user.username}#${member.user.discriminator}" has left "${member.guild.name}"`);
    const embed = new RichEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription('A User left the server!')
        .setColor('#e50000')
        .setFooter('© by 0xygen#1030', client.user.displayAvatarURL)
        .setTimestamp()
        .addField('Username: ', member.user.toString())
        .addField('Join-Timestamp: ', timeutil.formatDate(member.joinedAt), true)
        .addField('Created At: ', timeutil.formatDate(member.user.createdAt), true);

    member.guild.channels.get(cfg.logCh).send({embed}).catch(console.error);
});

/*
GuildMemberAdd-event
triggers when a user joins a guild
*/
client.on('guildMemberAdd', (member) => {
    var res = timeutil.isYounger2(member.user.createdAt);
    if(res.isYounger) {
        member.guild.channels.get(cfg.staffCh).send(`WARNING: New User ${member} joined and this account was created just ${res.warnString} ago! See more in <#${cfg.logCh}>`)
    }
    console.log(`[+] "${member.user.username}#${member.user.discriminator}" has joined "${member.guild.name}"`);
    const channel = member.guild.channels.get(member.guild.id);
    channel.send(`Welcome to the server **${member.user.toString()}**! Be sure to check out <#329686462608048128> and <#313379104244105217> c: Ask an online staff member for a color you would like and to join clubs! ^^\nWe hope you'll enjoy your stay in Royal Anime Castle~ ! :heart:`);
    const emebed = new RichEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL)
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription('A new User joined the server!')
    .setColor(3447003)
    .setFooter('© by 0xygen#1030', client.user.displayAvatarURL)
    .setTimestamp()
    .addField('Username:', member.user.toString())
    .addField('Join-Timestamp:', new Date(), true)
    .addField('Created at:', timeutil.formatDate(member.user.createdAt), true);

    member.guild.channels.get(cfg.logCh).send({embed}).catch(console.error);
});

setInterval(() => {
    client.user.setPresence({game: {name: games[Math.floor(Math.random() * (games.length))]}, status: 'idle'})
            .then(console.log('Presence set!')
            .catch(console.error));
}, 800000);

setInterval(() => {
    remind.checkReminders(client);
}, 15000);

setInterval(() => {
    client.channels.get(cfg.testCh).send("dlm!bump");
    client.channels.get(cfg.logCh).send(":speech_left: Bumped server via `dlm!bump`!");
    client.channels.get(cfg.testCh).send("Attention! It's time to bump on discord.me! GL HF! Beep Boop! :robot:");
}, 21600000); //6h

setInterval(() => {
    client.channels.get(cfg.testCh).send("dc!bump");
    client.channels.get(cfg.logCh).send(":speech_left: Bumped server via `dc!bump`!");
}, 43200000); //12h

console.log('Logging in...');
client.login(process.env.BOTTOKEN);
