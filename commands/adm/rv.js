const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const ownerID = require('./../../cfg.json').ownerID;
const staffCh = require('./../../cfg.json').staffCh;
const logCh = require('./../../cfg.json').logCh;
const timeutil = require('./../../util/time.js');

module.exports = class RemoveVirusCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rv',
            aliases: ['k', 'kick'],
            group: 'adm',
            memberName: 'rv',
            description: 'Kicks the user you provide',
            examples: ['rv @xxBadBoyxx'],
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to kick?',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'Why do you want to kick this user?',
                    type: 'string',
                    validate: text => {
                        if(text.length < 513) return true;
                        return 'Kick Reason can be a maximum of 512 characters long! Beep Boop :robot:';
                    }
                }
            ]
        });
        
    }
        
        hasPermission(msg) {
            return msg.member.hasPermission('KICK_MEMBERS') || this.client.isOwner(msg.author);
        }
        
        run(msg, args) {
            if(msg.author.bot === true) return;
            if(msg.channel.type !== 'dm') {
                if(!msg.channel.permissionsFor(this.client.user).has('MANAGE_MESSAGES')) {
                    return msg.say('Error! I don\'t have permissions to Manage Messages! Beep Boop :robot:');
                }
            } else {
                return msg.say('Error! You have to use BurnVirus in a server channel!');
            }
            const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
            console.log(`${channelTag} »» ${msg.author.username}#${msg.author.discriminator} issued command »» ${msg.content}`);
            
            const { user, reason } = args;
            user.kick(reason)
                .then(user => {    
                msg.reply(`${user.user.username} was kicked successfully! Beep Boop :robot:`);
                    console.log(`KICK: User ${user.user.username} was just kicked by ${msg.author.username}`);
                    user.guild.channels.get(staffCh).send(`${user.displayName} was just kicked by ${msg.member.displayName}! Please consider checking <#${logCh}> and/or the Audit Logs.`);
                    const embed = new RichEmbed()
                        .setAuthor(user.user.username, user.user.displayAvatarURL)
                        .setThumbnail(user.user.displayAvatarURL)
                        .setDescription('User was kicked!')
                        .setColor('#e50000')
                        .setFooter('© by 0xygen#1030', user.user.displayAvatarURL)
                        .setTimestamp()
                        .addField('Username:', user.user.toString())
                        .addField('Join-Timestamp:', timeutil.formatDate(user.joinedAt))
                        .addField('Created at:', timeutil.formatDate(user.user.createdAt))
                        .addField('User ID:', user.id)
                        .addField('Kick Reason:', reason);
                    
                    user.guild.channels.get(logCh).send({embed}).catch(console.error);
                });
            
        }
}