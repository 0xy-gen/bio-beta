const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const fs = require('fs');
const logCh = require('./../../cfg.json').logCh;
let mutesDB = require('./../../db/mutes.json');

class UnmuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            aliases: ['um'],
            group: 'adm',
            memberName: 'unmute',
            description: 'Unmutes the user you specify.',
            examples: ['unmute @SpamBooi'],
            format: 'unmute <usertag | ID>',
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to unmute?',
                    type: 'member'
                }
            ]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission('MANAGE_ROLES') || this.client.isOwner(msg.author);
    }

    async run(msg, args) {
        const { user } = args;
        if(!user) return msg.channel.send("You did not specify a user or ID. Beep Boop :robot:");

        let role = msg.guild.roles.find(r => r.name === "Bio-Muted");
        
        if(!role || !user.roles.has(role.id)) return msg.channel.send("This user is not muted! Beep Boop :robot:");
        
        await user.removeRole(role);
        msg.channel.send("User unmuted. Beep Boop :robot:");

        return;
    }
}

module.exports = UnmuteCommand;