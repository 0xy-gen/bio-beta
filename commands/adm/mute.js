const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const fs = require('fs');
const logCh = require('./../../cfg.json').logCh;
let mutesDB = require('./../../db/mutes.json');

class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: ['m'],
            group: 'adm',
            memberName: 'mute',
            description: 'Mutes the user for the time you specify.',
            examples: ['mute @SpamBooi 5'],
            format: 'mute <usertag> <Time in Seconds>',
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to mute?',
                    type: 'member'
                }/*,
                {
                    key: 'time',
                    prompt: 'For how long do you intend to mute this user?',
                    type: 'string'
                }*/
            ]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission('MANAGE_ROLES') || this.client.isOwner(msg.author);
    }

    async run(msg, args) {
        const { user, time } = args;
        if(!user) return msg.channel.send("You did not specify a user or ID. Beep Boop :robot:");

        let role = msg.guild.roles.find(r => r.name === "Bio-Muted");
        if(!role) {
            try {
                role = await msg.guild.createRole({
                    name: "Bio-Muted",
                    color: "#000000",
                    permissions: []
                });
    
                msg.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch(e) {
                console.log(e.stack);
            }
        }

        if(user.roles.has(role.id)) return msg.channel.send("That user is already muted! Beep Boop :robot:");
        
        await user.addRole(role);
        msg.channel.send("User muted. Beep Boop :robot:");

        return;
    }
}

module.exports = MuteCommand;