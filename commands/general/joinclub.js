const { Command } = require('discord.js-commando');

module.exports = class JoinClubCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'joinclub',
            group: 'general',
            memberName: 'joinclub',
            aliases: ['jc'],
            description: 'Join a club',
            examples: ['joinclub all', 'joinclub pantsu'],
            args: [
                {
                    key: 'club',
                    type: 'string',
                    prompt: 'You need to enter a club to join.'
                }
            ],
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(msg, args) {
        let { club } = args;

        let roles = ['253943938547712001', '253944397773668352', '253943698734186506', '253943764563787796', '300373347571728386'];

        switch (club) {
            case 'artsu':
                let role1 = msg.guild.roles.get('253943938547712001');
                msg.member.addRole(role1)
                    .then(msg.reply("You're now in Art Club! Enjoy!"))
                    .catch(console.error);
                break;
            case 'gaming':
                let role2 = msg.guild.roles.get('253944397773668352');
                msg.member.addRole(role2)
                    .then(msg.reply("You're now in Gaming Club! Enjoy!"))
                    .catch(console.error);
                break;
            case 'pantsu':
                let role3 = msg.guild.roles.get('253943698734186506');
                msg.member.addRole(role3)
                    .then(msg.reply("You're now in Pantsu Club! Enjoy!"))
                    .catch(console.error);
                break;
            case 'animuu':
                let role4 = msg.guild.roles.get('253943764563787796');
                msg.member.addRole(role4)
                    .then(msg.reply("You're now in Animuu Otaku Club! Enjoy!"))
                    .catch(console.error);
                break;
            case 'stories':
                let role5 = msg.guild.roles.get('300373347571728386');
                msg.member.addRole(role5)
                    .then(msg.reply("You're now in Magical Stories Club! Enjoy!"))
                    .catch(console.error);
                break;
            case 'all':
                roles.forEach(function (i) {
                    let role = msg.guild.roles.get(i);
                    msg.member.addRole(role).catch(console.error);
                });
                msg.reply("All Clubs added! Enjoy!");
                break;
            default:
                msg.reply("This is not a club! Beep Boop :robot:");
                break;
        }
    }
}