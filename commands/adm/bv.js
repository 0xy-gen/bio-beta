const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const ownerID = require('./../../cfg.json').ownerID;
const staffCh = require('./../../cfg.json').staffCh;
const logCh = require('./../../cfg.json').logCh;
const timeutil = require('./../../util/time.js');

module.exports = class BurnVirusCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bv',
            aliases: ['b', 'ban'],
            group: 'adm',
            memberName: 'bv',
            description: 'Bans the user you provide permanently',
            examples: ['bv @xxBadBoyxx'],
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to ban?',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'Why do you want to ban this user?',
                    type: 'string',
                    validate: text => {
                        if(text.length < 513) return true;
                        return 'Ban Reason can be a maximum of 512 characters long! Beep Boop :robot:';
                    }
                }
            ]
        });
        
    }
        
        hasPermission(msg) {
            return msg.member.hasPermission('BAN_MEMBERS') || this.client.isOwner(msg.author);
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
            
            const { user, reason } = args;
	        if(user === msg.author) return "You can't ban yourself! Beep Boop :robot:";
            const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
            console.log(`${channelTag} »» ${msg.author.username}#${msg.author.discriminator} issued command »» ${msg.content}`);
            user.ban({days: 7,reason: reason})
                .then(user => {    
                msg.reply(`${user.user.username} was banned successfully! Beep Boop :robot:`);
                    console.log(`BAN: User ${user.user.username} was just banned by ${msg.author.username}`);
                    user.guild.channels.get(staffCh).send(`${user.displayName} was just banned by ${msg.author.username}#${msg.author.discriminator}! Please consider checking <#${logCh}> and/or the Audit Logs.`);
                    const embed = new RichEmbed()
                        .setAuthor(user.user.username, user.user.displayAvatarURL)
                        .setThumbnail(user.user.displayAvatarURL)
                        .setDescription('User was banned!')
                        .setColor('#e50000')
                        .setFooter('© by 0xygen#1030', user.user.displayAvatarURL)
                        .setTimestamp()
                        .addField('Username:', user.user.toString())
                        .addField('Join-Timestamp:', timeutil.formatDate(user.joinedAt))
                        .addField('Created at:', timeutil.formatDate(user.user.createdAt))
                        .addField('User ID:', user.id)
                        .addField('Ban Reason:', reason);
                    
                    user.guild.channels.get(logCh).send({embed}).catch(console.error);
                });
            
        }
}
