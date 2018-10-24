const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const timeutil = require('./../../util/time.js');
const pack = require('./../../package.json');

module.exports = class ServerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'server',
            group: 'general',
            aliases: ['serverinfo'],
            memberName: 'server',
            description: 'Replies with information about the server.',
            examples: ['server'],
            guildOnly: true
        });
    }
    
    run(msg) {
        const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
        console.log(`${channelTag} »» ${msg.author.username}#${msg.author.discriminator} issued command »» ${msg.content}`);
//	let memsize = msg.guild.fetchMembers().then(fetchedGuild => fetchedGuild.members.size);
        
        const embed = new RichEmbed()
            .setAuthor('Information Page '+msg.guild.name, msg.guild.iconURL)
            .setColor(0x00AE86)
            .setDescription('Anime, Manga, Games and much, much more!')
            .setFooter('© by 0xygen#1030', this.client.user.avatarURL) 
            .setThumbnail(msg.guild.iconURL.substring(0, msg.guild.iconURL.length - 3)+"png")
            .addField('Members:', msg.guild.members.size, true)
	    //.addField('Members:', memsize, true)
            .addField('Region:', msg.guild.region, true)
            .addField('Server Owner:', msg.guild.owner, true)
	        .addField('Guild ID:', msg.guild.id, true)
            //.addField('Channels <'+msg.guild.channels.size+'>', msg.guild.channels.filter('type', 'text').size+'[T] | '+msg.guild.channels.filter('type', 'voice').size+'[V]', true)
            .addField('Channels:', msg.guild.channels.size, true)
            .addField('Roles:', msg.guild.roles.size, true)
            .addField('Created on:', timeutil.formatDate(msg.guild.createdAt), true)
            .addField('Bio-Beta Version:', pack.version, true);
        
        return msg.embed(embed);

    }
};
