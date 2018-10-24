const { Command } = require('discord.js-commando');

module.exports = class LeaveClubCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leaveclub',
            group: 'general',
            memberName: 'leaveclub',
            aliases: ['lc'],
            description: 'Leave a club',
            examples: ['leaveclub all', 'lc pantsu'],
            args: [
                {
                    key: 'club',
                    type: 'string',
                    prompt: 'You need to enter a club to leave.'
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
                msg.member.removeRole(role1)
                    .then(msg.reply("You left the Art Club!"))
                    .catch(console.error);
                break;
            case 'gaming':
                let role2 = msg.guild.roles.get('253944397773668352');
                msg.member.removeRole(role2)
                    .then(msg.reply("You left the Gaming Club!"))
                    .catch(console.error);
                break;
            case 'pantsu':
                let role3 = msg.guild.roles.get('253943698734186506');
                msg.member.removeRole(role3)
                    .then(msg.reply("You left the Pantsu Club!"))
                    .catch(console.error);
                break;
            case 'animuu':
                let role4 = msg.guild.roles.get('253943764563787796');
                msg.member.removeRole(role4)
                    .then(msg.reply("You left the Animuu Otaku Club!"))
                    .catch(console.error);
                break;
            case 'stories':
                let role5 = msg.guild.roles.get('300373347571728386');
                msg.member.removeRole(role5)
                    .then(msg.reply("You left the Magical Stories Club!"))
                    .catch(console.error);
                break;
            case 'all':
                roles.forEach(function (i) {
                    let role = msg.guild.roles.get(i);
                    msg.member.removeRole(role).catch(console.error);
                });
                msg.reply("All Clubs removed! Enjoy!");
                break;
            default:
                msg.reply("This is not a club! Beep Boop :robot:");
                break;
        }
    }
}