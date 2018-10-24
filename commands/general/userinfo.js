const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const timeutil = require('./../../util/time.js');

module.exports = class UserInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            group: 'general',
            memberName: 'userinfo',
            description: 'Gives some infos about given User',
            examples: ['userinfo @User#1234'],
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to get information about?',
                    type: 'member'
                }
            ]
        });
    }
    
    
    run(msg, args) {
        if(msg.author.bot) return;
        const { user } = args;
        if(user.user.bot == true) {
            msg.say(':robot: Beep Boop\n```diff\n- That\'s forbidden, I won\'t tell you that!```');
            return;
        }
        
        const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
        console.log(`${channelTag} »» ${msg.author.username}#${msg.author.discriminator} issued command »» ${msg.content}`);
        
        const embed = new RichEmbed()
            .setAuthor('Userinfo about '+user.displayName)
            .setColor(0x00AE86)
            .setDescription('User Information Page about <@'+user.id+'>')
            .setFooter('© by 0xygen#1030', this.client.user.avatarURL)
            .setThumbnail(user.user.avatarURL)
            /*
            * Takes a Date object, defaults to current date.
            */
            .setTimestamp()
            .addField('Join Date:', timeutil.formatDate(user.joinedAt), true)
            .addField('Account created:', timeutil.formatDate(user.user.createdAt), true)
            .addField('Voicechannel (if any):', (user.voiceChannel) ? user.voiceChannel : 'N/A')
            .addField('Color Hex:', user.displayHexColor, true)
            .addField('Status:', user.presence.status, true)
            .addField('Game (if any):', (user.presence.game) ? user.presence.game.name : 'N/A', true)
            .addField('User ID:', user.id, true)
        return msg.embed(embed);
    }
};